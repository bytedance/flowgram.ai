/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { afterEach, test } = require("node:test");
const {
  addLicenseHeader,
  buildLicensedText,
  processFile,
} = require("../license-header");

const licenseContent = ` Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 SPDX-License-Identifier: MIT`;
const licensedText = buildLicensedText(licenseContent, {
  commentPrefix: "/**",
  commentLinePrefix: " *",
  commentSuffix: " */",
});

let temporaryDirectory;

afterEach(() => {
  if (temporaryDirectory) {
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
    temporaryDirectory = undefined;
  }
});

function createFile(content) {
  temporaryDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), "flowgram-license-header-")
  );
  const filePath = path.join(temporaryDirectory, "sample.js");
  fs.writeFileSync(filePath, content, "utf8");
  return filePath;
}

test("leaves an existing LF license header unchanged", () => {
  const content = `${licensedText}console.log("ready");\n`;
  const filePath = createFile(content);

  const changed = processFile(filePath, licensedText, { includeExts: [".js"] });

  assert.equal(changed, false);
  assert.equal(fs.readFileSync(filePath, "utf8"), content);
});

test("leaves an existing CRLF license header unchanged", () => {
  const content = `${licensedText.replace(
    /\n/g,
    "\r\n"
  )}console.log("ready");\r\n`;
  const filePath = createFile(content);

  const changed = processFile(filePath, licensedText, { includeExts: [".js"] });

  assert.equal(changed, false);
  assert.equal(fs.readFileSync(filePath, "utf8"), content);
});

test("does not rewrite a CRLF file during directory traversal", () => {
  temporaryDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), "flowgram-license-header-")
  );
  fs.writeFileSync(path.join(temporaryDirectory, ".gitignore"), "", "utf8");
  const filePath = path.join(temporaryDirectory, "sample.js");
  const content = `${licensedText.replace(
    /\n/g,
    "\r\n"
  )}console.log("ready");\r\n`;
  fs.writeFileSync(filePath, content, "utf8");

  addLicenseHeader(temporaryDirectory, licenseContent, {
    includeExts: [".js"],
    commentPrefix: "/**",
    commentLinePrefix: " *",
    commentSuffix: " */",
  });

  assert.equal(fs.readFileSync(filePath, "utf8"), content);
});

test("recognizes a CRLF license header after a shebang", () => {
  const shebang = "#!/usr/local/bin/node\r\n";
  const content = `${shebang}${licensedText.replace(
    /\n/g,
    "\r\n"
  )}console.log("ready");\r\n`;
  const filePath = createFile(content);

  const changed = processFile(filePath, licensedText, { includeExts: [".js"] });

  assert.equal(changed, false);
  assert.equal(fs.readFileSync(filePath, "utf8"), content);
});

test("adds a license header to a file without one", () => {
  const source = 'console.log("ready");\n';
  const filePath = createFile(source);

  const changed = processFile(filePath, licensedText, { includeExts: [".js"] });

  assert.equal(changed, true);
  assert.equal(fs.readFileSync(filePath, "utf8"), `${licensedText}${source}`);
});

test("uses CRLF when adding a license header to a CRLF file", () => {
  const source = 'console.log("ready");\r\n';
  const crlfLicensedText = licensedText.replace(/\n/g, "\r\n");
  const filePath = createFile(source);

  const changed = processFile(filePath, licensedText, { includeExts: [".js"] });

  assert.equal(changed, true);
  assert.equal(
    fs.readFileSync(filePath, "utf8"),
    `${crlfLicensedText}${source}`
  );
});

test("adds a license header after a shebang", () => {
  const shebang = "#!/usr/local/bin/node\r\n";
  const source = 'console.log("ready");\r\n';
  const filePath = createFile(`${shebang}${source}`);

  const changed = processFile(filePath, licensedText, { includeExts: [".js"] });

  assert.equal(changed, true);
  const crlfLicensedText = licensedText.replace(/\n/g, "\r\n");
  assert.equal(
    fs.readFileSync(filePath, "utf8"),
    `${shebang}${crlfLicensedText}${source}`
  );
});
