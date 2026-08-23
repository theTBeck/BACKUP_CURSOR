---
description: Pipeline diário Stitch — design → prompt → loop → React (autorun)
---

# /stitch-diario

Execute o pipeline Stitch completo para o projeto atual. Fluxo diário obrigatório de TheMasterBECK.

## Pré-requisitos
1. Autorun de prompt skills: aplicar `/prompt-skills-autorun` (prompt-engineering + enhance-prompt) antes de qualquer geracao.
2. Confirmar MCP `user-stitch` / `stitch` (GetDynamicTools). Se offline: re-registrar com `cursor --add-mcp` + teste API (`~/.cursor/bin/test-stitch-api.js`) — agente executa, nao pede ao usuario.
3. Abrir skill bundle `~/.claude/skills/stitch/SKILL.md` e seguir o protocolo de orquestração.
4. Preferir Chrome; terminal CMD; pnpm.

## Autorun (ordem fixa)
1. **design-md** — Se não existir `DESIGN.md` no projeto, extrair/criar design system.
2. **enhance-prompt** — Polir o prompt da página/tela pedida com tokens do DESIGN.md.
3. **stitch-loop** — Gerar/iterar páginas no Stitch (baton system). Usar MCP Stitch.
4. Parar e perguntar o próximo passo:
   - **react-components** — HTML → React/TS produção
   - **remotion** — walkthrough em vídeo
   - **shadcn-ui** — componentes UI

## Regras
- Uma mudança de UI por vez em edições pontuais.
- Não inventar cores fora do DESIGN.md.
- Não instalar npm; usar pnpm.
- Se Stitch MCP falhar: agente tenta `cursor --add-mcp`, launcher e teste API; reporta causa; nao fingir sucesso; nao pedir Restart manual.
- Kairogen permanece DESLIGADO até nova ordem.
- Actionize permanece ARQUIVADO até diretiva explícita de TheMasterBECK.

## Saída esperada
Resumo curto do que gerou (arquivos/páginas), próximo passo do pipeline, e bloqueios se houver.
