#!/usr/bin/env node
/**
 * Autorun + enforcement: ops Cursor → /Users/admin/Documents/INTELIGENCIA-ARTIFICIAL/Thiago-Beck/repos-cursor
 * sessionStart → additional_context | preToolUse Write/Shell → allow/deny
 */
const path = require("path");

const ROOT = "\Users\admin\Documents\INTELIGENCIA-ARTIFICIAL";
const REPOS = path.join(ROOT, "repos-cursor");
const ALLOW_ROOT = new Set([
  "AMPA-LIVRO",
  "CINEBECK-REEL",
  "DoPSite-RV",
  "DoPSite-RV_legacy",
  "Marketing-Digital",
  "PROD-VIDIGA",
  "BACKUP_CURSOR",
  "repos-cursor",
  ".cursor",
  ".vscode",
  "bin",
]);

const FORBIDDEN_PREFIXES = [
  "\Users\admin\\Desktop",
  "\Users\admin\\Downloads",
  "\Users\admin\\Documents\\GitHub",
  "\Users\admin\\AppData\\Local\\Temp",
];

const LAW_CONTEXT = [
  "LEI CRAVADA (autorun+alwaysApply): ops/sistema Cursor → \Users\admin\Documents\INTELIGENCIA-ARTIFICIAL\Thiago-Beck\repos-cursor\\",
  "Subagente: repos-cursor-guardian (proativo).",
  "Proibido: Desktop/Downloads/Temp/Documents\\GitHub e ops Agent soltos na raiz.",
  "Exceção TheMasterBECK na raiz: AMPA-LIVRO, CINEBECK-REEL, DoPSite-RV(+_legacy), Marketing-Digital, PROD-VIDIGA, BACKUP_CURSOR.",
  "Junções raiz .cursor/.vscode/bin → repos-cursor (não apagar).",
].join("\n");

function norm(p) {
  if (!p || typeof p !== "string") return "";
  try {
    return path.resolve(p.replace(/\//g, "\\"));
  } catch {
    return p.replace(/\//g, "\\");
  }
}

function under(parent, child) {
  const a = (norm(parent) + "\\").toLowerCase();
  const b = norm(child).toLowerCase();
  return b === a.slice(0, -1) || b.startsWith(a);
}

function isForbiddenLocation(target) {
  const t = norm(target);
  if (!t) return null;
  for (const bad of FORBIDDEN_PREFIXES) {
    if (under(bad, t)) return { reason: `destino proibido: ${bad}` };
  }
  if (under(ROOT, t) && !under(REPOS, t)) {
    const rel = path.relative(ROOT, t);
    const top = rel.split(/[/\\]/)[0];
    if (top && top !== ".." && !ALLOW_ROOT.has(top)) {
      return {
        reason: `ops Cursor devem ir em ${REPOS}\\ (recusado top-level '${top}')`,
      };
    }
  }
  return null;
}

function extractPaths(payload, tool) {
  const ti = payload.tool_input || payload.arguments || payload.input || {};
  const paths = [];
  if (ti && typeof ti === "object") {
    for (const k of ["path", "file_path", "target_directory", "working_directory"]) {
      if (typeof ti[k] === "string") paths.push(ti[k]);
    }
    if (typeof ti.command === "string") {
      const cmd = ti.command;
      if (/mkdir|git\s+clone|move\s+|robocopy|New-Item/i.test(cmd)) {
        const re =
          /\Users\admin\Documents\INTELIGENCIA-ARTIFICIAL\\[^\s"']+|\Users\admin\\(?:Desktop|Downloads|Documents\\GitHub|AppData\\Local\\Temp)\\[^\s"']+/gi;
        let m;
        while ((m = re.exec(cmd))) paths.push(m[0]);
      }
    }
  }
  return paths;
}

function allowSession() {
  return {
    additional_context: LAW_CONTEXT,
    env: {
      CURSOR_REPOS_CURSOR_LAW: "1",
      CURSOR_REPOS_CURSOR_ROOT: REPOS,
    },
  };
}

function deny(msg) {
  return {
    permission: "deny",
    user_message: msg,
    agent_message: msg + " Use \Users\admin\Documents\INTELIGENCIA-ARTIFICIAL\Thiago-Beck\repos-cursor\\",
  };
}

function handle(payload) {
  const tool = String(payload.tool_name || payload.toolName || "");
  // sessionStart / inject-only (sem tool)
  if (!tool) return allowSession();

  const paths = extractPaths(payload, tool);
  for (const p of paths) {
    const hit = isForbiddenLocation(p);
    if (hit) return deny(`LEI repos-cursor: ${hit.reason} | path=${norm(p)}`);
  }
  return { permission: "allow" };
}

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  let payload = {};
  try {
    payload = JSON.parse(input || "{}");
  } catch {
    payload = {};
  }
  try {
    process.stdout.write(JSON.stringify(handle(payload)));
  } catch (e) {
    process.stdout.write(
      JSON.stringify({
        permission: "allow",
        agent_message: "repos-cursor-guard fail-open: " + String(e),
      })
    );
  }
});
