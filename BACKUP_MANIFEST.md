# BACKUP_MANIFEST

- **Date (local):** 2026-08-25 16:36 -0300
- **Date (UTC):** 2026-08-25T19:36:59Z
- **Owner:** TheMasterBECK / theTBeck
- **Repo:** https://github.com/theTBeck/BACKUP_CURSOR (private)
- **Host path:** `C:\inteligencia-artificial\BACKUP_CURSOR`

## Included

| Path | Notes |
|------|--------|
| `cursor-backup/rules/` | Global `.mdc` rules |
| `cursor-backup/agents/` | User agents/subagents |
| `cursor-backup/hooks/` + `hooks.json` | Global Cursor hooks (autorun + repos-cursor-guard) |
| `cursor-backup/project-hooks/` | Workspace ops under repos-cursor/.cursor |
| `cursor-backup/skills-cursor/` | Cursor built-in/agent skills |
| `cursor-backup/claude-skills/` | User Claude skills |
| `cursor-backup/plugins/` | Plugin name lists only |
| `cursor-backup/mcp.json` | MCP defs sanitized |
| `cursor-backup/user/` | settings / keybindings / snippets |
| `cursor-backup/extensions.txt` | Extension IDs |

## Explicitly omitted

- Plaintext API keys / tokens / Bearer values
- `%APPDATA%\Cursor\User\History`
- `workspaceStorage`, caches, heapsnapshots
- Plugin binary caches
- Cloud auth cookies / OAuth token stores
- `~/.cursor/hooks/state`

## Security note

Secrets stay as `${env:...}` or `***REDACTED***`. Repo remains private.
