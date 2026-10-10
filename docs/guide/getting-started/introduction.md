# 简介

FlowGram 是一个工作流开发框架与工具集。帮助开发者以更快、更简单的方式搭建 AI 工作流平台。
FlowGram 内置开箱开箱即用的工作流开发能力：可视化流程画布、节点配置表单、变量作用域链，以及开箱即用的物料。
使用 FlowGram 构建你自己的 AI 工作流平台吧。

## 为什么选择 FlowGram

FlowGram 的诞生源于字节跳动内部构建多样化 AI 工作流平台的需求。
这些平台通常具有复杂的业务逻辑和流程，从零开始构建不仅耗时，而且开发和维护成本极高。

许多开发者最初尝试使用业界主流的图形可视化库来搭建工作流平台。
然而，这些通用库无法解决工作流场景下的核心问题，开发者仍需自行处理节点数据管理、动态表单、数据校验、变量作用域链等一系列难题，这导致开发效率低下且后期维护困难。

为了解决这些痛点，我们推出了 FlowGram，一个专为工作流场景设计的开发框架，旨在帮助开发者提升工作流平台的开发效率、缩短开发周期。
FlowGram 提供了以下核心功能：

* **流程画布**：提供可视化的节点、边的编排能力，同时支持自由布局和固定布局，可以轻松构建复杂的流程图。
* **表单**：表单引擎维护节点数据的增删查改，并提供渲染、校验、副作用、联动、错误捕获等能力，简化了节点配置的开发。
* **变量**：变量引擎支持作用域约束、变量结构透视、类型推导等能力，方便管理流程中的数据流转。
* **物料**：提供开箱即用的组件、副作用、校验器等物料，开发者可以快速复用和扩展，提升开发效率。

借助这些功能，开发者可以将精力聚焦于业务逻辑的实现，从而快速构建出功能完善、性能卓越的 AI 工作流平台。

## 下一步

请阅读 [快速上手](/guide/getting-started/quick-start.md) 来开始使用 FlowGram。

欢迎到通过 [注册飞书](https://www.feishu.cn/en/) 并扫描下边的二维码加入飞书群，来与我们交流

<img src="/lark-group.png" width="200" />

## 附：交互体验

FlowGram 提供一套交互的最佳实践，让操作流程更加丝滑

<table className="rs-table">
  <tr>
    <td>Motion 过渡动画</td>

    <td>
      <p>
        Motion 动画在 Web 端应用可追溯到 Material Design，里边提到元素的变化如宽高或位置需要一个过渡过程，画布引擎会把线条和节点拆分单独绘制，使实现 Motion 过渡动画成本大大降低
      </p>

      <div className="rs-center">
        <img loading="lazy" src="/common/motion.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>触摸板手势缩放 + 空格自由拖动画布</td>

    <td>
      <p>
        手势指在 Mac 触摸板两指展开/合并可以实现画布放大/缩小，或者按住空格拖动画布，交互借鉴 Sketch、Figma
      </p>

      <div className="rs-center">
        <img loading="lazy" src="/common/touch-pad.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>缩略图</td>

    <td>
      <div className="rs-center">
        <img loading="lazy" src="/fixed-layout/minimap.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>撤销/重做</td>

    <td>
      <div className="rs-center">
        <img loading="lazy" src="/fixed-layout/redo-undo.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>复制/粘贴(支持快捷键)</td>

    <td>
      <div className="rs-center">
        <img loading="lazy" src="/fixed-layout/copypaste.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>
      <div>
        <div>框选 + 拖拽</div>
        <div>(固定)</div>
      </div>
    </td>

    <td>
      <div className="rs-center">
        <div className="rs-center">
          <img loading="lazy" src="/fixed-layout/dragdrop.gif" />
        </div>
      </div>
    </td>
  </tr>

  <tr>
    <td>
      <div>水平/垂直布局切换</div>
      <div>(固定)</div>
    </td>

    <td>
      <div className="rs-center">
        <img loading="lazy" src="/fixed-layout/layout-change.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>
      <div>分支折叠</div>
      <div>(固定)</div>
    </td>

    <td>
      <div className="rs-center">
        <img loading="lazy" src="/fixed-layout/fold.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>
      <div>分组</div>
      <div>(固定)</div>
    </td>

    <td>
      <div className="rs-center">
        <img loading="lazy" src="/fixed-layout/group.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>
      自动整理
      <div>(自由)</div>
    </td>

    <td>
      <div className="rs-center">
        <img loading="lazy" src="/free-layout/autolayout.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>
      吸附对齐 + 参考线
      <div>(自由)</div>
    </td>

    <td>
      <div className="rs-center">
        <img loading="lazy" src="/free-layout/snap.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>
      Coze Loop 子画布
      <div>(自由)</div>
    </td>

    <td>
      <div className="rs-center">
        <img loading="lazy" src="/free-layout/loop.gif" />
      </div>
    </td>
  </tr>
</table>
