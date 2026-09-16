---
name: ops-instagram
description: Health e Instagram Direct via Meta Graph (AMPA campanha-acao). Gate0 IG obrigatorio — paridade com WA e TG.
---

# Ops Instagram Direct (AMPA)

MCP: `instagram` → `repos-cursor/ops/instagram-mcp`

1. `instagram_status` (probe) ate `ready:true`
2. Env: `INSTAGRAM_PAGE_ACCESS_TOKEN`, `INSTAGRAM_BUSINESS_ACCOUNT_ID`
3. Send: text / image_url / video_url — **opt-in / janela 24h**
4. Skills: `instagram`, `social-selling-and-dm`, banner-design
5. Orquestrador: `ampa-messenger-bot` (canal `instagram`)

Proibido fechar Gate0 sem IG codeOk. Live send exige tokens Meta.
