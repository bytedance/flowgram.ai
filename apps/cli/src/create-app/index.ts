/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import path from 'path';
import https from 'https';
import { execSync } from 'child_process';

import * as tar from 'tar';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import chalk from 'chalk';

const updateFlowGramVersions = (dependencies: any[], latestVersion: string) => {
  for (const packageName in dependencies) {
    if (packageName.startsWith('@flowgram.ai')) {
      dependencies[packageName] = latestVersion;
    }
  }
};

// 使用 https 下载文件
function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Download failed: ${response.statusCode}`));
          return;
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close();
          resolve();
        });
      })
      .on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });

    file.on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

export const createApp = async (projectName?: string) => {
  console.log(chalk.green('Welcome to @flowgram.ai/create-app CLI!'));
  const latest = execSync('npm view @flowgram.ai/demo-fixed-layout version')
    .toString()
    .trim();

  let folderName = '';

  if (!projectName) {
    // 询问用户选择 demo 项目
    const { repo } = await inquirer.prompt([
      {
        type: 'list',
        name: 'repo',
        message: 'Select a demo to create:',
        choices: [
          { name: 'Fixed Layout Demo', value: 'demo-fixed-layout' },
          { name: 'Free Layout Demo', value: 'demo-free-layout' },
          { name: 'Fixed Layout Demo Simple', value: 'demo-fixed-layout-simple' },
          { name: 'Free Layout Demo Simple', value: 'demo-free-layout-simple' },
          { name: 'Free Layout Nextjs Demo', value: 'demo-nextjs' },
          { name: 'Free Layout Vite Demo Simple', value: 'demo-vite' },
          { name: 'Demo Playground for infinite canvas', value: 'demo-playground' },
        ],
      },
    ]);

    folderName = repo;
  } else {
    if (
      [
        'fixed-layout',
        'free-layout',
        'fixed-layout-simple',
        'free-layout-simple',
        'playground',
        'nextjs',
      ].includes(projectName)
    ) {
      folderName = `demo-${projectName}`;
    } else {
      console.error('Invalid projectName. Please run "npx create-app" to choose demo.');
      return;
    }
  }

  try {
    const targetDir = path.join(process.cwd());

    // 下载 npm 包的 tarball
    const downloadPackage = async () => {
      try {
        const url = `https://registry.npmjs.org/@flowgram.ai/${folderName}/-/${folderName}-${latest}.tgz`;
        const tempTarballPath = path.join(process.cwd(), `${folderName}.tgz`);

        console.log(chalk.blue(`Downloading ${url} ...`));
        await downloadFile(url, tempTarballPath);

        fs.ensureDirSync(targetDir);

        await tar.x({
          file: tempTarballPath,
          C: targetDir,
        });

        fs.renameSync(path.join(targetDir, 'package'), path.join(targetDir, folderName));

        fs.unlinkSync(tempTarballPath);
        return true;
      } catch (error) {
        console.error(`Error downloading or extracting package`);
        console.error(error);
        return false;
      }
    };

    const res = await downloadPackage();

    // 替换 package.json 内部的 @flowgram.ai 包版本为 latest
    const pkgJsonPath = path.join(targetDir, folderName, 'package.json');
    const data = fs.readFileSync(pkgJsonPath, 'utf-8');

    const packageLatestVersion = execSync('npm view @flowgram.ai/core version')
      .toString()
      .trim();

    const jsonData = JSON.parse(data);
    if (jsonData.dependencies) {
      updateFlowGramVersions(jsonData.dependencies, packageLatestVersion);
    }

    if (jsonData.devDependencies) {
      updateFlowGramVersions(jsonData.devDependencies, packageLatestVersion);
    }

    fs.writeFileSync(pkgJsonPath, JSON.stringify(jsonData, null, 2), 'utf-8');

    if (res) {
      console.log(chalk.green(`${folderName} Demo project created successfully!`));
      console.log(chalk.yellow('Run the following commands to start:'));
      console.log(chalk.cyan(`  cd ${folderName}`));
      console.log(chalk.cyan('  npm install'));
      console.log(chalk.cyan('  npm start'));
    } else {
      console.log(chalk.red('Download failed'));
    }
  } catch (error) {
    console.error('Error downloading repo:', error);
    return;
  }
};
