/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  DataEvent,
  Effect,
  EffectOptions,
  VariableFieldKeyRenameService,
} from '@flowgram.ai/editor';

import { IFlowRefValue, IFlowTemplateValue } from '@/shared';
import { FlowValueUtils } from '@/shared';

/**
 * Auto rename ref when form item's key is renamed
 *
 * Example:
 *
 * formMeta: {
 *  effects: {
 *    "inputsValues": autoRenameRefEffect,
 *  }
 * }
 */
export const autoRenameRefEffect: EffectOptions[] = [
  {
    event: DataEvent.onValueInit,
    effect: ((params) => {
      const { context, form, name } = params;

      const renameService = context.node.getService(VariableFieldKeyRenameService);

      const disposable = renameService.onRename(({ before, after }) => {
        const beforeKeyPath = [
          ...before.parentFields.map((_field) => _field.key).reverse(),
          before.key,
        ];
        const afterKeyPath = [
          ...after.parentFields.map((_field) => _field.key).reverse(),
          after.key,
        ];

        // traverse rename refs inside form item 'name'
        traverseRef(name, form.getValueIn(name), (_drilldownName, _v) => {
          if (_v.type === 'ref') {
            // ref auto rename
            if (isKeyPathMatch(_v.content, beforeKeyPath)) {
              _v.content = [...afterKeyPath, ...(_v.content || [])?.slice(beforeKeyPath.length)];
              form.setValueIn(_drilldownName, _v);
            }
          } else if (_v.type === 'template') {
            // template auto rename
            const templateKeyPaths = FlowValueUtils.getTemplateKeyPaths(_v);
            let hasMatch = false;

            templateKeyPaths.forEach((_keyPath) => {
              if (isKeyPathMatch(_keyPath, beforeKeyPath)) {
                hasMatch = true;
                const nextKeyPath = [
                  ...afterKeyPath,
                  ...(_keyPath || [])?.slice(beforeKeyPath.length),
                ];
                _v.content = _v.content?.replace(
                  `{{${_keyPath.join('.')}}`,
                  `{{${nextKeyPath.join('.')}}`
                );
              }
            });

            if (hasMatch) {
              form.setValueIn(_drilldownName, { ..._v });
            }
          }
        });
      });

      return () => {
        disposable.dispose();
      };
    }) as Effect,
  },
];

/**
 * If ref value's keyPath is the under as targetKeyPath
 * @param value
 * @param targetKeyPath
 * @returns
 */
function isKeyPathMatch(keyPath: string[] = [], targetKeyPath: string[]) {
  return targetKeyPath.every((_key, index) => _key === keyPath[index]);
}

/**
 * Traverse value to find ref
 * @param value
 * @param options
 * @returns
 */
function traverseRef(
  name: string,
  value: any,
  cb: (name: string, _v: IFlowRefValue | IFlowTemplateValue) => void
) {
  for (const { value: _v, path } of FlowValueUtils.traverse(value, {
    includeTypes: ['ref', 'template'],
    path: name,
  })) {
    cb(path, _v as IFlowRefValue | IFlowTemplateValue);
  }
}
