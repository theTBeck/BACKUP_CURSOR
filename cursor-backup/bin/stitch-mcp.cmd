@echo off
REM Stitch MCP launcher (Windows CMD) — autorun-friendly
REM Requires STITCH_API_KEY in User environment (setx) or already in this session.
if not defined STITCH_API_KEY (
  echo [stitch] STITCH_API_KEY ausente neste processo. Defina no Ambiente do Usuario e reinicie o Cursor.
  exit /b 1
)
pnpm dlx stitch-mcp-stdio
