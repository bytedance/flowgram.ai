/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';
import { IContainer, IEngine, WorkflowStatus } from '@flowgram.ai/runtime-interface';

import { WorkflowRuntimeContainer } from '../../container';
import { ValidateInputsSchemaInputs } from './validate-inputs';
import { TestSchemas } from '.';

const container: IContainer = WorkflowRuntimeContainer.instance;

describe('WorkflowRuntime validate inputs success', () => {
  it('basic inputs', async () => {
    const inputs: ValidateInputsSchemaInputs = {
      AA: 'hello',
      BB: 42,
      CC: {
        CA: 'world',
        CB: 100,
        CC: 200,
        CD: true,
        CE: {
          CEA: 'nested string',
        },
        CF: ['item1', 'item2', 'item3'],
      },
      DD: [
        {
          DA: 'optional string',
          DB: {
            DBA: 'deep nested',
          },
        },
      ],
      EE: {
        EA: {
          EAA: 'required nested',
        },
        EB: 'optional string',
      },
    };

    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.validateInputsSchema,
      inputs,
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Processing);
    const result = await processing;
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
    expect(result).toStrictEqual(inputs);
  });
  it('complex inputs', async () => {
    const inputs: ValidateInputsSchemaInputs = {
      AA: 'complex example',
      BB: -999,
      CC: {
        CA: 'test',
        CB: 0,
        CC: 999999,
        CD: false,
        CE: {
          CEA: 'another nested value',
        },
        CF: ['a', 'b', 'c', 'd', 'e'],
      },
      DD: [
        {
          DA: 'first item',
          DB: {
            DBA: 'first nested',
          },
        },
        {
          DA: 'second item',
          // DB is optional, omitted here
        },
        {
          // DA is optional, omitted here
          DB: {
            DBA: 'third nested',
          },
        },
      ],
      EE: {
        EA: {
          EAA: 'required value',
        },
        // EB is optional, omitted here
      },
    };

    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.validateInputsSchema,
      inputs,
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Processing);
    const result = await processing;
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
    expect(result).toStrictEqual(inputs);
  });
  it('min inputs', async () => {
    const inputs: ValidateInputsSchemaInputs = {
      AA: '',
      BB: 0,
      CC: {
        CA: '',
        CB: 0,
        CC: 0,
        CD: false,
        CE: {
          CEA: '',
        },
        CF: [],
      },
      DD: [],
      EE: {
        EA: {
          EAA: '',
        },
      },
    };

    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.validateInputsSchema,
      inputs,
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Processing);
    const result = await processing;
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
    expect(result).toStrictEqual(inputs);
  });
  it('full inputs', async () => {
    const inputs: ValidateInputsSchemaInputs = {
      AA: 'full example',
      BB: 12345,
      CC: {
        CA: 'complete',
        CB: 500,
        CC: 600,
        CD: true,
        CE: {
          CEA: 'full nested',
        },
        CF: ['full', 'array', 'example'],
      },
      DD: [
        {
          DA: 'with all fields',
          DB: {
            DBA: 'complete nested',
          },
        },
      ],
      EE: {
        EA: {
          EAA: 'all required',
        },
        EB: 'with optional field',
      },
    };

    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.validateInputsSchema,
      inputs,
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Processing);
    const result = await processing;
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
    expect(result).toStrictEqual(inputs);
  });
  it('edge inputs', async () => {
    const inputs: ValidateInputsSchemaInputs = {
      AA: 'a', // single character
      BB: Number.MAX_SAFE_INTEGER,
      CC: {
        CA: 'very long string that tests the boundaries of what might be acceptable in real world scenarios',
        CB: Number.MIN_SAFE_INTEGER,
        CC: 1,
        CD: true,
        CE: {
          CEA: 'boundary test',
        },
        CF: ['single'],
      },
      DD: Array(100).fill({
        DA: 'repeated',
        DB: {
          DBA: 'many items',
        },
      }),
      EE: {
        EA: {
          EAA: 'boundary',
        },
        EB: '',
      },
    };

    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.validateInputsSchema,
      inputs,
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Processing);
    const result = await processing;
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
    expect(result).toStrictEqual(inputs);
  });
});

