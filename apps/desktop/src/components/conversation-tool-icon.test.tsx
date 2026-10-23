/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Plug, Wrench } from 'lucide-react';

import { ConversationToolIcon, conversationToolIcon } from './conversation-tool-icon';

const tools = [
  'read_tool_result',
  'list_models',
  'list_node_types',
  'list_workflows',
  'inspect_workflow',
  'create_workflow',
  'save_workflow',
  'layout_workflow',
  'validate_workflow',
  'run_workflow',
  'get_run',
  'test_node',
];
describe('conversation tool identity', () => {
  it('gives every built-in tool a distinct semantic icon instead of a shared success mark', () => {
    const icons = tools.map(conversationToolIcon);
    expect(new Set(icons).size).toBe(tools.length);
    expect(icons).not.toContain(Wrench);
    const markup = tools.map((name) =>
      renderToStaticMarkup(<ConversationToolIcon names={[name]} />)
    );
    expect(new Set(markup).size).toBe(tools.length);
    expect(
      markup.every((svg) => svg.includes('aria-hidden="true"') && !svg.includes('lucide-check'))
    ).toBe(true);
  });
  it('reuses built-in identity for MCP calls with safe fallbacks for unrecognized tools', () => {
    expect(conversationToolIcon('mcp__workflow__inspect_workflow')).toBe(
      conversationToolIcon('inspect_workflow')
    );
    expect(conversationToolIcon('mcp__custom__lookup')).toBe(Plug);
    expect(conversationToolIcon('custom_tool')).toBe(Wrench);
    expect(conversationToolIcon('constructor')).toBe(Wrench);
    expect(conversationToolIcon()).toBe(Wrench);
  });
  it('keeps homogeneous summaries specific and identifies mixed groups without a success icon', () => {
    const single = renderToStaticMarkup(<ConversationToolIcon names={['inspect_workflow']} />);
    const repeated = renderToStaticMarkup(
      <ConversationToolIcon names={['inspect_workflow', 'inspect_workflow']} />
    );
    expect(repeated).toBe(single);
    const mixed = renderToStaticMarkup(
      <ConversationToolIcon names={['inspect_workflow', 'save_workflow']} />
    );
    expect(mixed).toContain('lucide-layers');
    expect(mixed).not.toBe(single);
    expect(mixed).toContain('aria-hidden="true"');
  });
});
