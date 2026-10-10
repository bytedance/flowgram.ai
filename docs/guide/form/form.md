# 节点表单

## 术语

<table className="rs-table">
  <tr>
    <td>节点表单</td>
    <td>特指流程节点内的表单或点击节点展开的表单，关联节点数据。</td>
  </tr>

  <tr>
    <td>节点引擎</td>
    <td>FlowGram.ai 内置的引擎之一，它核心维护了节点数据的增删查改，并提供渲染、校验、副作用、画布或变量联动等能力， 除此之外，它还提供节点错误捕获渲染、无内容时的 placeholder 渲染等能力，见以下章节例子。</td>
  </tr>
</table>

## 快速开始

### 开启节点引擎

[> API Detail](https://github.com/bytedance/flowgram.ai/blob/main/packages/client/editor/src/preset/editor-props.ts#L54)

```tsx pure title="use-editor-props.ts" {3}

// EditorProps
{
  nodeEngine: {
    /**
     * 需要开启节点引擎才能使用
     */
    enable: true;
    materials: {
      /**
       * 节点内部报错的渲染组件
       */
      nodeErrorRender?: NodeErrorRender;
      /**
       * 节点无内容时的渲染组件
       */
      nodePlaceholderRender?: NodePlaceholderRender;
    }
  }
}
```

### 配置表单

`formMeta` 是节点表单唯一配置入口，配置在每个节点的NodeRegistry 上。

[> node-registries.ts](https://github.com/bytedance/flowgram.ai/blob/main/apps/demo-fixed-layout-simple/src/node-registries.ts)

```tsx pure title="node-registries.ts"
import { FlowNodeRegistry, ValidateTrigger } from '@flowgram.ai/fixed-layout-editor';

export const nodeRegistries: FlowNodeRegistry[] = [
  {
    type: 'start',
    /**
     * 配置节点表单的校验及渲染
     */
    formMeta: {
      /**
       * 配置校验在数据变更时触发
       */
      validateTrigger: ValidateTrigger.onChange,
      /**
       * 配置校验规则， 'content' 为字段路径，以下配置值对该路径下的数据进行校验。
       *
       * 也可支持动态函数写法, 用于根据 values 生成校验器:
       *  validate: (values, ctx) => ({ content: () => {}, })
      */
      validate: {
        content: ({ value }) => (value ? undefined : 'Content is required'),
      },
      /**
       * 配置表单渲染
       */
      render: () => (
       <>
          <Field<string> name="title">
            {({ field }) => <div className="demo-free-node-title">{field.value}</div>}
          </Field>
          <Field<string> name="content">
            {({ field, fieldState }) => (
              <>
                <input onChange={field.onChange} value={field.value}/>
                {fieldState?.invalid && <Feedback errors={fieldState?.errors}/>}
              </>
            )}
          </Field>
        </>
      )
    },
  }
]

```

[> 表单写法的基础例子](/examples/node-form/basic.md)

### 渲染表单

[> base-node.tsx](https://github.com/bytedance/flowgram.ai/blob/main/apps/demo-fixed-layout-simple/src/components/base-node.tsx)

```tsx pure title="base-node.tsx"

export const BaseNode = () => {
  /**
   * 提供节点渲染相关的方法
   */
  const { form } = useNodeRender()
  return (
    <div className="demo-free-node" className={form?.state.invalid && "error"}>
      {
        // 表单渲染通过 formMeta 生成
        form?.render()
      }
    </div>
  )
};

```

## 核心概念

### FormMeta

在 `NodeRegistry` 中，我们通过`formMeta` 来配置节点表单, 它遵循以下API。

[> FormMeta API](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/node/src/types.ts#L89)

这里特别说明, 节点表单与通用表单有一个很大的区别，它的数据逻辑（如校验、数据变更后的副作用等）需要在表单不渲染的情况下依然生效，我们称 <span className="rs-red">数据与渲染分离</span>
。所以这些数据逻辑需要配置在formMeta 中的非render 字段中，保证不渲染情况下节点引擎也可以调用到这些逻辑, 而通用表单引擎（如react-hook-form）则没有这个限制, 校验可以直接写在react组件中。

### FormMeta.render (渲染)

`render` 字段用于配置表单的渲染逻辑

`render: (props: FormRenderProps<any>) => React.ReactElement;`

[> FormRenderProps](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/form/src/types/form.ts#L91)

返回的 react 组件可使用以下表单组件和模型：

#### Field (组件)

`Field` 是表单字段的 React 高阶组件，封装了表单字段的通用逻辑，如数据与状态的注入，组件的刷新等。其核心必填参数为 `name`, 用于声明表单项的路径，在一个表单中具有唯一性。

[> Field Props API](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/form/src/types/field.ts#L106)

Field 的渲染部分，支持三种写法，如下:

```tsx pure
const render = () => (
  <div>
    <Label> 1. 通过 children </Label>
    {/* 该方式适用于简单场景，Field 会将  value onChange 等属性直接注入第一层children组件中  */}
    <Field name="c">
      <Input />
    </Field>
    <Label> 2. 通过 Render Props  </Label>
    {/* 该方式适用于复杂场景，当 return 的组件存在多层嵌套，用户可以主动将field 中的属性注入希望注入的组件中 */}
    <Field name="a">
        {({ field, fieldState, formState }: FieldRenderProps<string>) => <div><Input {...field} /><Feedbacks errors={fieldState.errors}/></div>}
    </Field>

    <Label> 3. 通过传 render 函数</Label>
    {/* 该方式类似方式2，但通过props 传入 */}
    <Field name="b" render={({ field }: FieldRenderProps<string>) => <Input {...field} />} />
  </div>
);
```

```ts pure
interface FieldRenderProps<TValue> {
  // Field 实例
  field: Field<TValue>;
  // Field 状态（响应式）
  fieldState: Readonly<FieldState>;
  // Form 状态
  formState: Readonly<FormState>;
}
```

[> FieldRenderProps API](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/form/src/types/field.ts#L125)

#### Field (模型)

`Field` 实例通常通过render props 传入（如上例子），或通过 `useCurrentField` hook 获取。它包含表单字段在渲染层面的常见API。
注意: `Field` 是一个渲染模型，仅提供一般组件需要的API, 如 `value` `onChange` `onFocus` `onBlur`，如果是数据相关的API 请使用 `Form` 模型实例，如 `form.setValueIn(name, value)` 设置某字段的值。

[> Field 模型 API](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/form/src/types/field.ts#L34)

#### FieldArray (组件)

`FieldArray` 是数组类型字段的 React 高阶组件，封装了数组类型字段的通用逻辑，如数据与状态的注入，组件的刷新，以及数组项的遍历等。其核心必填参数为 `name`, 用于声明该表单项的路径，在一个表单中具有唯一性。

`FieldArray` 的基础用法可以参照以下例子:

[> 数组例子](https://flowgram.ai/examples/node-form/array.html)

#### FieldArray (模型)

`FieldArray` 继承于 `Field` ，是数组类型字段在渲染层的模型，除了包含渲染层的常见API，还包含数组的基本操作如 `FieldArray.map`, `FieldArray.remove`, `FieldArray.append` 等。API 的使用方法也可见上述[数组例子](https://flowgram.ai/examples/node-form/array.html)。

[> FieldArray 模型 API](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/form/src/types/field.ts#L69)

#### Form(组件)

`Form` 组件是表单的最外层高阶组件，上述 `Field` `FieldArray` 等能力仅在该高阶组件下可以使用。节点表单的渲染已经将`<Form />` 封装到了引擎内部，所以用户无需关注，可以直接在`render` 返回的 react 组件中直接使用 `Field`。但如果用户需要独立使用表单引擎，或者在节点之外独立再渲染一次表单，需要自行在表单内容外包上`Form`组件。

#### Form(模型)

`Form` 实例可通过`render` 函数的入参获得， 也可通过 hook `useForm` 获取，见[例子](#useform)。它是表单核心模型门面，用户可以通过Form 实例操作表单数据、监听变更、触发校验等。

[> Form 模型 API](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/form/src/types/form.ts#L58)

### 校验

基于[FormMeta](#formmeta)章节中提到的"数据与渲染分离"概念，校验逻辑需配置在 `FormMeta` 全局, 并通过路径匹配方式声明校验逻辑所作用的表单项，如下例子。

路径支持模糊匹配，见[路径](#路径)章节。

<div className="rs-center">
  <img loading="lazy" src="/form-validate.gif" style={{ maxWidth: 600 }} />
</div>

```tsx pure
export const renderValidateExample = ({ form }: FormRenderProps<FormData>) => (
  <>
    <Label> a (最大长度为 5)</Label>
    <Field name="a">
      {({ field: { value, onChange }, fieldState }: FieldRenderProps<string>) => (
        <>
          <Input value={value} onChange={onChange} />
          <Feedback errors={fieldState?.errors} />
        </>
      )}
    </Field>
    <Label> b (如果a存在，b可以选填) </Label>
    <Field
      name="b"
      render={({ field: { value, onChange }, fieldState }: FieldRenderProps<string>) => (
        <>
          <Input value={value} onChange={onChange} />
          <Feedback errors={fieldState?.errors} />
        </>
  )}
/>
  </>
);

export const VALIDATE_EXAMPLE: FormMeta = {
  render: renderValidateExample,
  // 校验时机配置
  validateTrigger: ValidateTrigger.onChange,
  /*
   * 也可支持动态函数写法, 用于根据 values 生成校验器:
   *   validate: (values, ctx) => ({ a: () => '', b: () => '', c, () => '' })
  */
  validate: {
    // 单纯校验值
    a: ({ value }) => (value.length > 5 ? '最大长度为5' : undefined),
    // 校验依赖其他表单项的值
    b: ({ value, formValues }) => {
      if (formValues.a) {
        return undefined;
      } else {
        return value ? 'undefined' : 'a 存在时 b 必填';
      }
    },
    // 校验依赖节点或画布信息
    c: ({ value, formValues, context }) => {
      const { node， playgroundContext } = context;
      // 此处逻辑省略
    },
  },
};
```

#### 校验时机

<table className="rs-table">
  <tr>
    <td>`ValidateTrigger.onChange`</td>
    <td>表单数据变更时校验（不包含初始化数据）</td>
  </tr>

  <tr>
    <td>`ValidateTrigger.onBlur`</td>
    <td>表单项输入控件onBlur时校验。<br />注意，这里有两个前提：一是表单项的输入控件需要支持 `onBlur` 入参，二是要将 `Field.onBlur` 传入该控件: <br />`<Field>{({field})=><Input ... onBlur={field.onBlur}>}</Field>`</td>
  </tr>
</table>

`validateTrigger` 建议配置 `ValidateTrigger.onChange` 即数据变更时校验，如果配置 `ValidateTrigger.onBlur`, 校验只会在组件blur事件触发时触发。那么当节点表单不渲染的情况下，就算是数据变更了，也不会触发校验。

#### 主动触发校验

1. 主动触发整个表单的校验

```tsx pure
const form = useForm()
form.validate()
```

2. 主动触发单个表单项校验

```tsx pure
const validate = useFieldValidate(name)
validate()
```

`name` 不传则默认获取当前 `<Field />` 标签下的 `Field` 的 `validate`, 通过传 `name` 可获取 `<Form />` 下任意 `Field`。

### 路径

1. 表单路径以`.`为层级分隔符， 如 `a.b.c` 指向数据 `{a:{b:{c:1}}}` 下的 `1`
2. 路径支持模糊匹配，在校验和副作用配置中会使用到。如下例子。通常在数组场景中使用较多。

<div className="rs-red">
  注意：\* 仅代表下钻一级
</div>

<table className="rs-table">
  <tr>
    <td>`arr.*`</td>
    <td>`arr` 字段的所有一级子项</td>
  </tr>

  <tr>
    <td>`arr.x.*`</td>
    <td>`arr.x` 的所有一级子项</td>
  </tr>

  <tr>
    <td>`arr.*.x`</td>
    <td>`arr` 所有一级子项下的 `x`</td>
  </tr>
</table>

### 副作用 (effect)

副作用是节点表单特有的概念，指在节点数据发生变更时需要执行的副作用。同样，遵循 "数据与渲染分离" 的原则，副作用和校验相似，也配置在 `FormMeta` 全局。

* 通过 key value 形式配置，key 表示表单项路径匹配规则，支持模糊匹配，value 为作用在该路径上的effect。
* value 为数组，即支持一个表单项有多个effect。

```tsx pur

export const EFFECT_EXAMPLE: FormMeta = {
  ...
  effect: {
    ['a.b']: [
      {
        event: DataEvent.onValueChange,
        effect: ({ value }: EffectFuncProps<string, FormData>) => {
          console.log('a.b value changed:', value);
        },
      },
    ],
    ['arr.*']:[
      {
        event: DataEvent.onValueInit,
        effect: ({ value, name }: EffectFuncProps<string, FormData>) => {
          console.log(name + ' value init:', value);
        },
      },
    ]
  }
};
```

```tsx pur
interface EffectFuncProps<TFieldValue = any, TFormValues = any> {
  name: FieldName;
  value: TFieldValue;
  prevValue?: TFieldValue;
  formValues: TFormValues;
  form: IForm;
  context: NodeContext;
}
```

[Effect 相关 API](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/node/src/types.ts#L54)

#### 副作用时机

<table className="rs-table">
  <tr>
    <td>`DataEvent.onValueChange`</td>
    <td>数据变更时触发</td>
  </tr>

  <tr>
    <td>`DataEvent.onValueInit`</td>
    <td>数据初始化时触发</td>
  </tr>

  <tr>
    <td>`DataEvent.onValueInitOrChange`</td>
    <td>数据初始化和变更时都会触发</td>
  </tr>
</table>

### 联动

[> 联动例子](/examples/node-form/dynamic.md)

## hooks

### 节点表单内

以下hook 可在节点表单内部使用

#### useCurrentField

`() => Field`

该 hook 需要在Field 标签内部使用

```tsx pur
const field = useCurrentField()
```

[> Field 模型 API](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/form/src/types/field.ts#L34)

#### useCurrentFieldState

`() => FieldState`

该 hook 需要在Field 标签内部使用

```tsx pur
const fieldState = useCurrentFieldState()
```

[> FieldState API](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/form/src/types/field.ts#L158)

#### useFieldValidate

`(name?: FieldName) => () => Promise<void>`

如果需要主动触发字段的校验，可以使用该hook 获取到 Field 的 validate 函数。

`name` 为 Field 的路径，不传则默认获取当前 `<Field />` 下的validate

```tsx pur
const validate = useFieldValidate()
validate()
```

#### useForm

`() => Form`

用于获取 Form 实例。

注意，该hook 在 `render` 函数第一层不生效，仅在 `render` 函数内的 react 组件内部才可使用。`render` 函数的入参中已经传入了 `form: Form`, 可以直接使用。

1. 在 render 函数第一层直接使用 `props.form`

```tsx pur
const formMeta = {
  render: ({form}) =>
  <div>
    {form.getValueIn('my.path')}
  </div>
}
```

2. 在组件内部可使用 `useForm`

```tsx pur

const formMeta = {
  render: () =>
    <div>
      <Field name={'my.path'}>
        <MySelect />
      </Field>
    </div>
}

// MySelect.tsx
...
const form = useForm()
const valueNeeded = form.getValueIn('my.other.path')
...
```

<span className="rs-red">注意：Form 的 api 不具备任何响应式能力，若需监听某字段值，可使用 [useWatch](#usewatch) </span>

#### useWatch

`<TValue = FieldValue>(name: FieldName) => TValue`

该 hook 和上述 `useForm` 相似, 在 `render` 函数返回组件的第一层不生效，仅在封装过的组件内部可用。如果需要在 `render` 根级别使用，可以对 `render` 返回的内容做一层组件封装。

```tsx pur
{
  render: () =>
    <div>
      <Field name={'a'}><A /></Field>
      <Field name={'b'}><B /></Field>
    </div>
}

// A.tsx
...
const b = useWatch('b')
// do something with b
...
```

### 节点表单外

以下 hook 用于在节点表单外部，如画布全局、相邻节点上需要去监听某个节点表单的数据或状态。通常需要传入 `node: FlowNodeEntity` 作为参数

#### useWatchFormValues

监听 node 内整个表单的值

`<TFormValues = any>(node: FlowNodeEntity) => TFormValues | undefined`

```tsx pur
const values = useWatchFormValues(node)
```

#### useWatchFormValueIn

监听 node 内某个表单项的值

`<TValue = any>(node: FlowNodeEntity，name: string) => TFormValues | undefined`

```tsx pur
const value = useWatchFormValueIn(node, name)
```

#### useWatchFormState

监听 node 内表单的状态

`(node: FlowNodeEntity) => FormState | undefined`

```tsx pur
const formState = useWatchFormState(node)
```

#### useWatchFormErrors

监听 node 内表单的 Errors

`(node: FlowNodeEntity) => Errors | undefined`

```tsx pur
const errors = useWatchFormErrors(node)
```

#### useWatchFormWarnings

监听 node 内表单的 Warnings

`(node: FlowNodeEntity) => Warnings | undefined`

```tsx pur
const warnings = useWatchFormErrors(node)
```
