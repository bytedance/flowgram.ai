/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { tx, localized } from './i18n';
import {
  ArrowRightLeft,
  Braces,
  Bot,
  Clock3,
  FileJson,
  GitBranch,
  Globe,
  ListFilter,
  LogIn,
  LogOut,
  Repeat2,
  Sparkles,
  Type,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import type { WorkflowNode, WorkflowSchema } from "./types";
import { atomicNodes } from "./atomic-nodes";
import { controlNodes, isLoop } from "./control-nodes";

const constant = (content: unknown) => ({ type: "constant", content });
const reference = (...content: string[]) => ({ type: "ref", content });
export interface NodeCatalogEntry {
  type: string;
  title: string;
  group: string;
  description: string;
  icon: LucideIcon;
  tone: string;
  defaults: Record<string, unknown>;
  hidden?: boolean;
}
export const nodeCatalog: NodeCatalogEntry[] = localized(([
  {
    type: "start",
    title: "流程输入",
    group: "基础",
    description: "定义这个流程接收的业务数据",
    icon: LogIn,
    tone: "green",
    defaults: {
      outputs: { type: "object", properties: { message: { type: "string" } } },
    },
  },
  {
    type: "end",
    title: "流程输出",
    group: "基础",
    description: "返回结果给调用者",
    icon: LogOut,
    tone: "green",
    defaults: { inputsValues: { result: constant("") } },
  },
  {
    type: "assign",
    title: "设置变量",
    group: "数据处理",
    description: "选择字段、设置固定值或引用上游输出",
    icon: ArrowRightLeft,
    tone: "blue",
    defaults: { inputsValues: { result: constant("") } },
  },
  {
    type: "template",
    title: "文本模板",
    group: "数据处理",
    description: "把节点输出组合为消息、邮件或提示词",
    icon: Type,
    tone: "blue",
    defaults: {
      inputsValues: {
        text: { type: "template", content: "你好，{{start.name}}" },
      },
    },
  },
  {
    type: "json-parse",
    title: "解析 JSON",
    group: "数据处理",
    description: "把接口或模型返回的 JSON 文本变为数据",
    icon: FileJson,
    tone: "blue",
    defaults: { inputsValues: { text: constant('{"name":"FlowGram"}') } },
  },
  {
    type: "json-stringify",
    title: "生成 JSON",
    group: "数据处理",
    description: "把业务数据序列化为 JSON 文本",
    icon: Braces,
    tone: "blue",
    defaults: { inputsValues: { value: constant({}) } },
  },
  {
    type: "text",
    title: "处理文本",
    group: "数据处理",
    description: "去空格、替换、分割与大小写转换",
    icon: Type,
    tone: "blue",
    defaults: {
      inputsValues: { text: constant(""), operation: constant("trim") },
    },
  },
  {
    type: "array",
    title: "处理列表",
    group: "数据处理",
    description: "去重、合并、取首尾项或统计数量",
    icon: ListFilter,
    tone: "blue",
    defaults: {
      inputsValues: { items: constant([]), operation: constant("unique") },
    },
  },
  {
    type: "llm",
    title: "模型处理",
    group: "AI",
    description: "摘要、翻译、分类与内容生成",
    icon: Sparkles,
    tone: "clay",
    defaults: { inputsValues: { prompt: constant("") } },
  },
  {
    type: "agent",
    title: "Agent",
    group: "AI",
    description: "通过多步推理与只读工作流工具完成目标",
    icon: Bot,
    tone: "clay",
    defaults: {
      inputsValues: {
        prompt: constant("Inspect the project workflows and summarize reusable flows."),
        maxSteps: constant(6),
      },
    },
  },
  {
    type: "http",
    title: "HTTP 请求",
    group: "连接",
    description: "调用业务接口与 Webhook",
    icon: Globe,
    tone: "blue",
    defaults: {
      inputsValues: {
        url: constant("https://example.com"),
        method: constant("GET"),
      },
    },
  },
  {
    type: "subworkflow",
    title: "调用工作流",
    group: "连接",
    description: "复用同一项目中的流程，传入数据并取得结果",
    icon: Workflow,
    tone: "blue",
    defaults: {
      inputsValues: { workflowId: constant(""), inputs: reference("start") },
    },
  },
  {
    type: "condition",
    title: "条件分支",
    group: "流程控制",
    description: "根据条件选择通过或否则路径",
    icon: GitBranch,
    tone: "amber",
    defaults: {
      conditions: [
        {
          key: "true",
          value: {
            left: reference("start", "score"),
            operator: "gt",
            right: constant(60),
          },
        },
      ],
    },
  },
  {
    type: "loop",
    title: "遍历列表",
    group: "流程控制",
    description: "对列表中的每一项执行子流程",
    icon: Repeat2,
    tone: "amber",
    defaults: { loopFor: reference("start", "items"), loopOutputs: {} },
  },
  {
    type: "delay",
    title: "等待",
    group: "流程控制",
    description: "控制调用间隔，支持立即取消",
    icon: Clock3,
    tone: "amber",
    defaults: { inputsValues: { durationMs: constant(1000) } },
  },
] as NodeCatalogEntry[]).filter((node) => !controlNodes.some((control) => control.type === node.type)).map<NodeCatalogEntry>((node) => ({ ...node, hidden: ['assign', 'template', 'json-parse', 'json-stringify', 'text', 'array'].includes(node.type) })).concat([...atomicNodes, ...controlNodes].map((node) => ({
  type: node.type, title: node.title, group: node.group, description: node.description,
  tone: 'blue', icon: node.group === tx("流程控制") ? GitBranch : node.group === tx("列表与表格") ? ListFilter : node.group === tx("文本与数值") ? Type : Braces,
  defaults: node.defaults,
})))) ;
export function nodeSpec(type: string) {
  if (type === "block-start") return { ...nodeCatalog[0], title: tx("当前项") };
  if (type === "block-end") return { ...nodeCatalog[1], title: tx("本项结果") };
  return nodeCatalog.find((node) => node.type === type) || nodeCatalog[2];
}
export function createNode(type: string, index: number): WorkflowNode {
  const spec = nodeSpec(type);
  const id = `${type.replace(/[^a-zA-Z0-9_-]/g, "_")}_${crypto.randomUUID().slice(0, 8)}`;
  const node: WorkflowNode = {
    id,
    type,
    meta: {
      position: {
        x: 140 + (index % 3) * 340,
        y: 340 + Math.floor(index / 3) * 180,
      },
    },
    data: { title: spec.title, ...structuredClone(spec.defaults) },
  };
  if (isLoop(type)) {
    node.blocks = [
      {
        id: `${id}_in`,
        type: "block-start",
        data: { title: type === "control.repeat" ? tx("循环状态") : tx("当前项") },
        meta: { position: { x: 50, y: 80 } },
      },
      {
        id: `${id}_out`,
        type: "block-end",
        data: { title: type === "control.repeat" ? tx("本轮状态") : tx("本项结果") },
        meta: { position: { x: 400, y: 80 } },
      },
    ];
    if (type === 'loop') {
      node.data.loopOutputs = { items: reference(`${id}_out`, 'item') };
      node.blocks[1].data.inputsValues = { item: reference(`${id}_in`, 'item') };
    } else {
      node.data.stateUpdates = {};
      node.blocks[1].data.inputsValues = { state: reference(`${id}_in`, 'state') };
    }
    node.edges = [{ sourceNodeID: `${id}_in`, targetNodeID: `${id}_out` }];
  }
  return node;
}
const node = (
  id: string,
  type: string,
  x: number,
  data: Record<string, unknown>,
): WorkflowNode => ({
  id,
  type,
  meta: { position: { x, y: 160 } },
  data: { title: nodeSpec(type).title, ...data },
});
const edge = (sourceNodeID: string, targetNodeID: string) => ({
  sourceNodeID,
  targetNodeID,
});
export const workflowTemplates: Array<{
  id: string;
  name: string;
  description: string;
  inputs: Record<string, unknown>;
  schema: WorkflowSchema;
}> = localized([
  {
    id: "text",
    name: "清理业务文本",
    description: "去除多余空格，输出规范文本",
    inputs: { text: "  Hello FlowGram  " },
    schema: {
      nodes: [
        node("start", "start", 80, {
          outputs: { type: "object", properties: { text: { type: "string" } } },
        }),
        node("clean", "text", 440, {
          inputsValues: {
            text: reference("start", "text"),
            operation: constant("trim"),
          },
        }),
        node("end", "end", 800, {
          inputsValues: { result: reference("clean", "result") },
        }),
      ],
      edges: [edge("start", "clean"), edge("clean", "end")],
    },
  },
  {
    id: "json",
    name: "解析客户数据",
    description: "从 JSON 中读取客户名称并生成问候",
    inputs: { text: '{"name":"FlowGram"}' },
    schema: {
      nodes: [
        node("start", "start", 80, {
          outputs: { type: "object", properties: { text: { type: "string" } } },
        }),
        node("parse", "json-parse", 440, {
          inputsValues: { text: reference("start", "text") },
        }),
        node("greet", "template", 800, {
          inputsValues: {
            text: {
              type: "template",
              content: "你好，{{parse.result.name}}！",
            },
          },
        }),
        node("end", "end", 1160, {
          inputsValues: { greeting: reference("greet", "result") },
        }),
      ],
      edges: [
        edge("start", "parse"),
        edge("parse", "greet"),
        edge("greet", "end"),
      ],
    },
  },
  {
    id: "list",
    name: "列表去重",
    description: "整理重复业务数据，保留原始顺序",
    inputs: { items: ["A", "B", "A"] },
    schema: {
      nodes: [
        node("start", "start", 80, {
          outputs: { type: "object", properties: { items: { type: "array" } } },
        }),
        node("unique", "array", 440, {
          inputsValues: {
            items: reference("start", "items"),
            operation: constant("unique"),
          },
        }),
        node("end", "end", 800, {
          inputsValues: { items: reference("unique", "result") },
        }),
      ],
      edges: [edge("start", "unique"), edge("unique", "end")],
    },
  },
  {
    id: "summary",
    name: "内容摘要",
    description: "将长文本整理成重点与行动项",
    inputs: { text: "" },
    schema: {
      nodes: [
        node("start", "start", 80, {
          outputs: { type: "object", properties: { text: { type: "string" } } },
        }),
        node("summary", "llm", 440, {
          inputsValues: {
            prompt: {
              type: "template",
              content: "Summarize the key points and action items in the following content:\n{{start.text}}",
            },
          },
        }),
        node("end", "end", 800, {
          inputsValues: { summary: reference("summary", "result") },
        }),
      ],
      edges: [edge("start", "summary"), edge("summary", "end")],
    },
  },
]);
