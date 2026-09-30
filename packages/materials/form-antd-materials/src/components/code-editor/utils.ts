/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

export function getSuffixByLanguageId(languageId: string) {
  if (languageId === 'python') {
    return '.py';
  }
  if (languageId === 'typescript') {
    return '.ts';
  }
  if (languageId === 'shell') {
    return '.sh';
  }
  if (languageId === 'json') {
    return '.json';
  }
  if (languageId === 'sql') {
    return '.sql';
  }

  return '';
}
