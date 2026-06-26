"""
Sales Recovery AI Agent powered by Claude claude-opus-4-8.

The agent reasons about the best recovery strategy for each lead and
generates personalized messages / call scripts.
"""
import json
from typing import Any
import anthropic

from app.config import get_settings


SYSTEM_PROMPT = """Você é um agente especialista em recuperação de vendas e relacionamento com clientes.
Seu objetivo é recuperar clientes que abandonaram o carrinho ou não finalizaram uma compra,
de forma empática, natural e personalizada — nunca robotizada.

Você tem acesso a ferramentas para:
- Enviar mensagens de áudio via WhatsApp
- Enviar mensagens de texto via WhatsApp
- Fazer ligações telefônicas com um script de voz

Analise as informações do lead e decida a melhor abordagem. Considere:
1. Valor do carrinho — carrinho alto pode justificar uma ligação
2. Histórico de contatos anteriores — não seja repetitivo
3. Horário adequado para contato
4. Tom: sempre caloroso, nunca agressivo nem insistente demais

Ao gerar o script de áudio/ligação:
- Seja breve (30-60 segundos de fala)
- Use o nome do cliente
- Mencione o produto específico
- Ofereça ajuda genuína, não só desconto
- Inclua uma chamada para ação clara

Responda SEMPRE em português brasileiro.
"""

TOOLS = [
    {
        "name": "send_whatsapp_audio",
        "description": "Envia uma mensagem de áudio personalizada via WhatsApp para o lead.",
        "input_schema": {
            "type": "object",
            "properties": {
                "script": {
                    "type": "string",
                    "description": "Texto completo que será convertido em áudio. Máximo 500 caracteres.",
                },
                "caption": {
                    "type": "string",
                    "description": "Legenda curta que acompanha o áudio no WhatsApp.",
                },
            },
            "required": ["script"],
        },
    },
    {
        "name": "send_whatsapp_text",
        "description": "Envia uma mensagem de texto via WhatsApp.",
        "input_schema": {
            "type": "object",
            "properties": {
                "message": {
                    "type": "string",
                    "description": "Mensagem de texto personalizada para o lead.",
                },
            },
            "required": ["message"],
        },
    },
    {
        "name": "make_phone_call",
        "description": "Faz uma ligação telefônica com um script de voz gerado por IA.",
        "input_schema": {
            "type": "object",
            "properties": {
                "call_script": {
                    "type": "string",
                    "description": "Script completo da ligação que será narrado por voz sintética.",
                },
            },
            "required": ["call_script"],
        },
    },
    {
        "name": "skip_contact",
        "description": "Decide não entrar em contato com o lead agora (ex: horário inadequado, muitos contatos recentes).",
        "input_schema": {
            "type": "object",
            "properties": {
                "reason": {
                    "type": "string",
                    "description": "Justificativa para não contatar agora.",
                },
            },
            "required": ["reason"],
        },
    },
]


async def run_recovery_agent(lead_data: dict, contact_history: list[dict]) -> dict[str, Any]:
    """
    Run the sales recovery agent for a given lead.

    Returns a dict with:
      - action: which tool was selected
      - tool_input: the tool's input
      - reasoning: agent's chain of thought summary
    """
    settings = get_settings()
    client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)

    history_summary = ""
    if contact_history:
        history_summary = "\n\nHistórico de contatos anteriores:\n"
        for h in contact_history[-5:]:
            history_summary += f"- {h['created_at']}: {h['method']} → {h['result']}\n"
            if h.get("ai_message"):
                history_summary += f"  Mensagem enviada: {h['ai_message'][:100]}...\n"

    user_message = f"""Analise este lead e execute a melhor ação de recuperação:

Nome: {lead_data.get('name')}
Telefone: {lead_data.get('phone')}
Produto/Carrinho: {lead_data.get('product', 'Não informado')}
Valor do carrinho: R$ {lead_data.get('cart_value', 0):.2f}
Motivo do abandono (se conhecido): {lead_data.get('abandonment_reason', 'Desconhecido')}
Dados adicionais: {json.dumps(lead_data.get('extra_data') or {}, ensure_ascii=False)}
{history_summary}

Decida a melhor ação e execute-a usando as ferramentas disponíveis."""

    response = await client.messages.create(
        model="claude-opus-4-8",
        max_tokens=2000,
        thinking={"type": "adaptive"},
        system=SYSTEM_PROMPT,
        tools=TOOLS,
        messages=[{"role": "user", "content": user_message}],
    )

    reasoning = ""
    for block in response.content:
        if block.type == "thinking":
            reasoning = block.thinking or ""
            break

    tool_use = next((b for b in response.content if b.type == "tool_use"), None)

    if tool_use is None:
        text = next((b.text for b in response.content if b.type == "text"), "")
        return {"action": "skip_contact", "tool_input": {"reason": text}, "reasoning": reasoning}

    return {
        "action": tool_use.name,
        "tool_input": tool_use.input,
        "reasoning": reasoning,
    }
