/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import path from 'path';
import os from 'os';
import http from 'http';

import { afterEach, describe, expect, it } from 'vitest';
import * as tar from 'tar';
import fs from 'fs-extra';

import { scaffoldProject } from '../src/scaffold';

const temporaryRoots: string[] = [];
const servers: http.Server[] = [];
const releaseResponses: Array<() => void> = [];

const createTemporaryRoot = async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'flowgram-create-app-test-'));
  temporaryRoots.push(root);
  return root;
};

const createTemplateTarball = async (root: string, includePackageJson = true) => {
  const fixtureDir = path.join(root, 'fixture');
  const packageDir = path.join(fixtureDir, 'package');
  const tarballPath = path.join(root, 'template.tgz');

  await fs.ensureDir(packageDir);
  if (includePackageJson) {
    await fs.writeJson(
      path.join(packageDir, 'package.json'),
      {
        name: 'flowgram-template',
        dependencies: {
          '@flowgram.ai/core': '0.0.1',
          react: '^18.0.0',
        },
        devDependencies: {
          '@flowgram.ai/eslint-config': '0.0.1',
        },
      },
      { spaces: 2 }
    );
  }
  await fs.writeFile(path.join(packageDir, 'README.md'), '# Template\n');
  await tar.c({ gzip: true, cwd: fixtureDir, file: tarballPath }, ['package']);

  return tarballPath;
};

