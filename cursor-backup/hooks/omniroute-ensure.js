#!/usr/bin/env node
/** sessionStart — OmniRoute context (mac-safe: no cmd.exe spawn). */
const net = require("net");

const ROOT = "/Users/admin/Documents/INTELIGENCIA-ARTIFICIAL";
const ENSURE = `${ROOT}/Thiago-Beck/repos-cursor/ops/omniroute-ensure.cmd`;
const HEALTH = `${ROOT}/bin/omniroute-health.cmd`;

function portOpen(port, host = "127.0.0.1", timeoutMs = 600) {
  return new Promise((resolve) => {
    const s = new net.Socket();
    let done = false;
    const finish = (v) => {
      if (done) return;
      done = true;
      try { s.destroy(); } catch {}
      resolve(v);
    };
    s.setTimeout(timeoutMs);
    s.once("connect", () => finish(true));
    s.once("timeout", () => finish(false));
    s.once("error", () => finish(false));
    try { s.connect(port, host); } catch { finish(false); }
  });
}

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", async () => {
  const up = await portOpen(20128);
  const context = [
    "OMNIROUTE FULL-TIME (backup restore — macOS):",
    up
      ? "- Status ao sessionStart: porta 20128 ABERTA."
      : "- Status ao sessionStart: porta 20128 DOWN — ensure Windows-only (.cmd ausente no mac).",
    `- Health (Windows): ${HEALTH}`,
    `- Ensure (Windows): ${ENSURE}`,
    "- Gateway: http://localhost:20128/v1",
  ].join("\n");

  process.stdout.write(JSON.stringify({
    additional_context: context,
    env: {
      CURSOR_OMNIROUTE_FULLTIME: "1",
      CURSOR_OMNIROUTE_PORT: "20128",
      CURSOR_OMNIROUTE_ENSURE: ENSURE,
    },
  }));
});
