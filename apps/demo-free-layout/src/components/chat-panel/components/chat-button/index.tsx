/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Tooltip, IconButton } from '@douyinfe/semi-ui';
import { IconComment } from '@douyinfe/semi-icons';

import { useChatPanel } from '../../../../plugins/panel-manager-plugin/hooks';

export const ChatButton = () => {
  const { toggle } = useChatPanel();
  return (
    <Tooltip content="Chat">
      <IconButton
        type="tertiary"
        theme="borderless"
        icon={<IconComment />}
        onClick={() => toggle()}
      />
    </Tooltip>
  );
};
