# BACKUP_MANIFEST

- **Date (local):** 2026-08-22
- **Owner:** TheMasterBECK / theTBeck
- **Repo:** https://github.com/theTBeck/BACKUP_CURSOR (private)
- **Host path:** `C:\Users\USER\BACKUP_CURSOR`

## Included

| Path | Notes |
|------|--------|
| `cursor-backup/rules/` | Global `.mdc` rules including `backup-cursor-setup.mdc` |
| `cursor-backup/skills-cursor/` | Cursor built-in/agent skills |
| `cursor-backup/claude-skills/` | User Claude skills |
| `cursor-backup/agents/` | Agents listing / configs |
| `cursor-backup/plugins/` | Plugin name lists only (no binary caches) |
| `cursor-backup/mcp.json` | MCP server defs with secrets redacted to `${env:...}` |
| `cursor-backup/argv.json` | Cursor argv |
| `cursor-backup/user/settings.json` | User settings |
| `cursor-backup/user/snippets/` | Snippets |
| `cursor-backup/extensions.txt` | Extension IDs |

## Explicitly omitted

- Plaintext API keys / tokens / Bearer values
- `%APPDATA%\Cursor\User\History`
- `workspaceStorage`, caches, heapsnapshots
- Plugin binary caches under `.cursor/plugins/cache` (only name list kept)
- Cloud auth cookies / OAuth token stores

## Security note

If any source config had a hardcoded secret (e.g. Stitch), the backup uses `${env:STITCH_API_KEY}` instead. Move secrets to environment variables and rotate any key that was previously stored in plaintext.
