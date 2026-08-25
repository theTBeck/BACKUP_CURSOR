#!/usr/bin/env node
/**
 * sessionStart autorun — prompt-engineering + context-engineering (modo B, economia tokens).
 * enhance-prompt NAO entra aqui (somente pipelines Stitch).
 */
const SKILLS_ROOT =
  "C:\\inteligencia-artificial\\.cursor\\skills";

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

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  const routerLines = ROUTER.map((row) => {
    const [name, trigger] = row.split("|nucleo|").length > 1
      ? [row.split("|nucleo|")[0], "nucleo+" + row.split("|nucleo|")[1]]
      : row.split("|");
    return `- ${name}: ${trigger} -> ${SKILLS_ROOT}\\${name}\\SKILL.md`;
  });

  const context = [
    "AUTORUN OBRIGATORIO (TheMasterBECK): prompt-engineering + context-engineering (B, economia tokens) + /prompt-skills-autorun ATIVOS.",
    "Status (1 linha no inicio de cada resposta): Autorun ativo: prompt-engineering + context-engineering (B, economia tokens).",
    "",
    "PROMPT-ENGINEERING:",
    "- Skill: ~/.claude/skills/prompt-engineering/SKILL.md",
    "- Aplicar Role/Context+Task+Constraints+Output Format antes de responder.",
    "- enhance-prompt: FORA do autorun — SOMENTE Stitch (/stitch-diario).",
    "",
    "CONTEXT-ENGINEERING (modo B — nucleo sintetizado + router 17 + on-demand):",
    "Skills root: " + SKILLS_ROOT,
    "Sync upstream: C:\\inteligencia-artificial\\bin\\sync-context-engineering-skills.cmd",
    "",
    "SINTESE NUCLEO (sempre ativa — nao ler SKILL.md completo salvo tarefa profunda):",
    "[context-fundamentals] Contexto = system + tools + docs + historico + outputs. Qualidade > quantidade.",
    "  Menor conjunto de tokens de alto sinal. Atencao U-shaped; risco lost-in-middle em contexto longo.",
    "[context-optimization] Prefix estavel primeiro; conteudo dinamico por ultimo (KV-cache).",
    "  Masking: substituir tool outputs verbosos por refs compactas apos uso. Compaction se >70% janela.",
    "  Respostas concisas por padrao; nao repetir contexto ja dito; buscar no codigo antes de perguntar.",
    "  Ler SKILL.md completo das 3 nucleo se sessao longa, pressao de tokens ou arquitetura de contexto.",
    "[filesystem-context] Outputs grandes ops Cursor -> C:\\inteligencia-artificial\\repos-cursor\\<projeto>\\; projetos TheMasterBECK na raiz permitida; citar path absoluto.",
    "  Scratchpads/artefatos para contexto duravel; nao despejar dumps longos no chat.",
    "",
    "LEI CRAVADA REPOS-CURSOR (alwaysApply+autorun): TODOS repos/arquivos operacionais do sistema Cursor DEVEM ficar em C:\\inteligencia-artificial\\repos-cursor\\",
    "  Hook: repos-cursor-guard.js | Subagente: repos-cursor-guardian | Rules: cursor-ops-repos-cursor.mdc + repos-cursor-obrigatorio.mdc",
    "  Proibido: Desktop/Downloads/Temp/Documents\\GitHub e ops Agent soltos na raiz.",
    "",
    "ROUTER (ler SKILL.md completo SOMENTE quando gatilho bater):",
    ...routerLines,
    "",
    "LEI EXECUCAO (SEMPRE+OBRIGATORIO): NUNCA pedir TheMasterBECK acoes mecanicas.",
    "O agente EXECUTA com tools; falha=diagnosticar+corrigir+rerun; encerrar com o que JA FOI FEITO.",
    "Rules: agent-executes-all.mdc | autorun-executa-tudo.mdc | context-engineering-autorun.mdc | cursor-ops-repos-cursor.mdc",
  ].join("\n");

  process.stdout.write(
    JSON.stringify({
      additional_context: context,
      env: {
        CURSOR_PROMPT_SKILLS_AUTORUN: "1",
        CURSOR_CONTEXT_ENGINEERING_AUTORUN: "B",
        CURSOR_REPOS_CURSOR_LAW: "1",
        CURSOR_REPOS_CURSOR_ROOT: "C:\\inteligencia-artificial\\repos-cursor",
      },
    })
  );
});
