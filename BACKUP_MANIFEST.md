# BACKUP_MANIFEST

- **Date (local):** 2026-09-16 20:30 -0300
- **Date (UTC):** 2026-09-16T23:30:00Z
- **Owner:** TheMasterBECK / IA Associados
- **Repo:** https://github.com/ia-associados/BACKUP-CURSOR-AI-ASSOCIADOS.git
- **Host path:** `/Users/admin/Documents/INTELIGENCIA-ARTIFICIAL/BACKUP_CURSOR`
- **Platform:** macOS (darwin)

## Included

| Path | Notes |
|------|--------|
| `cursor-backup/rules/` | Global `.mdc` rules |
| `cursor-backup/agents/` | User agents/subagents |
| `cursor-backup/hooks/` + `hooks.json` | Global Cursor hooks (autorun + repos-cursor-guard + omniroute mac-safe) |
| `cursor-backup/project-hooks/` | Workspace ops under repos-cursor/.cursor |
| `cursor-backup/skills-cursor/` | Cursor built-in/agent skills |
| `cursor-backup/claude-skills/` | User Claude skills |
| `cursor-backup/plugins/` | Plugin name lists only |
| `cursor-backup/mcp.json` | MCP defs sanitized |
| `cursor-backup/user/` | settings / keybindings / snippets |
| `cursor-backup/extensions.txt` | Extension IDs |
| `cursor-backup/commands/` | Slash commands |

## Explicitly omitted

- Plaintext API keys / tokens / Bearer values
- History, workspaceStorage, caches, heapsnapshots
- Plugin binary caches
- `~/.cursor/hooks/state`

## Security note

Secrets stay as `${env:...}` or `***REDACTED***`. Repo remains private.

## Restore (macOS)

```bash
bash /Users/admin/Documents/INTELIGENCIA-ARTIFICIAL/Thiago-Beck/repos-cursor/bin/restore-backup-cursor-mac.sh
```
