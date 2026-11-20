/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

const { defineFlatConfig } = require('@flowgram.ai/eslint-config');

module.exports = defineFlatConfig({
  preset: 'web',
  packageRoot: __dirname,
  rules: {
    'react/prop-types': 'off',
    'no-console': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector:
          'JSXOpeningElement[name.name="select"], JSXOpeningElement[name.name="option"], JSXSelfClosingElement[name.name="select"], JSXSelfClosingElement[name.name="option"]',
        message:
          'Use the shared ui/select component with options and onValueChange instead of native dropdowns.',
      },
    ],
  },
  settings: { react: { version: 'detect' } },
});
