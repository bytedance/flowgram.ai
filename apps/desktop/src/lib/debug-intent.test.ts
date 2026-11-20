/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { afterEach,expect,it,vi } from 'vitest';

import { prepareDebugIntent,takeDebugIntent } from './debug-intent';

afterEach(()=>vi.unstubAllGlobals());
it('delivers historical input only to the requested project and workflow',()=>{
  const storage=new Map<string,string>();const dispatched=vi.fn();
  vi.stubGlobal('sessionStorage',{setItem:(key:string,value:string)=>storage.set(key,value),getItem:(key:string)=>storage.get(key)||null,removeItem:(key:string)=>storage.delete(key)});
  vi.stubGlobal('window',{dispatchEvent:dispatched});
  const intent={inputs:{value:37},nodeId:'parse',bindings:{item:{orderId:'PO-0037'}},origin:{runId:'run',workflowId:'original',executionId:'round-37',requestRoot:null}};
  prepareDebugIntent('project','copy',intent);
  expect(dispatched).toHaveBeenCalledOnce();expect(takeDebugIntent('other','copy')).toBeNull();
  expect(takeDebugIntent('project','copy')).toEqual(intent);expect(takeDebugIntent('project','copy')).toBeNull();
});
