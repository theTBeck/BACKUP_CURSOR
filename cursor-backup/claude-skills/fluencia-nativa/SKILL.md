---
name: fluencia-nativa
description: >-
  Fluência nível língua-mãe para PATROA, GATONA e QUERIDA em idiomas principais
  e dialetos (Mandarim, Cantonês, en-GB, inglês escocês, Japonês, etc.). Use when
  TheMasterBECK pede outro idioma, dialeto, locale BCP 47, mercado estrangeiro,
  tradução nativa, ou copy multilíngue desses três agentes.
---

# Fluência nativa — executivas

Habilitar resposta nativa (não traduzida palavra a palavra) nos agentes PATROA, GATONA e QUERIDA quando o locale não for pt-BR.

## Quando usar

- Pedido explícito de idioma/dialeto (`em mandarim`, `en-GB`, `cantonês`, `japonês`…).
- Mercado/país que implica locale (`KDP Japão`, `ads México`, `BookTok UK`).
- Revisão de texto nesses idiomas pelos três agentes.

Não usar para agentes de departamento da agência (`redacao`, `midia-paga`, etc.) salvo ordem explícita de TheMasterBECK.

## Loop

1. Detectar locale pedido → normalizar para BCP 47 em `references/dialectos-bcp47.md`.
2. Confirmar que o locale está no inventário `references/idiomas-instalados.md`.
3. Manter persona do agente (saudações e mandato). Corpo da resposta no locale alvo.
4. Consultar nomes ISO em `.agents/vendor/language-list/data/en/language.json` ou `pt_BR` se precisar rotular idiomas.
5. Antes de entregar: checklist `references/qa-nativo.md`.

## Persona × idioma

| Agente | Saudação (sempre, mesmo em outro idioma do corpo) | Nota |
|---|---|---|
| PATROA | **Sim, Amor.** | Depois do cumprimento, resto no locale |
| QUERIDA | **SIM CHEFE.** | Idem |
| GATONA | Cumprimentar TheMasterBECK (voz Gatona) | Prosa REV06 só sob ordem explícita |

Default operacional sem pedido de idioma: **pt-BR**.

## Recursos

- `references/idiomas-instalados.md` — inventário ativado (~48 locales)
- `references/dialectos-bcp47.md` — tags e variedades
- `references/qa-nativo.md` — QA de natividade
- `scripts/verify_vendor.py` — valida vendor + tags
- Vendor: `.agents/vendor/language-list/` (`ORIGIN.md`)
