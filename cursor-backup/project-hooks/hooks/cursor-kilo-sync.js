#!/usr/bin/env node
/** sessionStart: sync silencioso Cursor <-> Kilo */
const { spawnSync } = require("child_process");
const path = require("path");
const wp = require(path.join(__dirname, "..", "..", "sync-cursor-kilo", "workspace-paths.js"));

const syncJs = wp.getSyncCursorKiloScript();

try {
  spawnSync(process.execPath, [syncJs], {
    stdio: "ignore",
    windowsHide: true,
    timeout: 30000,
  });
} catch {
  /* silent */
}

process.stdout.write(JSON.stringify({ continue: true }) + "\n");
