/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { appendFileSync, copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const target = process.env.DESKTOP_TARGET;
const extensions = {
  'aarch64-apple-darwin': '.dmg',
  'x86_64-apple-darwin': '.dmg',
  'x86_64-pc-windows-msvc': '.exe',
};
assert.ok(Object.hasOwn(extensions, target), 'Unsupported desktop target');
assert.ok(process.env.DESKTOP_ARTIFACT_DIR, 'Set DESKTOP_ARTIFACT_DIR');
const { version } = JSON.parse(readFileSync('apps/desktop/src-tauri/tauri.conf.json', 'utf8'));
const extension = extensions[target];
const directory = join('target/release/bundle', extension === '.dmg' ? 'dmg' : 'nsis');
const installers = readdirSync(directory).filter((name) => name.endsWith(extension));
assert.equal(installers.length, 1, 'Expected exactly one installer for the native target');
const output = resolve(process.env.DESKTOP_ARTIFACT_DIR);
mkdirSync(output, { recursive: true });
const name = `FlowGram_${version}_${target}${extension === '.exe' ? '-setup' : ''}${extension}`;
const source = join(directory, installers[0]);
const content = readFileSync(source);
assert.ok(content.length > 0, 'Installer is empty');
copyFileSync(source, join(output, name));
const sha256 = createHash('sha256').update(content).digest('hex');
writeFileSync(join(output, 'SHA256SUMS.txt'), `${sha256}  ${name}\n`);
writeFileSync(join(output, 'build-info.json'), `${JSON.stringify({
  version,
  target,
  commit: process.env.GITHUB_SHA || null,
  run: process.env.GITHUB_RUN_ID || null,
  signed: false,
  installer: name,
  bytes: content.length,
  sha256,
}, null, 2)}\n`);
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY,
    `### FlowGram ${version} · ${target}\n\nInstaller: \`${name}\`\n\nSHA-256: \`${sha256}\`\n\nUnsigned build; retained for 14 days.\n`);
}
console.log(`Collected ${name} (${content.length} bytes)`);
