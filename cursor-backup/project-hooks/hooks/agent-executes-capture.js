#!/usr/bin/env node
/**
 * afterAgentResponse — guarda o texto final do agente para o stop-guard.
 * Canonico: repos-cursor/LEI-PRIMARIA-SYSTEMPROMPT/hooks/
 */
const fs = require("fs");
const path = require("path");

const STATE_DIR = path.join(__dirname, "state");
const STATE_FILE = path.join(STATE_DIR, "last-agent-response.txt");

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  try {
    const data = JSON.parse(input || "{}");
    const text = typeof data.text === "string" ? data.text : "";
    fs.mkdirSync(STATE_DIR, { recursive: true });
    fs.writeFileSync(
      STATE_FILE,
      JSON.stringify({
        text,
        ts: Date.now(),
        conversation_id: data.conversation_id || data.conversationId || null,
      }),
      "utf8"
    );
  } catch (e) {
    try {
      process.stderr.write("[LEI][WARN] agent-executes-capture: " + String(e && e.message || e) + "\n");
    } catch {
      // ignore
    }
  }
  process.stdout.write("{}");
});
