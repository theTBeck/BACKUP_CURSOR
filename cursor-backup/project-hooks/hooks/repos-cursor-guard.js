#!/usr/bin/env node
/**
 * Autorun + enforcement: ops Cursor → repos-cursor (Windows + macOS)
 */
const path = require("path");
const os = require("os");

const ROOT =
  process.env.INTELIGENCIA_ARTIFICIAL_ROOT ||
  (process.platform === "darwin"
    ? path.join(os.homedir(), "Documents", "INTELIGENCIA-ARTIFICIAL")
    : "C:\\inteligencia-artificial");

function resolveReposCursor(root) {
  const macCanonical = path.join(root, "Thiago-Beck", "repos-cursor");
  try {
    if (require("fs").existsSync(macCanonical)) return macCanonical;
  } catch {
    /* fail-open */
  }
  return path.join(root, "Thiago-Beck", "repos-cursor");
}

const REPOS = resolveReposCursor(ROOT);

const ALLOW_ROOT = new Set([
  "AMPA-LIVRO",
  "CINEBECK-REEL",
  "DoPSite-RV",
  "DoPSite-RV_legacy",
  "Marketing-Digital",
  "PROD-VIDIGA",
  "BACKUP_CURSOR",
  "bravector",
  "Thiago-Beck",
  ".kilo",
  ".cursor",
  ".vscode",
  "bin",
  "amazing-digital-cinema",
]);

/** Metadados Git/repo na raiz (não são ops Cursor). */
const ALLOW_ROOT_FILES = new Set([
  ".gitignore",
  ".gitmodules",
  ".gitattributes",
  ".cursorignore",
  "AGENTS.md",
  "README.md",
]);

const FORBIDDEN_PREFIXES =
  process.platform === "darwin"
    ? [
        path.join(os.homedir(), "Desktop"),
        path.join(os.homedir(), "Downloads"),
        path.join(os.homedir(), "Documents", "GitHub"),
        path.join(os.homedir(), "Library", "Caches"),
      ]
    : [
        path.join(os.homedir(), "Desktop"),
        path.join(os.homedir(), "Downloads"),
        path.join(os.homedir(), "Documents", "GitHub"),
        path.join(os.homedir(), "AppData", "Local", "Temp"),
      ];

const LAW_CONTEXT = [
  `LEI CRAVADA (autorun+alwaysApply): ops/sistema Cursor → ${REPOS}${path.sep}`,
  "Subagente: repos-cursor-guardian (proativo).",
  "Proibido: Desktop/Downloads/Temp/Documents\\GitHub e ops Agent soltos na raiz.",
  "Exceção TheMasterBECK na raiz: AMPA-LIVRO, CINEBECK-REEL, DoPSite-RV(+_legacy), Marketing-Digital, PROD-VIDIGA, BACKUP_CURSOR, bravector.",
  "Junções raiz .cursor/.vscode/bin → repos-cursor (não apagar).",
].join("\n");

function norm(p) {
  if (!p || typeof p !== "string") return "";
  try {
    return path.resolve(p);
  } catch {
    return p;
  }
}

