# 概念

![FlowGramAI 架构](@/public/canvas-engine.png)

* CanvasEngine：画布引擎负责绘制“点-线”构成的图, 保障大规模节点时的流畅性
* NodeEngine: 节点引擎提供 渲染、校验、数据修改等表单能力
* VariableEngine: 变量引擎引入作用域模型, 抽象各业务场景的变量
* Material: 物料库包含默认 ICON 等 UI, 业务接入后可覆盖扩展
