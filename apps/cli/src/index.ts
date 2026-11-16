/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import path from 'path';

import { Command } from 'commander';

import { updateFlowgramVersion } from './update-version';
import { syncMaterial } from './materials';
import { findUsedMaterials } from './find-materials';
import { createApp } from './create-app';

const program = new Command();

program.name('flowgram-cli').version('1.0.0').description('Flowgram CLI');

program
  .command('create-app')
  .description('Create a new flowgram project')
  .argument('[string]', 'Project name')
  .action(async (projectName) => {
    await createApp(projectName);
  });

program
  .command('materials')
  .description('Sync materials to the project')
  .argument(
    '[string]',
    'Material name or names\nExample 1: components/variable-selector \nExample2: components/variable-selector,effects/provide-json-schema-outputs'
  )
  .option('--refresh-project-imports', 'Refresh project imports to copied materials', false)
  .option('--target-material-root-dir <string>', 'Target directory to copy materials')
  .option('--select-multiple', 'Select multiple materials', false)
  .action(async (materialName, options) => {
    await syncMaterial({
      materialName,
      refreshProjectImports: options.refreshProjectImports,
      targetMaterialRootDir: options.targetMaterialRootDir
        ? path.join(process.cwd(), options.targetMaterialRootDir)
        : undefined,
      selectMultiple: options.selectMultiple,
    });
  });

program
  .command('find-used-materials')
  .description('Find used materials in the project')
  .action(async () => {
    await findUsedMaterials();
  });

program
  .command('update-version')
  .description('Update flowgram version in the project')
  .argument('[string]', 'Flowgram version')
  .action(async (version) => {
    await updateFlowgramVersion(version);
  });

program.parse(process.argv);
