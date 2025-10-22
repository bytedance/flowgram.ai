/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Field } from '@flowgram.ai/free-layout-editor';

import { FreeFormMetaStoryBuilder, FormHeader } from '../../free-form-meta-story-builder';

const CodeEditor = React.lazy(() =>
  import('@flowgram.ai/form-materials').then((module) => ({
    default: module.CodeEditor,
  }))
);

const defaultTsCode = `// Here, you can retrieve input variables from the node using 'params' and output results using 'ret'.
// 'params' has been correctly injected into the environment.
// Here's an example of getting the value of the parameter named 'input' from the node input:
// const input = params.input;
// Here's an example of outputting a 'ret' object containing multiple data types:
// const ret = { "name": 'Xiaoming', "hobbies": ["Reading", "Traveling"] };

async function main({ params }) {
  // Build the output object
  const ret = {
    key0: params.input + params.input, // Concatenate the input parameter 'input' twice
    key1: ["hello", "world"], // Output an array
    key2: { // Output an Object
      key21: "hi"
    },
  };

  return ret;
}`;

export const BasicStory = () => (
  <FreeFormMetaStoryBuilder
    filterStartNode
    filterEndNode
    height={600}
    formMeta={{
      render: () => (
        <div style={{ width: 500 }}>
          <FormHeader />
          <Field<string | undefined> name="code_editor" defaultValue={defaultTsCode}>
            {({ field }) => (
              <CodeEditor
                value={field.value}
                onChange={(value) => field.onChange(value)}
                languageId="typescript"
              />
            )}
          </Field>
        </div>
      ),
    }}
  />
);