const serveFile = async (filePath: string, statusCode = 200) => {
  let requestCount = 0;
  const server = http.createServer((_request, response) => {
    requestCount += 1;
    response.statusCode = statusCode;
    if (statusCode !== 200) {
      response.end('fixture download failed');
      return;
    }
    fs.createReadStream(filePath).pipe(response);
  });
  servers.push(server);

  await new Promise<void>((resolve) => {
    server.listen(0, '127.0.0.1', resolve);
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Failed to start fixture server');
  }

  return {
    url: `http://127.0.0.1:${address.port}/template.tgz`,
    getRequestCount: () => requestCount,
  };
};

const serveFileAfterRelease = async (filePath: string) => {
  let releaseResponse: () => void = () => undefined;
  let markRequested: () => void = () => undefined;
  const released = new Promise<void>((resolve) => {
    releaseResponse = resolve;
  });
  releaseResponses.push(() => releaseResponse());
  const requested = new Promise<void>((resolve) => {
    markRequested = resolve;
  });
  const server = http.createServer(async (_request, response) => {
    markRequested();
    await released;
    fs.createReadStream(filePath).pipe(response);
  });
  servers.push(server);

  await new Promise<void>((resolve) => {
    server.listen(0, '127.0.0.1', resolve);
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Failed to start fixture server');
  }

  return {
    url: `http://127.0.0.1:${address.port}/template.tgz`,
    waitForRequest: () => requested,
    release: releaseResponse,
  };
};

afterEach(async () => {
  releaseResponses.splice(0).forEach((release) => release());
  await Promise.all(
    servers.splice(0).map(
      (server) =>
        new Promise<void>((resolve, reject) => {
          server.close((error) => (error ? reject(error) : resolve()));
        })
    )
  );
  await Promise.all(temporaryRoots.splice(0).map((root) => fs.remove(root)));
});

describe('scaffoldProject', () => {
  it('leaves an existing project unchanged and does not download', async () => {
    const root = await createTemporaryRoot();
    const workDir = path.join(root, 'work');
    const destination = path.join(workDir, 'demo-free-layout');
    const packageJsonPath = path.join(destination, 'package.json');
    const originalPackageJson = `${JSON.stringify(
      {
        name: 'existing-project',
        dependencies: {
          '@flowgram.ai/core': '0.1.0',
        },
      },
      null,
      2
    )}\n`;
    const template = await serveFile(await createTemplateTarball(root));

    await fs.ensureDir(destination);
    await fs.writeFile(packageJsonPath, originalPackageJson);

    const error = await scaffoldProject({
      targetDir: workDir,
      folderName: 'demo-free-layout',
      templateUrl: template.url,
      flowgramVersion: '1.0.14',
    }).then(
      () => undefined,
      (scaffoldError: unknown) => scaffoldError
    );

    await expect(fs.readFile(packageJsonPath, 'utf8')).resolves.toBe(originalPackageJson);
    await expect(fs.readdir(workDir)).resolves.toEqual(['demo-free-layout']);
    expect(template.getRequestCount()).toBe(0);
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toMatch(/already exists/i);
  });

  it('rejects a dangling destination link without downloading', async () => {
    const root = await createTemporaryRoot();
    const workDir = path.join(root, 'work');
    const destination = path.join(workDir, 'demo-free-layout');
    const linkTarget = path.join(root, 'removed-project');
    const template = await serveFile(await createTemplateTarball(root));

    await fs.ensureDir(workDir);
    await fs.ensureDir(linkTarget);
    await fs.symlink(linkTarget, destination, process.platform === 'win32' ? 'junction' : 'dir');
    await fs.remove(linkTarget);

    await expect(
      scaffoldProject({
        targetDir: workDir,
        folderName: 'demo-free-layout',
        templateUrl: template.url,
        flowgramVersion: '1.0.14',
      })
    ).rejects.toThrow(/already exists/i);

    expect(template.getRequestCount()).toBe(0);
    expect((await fs.lstat(destination)).isSymbolicLink()).toBe(true);
    await expect(fs.readdir(workDir)).resolves.toEqual(['demo-free-layout']);
  });

  it('preserves an empty destination created while the template downloads', async () => {
    const root = await createTemporaryRoot();
    const workDir = path.join(root, 'work');
    const destination = path.join(workDir, 'demo-free-layout');
    const template = await serveFileAfterRelease(await createTemplateTarball(root));

    await fs.ensureDir(workDir);
    const scaffoldPromise = scaffoldProject({
      targetDir: workDir,
      folderName: 'demo-free-layout',
      templateUrl: template.url,
      flowgramVersion: '1.0.14',
    });

    await template.waitForRequest();
    await fs.ensureDir(destination);
    template.release();

    await expect(scaffoldPromise).rejects.toThrow(/already exists/i);
    await expect(fs.readdir(destination)).resolves.toEqual([]);
    await expect(fs.readdir(workDir)).resolves.toEqual(['demo-free-layout']);
  });

  it('preserves a populated destination created while the template downloads', async () => {
    const root = await createTemporaryRoot();
    const workDir = path.join(root, 'work');
    const destination = path.join(workDir, 'demo-free-layout');
    const sentinelPath = path.join(destination, 'sentinel.txt');
    const template = await serveFileAfterRelease(await createTemplateTarball(root));

    await fs.ensureDir(workDir);
    const scaffoldPromise = scaffoldProject({
      targetDir: workDir,
      folderName: 'demo-free-layout',
      templateUrl: template.url,
      flowgramVersion: '1.0.14',
    });

    await template.waitForRequest();
    await fs.ensureDir(destination);
    await fs.writeFile(sentinelPath, 'existing');
    template.release();

    await expect(scaffoldPromise).rejects.toThrow(/already exists/i);
    await expect(fs.readFile(sentinelPath, 'utf8')).resolves.toBe('existing');
    await expect(fs.readdir(workDir)).resolves.toEqual(['demo-free-layout']);
  });

  it('removes temporary files when a callback throws a falsey value', async () => {
    const root = await createTemporaryRoot();
    const workDir = path.join(root, 'work');
    const template = await serveFile(await createTemplateTarball(root));
    let rejected = false;
    let rejection: unknown;

    await fs.ensureDir(workDir);
    try {
      await scaffoldProject({
        targetDir: workDir,
        folderName: 'demo-free-layout',
        templateUrl: template.url,
        flowgramVersion: '1.0.14',
        onDownload: () => {
          throw undefined;
        },
      });
    } catch (error) {
      rejected = true;
      rejection = error;
    }

    expect(rejected).toBe(true);
    expect(rejection).toBeUndefined();
    expect(template.getRequestCount()).toBe(0);
    await expect(fs.readdir(workDir)).resolves.toEqual([]);
  });

  it('removes temporary files after download fails', async () => {
    const root = await createTemporaryRoot();
    const workDir = path.join(root, 'work');
    const fixturePath = path.join(root, 'error.txt');

    await fs.ensureDir(workDir);
    await fs.writeFile(fixturePath, 'failed');
    const template = await serveFile(fixturePath, 503);

    await expect(
      scaffoldProject({
        targetDir: workDir,
        folderName: 'demo-free-layout',
        templateUrl: template.url,
        flowgramVersion: '1.0.14',
      })
    ).rejects.toThrow('Download failed: 503');

    await expect(fs.readdir(workDir)).resolves.toEqual([]);
  });

  it('removes downloaded and partially extracted files after extraction fails', async () => {
    const root = await createTemporaryRoot();
    const workDir = path.join(root, 'work');
    const invalidTarballPath = path.join(root, 'invalid.tgz');

    await fs.ensureDir(workDir);
    await fs.writeFile(invalidTarballPath, 'not a tarball');
    const template = await serveFile(invalidTarballPath);

    await expect(
      scaffoldProject({
        targetDir: workDir,
        folderName: 'demo-free-layout',
        templateUrl: template.url,
        flowgramVersion: '1.0.14',
      })
    ).rejects.toThrow();

    await expect(fs.readdir(workDir)).resolves.toEqual([]);
  });

  it('removes extracted files when project preparation fails', async () => {
    const root = await createTemporaryRoot();
    const workDir = path.join(root, 'work');
    const template = await serveFile(await createTemplateTarball(root, false));

    await fs.ensureDir(workDir);
    await expect(
      scaffoldProject({
        targetDir: workDir,
        folderName: 'demo-free-layout',
        templateUrl: template.url,
        flowgramVersion: '1.0.14',
      })
    ).rejects.toThrow();

    await expect(fs.readdir(workDir)).resolves.toEqual([]);
  });

  it('publishes a fully prepared project without temporary artifacts', async () => {
    const root = await createTemporaryRoot();
    const workDir = path.join(root, 'work');
    const template = await serveFile(await createTemplateTarball(root));

    await fs.ensureDir(workDir);
    await scaffoldProject({
      targetDir: workDir,
      folderName: 'demo-free-layout',
      templateUrl: template.url,
      flowgramVersion: '1.0.14',
    });

    const packageJson = await fs.readJson(path.join(workDir, 'demo-free-layout', 'package.json'));
    expect(packageJson.dependencies).toEqual({
      '@flowgram.ai/core': '1.0.14',
      react: '^18.0.0',
    });
    expect(packageJson.devDependencies).toEqual({
      '@flowgram.ai/eslint-config': '1.0.14',
    });
    await expect(fs.readdir(workDir)).resolves.toEqual(['demo-free-layout']);
  });
});
