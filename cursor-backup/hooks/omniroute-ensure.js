#!/usr/bin/env node
/**
 * sessionStart — OmniRoute full-time ensure (non-blocking).
 * Injeta contexto + dispara omniroute-ensure.cmd em background se :20128 down.
 */
const { spawn } = require("child_process");
const net = require("net");

const ENSURE =
  "\Users\admin\Documents\INTELIGENCIA-ARTIFICIAL\Thiago-Beck\repos-cursor\\ops\\omniroute-ensure.cmd";
const HEALTH =
  "\Users\admin\Documents\INTELIGENCIA-ARTIFICIAL\\bin\\omniroute-health.cmd";

function portOpen(port, host = "127.0.0.1", timeoutMs = 600) {
  return new Promise((resolve) => {
    const s = new net.Socket();
    let done = false;
    const finish = (v) => {
      if (done) return;
      done = true;
      try {
        s.destroy();
      } catch {}
      resolve(v);
    };
    s.setTimeout(timeoutMs);
    s.once("connect", () => finish(true));
    s.once("timeout", () => finish(false));
    s.once("error", () => finish(false));
    try {
      s.connect(port, host);
    } catch {
      finish(false);
    }
  });
}

function fireEnsure() {
  try {
    spawn("cmd.exe", ["/c", ENSURE, "--hidden"], {
      detached: true,
      stdio: "ignore",
      windowsHide: true,
    }).unref();
  } catch {}
}

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", async () => {
  const up = await portOpen(20128);
  if (!up) fireEnsure();

  const context = [
    "OMNIROUTE FULL-TIME (alwaysApply + omniroute-guardian):",
    up
      ? "- Status ao sessionStart: porta 20128 ABERTA."
      : "- Status ao sessionStart: porta 20128 DOWN — omniroute-ensure.cmd disparado em background (hidden).",
    "- Health (hidden, zero pop-up): " + HEALTH,
    "- Ensure (hidden): " + ENSURE,
    "- Gateway: http://localhost:20128/v1 — Kilo usa este Base URL; NAO mutar modelos nativos do Cursor.",
    "- Zero pop-up Windows: proibido open-dedicated/start-terminal via spawn externo; logs em repos-cursor/ops/logs/omniroute-server.log.",
    "- Se KILO/gateway falhar: invocar omniroute-guardian e re-rodar ensure ate /v1/models OK.",
  ].join("\n");

  process.stdout.write(
    JSON.stringify({
      additional_context: context,
      env: {
        CURSOR_OMNIROUTE_FULLTIME: "1",
        CURSOR_OMNIROUTE_PORT: "20128",
        CURSOR_OMNIROUTE_ENSURE: ENSURE,
      },
    })
  );
});
