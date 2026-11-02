/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  existsSync,
  readdirSync,
  realpathSync,
  rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('../src/public/desktop/install.sh', import.meta.url));
const macOnly = {
  skip: process.platform !== 'darwin' && 'Requires macOS PlistBuddy',
};
const plist = (id) =>
  `<?xml version="1.0"?><plist version="1.0"><dict><key>CFBundleIdentifier</key><string>${id}</string></dict></plist>`;

function fixture(t, options = {}) {
  const root = mkdtempSync(path.join(tmpdir(), 'flowgram-installer-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const bin = path.join(root, 'bin');
  const release = path.join(root, 'release');
  const bundle = path.join(root, 'bundle');
  const install = path.join(root, 'Applications with spaces');
  for (const dir of [bin, release, install, path.join(bundle, 'Contents')])
    mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(bundle, 'Contents/Info.plist'), plist('ai.flowgram.desktop'));
  writeFileSync(path.join(bundle, 'new-version'), 'new');
  const sums = [];
  for (const arch of ['aarch64', 'x86_64']) {
    const name = `FlowGram_${arch}-apple-darwin.dmg`;
    const payload = `installer for ${arch}`;
    writeFileSync(path.join(release, name), payload);
    sums.push(`${createHash('sha256').update(payload).digest('hex')}  ${name}`);
  }
  writeFileSync(path.join(release, 'SHA256SUMS.txt'), sums.join('\n') + '\n');
  const mocks = {
    uname: 'if [ "$1" = -s ]; then echo "${TEST_OS:-Darwin}"; else echo "${TEST_ARCH:-arm64}"; fi',
    sysctl: 'echo "${TEST_ROSETTA:-0}"',
    pgrep: '[ "${TEST_RUNNING:-0}" = 1 ]',
    curl: `url=''; out=''
while [ "$#" -gt 0 ]; do
  case "$1" in -o) shift; out=$1 ;; https://*) url=$1 ;; esac
  shift
done
[ "\${TEST_DOWNLOAD_FAIL:-0}" != 1 ] || exit 22
printf '%s\\n' "$url" >> "$TEST_ROOT/downloads"
cp "$TEST_RELEASE/\${url##*/}" "$out"`,
    hdiutil: `if [ "$1" = attach ]; then
  while [ "$1" != -mountpoint ]; do shift; done
  shift
  cp -R "$TEST_BUNDLE" "$1/FlowGram.app"
  touch "$TEST_ROOT/mounted"
else
  rm -f "$TEST_ROOT/mounted"
fi`,
    ditto: 'cp -R "$1" "$2"',
    xattr: `printf '%s\\n' "$*" > "$TEST_ROOT/xattr"
[ "\${TEST_XATTR_FAIL:-0}" != 1 ]`,
    mv: `if [ "\${TEST_MOVE_FAIL:-0}" = 1 ] && [ "\${1##*/}" = FlowGram.app ]; then exit 1; fi
exec /bin/mv "$@"`,
    open: 'printf "%s" "$1" > "$TEST_ROOT/opened"',
  };
  for (const [name, content] of Object.entries(mocks))
    writeFileSync(path.join(bin, name), `#!/bin/sh\nset -eu\n${content}\n`, {
      mode: 0o755,
    });
  const destination = path.join(install, 'FlowGram.app');
  if (options.existing) {
    mkdirSync(path.join(destination, 'Contents'), { recursive: true });
    writeFileSync(path.join(destination, 'Contents/Info.plist'), plist(options.existing));
    writeFileSync(path.join(destination, 'old-version'), 'old');
  }
  return {
    root,
    release,
    destination,
    install,
    run(extraEnv = {}) {
      return spawnSync('/bin/sh', [script], {
        encoding: 'utf8',
        env: {
          ...process.env,
          PATH: `${bin}:/usr/bin:/bin:/usr/sbin:/sbin`,
          TEST_ROOT: root,
          TEST_RELEASE: release,
          TEST_BUNDLE: bundle,
          FLOWGRAM_INSTALL_DIR: install,
          FLOWGRAM_NO_LAUNCH: '1',
          ...extraEnv,
        },
      });
    },
    assertClean() {
      assert.equal(existsSync(path.join(root, 'mounted')), false);
      assert.deepEqual(
        readdirSync(install).filter((name) => name.startsWith('.flowgram-install.')),
        [],
      );
    },
  };
}

for (const [name, env, arch] of [
  ['Apple Silicon', {}, 'aarch64'],
  ['Intel', { TEST_ARCH: 'x86_64' }, 'x86_64'],
  ['Rosetta', { TEST_ARCH: 'x86_64', TEST_ROSETTA: '1' }, 'aarch64'],
]) {
  test(`installs the correct build on ${name}, with spaces in the destination`, macOnly, (t) => {
    const f = fixture(t);
    const result = f.run(env);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(readFileSync(path.join(f.destination, 'new-version'), 'utf8'), 'new');
    assert.match(
      readFileSync(path.join(f.root, 'downloads'), 'utf8'),
      new RegExp(`FlowGram_${arch}-apple-darwin.dmg`),
    );
    assert.match(
      readFileSync(path.join(f.root, 'xattr'), 'utf8'),
      /^-dr com.apple.quarantine .*\/FlowGram.app/,
    );
    assert.equal(existsSync(path.join(f.root, 'opened')), false);
    f.assertClean();
  });
}

test('replaces only the existing FlowGram bundle and launches after success', macOnly, (t) => {
  const f = fixture(t, { existing: 'ai.flowgram.desktop' });
  const result = f.run({ FLOWGRAM_NO_LAUNCH: '0' });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(existsSync(path.join(f.destination, 'old-version')), false);
  assert.equal(readFileSync(path.join(f.root, 'opened'), 'utf8'), realpathSync(f.destination));
  f.assertClean();
});

for (const [name, env] of [
  ['failed download', { TEST_DOWNLOAD_FAIL: '1' }],
  ['quarantine removal failure', { TEST_XATTR_FAIL: '1' }],
  ['failed final move', { TEST_MOVE_FAIL: '1' }],
  ['running app', { TEST_RUNNING: '1' }],
]) {
  test(`preserves the existing app on ${name}`, macOnly, (t) => {
    const f = fixture(t, { existing: 'ai.flowgram.desktop' });
    const result = f.run(env);
    assert.notEqual(result.status, 0);
    assert.equal(readFileSync(path.join(f.destination, 'old-version'), 'utf8'), 'old');
    assert.equal(existsSync(path.join(f.root, 'opened')), false);
    f.assertClean();
  });
}

test('rejects a modified installer before mounting or replacing the existing app', macOnly, (t) => {
  const f = fixture(t, { existing: 'ai.flowgram.desktop' });
  writeFileSync(path.join(f.release, 'FlowGram_aarch64-apple-darwin.dmg'), 'tampered');
  const result = f.run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Checksum verification failed/);
  assert.equal(readFileSync(path.join(f.destination, 'old-version'), 'utf8'), 'old');
  assert.equal(existsSync(path.join(f.root, 'xattr')), false);
  f.assertClean();
});

test('refuses to overwrite a different app', macOnly, (t) => {
  const f = fixture(t, { existing: 'another.application' });
  const result = f.run();
  assert.notEqual(result.status, 0);
  assert.equal(readFileSync(path.join(f.destination, 'old-version'), 'utf8'), 'old');
  assert.equal(existsSync(path.join(f.root, 'downloads')), false);
});

test('rejects non-macOS systems before downloading', macOnly, (t) => {
  const f = fixture(t);
  const result = f.run({ TEST_OS: 'Linux' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /requires macOS/);
  assert.equal(existsSync(path.join(f.root, 'downloads')), false);
});

test('refuses a concurrent installation without removing its lock', macOnly, (t) => {
  const f = fixture(t);
  const lock = path.join(f.install, '.flowgram-install.lock');
  mkdirSync(lock);
  const result = f.run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Another installation is in progress/);
  assert.equal(existsSync(lock), true);
  assert.equal(existsSync(path.join(f.root, 'downloads')), false);
});
