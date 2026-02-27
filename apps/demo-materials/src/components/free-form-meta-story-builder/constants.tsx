/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  Field,
  FieldRenderProps,
  FlowNodeMeta,
  FlowNodeRegistry,
} from '@flowgram.ai/free-layout-editor';
import {
  IJsonSchema,
  InputsValues,
  JsonSchemaEditor,
  provideJsonSchemaOutputs,
  AssignRows,
  createInferAssignPlugin,
  DisplayOutputs,
} from '@flowgram.ai/form-materials';

import { Icon } from '../form-header/styles';
import { FormHeader } from '../form-header';
import iconVariable from '../../assets/icon-variable.png';
import iconStart from '../../assets/icon-start.jpg';
import iconScript from '../../assets/icon-script.png';
import iconEnd from '../../assets/icon-end.jpg';

export const DEFAULT_FORM_META = {
  render: () => (
    <div>
      <FormHeader />
      <div>TODO</div>
    </div>
  ),
};

export const START_REGISTRY: FlowNodeRegistry<FlowNodeMeta> = {
  type: 'start',
  meta: {
    isStart: true,
    deleteDisable: true,
    copyDisable: true,
    nodePanelVisible: false,
    defaultPorts: [{ type: 'output' }],
    size: {
      width: 360,
      height: 211,
    },
  },
  info: {
    icon: iconStart,
    description: 'You can add variables here to test variable reference',
  },
  canAdd() {
    return false;
  },
  formMeta: {
    render: () => (
      <div>
        <FormHeader />
        <Field
          name="outputs"
          render={({ field: { value, onChange } }: FieldRenderProps<IJsonSchema>) => (
            <>
              <JsonSchemaEditor
                value={value}
                onChange={(value) => onChange(value as IJsonSchema)}
              />
            </>
          )}
        />
      </div>
    ),
    effect: {
      outputs: provideJsonSchemaOutputs,
    },
  },
};

export const END_REGISTRY: FlowNodeRegistry<FlowNodeMeta> = {
  type: 'end',
  meta: {
    isEnd: true,
    deleteDisable: true,
    copyDisable: true,
    nodePanelVisible: false,
    defaultPorts: [{ type: 'input' }],
    size: {
      width: 360,
      height: 211,
    },
  },
  info: {
    icon: iconEnd,
    description: 'You can test variables created in the previous nodes',
  },
  canAdd() {
    return false;
  },
  formMeta: {
    render: () => (
      <div>
        <FormHeader />
        <Field
          name="inputsValues"
          render={({ field: { value, onChange } }: FieldRenderProps<any>) => (
            <>
              <InputsValues value={value} onChange={(value) => onChange(value)} />
            </>
          )}
        />
      </div>
    ),
  },
};

export const BLOCK_START_REGISTRY: FlowNodeRegistry<FlowNodeMeta> = {
  type: 'block-start',
  meta: {
    isStart: true,
    deleteDisable: true,
    copyDisable: true,
    defaultPorts: [{ type: 'output' }],
    size: {
      width: 60,
      height: 60,
    },
    wrapperStyle: {
      minWidth: 'unset',
      width: '100%',
      borderWidth: 2,
      borderRadius: 8,
      cursor: 'move',
    },
  },
  canAdd: () => false,
  formMeta: {
    render: () => <Icon src={iconStart} />,
  },
};

export const BLOCK_END_REGISTRY: FlowNodeRegistry<FlowNodeMeta> = {
  type: 'block-end',
  meta: {
    isNodeEnd: true,
    deleteDisable: true,
    copyDisable: true,
    defaultPorts: [{ type: 'input' }],
    size: {
      width: 60,
      height: 60,
    },
    wrapperStyle: {
      minWidth: 'unset',
      width: '100%',
      borderWidth: 2,
      borderRadius: 8,
      cursor: 'move',
    },
  },
  canAdd: () => false,
  formMeta: {
    render: () => <Icon src={iconEnd} />,
  },
};

export const VARIABLE_REGISTRY: FlowNodeRegistry<FlowNodeMeta> = {
  type: 'variable',
  meta: {
    size: {
      width: 240,
      height: 150,
    },
  },
  info: {
    icon: iconVariable,
  },
  formMeta: {
    render: () => (
      <>
        <FormHeader />
        <div>
          <AssignRows name="assign" />
          <DisplayOutputs style={{ paddingTop: 10 }} displayFromScope />
        </div>
      </>
    ),
    plugins: [
      createInferAssignPlugin({
        assignKey: 'assign',
        outputKey: 'outputs',
      }),
    ],
  },
};

export const CUSTOM_REGISTRY: FlowNodeRegistry<FlowNodeMeta> = {
  type: 'custom',
  meta: {
    deleteDisable: true,
    copyDisable: true,
    nodePanelVisible: false,
    defaultPorts: [{ type: 'input' }, { type: 'output' }],
    size: {
      width: 360,
      height: 211,
    },
  },
  info: {
    icon: iconScript,
    description: 'You can add custom form meta here',
  },
  canAdd() {
    return true;
  },
  formMeta: DEFAULT_FORM_META,
};
