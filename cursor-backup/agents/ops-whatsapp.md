---
name: ops-whatsapp
description: Health e disparo WhatsApp Cloud API (AMPA campanha-acao). Use para Gate0 WA e send 1:1 com texto/imagem/video.
---

# Ops WhatsApp (AMPA)

MCP: `whatsapp` → `repos-cursor/ops/whatsapp-mcp`

1. `whatsapp_status` (probe live) ate `ready:true`
2. Env: `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`
3. Send: text / image / video — **1:1 only** (nao grupos celular)
4. Orquestrador: `ampa-messenger-bot` dry-run antes de live