describe('WorkflowRuntime validate inputs failed', () => {
  it('missing required property "AA"', async () => {
    const inputs = {
      // AA: "missing", // ❌ missing required property AA
      BB: 42,
      CC: {
        CA: 'world',
        CB: 100,
        CC: 200,
        CD: true,
        CE: { CEA: 'nested' },
        CF: ['item1'],
      },
      DD: [],
      EE: {
        EA: { EAA: 'required' },
      },
    };
    const engine = container.get<IEngine>(IEngine);
    const { context } = engine.invoke({
      schema: TestSchemas.validateInputsSchema,
      inputs,
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Failed);
    const report = context.reporter.export();
    expect(report.messages.error[0].message).toBe(
      'JSON Schema validation failed: Missing required property "AA" at root'
    );
  });
  it('property "AA" expected to be string, not number', async () => {
    const inputs = {
      AA: 123, // ❌ AA should be string, not number
      BB: 42,
      CC: {
        CA: 'world',
        CB: 100,
        CC: 200,
        CD: true,
        CE: { CEA: 'nested' },
        CF: ['item1'],
      },
      DD: [],
      EE: {
        EA: { EAA: 'required' },
      },
    };
    const engine = container.get<IEngine>(IEngine);
    const { context } = engine.invoke({
      schema: TestSchemas.validateInputsSchema,
      inputs,
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Failed);
    const report = context.reporter.export();
    expect(report.messages.error[0].message).toBe(
      'JSON Schema validation failed: Expected string at AA, but got: number'
    );
  });
  it('property "BB" expected to be number, not string', async () => {
    const inputs = {
      AA: 'hello',
      BB: 'test-string', // ❌ BB should be number, not string
      CC: {
        CA: 'world',
        CB: 100,
        CC: 200,
        CD: true,
        CE: { CEA: 'nested' },
        CF: ['item1'],
      },
      DD: [],
      EE: {
        EA: { EAA: 'required' },
      },
    };
    const engine = container.get<IEngine>(IEngine);
    const { context } = engine.invoke({
      schema: TestSchemas.validateInputsSchema,
      inputs,
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Failed);
    const report = context.reporter.export();
    expect(report.messages.error[0].message).toBe(
      'JSON Schema validation failed: Expected integer at BB, but got: "test-string"'
    );
  });
  it('property "CC.CA" expected to be string, not number', async () => {
    const inputs = {
      AA: 'hello',
      BB: 42,
      CC: {
        // CA: 123, // ❌ CA should be string, not number
        CB: 100,
        CC: 200,
        CD: true,
        CE: { CEA: 'nested' },
        CF: ['item1'],
      },
      DD: [],
      EE: {
        EA: { EAA: 'required' },
      },
    };
    const engine = container.get<IEngine>(IEngine);
    const { context } = engine.invoke({
      schema: TestSchemas.validateInputsSchema,
      inputs,
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Failed);
    const report = context.reporter.export();
    expect(report.messages.error[0].message).toBe(
      'JSON Schema validation failed: Missing required property "CA" at CC'
    );
  });
  it('missing required property "CC.CEA"', async () => {
    const inputs = {
      AA: 'hello',
      BB: 42,
      CC: {
        CA: 'world',
        CB: 100,
        CC: 200,
        CD: true,
        CE: {
          // CEA: "missing" // ❌ missing required property CEA
        },
        CF: ['item1'],
      },
      DD: [],
      EE: {
        EA: { EAA: 'required' },
      },
    };
    const engine = container.get<IEngine>(IEngine);
    const { context } = engine.invoke({
      schema: TestSchemas.validateInputsSchema,
      inputs,
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Failed);
    const report = context.reporter.export();
    expect(report.messages.error[0].message).toBe(
      'JSON Schema validation failed: Missing required property "CEA" at CC.CE'
    );
  });
  it('xxxxxxxxxxxxxxxxx', async () => {
    const inputs = {
      AA: 'hello',
      BB: 42,
      CC: {
        CA: 'world',
        CB: 100,
        CC: 200,
        CD: true,
        CE: { CEA: 'nested' },
        CF: [1, 2, 3], // ❌ CF should be string[], not number[]
      },
      DD: [],
      EE: {
        EA: { EAA: 'required' },
      },
    };
    const engine = container.get<IEngine>(IEngine);
    const { context } = engine.invoke({
      schema: TestSchemas.validateInputsSchema,
      inputs,
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Failed);
    const report = context.reporter.export();
    expect(report.messages.error[0].message).toBe(
      'JSON Schema validation failed: Expected string at CC.CF[0], but got: number'
    );
  });
  it('property "DD" expected to be array, not string', async () => {
    const inputs = {
      AA: 'hello',
      BB: 42,
      CC: {
        CA: 'world',
        CB: 100,
        CC: 200,
        CD: true,
        CE: { CEA: 'nested' },
        CF: ['item1'],
      },
      DD: 'not an array', // ❌ DD should be array, not string
      EE: {
        EA: { EAA: 'required' },
      },
    };
    const engine = container.get<IEngine>(IEngine);
    const { context } = engine.invoke({
      schema: TestSchemas.validateInputsSchema,
      inputs,
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Failed);
    const report = context.reporter.export();
    expect(report.messages.error[0].message).toBe(
      'JSON Schema validation failed: Expected array at DD, but got: string'
    );
  });
  it('missing required property "EE"', async () => {
    const inputs = {
      AA: 'hello',
      BB: 42,
      CC: {
        CA: 'world',
        CB: 100,
        CC: 200,
        CD: true,
        CE: { CEA: 'nested' },
        CF: ['item1'],
      },
      DD: [],
      // EE: { ... } // ❌ missing required property EE
    };
    const engine = container.get<IEngine>(IEngine);
    const { context } = engine.invoke({
      schema: TestSchemas.validateInputsSchema,
      inputs,
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Failed);
    const report = context.reporter.export();
    expect(report.messages.error[0].message).toBe(
      'JSON Schema validation failed: Missing required property "EE" at root'
    );
  });
  it('property "EE.EA.EAA" expected to be string, not boolean', async () => {
    const inputs = {
      AA: 'hello',
      BB: 42,
      CC: {
        CA: 'world',
        CB: 100,
        CC: 200,
        CD: true,
        CE: { CEA: 'nested' },
        CF: ['item1'],
      },
      DD: [],
      EE: {
        EA: {
          EAA: true, // ❌ EAA should be string, not boolean
        },
      },
    };
    const engine = container.get<IEngine>(IEngine);
    const { context } = engine.invoke({
      schema: TestSchemas.validateInputsSchema,
      inputs,
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Failed);
    const report = context.reporter.export();
    expect(report.messages.error[0].message).toBe(
      'JSON Schema validation failed: Expected string at EE.EA.EAA, but got: boolean'
    );
  });
  it('property "CC.CC" rejects a positive overflow: 1e309 parses to Infinity', async () => {
    const inputs = {
      AA: 'hello',
      BB: 42,
      CC: {
        CA: 'world',
        CB: 100,
        CC: JSON.parse('{"v":1e309}').v, // ❌ overflows to Infinity and would serialize back to null
        CD: true,
        CE: { CEA: 'nested' },
        CF: ['item1'],
      },
      DD: [],
      EE: {
        EA: { EAA: 'required' },
      },
    };
    const engine = container.get<IEngine>(IEngine);
    const { context } = engine.invoke({
      schema: TestSchemas.validateInputsSchema,
      inputs,
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Failed);
    const report = context.reporter.export();
    expect(report.messages.error[0].message).toBe(
      'JSON Schema validation failed: Expected number at CC.CC, but got: null'
    );
  });
  it('property "CC.CC" rejects a negative overflow: -1e309 parses to -Infinity', async () => {
    const inputs = {
      AA: 'hello',
      BB: 42,
      CC: {
        CA: 'world',
        CB: 100,
        CC: JSON.parse('{"v":-1e309}').v, // ❌ overflows to -Infinity
        CD: true,
        CE: { CEA: 'nested' },
        CF: ['item1'],
      },
      DD: [],
      EE: {
        EA: { EAA: 'required' },
      },
    };
    const engine = container.get<IEngine>(IEngine);
    const { context } = engine.invoke({
      schema: TestSchemas.validateInputsSchema,
      inputs,
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Failed);
    const report = context.reporter.export();
    expect(report.messages.error[0].message).toBe(
      'JSON Schema validation failed: Expected number at CC.CC, but got: null'
    );
  });
});
