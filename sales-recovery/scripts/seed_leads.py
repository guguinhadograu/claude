#!/usr/bin/env python3
"""Seed the database with sample leads for testing."""
import asyncio
import httpx

LEADS = [
    {"name": "Maria Silva", "phone": "+5511999990001", "email": "maria@email.com", "product": "Tênis Nike Air Max 270", "cart_value": 649.90, "abandonment_reason": "Preço alto"},
    {"name": "João Souza", "phone": "+5511999990002", "email": "joao@email.com", "product": "Smartwatch Samsung Galaxy Watch 6", "cart_value": 1299.00, "abandonment_reason": "Comparando preços"},
    {"name": "Ana Rodrigues", "phone": "+5511999990003", "product": "Curso de Python Avançado", "cart_value": 297.00},
    {"name": "Carlos Mendes", "phone": "+5521999990004", "product": "Kit Suplementos Whey + Creatina", "cart_value": 389.90, "abandonment_reason": "Frete caro"},
    {"name": "Fernanda Lima", "phone": "+5511999990005", "email": "fernanda@email.com", "product": "Sofá 3 lugares retrátil", "cart_value": 2890.00, "abandonment_reason": "Prazo de entrega longo"},
]

async def main():
    async with httpx.AsyncClient(base_url="http://localhost:8000") as client:
        for lead in LEADS:
            r = await client.post("/api/leads/", json=lead)
            print(f"Created: {lead['name']} → {r.json().get('id')}")

if __name__ == "__main__":
    asyncio.run(main())
