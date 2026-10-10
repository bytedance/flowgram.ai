# 介绍

:::warning

本文档的变量引擎属于 FlowGram **设计态**，和运行态的变量引擎不同。

:::

## 阅读路径

* 在这里先建立「变量是什么」以及「为什么需要变量引擎」的整体心智。
* 接下来建议直接上手：[输出变量](/guide/variable/variable-output.md) → [消费变量](/guide/variable/variable-consume.md)，先学会如何在节点中产出变量，再去读取。
* 当在实践中遇到作用域或类型等疑问时，再回到[核心概念](/guide/variable/concept.md)查阅详细术语。

## 什么是变量？

想象一下，你在搭建一个复杂的乐高模型，每个模块都需要精确地连接在一起。在工作流（Workflow）的世界里，**变量**就扮演着类似“连接件”的角色。它们是用来在不同节点之间传递信息的“信使”。

简单来说，变量就是一个带名字的容器，你可以往里面装各种东西，比如用户的输入、计算结果，或者从某个地方获取的数据。

一个变量通常由三部分组成：

* **名字（唯一标识符）**：类似个人姓名，用于准确定位某个变量。例如 `userName`、`orderId`。
* **值**：容器里装的东西。它可以是数字 `123`，文字 `"Hello FlowGram!"`，或者一个开关状态 `true` / `false`。
* **类型**：规定了这个容器能装哪种东西。比如，有的只能装数字，有的只能装文字。

***

举个例子，在一个“智能问答”流程中：

<div style={{display: 'flex', gap: '20px'}}>
  <img style={{width: "50%"}} loading="lazy" src="/variable/variable-biz-context-websearch-llm.png" alt="智能问答流程" />

  <div>
    <p style={{marginTop: 10}}>1. **`WebSearch` 节点**：负责上网搜索，然后把搜到的知识（比如“今天天气怎么样？”的答案）放进一个名为 `natural_language_desc` 的变量里。</p>
    <p style={{marginTop: 5}}>2. **`LLM` 节点**：它会接过 `natural_language_desc` 这个“信使”，读取里面的内容，然后用更自然、更友好的方式回答用户。</p>
    <p style={{marginTop: 5}}>3. 在这个过程中，`natural_language_desc` 的类型就是“字符串”，因为它装的是文字内容。</p>
  </div>
</div>

### 设计态定义 vs. 运行态取值

在**设计态**（绘制流程时），我们只需要确定变量的**定义**：名字、类型以及可选的元信息。变量引擎会把这些定义管理成结构化的数据。

到了**运行态**，FlowGram 会依据这些定义为每次执行赋值。因此在设计时，先关注结构与约束；在运行时，所有节点就能依赖这些定义稳定地读写实际数据。

## 为什么需要变量引擎？

随着工作流复杂度的提升，变量的数量和管理难度也随之增加。

为了应对这一挑战，FlowGram 提供了强大的**变量引擎**。

它如同一位专业的“数据管家”，能够系统化地管理所有变量，确保数据流的清晰与稳定。

启用变量引擎将为您带来以下核心优势：

<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
  <div style={{ gridColumn: "span 2" }}>
    <b>作用域约束：精准的数据访问控制</b>
    <p className="rs-tip">变量引擎能够精确控制每个变量的有效范围（即作用域）。如同为不同房间配置专属钥匙，它确保了变量只在预期的节点中被访问，从而有效避免了数据污染和意外的逻辑错误。</p>

    <div style={{display: "flex", gap: "25px"}}>
      <div>
        <img loading="lazy" src="/variable/variable-scope-feature-1.png" alt="作用域约束示例 1" />

        <p style={{marginTop: '10px'}}>`Start` 节点定义的 `query` 变量，在它后面的 `LLM` 和 `End` 节点都能轻松访问。</p>
      </div>

      <div>
        <img loading="lazy" src="/variable/variable-scope-feature-2.png" alt="作用域约束示例 2" />

        <p style={{marginTop: '10px'}}>`LLM` 节点处于 `Condition` 分支，等同于位于独立空间；外部的 `End` 节点无法访问其 `result` 变量。</p>
      </div>
    </div>
  </div>

  <div>
    <b>变量结构透视：轻松洞悉复杂数据</b>
    <p className="rs-tip">当变量结构较复杂（例如包含多层嵌套的对象）时，变量引擎支持逐层展开，便于定位每一项数据。</p>

    <img loading="lazy" src="/variable/variable-tree-management.gif" alt="变量结构透视" />

    <p style={{marginTop: '10px'}}>下图展示了所有节点的输出变量与层级关系，便于整体审视变量结构。</p>
  </div>

  <div>
    <b>类型自动推导：心有灵犀一点通</b>
    <p className="rs-tip">无需为每个变量逐一指定类型，变量引擎可依据上下文自动完成推导。</p>

    <img loading="lazy" src="/variable/variable-batch-auto-infer.gif" alt="类型自动推导" />

    <p style={{marginTop: '10px'}}>例如，当 `Start` 节点中 `arr` 变量的类型发生变更时，`Batch` 节点输出的 `item` 类型也会自动同步更新，确保了类型的一致性。</p>
  </div>
</div>

:::tip

建议先把变量读写跑通；当你需要深入理解作用域链、AST、声明、表达式等底层模型时，再阅读[变量概念](/guide/variable/concept.md)。

:::

## 如何开启变量引擎？

您可以通过简单的配置来启用变量引擎，以体验其强大的功能。

[> 查看 API 详情](https://flowgram.ai/auto-docs/editor/interfaces/VariablePluginOptions.html)

```tsx pure title="use-editor-props.ts" {3}
// 在 EditorProps 中开启变量引擎
{
  variableEngine: {
    // 设置为 true 即可开启变量引擎
    enable: true
  }
}
```

## 接下来可以看看（推荐顺序）

* [输出变量](/guide/variable/variable-output.md)：先学会在节点、插件、全局作用域中产出变量。
* [消费变量](/guide/variable/variable-consume.md)：再学习如何在节点、UI 中安全读取变量。
* [变量概念](/guide/variable/concept.md)：最后回顾作用域、AST、声明、类型等核心名词。
