/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import path from 'node:path';
import fs from 'node:fs';

import { describe, expect, it } from 'vitest';

const walkSourceFiles = (directory: string): string[] =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return walkSourceFiles(absolutePath);
    }
    return /\.(?:ts|tsx|css)$/.test(entry.name) ? [absolutePath] : [];
  });

describe('Ant Design material migration', () => {
  it('does not depend on Semi Design source modules or selectors', () => {
    const sourceRoot = path.resolve(__dirname);
    const offenders = walkSourceFiles(sourceRoot).filter((file) => {
      if (file === path.resolve(sourceRoot, 'migration.test.ts')) {
        return false;
      }
      const contents = fs.readFileSync(file, 'utf8');
      return (
        contents.includes('@douyinfe/semi') ||
        contents.includes('.semi-') ||
        contents.includes('--semi-')
      );
    });

    expect(offenders).toEqual([]);
  });
});
