# 概念

![FlowGramAI Architecture](@/public/canvas-engine.png)

* CanvasEngine: Canvas engine is responsible for drawing the "point-line" diagram, ensuring the smoothness of large-scale nodes
* NodeEngine: Node engine provides rendering, verification, data modification, etc. form capabilities
* VariableEngine: Variable engine introduces a scope model, abstracts variables in various business scenarios
* Material: Material library includes default ICONs, etc. UI, and can be extended after business access
