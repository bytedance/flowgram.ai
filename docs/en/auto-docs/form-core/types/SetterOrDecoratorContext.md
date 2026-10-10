# Type alias: SetterOrDecoratorContext

**SetterOrDecoratorContext**: `Omit`<[`FormItemMaterialContext`](/en/auto-docs/form-core/interfaces/FormItemMaterialContext.md), `"getFormItemValueByPath"` | `"readonly"`>

Setter context 是 FormItemMaterialContext 的外观
基于外观设计模式设计，屏蔽了FormItemMaterialContext中一些setter不可见的接口
readonly: 对于setter 已经放在props 根级别，所以在这里屏蔽，防止干扰
getFormItemValueByPath: setter需通过表单联动方式获取其他表单项的值，不推荐是用这个方法，所以屏蔽
