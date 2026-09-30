/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { pipeline } from 'stream/promises';
import path from 'path';
import https from 'https';
import http from 'http';

import * as tar from 'tar';
import fs from 'fs-extra';

export interface ScaffoldProjectOptions {
  targetDir: string;
  folderName: string;
  templateUrl: string;
  flowgramVersion: string;
  onDownload?: (url: string) => void;
}

const updateFlowGramVersions = (
  dependencies: Record<string, string> | undefined,
  latestVersion: string
) => {
  if (!dependencies) {
    return;
  }

  for (const packageName in dependencies) {
    if (packageName.startsWith('@flowgram.ai')) {
      dependencies[packageName] = latestVersion;
    }
  }
};

export const assertProjectDestinationAvailable = async (
  targetDir: string,
  folderName: string
): Promise<void> => {
  const destinationPath = path.join(targetDir, folderName);

  const destinationExists = await fs
    .lstat(destinationPath)
    .then(() => true)
    .catch((error: NodeJS.ErrnoException) => {
      if (error.code === 'ENOENT') {
        return false;
      }
      throw error;
    });

  if (destinationExists) {
    throw new Error(`Target directory already exists: ${destinationPath}`);
  }
};

const downloadFile = async (url: string, destination: string): Promise<void> => {
  const response = await new Promise<http.IncomingMessage>((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    const request = client.get(url, resolve);
    request.on('error', reject);
  });

  if (response.statusCode !== 200) {
    response.resume();
    throw new Error(`Download failed: ${response.statusCode}`);
  }

  await pipeline(response, fs.createWriteStream(destination));
};

export const scaffoldProject = async ({
  targetDir,
  folderName,
  templateUrl,
  flowgramVersion,
  onDownload,
}: ScaffoldProjectOptions): Promise<void> => {
  const destinationPath = path.join(targetDir, folderName);

  await assertProjectDestinationAvailable(targetDir, folderName);
  await fs.ensureDir(targetDir);

  const stagingPath = await fs.mkdtemp(path.join(targetDir, `.flowgram-${folderName}-`));
  const tarballPath = `${stagingPath}.tgz`;
  let destinationCreated = false;
  let scaffoldFailed = false;
  let scaffoldError: unknown;

  try {
    onDownload?.(templateUrl);
    await downloadFile(templateUrl, tarballPath);
    await tar.x({
      file: tarballPath,
      C: stagingPath,
      strip: 1,
    });

    const packageJsonPath = path.join(stagingPath, 'package.json');
    const packageJson = await fs.readJson(packageJsonPath);

    updateFlowGramVersions(packageJson.dependencies, flowgramVersion);
    updateFlowGramVersions(packageJson.devDependencies, flowgramVersion);
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

    await fs.remove(tarballPath);

    try {
      await fs.mkdir(destinationPath);
      destinationCreated = true;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
        throw new Error(`Target directory already exists: ${destinationPath}`);
      }
      throw error;
    }

    for (const entry of await fs.readdir(stagingPath)) {
      await fs.rename(path.join(stagingPath, entry), path.join(destinationPath, entry));
    }
  } catch (error) {
    scaffoldFailed = true;
    scaffoldError = error;
  }

  try {
    await Promise.all([
      fs.remove(tarballPath),
      fs.remove(stagingPath),
      scaffoldFailed && destinationCreated ? fs.remove(destinationPath) : Promise.resolve(),
    ]);
  } catch (cleanupError) {
    if (scaffoldFailed) {
      const scaffoldMessage =
        scaffoldError instanceof Error ? scaffoldError.message : String(scaffoldError);
      const cleanupMessage =
        cleanupError instanceof Error ? cleanupError.message : String(cleanupError);
      throw new Error(
        `Project creation failed (${scaffoldMessage}) and temporary files could not be removed (${cleanupMessage})`
      );
    }
    throw cleanupError;
  }

  if (scaffoldFailed) {
    throw scaffoldError;
  }
};
