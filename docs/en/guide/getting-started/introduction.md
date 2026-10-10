# Introduction

FlowGram is a workflow development framework and toolkit. It helps developers build AI workflow platforms **faster** and **more easily**.
FlowGram comes with a suite of built-in tools for workflow development: visual flow canvas, node configuration forms, variable scope chain, and ready-to-use materials.
Use FlowGram to build your own AI workflow platform.

## Why FlowGram

FlowGram was originally designed to build diverse AI workflow platforms within ByteDance. These large-scale workflow platforms often have complex business logic and processes, and building them from scratch is not only time-consuming but also results in high development and maintenance costs.

Many developers initially tried to use mainstream visual graphics libraries to build workflow platforms. However, these general-purpose libraries couldn't solve the core problems of workflow scenarios. Developers still had to handle a series of challenges themselves, such as node data management, dynamic forms, data validation, and variable scope chains. This led to low development efficiency and difficult long-term maintenance.

To address these pain points, we introduced FlowGram, a development framework specifically designed for workflow scenarios, aiming to help developers improve the efficiency and shorten the development cycle of creating workflow platforms. FlowGram provides the following core features:

* **Workflow Canvas**: Provides visual orchestration for nodes and edges, supporting both free and fixed layouts to easily build complex flowcharts.
* **Forms**: The form engine manages the CRUD operations of node data and provides rendering, validation, side effects, linkage, and error-capturing capabilities, simplifying the development of node configurations.
* **Variables**: The variable engine supports scope constraints, variable structure inspection, and type inference, making it easy to manage data flow within the workflow.
* **Materials**: Offers out-of-the-box components, side effects, and validators that developers can quickly reuse and extend, boosting development efficiency.

By combining these features, developers can focus on implementing business logic, thereby rapidly building full-featured, high-performance AI workflow platforms.

## Next step

Please read [Quick start](/en/guide/getting-started/quick-start.md) to start using FlowGram.

Welcome to the [GitHub Discussions](https://github.com/bytedance/flowgram.ai/discussions) and [Discord](https://discord.com/invite/SwDWdrgA9f) to communicate with us.

## Appendix: Interactive Experience

FlowGram offers a suite of interactive features designed for a seamless and intuitive workflow-building experience.

<table className="rs-table">
  <tr>
    <td>Smooth Motion Transitions</td>

    <td>
      <p>
        FlowGram provides smooth motion transitions for all canvas elements. When nodes are resized or moved, animated transitions create a more natural and intuitive user experience. Our canvas engine is optimized for performance by rendering nodes and edges separately, making these animations fluid and efficient.
      </p>

      <div className="rs-center">
        <img loading="lazy" src="/common/motion.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>Intuitive Canvas Navigation</td>

    <td>
      <p>
        Navigate the canvas with familiar gestures inspired by professional design tools like Sketch and Figma. Use a two-finger pinch-to-zoom on your touchpad, or simply hold the spacebar and drag to pan across the canvas with ease.
      </p>

      <div className="rs-center">
        <img loading="lazy" src="/common/touch-pad.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>Minimap</td>

    <td>
      <div className="rs-center">
        <img loading="lazy" src="/fixed-layout/minimap.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>Undo/Redo</td>

    <td>
      <div className="rs-center">
        <img loading="lazy" src="/fixed-layout/redo-undo.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>Copy/Paste (Shortcut Support)</td>

    <td>
      <div className="rs-center">
        <img loading="lazy" src="/fixed-layout/copypaste.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>
      <div>
        <div>Box Selection + Drag and Drop</div>
        <div>(Fixed)</div>
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
      <div>Horizontal/Vertical Layout Switch</div>
      <div>(Fixed)</div>
    </td>

    <td>
      <div className="rs-center">
        <img loading="lazy" src="/fixed-layout/layout-change.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>
      <div>Branch Folding</div>
      <div>(Fixed)</div>
    </td>

    <td>
      <div className="rs-center">
        <img loading="lazy" src="/fixed-layout/fold.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>
      <div>Grouping</div>
      <div>(Fixed)</div>
    </td>

    <td>
      <div className="rs-center">
        <img loading="lazy" src="/fixed-layout/group.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>
      Auto Layout
      <div>(Free)</div>
    </td>

    <td>
      <div className="rs-center">
        <img loading="lazy" src="/free-layout/autolayout.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>
      Snap Alignment + Guidelines
      <div>(Free)</div>
    </td>

    <td>
      <div className="rs-center">
        <img loading="lazy" src="/free-layout/snap.gif" />
      </div>
    </td>
  </tr>

  <tr>
    <td>
      Coze Loop Sub-canvas
      <div>(Free)</div>
    </td>

    <td>
      <div className="rs-center">
        <img loading="lazy" src="/free-layout/loop.gif" />
      </div>
    </td>
  </tr>
</table>
