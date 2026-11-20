/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

export const previewTargets = {
  'aarch64-apple-darwin': 'FlowGram_aarch64-apple-darwin.dmg',
  'x86_64-apple-darwin': 'FlowGram_x86_64-apple-darwin.dmg',
  'x86_64-pc-windows-msvc': 'FlowGram_x86_64-pc-windows-msvc-setup.exe',
};

export function preparePreview({ input, output, commit }) {
  assert.ok(input && output && commit, 'Input, output and source commit are required');
  const builds = Object.entries(previewTargets).map(([target, name]) => {
    const directory = join(input, `FlowGram-${target}`);
    const info = JSON.parse(readFileSync(join(directory, 'build-info.json'), 'utf8'));
    assert.equal(info.target, target, 'Artifact target does not match its directory');
    assert.equal(info.commit, commit, 'All installers must come from the expected source commit');
    assert.equal(info.installer, info.installer.split(/[\\/]/).pop(), 'Invalid installer filename');
    const source = join(directory, info.installer);
    const content = readFileSync(source);
    const sha256 = createHash('sha256').update(content).digest('hex');
    assert.ok(content.length > 0, 'Installer is empty');
    assert.equal(info.bytes, content.length, 'Installer size mismatch');
    assert.equal(info.sha256, sha256, 'Installer checksum mismatch');
    assert.equal(readFileSync(join(directory, 'SHA256SUMS.txt'), 'utf8').trim(),
      `${sha256}  ${info.installer}`, 'Artifact checksum record mismatch');
    return { source, info, target, name, sha256, bytes: content.length };
  });
  assert.equal(new Set(builds.map(({ info }) => info.version)).size, 1,
    'All installers must have the same version');
  // Validate every platform before writing any releasable output.
  mkdirSync(output, { recursive: true });
  for (const build of builds) copyFileSync(build.source, join(output, build.name));
  writeFileSync(join(output, 'SHA256SUMS.txt'),
    `${builds.map(({ sha256, name }) => `${sha256}  ${name}`).join('\n')}\n`);
  const metadata = {
    version: builds[0].info.version,
    commit,
    builds: builds.map(({ source, info, ...build }) => ({ ...build, run: info.run, signed: info.signed })),
  };
  writeFileSync(join(output, 'build-info.json'), `${JSON.stringify(metadata, null, 2)}\n`);
  return metadata;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const metadata = preparePreview({
    input: process.env.DESKTOP_PREVIEW_INPUT,
    output: process.env.DESKTOP_PREVIEW_OUTPUT,
    commit: process.env.DESKTOP_SOURCE_SHA || process.env.GITHUB_SHA,
  });
  console.log(`Prepared ${metadata.builds.length} preview installers from ${metadata.commit}`);
}
