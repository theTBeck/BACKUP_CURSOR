#!/usr/bin/env node
/**
 * stop — se a ultima resposta pediu acao mecanica ao TheMasterBECK,
 * dispara followup automatico para o agente EXECUTAR (nao pedir de novo).
 * Nao bloqueia respostas; so corrige violacoes claras.
 */
const fs = require("fs");
const path = require("path");

const STATE_FILE = path.join(__dirname, "state", "last-agent-response.txt");

/** Padroes de alta precisao: imperativo pedindo que o usuario execute algo. */
const VIOLATION = [
  /\b(?:por\s+favor[, ]+)?(?:rode|execute|abra|instale|copie|cole|reinicie)\b[\s\S]{0,100}\b(?:este\s+comando|no\s+terminal|no\s+cmd|settings|marketplace|reload\s+window|mcp)\b/i,
  /\b(?:v[aá]\s+em|abra\s+o|abra\s+a)\s+settings\b/i,
  /\bsettings\s*(?:→|->|›)\b/i,
  /\bme\s+(?:mande|envie|diga)\s+(?:a|o)?\s*(?:sa[ií]da|resultado|output)\b/i,
  /\b(?:rode|execute)\s+(?:isto|isso|o\s+comando|este\s+script)\b/i,
  /\bfaca\s+voc[eê]\b|\bfaça\s+você\b/i,
  /\b(?:copie\s+e\s+cole|cole\s+no\s+terminal)\b/i,
];

/** Excecoes: documentando a propria lei / ja executou / bloqueio nativo. */
const SAFE = [
  /\b(?:PROIBIDO|NUNCA\s+pedir|agent-executes-all|LEI\s+EXECUCAO)\b/i,
  /\bj[aá]\s+(?:foi\s+)?(?:feito|executado|rodado)\b/i,
  /\bcart[aã]o\s+(?:nativo|de\s+aprova)/i,
  /\baprovação\s+nativa|\baprovacao\s+nativa\b/i,
];

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
    // no maximo 1 correcao automatica por conclusao (loop_count 0)
    if ((data.loop_count || 0) > 0) {
      process.stdout.write(JSON.stringify(out));
      return;
    }

    let text = "";
    try {
      text = fs.readFileSync(STATE_FILE, "utf8");
    } catch {
      process.stdout.write(JSON.stringify(out));
      return;
    }

    if (!text || text.length < 20) {
      process.stdout.write(JSON.stringify(out));
      return;
    }
    if (SAFE.some((re) => re.test(text))) {
      process.stdout.write(JSON.stringify(out));
      return;
    }
    if (!VIOLATION.some((re) => re.test(text))) {
      process.stdout.write(JSON.stringify(out));
      return;
    }

    out.followup_message = [
      "CORRECAO OBRIGATORIA (agent-executes-all): a resposta anterior pediu acao mecanica ao TheMasterBECK.",
      "PROIBIDO pedir terminal/Settings/cliques/OAuth manual.",
      "EXECUTE agora com tools (Shell/CMD, arquivos, MCP, Chrome). Nao peca de novo.",
      "Continue a tarefa ate concluir e reporte o que JA FOI FEITO.",
    ].join(" ");
  } catch {
    // silencioso
  }
  process.stdout.write(JSON.stringify(out));
});
