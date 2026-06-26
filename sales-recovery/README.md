# Sales Recovery AI Agent

App de recuperação de vendas com agente de IA que envia **mensagens de áudio** e faz **ligações telefônicas** automaticamente para recuperar carrinhos abandonados e leads perdidos.

## Como funciona

```
Lead abandona carrinho
        ↓
Webhook recebe evento (ou lead adicionado manualmente)
        ↓
Agente Claude (claude-opus-4-8) analisa o lead com chain-of-thought
        ↓
Agente decide: áudio WhatsApp / texto WhatsApp / ligação telefônica
        ↓
Script personalizado gerado → ElevenLabs/Polly converte para áudio
        ↓
Twilio envia áudio ou faz ligação
        ↓
Dashboard mostra resultado
```

## Stack

- **IA**: Claude claude-opus-4-8 (Anthropic) com adaptive thinking
- **Voz**: ElevenLabs (multilingual v2) ou AWS Polly (fallback)
- **Comunicação**: Twilio (WhatsApp + Voice)
- **Backend**: Python FastAPI + SQLite
- **Frontend**: React + Vite

## Configuração rápida

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edite .env com suas chaves de API

pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 2. Frontend (dev)

```bash
cd frontend
npm install
npm run dev
```

### 3. Build para produção

```bash
cd frontend && npm run build
# O FastAPI serve o dist/ automaticamente
```

### 4. Docker (tudo junto)

```bash
cp backend/.env.example backend/.env
# Edite backend/.env
docker compose up --build
```

## Variáveis de ambiente necessárias

| Variável | Descrição |
|---|---|
| `ANTHROPIC_API_KEY` | Chave da API Anthropic |
| `TWILIO_ACCOUNT_SID` | SID da conta Twilio |
| `TWILIO_AUTH_TOKEN` | Token da conta Twilio |
| `TWILIO_PHONE_NUMBER` | Número de voz Twilio (+1...) |
| `TWILIO_WHATSAPP_NUMBER` | Número WhatsApp Twilio |
| `ELEVENLABS_API_KEY` | Chave ElevenLabs (opcional, usa AWS Polly se vazio) |
| `APP_URL` | URL pública do app (para Twilio callbacks) |

## Endpoints da API

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/api/leads/` | Criar lead manualmente |
| GET | `/api/leads/` | Listar leads |
| GET | `/api/leads/stats` | Estatísticas do dashboard |
| PATCH | `/api/leads/{id}` | Atualizar status do lead |
| POST | `/api/recovery/{id}` | Disparar recuperação de um lead |
| POST | `/api/recovery/bulk/all-new` | Recuperar todos leads novos |
| POST | `/api/webhook/abandoned-cart` | Webhook para e-commerce |

## Webhook de carrinho abandonado

Configure sua plataforma de e-commerce para enviar um POST para `/api/webhook/abandoned-cart`:

```json
{
  "name": "Maria Silva",
  "phone": "+5511999990001",
  "email": "maria@email.com",
  "product": "Tênis Nike Air Max 270",
  "cart_value": 649.90,
  "abandonment_reason": "Preço alto"
}
```

## Seed de dados de teste

```bash
cd backend
python ../scripts/seed_leads.py
```

## Configuração Twilio WhatsApp

1. Crie conta em [twilio.com](https://twilio.com)
2. Para WhatsApp Sandbox (testes): siga o guia do Twilio Console
3. Para produção: solicite aprovação do número WhatsApp Business
4. Configure o webhook de status em: `https://seu-dominio.com/api/calls/status`

## Configuração ElevenLabs

1. Crie conta em [elevenlabs.io](https://elevenlabs.io)
2. Copie sua API key
3. Escolha uma voz e copie o Voice ID (padrão: Rachel)
4. Para vozes em português, recomendo vozes da biblioteca multilingual

## Fallback: AWS Polly

Se `ELEVENLABS_API_KEY` não for definida, o sistema usa automaticamente **AWS Polly** com a voz `Camila` (pt-BR Neural). Configure as credenciais AWS normalmente via variáveis de ambiente ou IAM role.
