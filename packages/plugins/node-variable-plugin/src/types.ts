/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  Scope,
  type ASTNodeJSON,
  type VariableDeclarationJSON,
} from '@flowgram.ai/variable-plugin';
import { Disposable } from '@flowgram.ai/utils';
import { EffectFuncProps } from '@flowgram.ai/node';
import { FlowNodeEntity } from '@flowgram.ai/document';

export interface VariableAbilityCommonContext {
  node: FlowNodeEntity; // 节点
  scope: Scope; // 作用域
  options: VariableAbilityOptions;
  name: string; // 表单字段名
  formValues: EffectFuncProps['formValues']; // 表单值
  form: EffectFuncProps['form'];
}

export interface VariableAbilityInitCtx extends VariableAbilityCommonContext {}

export interface VariableAbilityOptions {
  /**
   * @deprecated use scope: 'private'
   */
  private?: boolean;
  // 生成 AST 在抽象语法树中的索引，默认用 formItem 的 Path 作为 namespace
  namespace?: string;
  // 输出变量的作用域类型，默认为 public
  scope?: 'private' | 'public';
  // 初始化，可以进行额外的操作监听
  onInit?: (ctx: VariableAbilityInitCtx) => Disposable | undefined;
  // 扩展字段，可以在 ability onInit 时进行一些额外操作
  [key: string]: any;
}

export interface VariableAbilityParseContext extends VariableAbilityCommonContext {}

export interface VariableProviderAbilityOptions<V = any> extends VariableAbilityOptions {
  // 解析变量协议
  parse: (
    v: V,
    ctx: VariableAbilityParseContext
  ) => VariableDeclarationJSON | VariableDeclarationJSON[];
}

export interface VariableConsumerAbilityOptions<V = any> extends VariableAbilityOptions {
  // 解析变量协议
  parse: (v: V, ctx: VariableAbilityParseContext) => ASTNodeJSON | undefined;
}
