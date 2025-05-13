import fs from 'fs';
import path from 'path';

const _types = ['components'];

export function listAllMaterials() {
  const _materials = [];

  for (const _type of _types) {
    const materialsPath = path.join(import.meta.dirname, '..', 'src', _type);
    _materials.push(
      ...fs
        .readdirSync(materialsPath)
        .map((_path) => {
          if (_path === 'index.ts') {
            return null;
          }

          const config = fs.readFileSync(path.join(materialsPath, _path, 'config.json'), 'utf8');
          return {
            ...JSON.parse(config),
            type: _type,
            path: path.join(materialsPath, _path),
          };
        })
        .filter(Boolean)
    );
  }

  return _materials;
}

export function bfsMaterials(material, _materials = []) {
  function findConfigByName(name) {
    return _materials.find((_config) => _config.name === name);
  }

  const queue = [material];
  const allMaterials = new Set();
  const allPackages = new Set();

  while (queue.length > 0) {
    const _material = queue.shift();
    if (allMaterials.has(_material)) {
      continue;
    }
    allMaterials.add(_material);

    if (_material.depPackages) {
      for (const _package of _material.depPackages) {
        allPackages.add(_package);
      }
    }

    if (_material.depMaterials) {
      for (const _materialName of _material.depMaterials) {
        queue.push(findConfigByName(_materialName));
      }
    }
  }

  return {
    allMaterials: Array.from(allMaterials),
    allPackages: Array.from(allPackages),
  };
}

export const copyMaterial = (material, projectInfo) => {
  const sourceDir = material.path;
  const targetDir = path.join(
    projectInfo.projectPath,
    'form-materials',
    `${material.type}`,
    material.name
  );
  fs.cpSync(sourceDir, targetDir, { recursive: true });
};
