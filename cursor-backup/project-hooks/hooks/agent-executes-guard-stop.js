#!/usr/bin/env node
/**
 * stop — Art.1: se a ultima resposta pediu acao mecanica, followup para EXECUTAR.
 * SAFE por sentença (não bypassa texto inteiro). Sem "LEI PRIMARIA"/"já foi feito" genéricos.
 * Filtra conversation_id. Canonico: repos-cursor/.cursor/hooks/
 */
const fs = require("fs");
const path = require("path");

const STATE_FILE = path.join(__dirname, "state", "last-agent-response.txt");
const MAX_LOOP = 2;
const MAX_AGE_MS = 15 * 60 * 1000;

const VIOLATION = [
  /\b(?:por\s+favor[, ]+)?(?:rode|execute|abra|instale|copie|cole|reinicie)\b[\s\S]{0,100}\b(?:este\s+comando|no\s+terminal|no\s+cmd|no\s+powershell|settings|configura[cç][oõ]es|marketplace|reload\s+window|mcp)\b/i,
  /\b(?:v[aá]\s+em|abra\s+o|abra\s+a)\s+(?:settings|configura[cç][oõ]es)\b/i,
  /\bsettings\s*(?:→|->|›)\b/i,
  /\bme\s+(?:mande|envie|diga)\s+(?:a|o)?\s*(?:sa[ií]da|resultado|output)\b/i,
  /\b(?:rode|execute)\s+(?:isto|isso|o\s+comando|este\s+script)\b/i,
  /\bfaca\s+voc[eê]\b|\bfaça\s+você\b/i,
  /\b(?:copie\s+e\s+cole|cole\s+no\s+terminal)\b/i,
  /\b(?:voc[eê]\s+mesmo|fa[cç]a\s+manual(?:mente)?)\b/i,
  /\babra\s+(?:o\s+)?(?:arquivo|app|aplicativo|capcut|itunes)\b/i,
  /\b(?:pode|poderia|basta)\s+(?:rodar|executar|abrir)\b[\s\S]{0,80}\b(?:terminal|powershell|settings|comando)\b/i,
  /\bplease\s+run\b[\s\S]{0,60}\b(?:command|terminal)\b/i,
];

/** SAFE só para bloqueio nativo — por sentença, junto com a violação. */
const SAFE_SENTENCE = [
  /\bcart[aã]o\s+(?:nativo|de\s+aprova)/i,
  /\baprova[cç][aã]o\s+nativa\b/i,
  /\bbloqueio\s+(?:nativo|incontorn[aá]vel)\b/i,
  /\b2fa\b/i,
  /\bcaptcha\b/i,
];

function splitSentences(text) {
  return String(text)
    .split(/(?<=[.!?\n])\s+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function readCaptured(payloadConvId) {
  const raw = fs.readFileSync(STATE_FILE, "utf8");
  let parsed = null;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { text: raw, ok: true, reason: "legacy" };
  }
  if (!parsed || typeof parsed.text !== "string") {
    return { text: "", ok: false, reason: "empty" };
  }
  if (parsed.ts && Date.now() - Number(parsed.ts) > MAX_AGE_MS) {
    return { text: "", ok: false, reason: "stale" };
  }
  const fileConv = parsed.conversation_id || parsed.conversationId || null;
  if (payloadConvId && fileConv && String(payloadConvId) !== String(fileConv)) {
    return { text: "", ok: false, reason: "conv_mismatch" };
  }
  return { text: parsed.text, ok: true, reason: "ok" };
}

function hasActionableViolation(text) {
  const sentences = splitSentences(text);
  // Se o texto inteiro for curto, ainda avaliar como uma sentença
  const units = sentences.length ? sentences : [text];
  for (const s of units) {
    const violates = VIOLATION.some((re) => re.test(s));
    if (!violates) continue;
    const safeHere = SAFE_SENTENCE.some((re) => re.test(s));
    if (!safeHere) return true;
  }
  return false;
}

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  const out = {};
  try {
    const data = JSON.parse(input || "{}");
    if (data.status !== "completed") {
      process.stdout.write(JSON.stringify(out));
      return;
    }
    const loop = data.loop_count || 0;
    if (loop >= MAX_LOOP) {
      process.stdout.write(JSON.stringify(out));
      return;
    }

    const convId =
      data.conversation_id || data.conversationId || data.session_id || null;

    let captured;
    try {
      captured = readCaptured(convId);
    } catch {
      process.stdout.write(JSON.stringify(out));
      return;
    }

    if (!captured.ok || !captured.text) {
      process.stdout.write(JSON.stringify(out));
      return;
    }

    // Avaliar VIOLATION mesmo em textos curtos (ex.: "Rode no terminal.")
    if (!hasActionableViolation(captured.text)) {
      process.stdout.write(JSON.stringify(out));
      return;
    }

    out.followup_message = [
      "CORRECAO OBRIGATORIA (LEI PRIMARIA Art.1 / agent-executes-all): a resposta anterior pediu acao mecanica ao TheMasterBECK.",
      "PROIBIDO pedir terminal/Settings/cliques/OAuth manual.",
      "EXECUTE agora com tools (Shell/CMD, arquivos, MCP, Chrome). Nao peca de novo.",
      "Continue a tarefa ate concluir e reporte o que JA FOI FEITO.",
    ].join(" ");
  } catch (err) {
    try {
      process.stderr.write(
        "[LEI][WARN] agent-executes-guard-stop: " +
          String((err && err.message) || err) +
          "\n"
      );
    } catch {
      // ignore
    }
  }
  process.stdout.write(JSON.stringify(out));
});
