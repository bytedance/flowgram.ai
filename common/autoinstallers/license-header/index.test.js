/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { afterEach, test } = require("node:test");

const canonicalHeader = `/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */`;
const temporaryDirectories = [];

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

function createFixtureRepository(files) {
  const root = fs.mkdtempSync(
    path.join(os.tmpdir(), "flowgram-license-header-")
  );
  temporaryDirectories.push(root);

  const scriptDirectory = path.join(
    root,
    "common",
    "autoinstallers",
    "license-header"
  );
  fs.mkdirSync(scriptDirectory, { recursive: true });
  fs.copyFileSync(
    __filename.replace(/\.test\.js$/, ".js"),
    path.join(scriptDirectory, "index.js")
  );
  fs.writeFileSync(path.join(root, ".gitignore"), "node_modules\n");

  for (const [relativePath, content] of Object.entries(files)) {
    const filePath = path.join(root, relativePath);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);
  }

  return { root, scriptDirectory };
}

function runLicenseHeaderScript(scriptDirectory) {
  const nodeModulesDirectory = path.dirname(
    path.dirname(require.resolve("ignore/package.json"))
  );

  return execFileSync(process.execPath, ["index.js"], {
    cwd: scriptDirectory,
    encoding: "utf8",
    env: {
      ...process.env,
      NODE_PATH: nodeModulesDirectory,
    },
  });
}

test("leaves canonical LF and CRLF headers byte-identical", () => {
  const lfContent = `${canonicalHeader}\n\nconst lf = true;\n`;
  const crlfContent = lfContent.replace(/\n/g, "\r\n");
  const { root, scriptDirectory } = createFixtureRepository({
    "fixtures/lf.ts": lfContent,
    "fixtures/crlf.ts": crlfContent,
  });

  runLicenseHeaderScript(scriptDirectory);

  assert.equal(
    fs.readFileSync(path.join(root, "fixtures/lf.ts"), "utf8"),
    lfContent
  );
  assert.equal(
    fs.readFileSync(path.join(root, "fixtures/crlf.ts"), "utf8"),
    crlfContent
  );
});

test("adds one canonical header to an unlicensed file and stays idempotent", () => {
  const source = "const value = 1;\n";
  const { root, scriptDirectory } = createFixtureRepository({
    "fixtures/missing.ts": source,
  });

  runLicenseHeaderScript(scriptDirectory);
  const firstRun = fs.readFileSync(
    path.join(root, "fixtures/missing.ts"),
    "utf8"
  );
  runLicenseHeaderScript(scriptDirectory);
  const secondRun = fs.readFileSync(
    path.join(root, "fixtures/missing.ts"),
    "utf8"
  );

  assert.equal(firstRun, `${canonicalHeader}\n\n${source}`);
  assert.equal(secondRun, firstRun);
});

test("leaves a recognized shebang byte-identical", () => {
  const source = '#!/usr/bin/env node\r\nconsole.log("ok");\r\n';
  const { root, scriptDirectory } = createFixtureRepository({
    "fixtures/command.js": source,
  });

  runLicenseHeaderScript(scriptDirectory);
  runLicenseHeaderScript(scriptDirectory);

  const result = fs.readFileSync(
    path.join(root, "fixtures/command.js"),
    "utf8"
  );
  assert.equal(result, source);
});
