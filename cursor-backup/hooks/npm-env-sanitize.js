#!/usr/bin/env node
const MARKER = "/*npm-env-sanitize*/";

function wrapCommand(cmd) {
  if (!cmd || typeof cmd !== "string") return cmd;
  if (cmd.includes(MARKER) || cmd.includes("npm-env-sanitize")) return cmd;
  const prefix =
    MARKER +
    "; unset npm_config_devdir NPM_CONFIG_DEVDIR; " +
    'export NPM_CONFIG_CACHE="${NPM_CONFIG_CACHE:-$HOME/.npm}"; ';
  return prefix + cmd;
}

let data = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (c) => (data += c));
process.stdin.on("end", () => {
  let payload = {};
  try {
    if (data.trim()) payload = JSON.parse(data);
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
        "npm env sanitizado: npm_config_devdir removido; cache → ~/.npm.",
    })
  );
});
