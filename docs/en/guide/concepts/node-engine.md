# Node Engine

The Node Engine is a framework for writing the logic of process nodes. It allows businesses to focus on their own rendering and data logic without having to worry about the underlying APIs of the canvas and the interaction between nodes. At the same time, the Node Engine has precipitated the best practices for writing nodes, which helps businesses solve various problems that may arise in process - related business, such as the coupling of data logic and rendering.

The Node Engine is optional. If you don't have the following complex node logic, you can choose not to enable the Node Engine and maintain node data and rendering on your own. Examples of complex node logic include: 1) The ability to validate or trigger data side - effects even when nodes are not rendered; 2) Rich interaction between nodes; 3) Redo/undo functionality; and so on.

## Basic Concepts

### FlowNodeEntity

The process node model.

### FlowNodeRegistry

The static configuration of process nodes.

### FormMeta

The static configuration of the Node Engine. It is configured in the `formMeta` field of the `FlowNodeRegistry`.

### Form

The form in the Node Engine. It maintains the data of nodes and provides capabilities such as rendering, validation, and side - effects. Its model, `FormModel`, provides the ability to access and modify node data and trigger validations.

### Field

A rendering field in the node form. Note that the `Form` has already provided the data - layer logic, and the `Field` is more of a rendering - layer model. It only exists after the form field is rendered.

### validate

Form validation. Usually, there is validation for individual fields as well as overall form validation.

### effect

Side - effects of form data. Usually, it refers to triggering specific logic when certain events occur to the form data. For example, synchronizing some information to a certain store when the data of a certain field changes can be called an effect.

### FormPlugin

Form plugins. They can be configured in the `formMeta`. Plugins can perform a series of in - depth operations on the form, such as variable plugins.
