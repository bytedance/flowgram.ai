/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const releaseRef = 'df4efb9ef2cb25c417ecb57986da462d11b244ed';
const sourceRef = '28090bc15bce1862ade366a41d5d44bd34e6b525';
const sourcePrefix = 'packages/quickjs-emscripten-core/src/';
const originalHashes = {
  "index.js": "cf8cdd9674a0cf4037d3788dc759cf7820bd7e67c699e9ea54a5a61f10b23a13",
  "index.mjs": "5f7a507ca71ffbff0ec0bad88a9c38f717d34fd8ab9222b58deacc9de5644a3e",
  "index.js.map": "e52e0537b0b2e73be8cbe10c633bd789b54db94ed29f42ee0d5f01dac9de69cd",
  "index.mjs.map": "02c1ee428cd14e9e24902343e16101010e8def6bbb90e64fa93a4d880eed41e5"
};
const [sdkCheckout, originalPackage] = process.argv.slice(2);
if (!sdkCheckout || !originalPackage) {
  throw new Error('Usage: node scripts/generate-quickjs-patch.mjs <SDK checkout> <unpatched quickjs-emscripten-core 0.32.0 directory>');
}
const require = createRequire(import.meta.url);
const fromTsup = createRequire(require.resolve('tsup'));
const esbuild = fromTsup('esbuild');
if (esbuild.version !== '0.25.9') throw new Error('Regeneration requires the locked esbuild 0.25.9');
const temporary = await mkdtemp(path.join(tmpdir(), 'quickjs-patch-'));
const git = (args) => execFileSync('git', args, { cwd: sdkCheckout, encoding: 'utf8' });
const changed = git(['diff', '--name-only', releaseRef, sourceRef]).trim().split('\n');
const expectedChanges = ['context.ts', 'memory.ts', 'runtime.ts'].map((name) => sourcePrefix + name);
if (JSON.stringify(changed) !== JSON.stringify(expectedChanges)) {
  throw new Error('Upstream correction differs from the expected three-file release patch');
}
const paths = git(['ls-tree', '-r', '--name-only', sourceRef, '--', sourcePrefix]).trim().split('\n');
for (const entry of paths) {
  const destination = path.join(temporary, 'src', entry.slice(sourcePrefix.length));
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, git(['show', `${sourceRef}:${entry}`]));
}
for (const side of ['a', 'b']) await mkdir(path.join(temporary, side, 'dist'), { recursive: true });
for (const [name, expected] of Object.entries(originalHashes)) {
  const original = path.join(originalPackage, 'dist', name);
  const hash = createHash('sha256').update(await readFile(original)).digest('hex');
  if (hash !== expected) throw new Error(`Unpatched 0.32.0 checksum mismatch: ${name}`);
  await copyFile(original, path.join(temporary, 'a', 'dist', name));
}
for (const [format, extension] of [['cjs', 'js'], ['esm', 'mjs']]) {
  const output = path.join(temporary, 'b', 'dist', `index.${extension}`);
  await esbuild.build({
    absWorkingDir: temporary,
    entryPoints: [path.join(temporary, 'src', 'index.ts')],
    outfile: output,
    bundle: true,
    platform: 'node',
    format,
    target: 'es2020',
    minifySyntax: true,
    minifyWhitespace: true,
    external: ['@jitl/quickjs-ffi-types'],
    tsconfigRaw: { compilerOptions: { target: 'ES2020', module: 'NodeNext', useDefineForClassFields: false } },
    sourcemap: true,
  });
  const map = JSON.parse(await readFile(`${output}.map`, 'utf8'));
  map.sources = map.sources.map((source) => `../src/${source.split('/src/')[1]}`);
  await writeFile(`${output}.map`, `${JSON.stringify(map)}\n`);
}
const diff = spawnSync('git', ['-c', 'core.autocrlf=false', 'diff', '--no-index', '--', 'a', 'b'], {
  cwd: temporary, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024,
});
if (diff.status !== 1) throw new Error(`Expected generated patch: ${diff.stderr}`);
const patch = diff.stdout.replaceAll('a/a/dist/', 'a/dist/').replaceAll('b/b/dist/', 'b/dist/');
const destination = fileURLToPath(new URL('../../../../common/config/rush/patches/quickjs-emscripten-core@0.32.0.patch', import.meta.url));
await mkdir(path.dirname(destination), { recursive: true });
await writeFile(destination, patch);
console.log(destination);
console.log(`SHA256 ${createHash('sha256').update(patch).digest('hex')}`);
