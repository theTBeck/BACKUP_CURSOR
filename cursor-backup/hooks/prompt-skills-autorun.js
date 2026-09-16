#!/usr/bin/env node
/**
 * sessionStart autorun — grill-me + prompt-engineering + context-engineering (modo B).
 */
const path = require("path");
const wp = require(path.join(__dirname, "..", "..", "sync-cursor-kilo", "workspace-paths.js"));

const ROOT = wp.getInteligenciaRoot();
const REPOS = wp.getReposCursorRoot(ROOT);
const SKILLS_ROOT = wp.getCursorSkillsRoot(ROOT);
const GRILL_ME_SKILL = wp.getGrillMeSkillPath();
const PROMPT_ENGINEERING = wp.getPromptEngineeringSkillPath();

const ROUTER = [
  "context-fundamentals|nucleo|mental models, arquitetura de agente",
  "context-degradation|lost-in-middle, poisoning, degradacao em sessao longa",
  "context-compression|reduzir conversa/trajectory sob pressao de contexto",
  "context-optimization|nucleo|tokens, masking, prefix cache, partitioning",
  "latent-briefing|KV cache sharing entre orchestrator e workers",
  "multi-agent-patterns|coordenacao, handoffs, agentes paralelos",
  "long-horizon-prompting|prompt de agente autonomo longo, success predicates",
  "memory-systems|memoria cross-session, entidades, retrieval",
  "tool-design|contratos de tools, descricoes, erros acionaveis",
  "filesystem-context|nucleo|offload grande, scratchpads, artefatos",
  "hosted-agents|sandboxes remotos, background agents",
  "evaluation|checks deterministicos, rubricas, regressao",
  "advanced-evaluation|LLM-as-judge, pairwise, bias mitigation",
  "harness-engineering|loops autonomos, logs, rollback, approval gates",
  "self-improvement-loops|RSI, meta-harness, scaffold evolution",
  "project-development|task-model fit, pipelines, custo operacional",
  "bdi-mental-states|beliefs, desires, intentions, RDF/BDI",
];

const STATUS_LINE =
  "Autorun ativo: grill-me + prompt-engineering + context-engineering (B, economia tokens).";

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  const routerNames = ROUTER.map((row) => row.split("|")[0]).join(", ");
  const routerCompact =
    "ROUTER 17 on-demand (" +
    routerNames +
    "). Ler " +
    SKILLS_ROOT +
    "/<skill>/SKILL.md so quando gatilho bater. Nucleo B: context-fundamentals, context-optimization, filesystem-context.";

  const context = [
    STATUS_LINE,
    "Autorun: grill-me + prompt-engineering + context-engineering (B). enhance-prompt so Stitch.",
    "grill-me: " + GRILL_ME_SKILL + " (planos ambiguos/grandes -> /grilling).",
    "prompt-engineering: " + PROMPT_ENGINEERING,
    "Skills root: " + SKILLS_ROOT,
    "Ops Cursor: " + REPOS + path.sep,
    routerCompact,
    "LEI: agente executa; nunca pedir passos mecanicos ao TheMasterBECK.",
  ].join("\n");

  process.stdout.write(
    JSON.stringify({
      additional_context: context,
      env: {
        CURSOR_PROMPT_SKILLS_AUTORUN: "1",
        CURSOR_GRILL_ME_AUTORUN: "1",
        CURSOR_CONTEXT_ENGINEERING_AUTORUN: "B",
        CURSOR_REPOS_CURSOR_LAW: "1",
        CURSOR_REPOS_CURSOR_ROOT: REPOS,
        INTELIGENCIA_ARTIFICIAL_ROOT: ROOT,
      },
    })
  );
});
