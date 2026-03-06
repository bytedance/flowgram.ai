/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { getQuickJS, shouldInterruptAfterDeadline } from 'quickjs-emscripten';
import {
  CodeNodeSchema,
  ExecutionContext,
  ExecutionResult,
  FlowGramNode,
  INode,
  INodeExecutor,
} from '@flowgram.ai/runtime-interface';

export interface CodeExecutorInputs {
  params: Record<string, any>;
  script: {
    language: 'javascript';
    content: string;
  };
}

export class CodeExecutor implements INodeExecutor {
  public readonly type = FlowGramNode.Code;

  public async execute(context: ExecutionContext): Promise<ExecutionResult> {
    const inputs = this.parseInputs(context);
    if (inputs.script.language === 'javascript') {
      return this.javascript(inputs);
    }
    throw new Error(`Unsupported code language "${inputs.script.language}"`);
  }

  private parseInputs(context: ExecutionContext): CodeExecutorInputs {
    const codeNode = context.node as INode<CodeNodeSchema['data']>;
    const params = context.inputs;
    const { language, content } = codeNode.data.script;
    if (!content) {
      throw new Error('Code content is required');
    }
    return {
      params,
      script: {
        language,
        content,
      },
    };
  }

  private async javascript(inputs: CodeExecutorInputs): Promise<ExecutionResult> {
    const { params = {}, script } = inputs;

    // Serialize before allocating WASM resources – fails fast on circular references.
    const serializedParams = JSON.stringify(params);

    const QuickJS = await getQuickJS();

    // Each execution gets an isolated context; no host globals are exposed by default.
    const context = QuickJS.newContext();
    try {
      // Apply resource limits on the underlying runtime.
      const runtime = context.runtime;
      runtime.setMemoryLimit(32 * 1024 * 1024); // 32 MB
      runtime.setMaxStackSize(512 * 1024); // 512 KB
      // Interrupt execution if it runs longer than 1 minute.
      runtime.setInterruptHandler(shouldInterruptAfterDeadline(Date.now() + 60_000));

      // Wrap user code: define main, inject params, call main, return result.
      const wrappedCode = `
'use strict';

${script.content}

if (typeof main !== 'function') {
  throw new Error('main function is required in the script');
}

const __params__ = ${serializedParams};
main({ params: __params__ });
`;

      const evalResult = context.evalCode(wrappedCode);
      const resultHandle = context.unwrapResult(evalResult);

      let rawResult: unknown;

      try {
        const promiseState = context.getPromiseState(resultHandle);
        if (promiseState.type === 'fulfilled') {
          rawResult = context.dump(promiseState.value);
          promiseState.value.dispose();
        } else if (promiseState.type === 'rejected') {
          const errMsg = context.dump(promiseState.error);
          promiseState.error.dispose();
          throw new Error(typeof errMsg === 'string' ? errMsg : JSON.stringify(errMsg));
        } else {
          // Pending promise: resolve asynchronously via the QuickJS event loop.
          const resolvedResult = await context.resolvePromise(resultHandle);
          const resolvedHandle = context.unwrapResult(resolvedResult);
          rawResult = context.dump(resolvedHandle);
          resolvedHandle.dispose();
        }
      } finally {
        resultHandle.dispose();
      }

      // Ensure result is a plain object.
      const outputs =
        rawResult && typeof rawResult === 'object' && !Array.isArray(rawResult)
          ? (rawResult as Record<string, unknown>)
          : { result: rawResult };

      return { outputs };
    } catch (error: any) {
      throw new Error(`Code execution failed: ${error.message}`);
    } finally {
      // Always release WASM memory for this execution context.
      context.dispose();
    }
  }
}
