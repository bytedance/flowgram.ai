# 数组

import { NodeFormArrayPreview } from '../../../../components/node-form/array/preview';

以下例子展示了数组的基本用法，包含：

* 基本写法（渲染、增删）。
* 如何对数组每项配置校验逻辑。 此处的校验规则为每项最大长度不超过8个英文字符。
* 如何对数组每项配置副作用。 此处的副作用为每项在初始化时控制台输出 `${name} value init to ${value}`, 值变更时输出 `${name} value changed to ${value}`
* 数组项如何做交换。

<NodeFormArrayPreview />
