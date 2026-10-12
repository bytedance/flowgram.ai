/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useLayoutEffect } from 'react';

import { useInjector } from '@flowgram.ai/coze-editor/react';
import { languageSupport } from '@flowgram.ai/coze-editor/preset-prompt';

function LanguageSupport() {
  const injector = useInjector();

  useLayoutEffect(() => injector.inject([languageSupport]), [injector]);

  return null;
}

export default LanguageSupport;
