/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

// @ts-ignore
import * as path from 'path';
// @ts-ignore
import * as fs from 'fs/promises'; // 使用 fs.promises 处理异步操作

import { load } from 'typedoc-plugin-markdown';
import { Application, TSConfigReader, ProjectReflection } from 'typedoc';

import { patchGeneratedApiDocs } from './patch';
import { docLabelMap, overviewMetaJson } from './constants';

// 只生成指定的包文档，本地调试用
const gen_pkgs = process.argv.slice(2) || [];

async function generateDocs() {
  // @ts-ignore
  const projectRoot = path.resolve(__dirname, '../../../'); // Rush 项目根目录
  // @ts-ignore
  const packagesDir = path.join(projectRoot, 'packages'); // packages 目录
  // @ts-ignore
  const outputDir = path.join(__dirname, '../src/zh/auto-docs'); // 输出目录

  const packages: string[] = [];

  // 读取 packages 目录
  const firstLevelFiles = await fs.readdir(packagesDir); // 使用 fs.promises 读取目录

  for (const firstLevel of firstLevelFiles) {
    const firstLevelPath = path.resolve(packagesDir, firstLevel);

    // check if it is a directory
    if (!(await fs.stat(firstLevelPath)).isDirectory()) {
      continue;
    }

    const packageNames = await fs.readdir(firstLevelPath); // 异步读取包目录

    for (const packageName of packageNames) {
      if (gen_pkgs.length > 0 && !gen_pkgs.includes(packageName)) {
        continue;
      }

      const packagePath = path.join(firstLevelPath, packageName);
      const packageJsonPath = path.join(packagePath, 'package.json');
      const tsconfigPath = path.join(packagePath, 'tsconfig.json');

      // 检查是否是有效的包
      if (!(await fileExists(packageJsonPath)) || !(await fileExists(tsconfigPath))) {
        // console.log(`Skipping ${packagePath}: Missing package.json or tsconfig.json`);
      } else {
        packages.push(packageName);
        console.log(`Generating docs for package: ${packageName}`);

        // 输出目录为 auto-docs/{packageName}
        const packageOutputDir = path.join(outputDir, packageName);

        // 创建 Typedoc 应用实例
        const app = new Application();
        app.options.addReader(new TSConfigReader());
        load(app);

        // 配置 Typedoc
        app.bootstrap({
          entryPoints: [path.join(packagePath, 'src')],
          tsconfig: tsconfigPath,
          out: packageOutputDir,
          plugin: ['typedoc-plugin-markdown'], // 使用 Markdown 插件
          theme: 'markdown', // Markdown 模式不依赖 HTML 主题
          exclude: ['**/__tests__/**', 'vitest.config.ts', 'vitest.setup.ts', '**/.DS_Store'],
          basePath: packagePath,
          excludePrivate: true,
          excludeProtected: true,
          disableSources: true,
          readme: 'none',
          githubPages: true,
          hideGenerator: true,
          skipErrorChecking: true,
          requiredToBeDocumented: ['Class', 'Function', 'Interface'],
          // @ts-expect-error MarkdownTheme has no export
          hideBreadcrumbs: true,
          hideMembersSymbol: true,
          allReflectionsHaveOwnDocument: true,
        });

        // 生成文档
        const project: ProjectReflection | undefined = app.convert();

        if (project) {
          await app.generateDocs(project, packageOutputDir);
          await patchGeneratedApiDocs(packageOutputDir);
          const files = await fs.readdir(packageOutputDir);
          const packageMetaJson: Record<string, string>[] = [];
          for (const file of files) {
            if (!['.nojekyll', 'README.md'].includes(file)) {
              packageMetaJson.push({
                type: 'dir',
                name: file,
                label: docLabelMap[file] || file,
              });
            }
          }
          await fs.writeFile(
            path.join(packageOutputDir, '_meta.json'),
            JSON.stringify(packageMetaJson),
            'utf-8'
          );
          await fs.unlink(path.join(packageOutputDir, 'README.md')); // 删除 README.md 文件
          console.log(`Docs generated for ${packageName} at ${packageOutputDir}`);
        } else {
          console.error(`Failed to generate docs for ${packageName}: Conversion failed`);
          // @ts-ignore
          process.exit();
        }
      }
    }
  }

  // 写入 index.md 和 _meta.json
  await fs.writeFile(
    // @ts-ignore
    path.resolve(__dirname, '../src/zh/auto-docs/index.md'),
    overviewMetaJson,
    'utf-8'
  );

  const metaJson: (string | Record<string, string>)[] = [];
  metaJson.push('index');
  packages.forEach((packageName) => {
    metaJson.push({
      type: 'dir',
      label: `@flowgram.ai/${packageName}`,
      name: packageName,
    });
  });

  await fs.writeFile(
    // @ts-ignore
    path.resolve(__dirname, '../src/zh/auto-docs/_meta.json'),
    JSON.stringify(metaJson),
    'utf-8'
  );
}

// 检查文件是否存在
async function fileExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

generateDocs().catch((error) => {
  console.error('Error generating docs:', error);
});
