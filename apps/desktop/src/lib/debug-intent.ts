/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
export interface DebugOrigin {
  runId:string;
  workflowId:string;
  executionId:string|null;
  requestRoot:string|null;
}
export interface DebugIntent {
  inputs:Record<string,unknown>;
  bindings?:Record<string,unknown>;
  nodeId?:string;
  origin:DebugOrigin;
}
const key=(project:string,workflow:string)=>`flowgram.debug.${project}.${workflow}`;
export function prepareDebugIntent(project:string,workflow:string,intent:DebugIntent) {
  sessionStorage.setItem(key(project,workflow),JSON.stringify(intent));
  window.dispatchEvent(new Event('flowgram:debug-inputs'));
}
export function takeDebugIntent(project:string,workflow:string):DebugIntent|null {
  const stored=sessionStorage.getItem(key(project,workflow));
  if(!stored)return null;
  const intent=JSON.parse(stored) as DebugIntent;
  sessionStorage.removeItem(key(project,workflow));
  return intent;
}
