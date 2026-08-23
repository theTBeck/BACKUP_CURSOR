#!/usr/bin/env node
/**
 * sessionStart autorun — injeta prompt-engineering + enhance-prompt em todo chat.
 * Le JSON de stdin (ignorado) e emite additional_context.
 */
let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  const context = [
    "AUTORUN OBRIGATORIO (TheMasterBECK): prompt-engineering + enhance-prompt ATIVOS.",
    "Antes de responder: aplicar Role/Context+Task+Constraints+Output Format (prompt-engineering).",
    "Em UI/Stitch/landing: aplicar enhance-prompt (DESIGN SYSTEM + Page Structure + keywords UI).",
    "Skills: ~/.claude/skills/prompt-engineering/SKILL.md e ~/.claude/skills/stitch/enhance-prompt/SKILL.md",
    "Command: /prompt-skills-autorun | Rule: prompt-skills-autorun.mdc",
    "Nao pedir ao usuario para acionar esses skills — ja estao em autorun.",
  ].join("\n");

  process.stdout.write(
    JSON.stringify({
      additional_context: context,
      env: {
        CURSOR_PROMPT_SKILLS_AUTORUN: "1",
      },
    })
  );
});
