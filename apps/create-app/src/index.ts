/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import path from 'path';
import { execSync } from 'child_process';

import inquirer from 'inquirer';
import { Command } from 'commander';
import chalk from 'chalk';

import { assertProjectDestinationAvailable, scaffoldProject } from './scaffold';

const program = new Command();
const args = process.argv.slice(2);

const main = async () => {
  console.log(chalk.green('Welcome to @flowgram.ai/create-app CLI!123123'));

  let folderName = '';

  if (!args?.length) {
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
      ].includes(args[0])
    ) {
      folderName = `demo-${args[0]}`;
    } else {
      console.error('Invalid argument. Please run "npx create-app" to choose demo.');
      return;
    }
  }

  try {
    const targetDir = path.join(process.cwd());
    await assertProjectDestinationAvailable(targetDir, folderName);

    const latest = execSync('npm view @flowgram.ai/demo-fixed-layout version --tag=latest latest')
      .toString()
      .trim();
    const packageLatestVersion = execSync('npm view @flowgram.ai/core version --tag=latest latest')
      .toString()
      .trim();
    const url = `https://registry.npmjs.org/@flowgram.ai/${folderName}/-/${folderName}-${latest}.tgz`;

    await scaffoldProject({
      targetDir,
      folderName,
      templateUrl: url,
      flowgramVersion: packageLatestVersion,
      onDownload: (downloadUrl) => console.log(chalk.blue(`Downloading ${downloadUrl} ...`)),
    });

    console.log(chalk.green(`${folderName} Demo project created successfully!`));
    console.log(chalk.yellow('Run the following commands to start:'));
    console.log(chalk.cyan(`  cd ${folderName}`));
    console.log(chalk.cyan('  npm install'));
    console.log(chalk.cyan('  npm start'));
  } catch (error) {
    console.error('Error creating project:', error);
    return;
  }
};

program.version('1.0.0').description('Create a demo project');
program.parse(process.argv);

main();