function under(parent, child) {
  const a = norm(parent);
  const b = norm(child);
  if (!a || !b) return false;
  const rel = path.relative(a, b);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

function isForbiddenLocation(target) {
  const t = norm(target);
  if (!t) return null;
  for (const bad of FORBIDDEN_PREFIXES) {
    if (under(bad, t)) return { reason: `destino proibido: ${bad}` };
  }
  if (under(ROOT, t) && !under(REPOS, t)) {
    const rel = path.relative(ROOT, t);
    const top = rel.split(path.sep)[0];
    if (rel && ALLOW_ROOT_FILES.has(rel)) return null;
    if (top && top !== ".." && !ALLOW_ROOT.has(top)) {
      return {
        reason: `ops Cursor devem ir em ${REPOS}${path.sep} (recusado top-level '${top}')`,
      };
    }
  }
  return null;
}

function expandUserPath(raw) {
  if (!raw || typeof raw !== "string") return raw;
  const t = raw.replace(/^['"]|['"]$/g, "");
  if (t === "~") return os.homedir();
  if (t.startsWith("~/") || (process.platform === "win32" && t.startsWith("~\\"))) {
    return path.join(os.homedir(), t.slice(2));
  }
  return t;
}

function splitShellArgs(argStr) {
  const args = [];
  let cur = "";
  let quote = null;
  for (let i = 0; i < argStr.length; i++) {
    const c = argStr[i];
    if (quote) {
      if (c === quote) quote = null;
      else cur += c;
      continue;
    }
    if (c === '"' || c === "'") {
      quote = c;
      continue;
    }
    if (/\s/.test(c)) {
      if (cur) {
        args.push(cur);
        cur = "";
      }
      continue;
    }
    cur += c;
  }
  if (quote) return null;
  if (cur) args.push(cur);
  return args;
}

function hasUncertainShellExpansion(raw) {
  if (!raw || typeof raw !== "string") return false;
  return (
    /[$`*?[\]]/.test(raw) ||
    /\{[^}]*,[^}]*\}/.test(raw) ||
    /%[^%]+%/.test(raw)
  );
}

function resolveShellPath(raw, cwd) {
  if (hasUncertainShellExpansion(raw)) return null;
  let expanded = expandUserPath(raw);
  if (!path.isAbsolute(expanded)) expanded = path.resolve(cwd, expanded);
  return expanded;
}

function parseMvCpPaths(rest) {
  const tokens = splitShellArgs(rest);
  if (!tokens) return { denyUncertain: true };
  let destFromT = null;
  const operands = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t === "-t" || t === "--target-directory") {
      if (i + 1 >= tokens.length) return { denyUncertain: true };
      destFromT = tokens[++i];
      continue;
    }
    const inlineTarget = t.match(/^(?:-t|--target-directory)=(.*)$/);
    if (inlineTarget) {
      if (!inlineTarget[1]) return { denyUncertain: true };
      destFromT = inlineTarget[1];
      continue;
    }
    if (t.startsWith("-")) continue;
    operands.push(t);
  }
  if (destFromT) {
    if (!operands.length) return { denyUncertain: true };
    return { sources: operands, dest: destFromT, denyUncertain: false };
  }
  if (operands.length < 2) return { denyUncertain: true };
  return {
    sources: operands.slice(0, -1),
    dest: operands[operands.length - 1],
    denyUncertain: false,
  };
}

/** Destinos mutáveis em comandos shell (mkdir/mv/cp/clone/redirecionamento). */
function extractPathsFromShellCommand(cmd, initialCwd = process.cwd()) {
  const paths = [];
  let denyUncertain = false;
  if (!cmd || typeof cmd !== "string") return { paths, denyUncertain };

  let cwd = initialCwd;
  const segments = cmd.split(/(?:&&|\|\||;)/).map((s) => s.trim()).filter(Boolean);
  for (const seg of segments) {
    const pushResolved = (p) => {
      if (!p) return;
      const resolved = resolveShellPath(p, cwd);
      if (resolved === null) denyUncertain = true;
      else paths.push(resolved);
    };

    const cdOnly = seg.match(/^\s*cd\s+(.+)$/i);
    if (cdOnly) {
      const args = splitShellArgs(cdOnly[1].trim());
      if (!args || args.length !== 1) {
        denyUncertain = true;
        continue;
      }
      const nextCwd = resolveShellPath(args[0], cwd);
      if (nextCwd === null) {
        denyUncertain = true;
        continue;
      }
      cwd = nextCwd;
      paths.push(cwd);
      continue;
    }

    if (/^\s*mkdir\b/i.test(seg)) {
      const rest = seg.replace(/^\s*mkdir(?:\s+-[^\s]+)*/i, "").trim();
      const args = splitShellArgs(rest);
      if (!args || !args.length) {
        denyUncertain = true;
        continue;
      }
      args.forEach(pushResolved);
      continue;
    }

    if (/^\s*(mv|cp)\b/i.test(seg)) {
      const rest = seg.replace(/^\s*(?:mv|cp)\s+/i, "").trim();
      const parsed = parseMvCpPaths(rest);
      if (parsed.denyUncertain) {
        denyUncertain = true;
        continue;
      }
      parsed.sources.forEach(pushResolved);
      pushResolved(parsed.dest);
      continue;
    }

    const cloneMatch = seg.match(/^\s*git\s+clone(?:\s+[^\s]+)*\s+(.+)$/i);
    if (cloneMatch) {
      const args = splitShellArgs(cloneMatch[1].trim());
      if (!args || !args.length) {
        denyUncertain = true;
        continue;
      }
      if (args.length === 1) {
        const repo = args[0];
        if (/^(https?:|git@|ssh:)/.test(repo) || repo.endsWith(".git")) {
          const base = repo
            .replace(/\/$/, "")
            .split("/")
            .pop()
            .replace(/\.git$/, "");
          if (base) pushResolved(base);
          else denyUncertain = true;
        } else {
          pushResolved(repo);
        }
        continue;
      }
      pushResolved(args[args.length - 1]);
      continue;
    }

    const teeMatch = seg.match(/\|\s*tee\b\s*(.*)$/i);
    if (teeMatch) {
      const rest = teeMatch[1].trim();
      if (!rest) {
        denyUncertain = true;
        continue;
      }
      const args = splitShellArgs(rest);
      if (!args) {
        denyUncertain = true;
        continue;
      }
      for (const tok of args) {
        if (tok.startsWith("-")) continue;
        pushResolved(tok);
      }
      continue;
    }

    const redirMatches = [
      ...seg.matchAll(/(?:^|\s)(?:(?:\d{1,2}|&)?>{1,3})\s*([^\s&|;<>]+)/gi),
    ];
    if (redirMatches.length) {
      for (const m of redirMatches) {
        const args = splitShellArgs(m[1].trim());
        if (!args || args.length !== 1) {
          denyUncertain = true;
          continue;
        }
        pushResolved(args[0]);
      }
      continue;
    }

    if (
      /\b(mkdir|mv|cp|git\s+clone)\b/i.test(seg) ||
      /\b(New-Item|Copy-Item|Move-Item|Set-Content|Out-File)\b/i.test(seg)
    ) {
      denyUncertain = true;
    }
  }
  return { paths, denyUncertain };
}

function extractPaths(payload) {
  const ti = payload.tool_input || payload.arguments || payload.input || {};
  const paths = [];
  let denyUncertain = false;
  if (ti && typeof ti === "object") {
    for (const k of ["path", "file_path", "target_directory", "working_directory"]) {
      if (typeof ti[k] === "string") paths.push(ti[k]);
    }
    if (typeof ti.command === "string") {
      let shellCwd = process.cwd();
      if (typeof ti.working_directory === "string") {
        const wd = resolveShellPath(ti.working_directory, process.cwd());
        if (wd === null) denyUncertain = true;
        else shellCwd = wd;
      }
      const shell = extractPathsFromShellCommand(ti.command, shellCwd);
      paths.push(...shell.paths);
      if (shell.denyUncertain) denyUncertain = true;
    }
  }
  return { paths, denyUncertain };
}

function allowSession() {
  return {
    additional_context: LAW_CONTEXT,
    env: {
      CURSOR_REPOS_CURSOR_LAW: "1",
      CURSOR_REPOS_CURSOR_ROOT: REPOS,
      INTELIGENCIA_ARTIFICIAL_ROOT: ROOT,
    },
  };
}

function deny(msg) {
  return {
    permission: "deny",
    user_message: msg,
    agent_message: `${msg} Use ${REPOS}${path.sep}`,
  };
}

function handle(payload) {
  const tool = String(payload.tool_name || payload.toolName || "");
  if (!tool) return allowSession();

  const { paths, denyUncertain } = extractPaths(payload);
  if (denyUncertain) {
    return deny(
      "LEI repos-cursor: comando shell com destino mutável não verificável — negado (extraia path explícito ou use tool de arquivo)."
    );
  }
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
