/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { preparePreview, previewTargets } from './desktop-preview.mjs';

function fixture(t, version = '0.1.0') {
  const root = mkdtempSync(join(tmpdir(), 'flowgram-preview-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const input = join(root, 'input');
  const output = join(root, 'output');
  for (const target of Object.keys(previewTargets)) {
    const directory = join(input, `FlowGram-${target}`);
    mkdirSync(directory, { recursive: true });
    const installer = `FlowGram_${version}_${target}${target.includes('windows') ? '-setup.exe' : '.dmg'}`;
    const content = Buffer.from(`verified installer: ${target}`);
    const sha256 = createHash('sha256').update(content).digest('hex');
    writeFileSync(join(directory, installer), content);
    writeFileSync(join(directory, 'SHA256SUMS.txt'), `${sha256}  ${installer}\n`);
    writeFileSync(join(directory, 'build-info.json'), JSON.stringify({
      target, installer, sha256, bytes: content.length,
      commit: 'source-commit', version, run: 123, signed: false,
    }));
  }
  return { input, output, commit: 'source-commit' };
}

test('prepares three stable filenames, checksums and provenance from one build', (t) => {
  const options = fixture(t);
  const metadata = preparePreview(options);
  assert.equal(metadata.builds.length, 3);
  for (const build of metadata.builds) {
    assert.ok(!build.name.includes('0.1.0'));
    const content = readFileSync(join(options.output, build.name));
    assert.equal(createHash('sha256').update(content).digest('hex'), build.sha256);
    assert.ok(readFileSync(join(options.output, 'SHA256SUMS.txt'), 'utf8').includes(build.sha256));
  }
});

test('a new version keeps every public download filename unchanged', (t) => {
  const first = preparePreview(fixture(t, '0.1.0'));
  const next = preparePreview(fixture(t, '0.2.0'));
  assert.notEqual(first.version, next.version);
  assert.deepEqual(first.builds.map(({ name }) => name), next.builds.map(({ name }) => name));
});

test('rejects mixed commits before producing releasable files', (t) => {
  const options = fixture(t);
  const path = join(options.input, 'FlowGram-x86_64-apple-darwin', 'build-info.json');
  const info = JSON.parse(readFileSync(path, 'utf8'));
  writeFileSync(path, JSON.stringify({ ...info, commit: 'older-commit' }));
  assert.throws(() => preparePreview(options), /expected source commit/);
  assert.equal(existsSync(options.output), false);
});

test('rejects tampered installers before producing releasable files', (t) => {
  const options = fixture(t);
  const directory = join(options.input, 'FlowGram-x86_64-pc-windows-msvc');
  const info = JSON.parse(readFileSync(join(directory, 'build-info.json'), 'utf8'));
  const content = readFileSync(join(directory, info.installer));
  content[0] ^= 1;
  writeFileSync(join(directory, info.installer), content);
  assert.throws(() => preparePreview(options), /checksum mismatch/);
  assert.equal(existsSync(options.output), false);
});
