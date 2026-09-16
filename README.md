# BACKUP-CURSOR-AI-ASSOCIADOS

Repositório de configurações para Cursor IDE — backup **privado e sanitizado** (TheMasterBECK / IA Associados).

**Remoto:** https://github.com/ia-associados/BACKUP-CURSOR-AI-ASSOCIADOS

## Conteudo

- `cursor-backup/rules/` — rules globais (`.mdc`)
- `cursor-backup/skills-cursor/` — skills oficiais do Cursor
- `cursor-backup/claude-skills/` — skills do usuario (Claude)
- `cursor-backup/agents/` — agents/subagents
- `cursor-backup/plugins/` — inventario de plugins
- `cursor-backup/mcp.json` — MCPs com secrets **redigidos** (`${env:...}`)
- `cursor-backup/user/` — settings, keybindings, snippets
- `cursor-backup/extensions.txt` — lista de extensoes
- `BACKUP_MANIFEST.md` — inventário e timestamp

## Seguranca

API keys e tokens **nao** entram neste repo em texto claro. Restaure secrets via variaveis de ambiente locais.

## Atualizacao

A rule `backup-cursor-setup.mdc` instrui o agente a sincronizar este repo quando o setup mudar (somente se houver diff real).

## Restore (macOS)

```bash
bash /Users/admin/Documents/INTELIGENCIA-ARTIFICIAL/Thiago-Beck/repos-cursor/bin/restore-backup-cursor-mac.sh
```
