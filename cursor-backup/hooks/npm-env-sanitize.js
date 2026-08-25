#!/usr/bin/env node
/**
 * preToolUse Shell: remove npm_config_devdir (Cursor sandbox) e redireciona
 * NPM_CONFIG_CACHE para %LOCALAPPDATA%\npm-cache — evita warn npm 12+ e futuro erro.
 */
const MARKER = "/*npm-env-sanitize*/";

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (c) => (data += c));
    process.stdin.on("end", () => resolve(data));
  });
}

function wrapCommand(cmd) {
  if (!cmd || typeof cmd !== "string") return cmd;
  if (cmd.includes(MARKER) || cmd.includes("npm-env-sanitize")) return cmd;
  // Cursor Windows Shell roda via PowerShell wrapper — unset no mesmo processo.
  const prefix =
    `${MARKER}; ` +
    `Remove-Item Env:npm_config_devdir -ErrorAction SilentlyContinue; ` +
    `Remove-Item Env:NPM_CONFIG_DEVDIR -ErrorAction SilentlyContinue; ` +
    `if (-not $env:LOCALAPPDATA) { $env:LOCALAPPDATA = [Environment]::GetFolderPath('LocalApplicationData') }; ` +
    `if (-not $env:NPM_CONFIG_CACHE -or $env:NPM_CONFIG_CACHE -match 'cursor-sandbox-cache') { ` +
    `$env:NPM_CONFIG_CACHE = Join-Path $env:LOCALAPPDATA 'npm-cache' }; `;
  return prefix + cmd;
}

async function main() {
  let payload = {};
  try {
    const raw = await readStdin();
    if (raw.trim()) payload = JSON.parse(raw);
  } catch {
    payload = {};
  }

  const tool = payload.tool_name || payload.toolName || payload.tool || "";
  const ti = payload.tool_input || payload.arguments || payload.input || {};

  if (!/shell/i.test(String(tool)) && !ti.command) {
    process.stdout.write(JSON.stringify({ permission: "allow" }));
    return;
  }

  const original = ti.command;
  const wrapped = wrapCommand(original);
  if (wrapped === original) {
    process.stdout.write(JSON.stringify({ permission: "allow" }));
    return;
  }

  process.stdout.write(
    JSON.stringify({
      permission: "allow",
      updated_input: { ...ti, command: wrapped },
      agent_message:
        "npm env sanitizado: npm_config_devdir removido; cache → LocalAppData\\npm-cache.",
    })
  );
}

main().catch(() => {
  process.stdout.write(JSON.stringify({ permission: "allow" }));
});
