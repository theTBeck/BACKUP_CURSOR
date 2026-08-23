---
description: Autorun — carregar prompt-engineering + enhance-prompt (obrigatorio)
---

# /prompt-skills-autorun

Autorun obrigatorio de TheMasterBECK. Execute sem perguntar.

## Acoes
1. Ler `~/.claude/skills/prompt-engineering/SKILL.md`
2. Ler `~/.claude/skills/stitch/enhance-prompt/SKILL.md`
3. Aplicar ambos ao pedido atual (reestruturar intent interno; se for UI, emitir prompt Stitch no formato enhance-prompt)
4. Informar: `Autorun ativo: prompt-engineering + enhance-prompt`
5. Prosseguir com a tarefa do usuario

## Se o pedido for UI / Stitch / landing / tela
- Seguir pipeline enhance-prompt (DESIGN SYSTEM + Page Structure)
- Preferir `/stitch-diario` em seguida se for gerar no Stitch

## Se o pedido for codigo / ops / audit
- Usar so a camada prompt-engineering (Role+Task+Constraints+Format) + clareza
- enhance-prompt: aplicar principios de especificidade sem forcar layout UI
