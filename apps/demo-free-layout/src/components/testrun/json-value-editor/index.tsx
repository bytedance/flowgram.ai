/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useMemo, useRef, useState } from 'react';

import { JsonCodeEditor } from '@flowgram.ai/form-materials';

export function JsonValueEditor({
  value,
  onChange,
}: {
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
}) {
  const defaultJsonText = useMemo(() => JSON.stringify(value, null, 2), [value]);

  const [jsonText, setJsonText] = useState(defaultJsonText);

  const effectVersion = useRef(0);
  const changeVersion = useRef(0);

  const handleJsonTextChange = (text: string) => {
    setJsonText(text);
    try {
      const jsonValue = JSON.parse(text);
      onChange(jsonValue);
      changeVersion.current++;
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    // more effect compared with change
    effectVersion.current = effectVersion.current + 1;
    if (effectVersion.current === changeVersion.current) {
      return;
    }
    effectVersion.current = changeVersion.current;

    setJsonText(JSON.stringify(value, null, 2));
  }, [value]);

  return <JsonCodeEditor value={jsonText} onChange={handleJsonTextChange} />;
}
