/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { RunInspector, type RunInspectorProps } from './run-inspector/run-inspector';

/** One inspector for workspace, conversation, and published-runtime runs. */
export function RunPage(props: RunInspectorProps) {
  return <RunInspector key={props.id} {...props} />;
}
