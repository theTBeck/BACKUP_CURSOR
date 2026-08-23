---
description: Pipeline diário Stitch — design → prompt → loop → React (autorun)
---

# /stitch-diario

Execute o pipeline Stitch completo para o projeto atual. Fluxo diário obrigatório de TheMasterBECK.

## Pré-requisitos
1. Confirmar MCP `user-stitch` / `stitch` disponível (GetDynamicTools). Se offline: reiniciar MCP no Cursor Settings e checar `STITCH_API_KEY` no Ambiente do Usuário Windows.
2. Abrir skill bundle `~/.claude/skills/stitch/SKILL.md` e seguir o protocolo de orquestração.
3. Preferir Chrome como browser; terminal CMD; package manager pnpm.

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
- Se Stitch MCP falhar: reportar status, sugerir `C:\Users\USER\.cursor\bin\stitch-mcp.cmd` e reinício do Cursor; não fingir sucesso.
- Kairogen permanece DESLIGADO até nova ordem.
- Actionize permanece ARQUIVADO até diretiva explícita de TheMasterBECK.

## Saída esperada
Resumo curto do que gerou (arquivos/páginas), próximo passo do pipeline, e bloqueios se houver.
