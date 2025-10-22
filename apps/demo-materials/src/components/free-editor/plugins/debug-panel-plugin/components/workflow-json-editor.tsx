/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useMemo, useState } from 'react';

import { useClientContext } from '@flowgram.ai/free-layout-editor';
import { JsonCodeEditor } from '@flowgram.ai/form-materials';
import { Button } from '@douyinfe/semi-ui';

export function WorkflowJsonEditor() {
  const ctx = useClientContext();

  const initJson = useMemo(() => JSON.stringify(ctx.document?.toJSON() || {}, null, 2) || '', []);

  const [json, setJson] = useState<string>(initJson);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const handleJsonChange = (newJson: string) => {
    if (newJson === json) {
      return;
    }
    setJson(newJson);
    setIsUpdated(true);
  };

  const handleSync = () => {
    try {
      const newJson = JSON.parse(json);
      ctx.document?.reload(newJson);
    } catch (e) {
      console.error('Invalid JSON', e);
    }
  };

  // const handleRefresh = () => {
  //   setJson(JSON.stringify(ctx.document?.toJSON() || {}, null, 2));
  //   setIsUpdated(false);
  // };

  return (
    <div>
      <div style={{ display: 'flex', gap: 5, marginBottom: 5 }}>
        {isUpdated && <Button onClick={handleSync}>Sync</Button>}
      </div>

      <JsonCodeEditor value={json} onChange={handleJsonChange} options={{ minHeight: 300 }} />
    </div>
  );
}
