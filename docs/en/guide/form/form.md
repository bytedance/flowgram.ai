# Node Form

## Terminology

<table className="rs-table">
  <tr>
    <td>Node Form</td>
    <td>Specifically refers to forms within flow nodes or forms that expand when clicking nodes, associated with node data.</td>
  </tr>

  <tr>
    <td>Node Engine</td>
    <td>One of FlowGram.ai's built-in engines, which primarily maintains node data CRUD operations and provides capabilities for rendering, validation, side effects, canvas/variable linkage, etc. Additionally, it provides capabilities for node error capture rendering, placeholder rendering when there's no content, as shown in the following chapter examples.</td>
  </tr>
</table>

## Quick Start

### Enable Node Engine

[> API Detail](https://github.com/bytedance/flowgram.ai/blob/main/packages/client/editor/src/preset/editor-props.ts#L54)

```tsx pure title="use-editor-props.ts" {3}

// EditorProps
{
  nodeEngine: {
    /**
     * Node engine must be enabled to use
     */
    enable: true;
    materials: {
      /**
       * Component for rendering node errors
       */
      nodeErrorRender?: NodeErrorRender;
      /**
       * Component for rendering when node has no content
       */
      nodePlaceholderRender?: NodePlaceholderRender;
    }
  }
}
```

### Configure Form

`formMeta` is the only configuration entry point for node forms, configured on each node's NodeRegistry.

[> node-registries.ts](https://github.com/bytedance/flowgram.ai/blob/main/apps/demo-fixed-layout-simple/src/node-registries.ts)

```tsx pure title="node-registries.ts"
import { FlowNodeRegistry, ValidateTrigger } from '@flowgram.ai/fixed-layout-editor';

export const nodeRegistries: FlowNodeRegistry[] = [
  {
    type: 'start',
    /**
     * Configure form validation and rendering
     */
    formMeta: {
      /**
       * Configure validation to trigger on data change
       */
      validateTrigger: ValidateTrigger.onChange,
      /**
       * Configure validation rules, 'content' is the field path, the following configuration values validate data under this path
       * Use Dynamic function  to generate a validator based on values:
       *  validate: (values, ctx) => ({ content: () => {}, })
       */
      validate: {
        content: ({ value }) => (value ? undefined : 'Content is required'),
      },
      /**
       * Configure form rendering
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

[> Basic form example](/en/examples/node-form/basic.md)

### Render Form

[> base-node.tsx](https://github.com/bytedance/flowgram.ai/blob/main/apps/demo-fixed-layout-simple/src/components/base-node.tsx)

```tsx pure title="base-node.tsx"

export const BaseNode = () => {
  /**
   * Provides node rendering related methods
   */
  const { form } = useNodeRender()
  return (
    <div className="demo-free-node" className={form?.state.invalid && "error"}>
      {
        // Form rendering is generated through formMeta
        form?.render()
      }
    </div>
  )
};

```

## Core Concepts

### FormMeta

In `NodeRegistry`, we configure node forms through `formMeta`, which follows the following API.

[> FormMeta API](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/node/src/types.ts#L89)

It's important to note that node forms differ significantly from general forms in that their data logic (such as validation, side effects after data changes, etc.) needs to remain effective even when the form is not rendered - we call this <span className="rs-red">separation of data and rendering</span>. Therefore, this data logic needs to be configured in non-render fields within formMeta, ensuring the node engine can call these logics even when not rendering. General form engines (like react-hook-form) don't have this restriction, and validation can be written directly in React components.

### FormMeta.render (Rendering)

The `render` field is used to configure form rendering logic

`render: (props: FormRenderProps<any>) => React.ReactElement;`

[> FormRenderProps](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/form/src/types/form.ts#L91)

The returned React component can use the following form components and models:

#### Field (Component)

`Field` is a React higher-order component for form fields, encapsulating common form field logic such as data and state injection, component refresh, etc. Its core required parameter is `name`, used to declare the form item's path, which must be unique within a form.

[> Field Props API](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/form/src/types/field.ts#L106)

The rendering part of Field supports three writing methods, as follows:

```tsx pure
const render = () => (
  <div>
    <Label> 1. Through children </Label>
    {/* This method is suitable for simple scenarios, Field will directly inject properties like value onChange into the first layer children component */}
    <Field name="c">
      <Input />
    </Field>
    <Label> 2. Through Render Props </Label>
    {/* This method is suitable for complex scenarios, when the returned component has multiple nested layers, users can actively inject field properties into desired components */}
    <Field name="a">
        {({ field, fieldState, formState }: FieldRenderProps<string>) => <div><Input {...field} /><Feedbacks errors={fieldState.errors}/></div>}
    </Field>

    <Label> 3. Through passing render function</Label>
    {/* This method is similar to method 2, but passed through props */}
    <Field name="b" render={({ field }: FieldRenderProps<string>) => <Input {...field} />} />
  </div>
);
```

```ts pure
interface FieldRenderProps<TValue> {
  // Field instance
  field: Field<TValue>;
  // Field state (reactive)
  fieldState: Readonly<FieldState>;
  // Form state
  formState: Readonly<FormState>;
}
```

[> FieldRenderProps API](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/form/src/types/field.ts#L125)

#### Field (Model)

`Field` instance is usually passed through render props (as in above example), or obtained through `useCurrentField` hook. It contains common APIs for form fields at the rendering level.
Note: `Field` is a rendering model, only providing APIs that general components need, such as `value` `onChange` `onFocus` `onBlur`. For data-related APIs, please use the `Form` model instance, such as `form.setValueIn(name, value)` to set a field's value.

[> Field Model API](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/form/src/types/field.ts#L34)

#### FieldArray (Component)

`FieldArray` is a React higher-order component for array type fields, encapsulating common logic for array type fields, such as data and state injection, component refresh, and array item iteration. Its core required parameter is `name`, used to declare the form item's path, which must be unique within a form.

Basic usage of `FieldArray` can be found in the following example:

[> Array example](/en/examples/node-form/array.md)

#### FieldArray (Model)

`FieldArray` inherits from `Field`, it's the rendering level model for array type fields. Besides common rendering level APIs, it also includes basic array operations like `FieldArray.map`, `FieldArray.remove`, `FieldArray.append`, etc. API usage can also be found in the above [array example](/en/examples/node-form/array.md).

[> FieldArray Model API](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/form/src/types/field.ts#L69)

#### Form (Component)

`Form` component is the outermost higher-order component for forms. The above capabilities like `Field` `FieldArray` can only be used under this higher-order component. Node form rendering has already encapsulated `<Form />` inside the engine, so users don't need to care about it and can directly use `Field` in the React component returned by `render`. However, if users need to use the form engine independently or render a form independently outside the node, they need to wrap the form content with the `Form` component themselves.

#### Form (Model)

`Form` instance can be obtained through the input parameters of the `render` function, or through the `useForm` hook, see [example](#useform). It is the core model facade of the form, through which users can manipulate form data, listen to changes, trigger validation, etc.

[> Form Model API](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/form/src/types/form.ts#L58)

### Validation

Based on the "separation of data and rendering" concept mentioned in the [FormMeta](#formmeta) section, validation logic needs to be configured globally in `FormMeta`, and declared through path matching to act on form items, as shown in the following example.

Paths support fuzzy matching, see [Paths](#paths) section.

<div className="rs-center">
  <img loading="lazy" src="/form-validate.gif" style={{ maxWidth: 600 }} />
</div>

```tsx pure
export const renderValidateExample = ({ form }: FormRenderProps<FormData>) => (
  <>
    <Label> a (max length is 5)</Label>
    <Field name="a">
      {({ field: { value, onChange }, fieldState }: FieldRenderProps<string>) => (
        <>
          <Input value={value} onChange={onChange} />
          <Feedback errors={fieldState?.errors} />
        </>
      )}
    </Field>
    <Label> b (if a exists, b can be optional) </Label>
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
  // Validation timing configuration
  validateTrigger: ValidateTrigger.onChange,
  /*
   * Use Dynamic function to generate a validator based on values:
   *  validate: (values, ctx) => ({ a: () => '', b: () => '', c, () => '' })
  */
  validate: {
    // Simply validate value
    a: ({ value }) => (value.length > 5 ? 'Max length is 5' : undefined),
    // Validation depends on other form item values
    b: ({ value, formValues }) => {
      if (formValues.a) {
        return undefined;
      } else {
        return value ? 'undefined' : 'b is required when a exists';
      }
    },
    // Validation depends on node or canvas information
    c: ({ value, formValues, context }) => {
      const { node， playgroundContext } = context;
      // Logic omitted here
    },
  },
};
```

#### Validation Timing

<table className="rs-table">
  <tr>
    <td>`ValidateTrigger.onChange`</td>
    <td>Validate when form data changes (not including initialization data)</td>
  </tr>

  <tr>
    <td>`ValidateTrigger.onBlur`</td>
    <td>Validate when form item input control onBlur.<br />Note, there are two prerequisites: first, the form item's input control needs to support the `onBlur` parameter, second, `Field.onBlur` needs to be passed to that control: <br />`<Field>{({field})=><Input ... onBlur={field.onBlur}>}</Field>`</td>
  </tr>
</table>

It's recommended to configure `validateTrigger` as `ValidateTrigger.onChange` i.e., validate when data changes. If configured as `ValidateTrigger.onBlur`, validation will only trigger when the component blur event triggers. When the node form is not rendering, even if the data changes, validation won't trigger.

#### Actively Trigger Validation

1. Actively trigger validation for the entire form

```tsx pure
const form = useForm()
form.validate()
```

2. Actively trigger validation for a single form item

```tsx pure
const validate = useFieldValidate(name)
validate()
```

If `name` is not passed, it defaults to getting the `validate` of the `Field` under the current `<Field />` tag. By passing `name`, you can get any `Field`'s validate under `<Form />`.

### Paths

1. Form paths use `.` as level separator, e.g., `a.b.c` points to `1` under data `{a:{b:{c:1}}}`
2. Paths support fuzzy matching, used in validation and side effect configuration. As shown in the following example. Usually used more in array scenarios.

<div className="rs-red">
  Note: \* only represents drilling down one level
</div>

<table className="rs-table">
  <tr>
    <td>`arr.*`</td>
    <td>All first-level sub-items of `arr` field</td>
  </tr>

  <tr>
    <td>`arr.x.*`</td>
    <td>All first-level sub-items of `arr.x`</td>
  </tr>

  <tr>
    <td>`arr.*.x`</td>
    <td>`x` under all first-level sub-items of `arr`</td>
  </tr>
</table>

### Side Effects (effect)

Side effects are a concept unique to node forms, referring to side effects that need to be executed when node data changes. Similarly, following the principle of "separation of data and rendering", side effects, like validation, are also configured globally in `FormMeta`.

* Configured in key-value form, where key represents form item path matching rules (supports fuzzy matching) and value is the effect acting on that path.
* Value is an array, meaning one form item can have multiple effects.

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

[Effect Related API](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/node/src/types.ts#L54)

#### Side Effect Timing

<table className="rs-table">
  <tr>
    <td>`DataEvent.onValueChange`</td>
    <td>Triggered when data changes</td>
  </tr>

  <tr>
    <td>`DataEvent.onValueInit`</td>
    <td>Triggered when data initializes</td>
  </tr>

  <tr>
    <td>`DataEvent.onValueInitOrChange`</td>
    <td>Triggered both during data initialization and changes</td>
  </tr>
</table>

### Dynamic Field

[> Dynamic Field example](/en/examples/node-form/dynamic.md)

## Hooks

### Inside Node Form

The following hooks can be used inside node forms

#### useCurrentField

`() => Field`

This hook needs to be used inside Field tags

```tsx pur
const field = useCurrentField()
```

[> Field Model API](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/form/src/types/field.ts#L34)

#### useCurrentFieldState

`() => FieldState`

This hook needs to be used inside Field tags

```tsx pur
const fieldState = useCurrentFieldState()
```

[> FieldState API](https://github.com/bytedance/flowgram.ai/blob/main/packages/node-engine/form/src/types/field.ts#L158)

#### useFieldValidate

`(name?: FieldName) => () => Promise<void>`

If you need to actively trigger field validation, you can use this hook to get the Field's validate function.

`name` is the Field's path, if not passed it defaults to getting the validate of the current `<Field />`

```tsx pur
const validate = useFieldValidate()
validate()
```

#### useForm

`() => Form`

Used to get Form instance.

Note, this hook doesn't work in the first layer of the `render` function, it can only be used inside React components within the `render` function. The `render` function's input parameters already include `form: Form`, which can be used directly.

1. Directly use `props.form` in render function's first layer

```tsx pur
const formMeta = {
  render: ({form}) =>
  <div>
    {form.getValueIn('my.path')}
  </div>
}
```

2. Can use `useForm` inside components

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

<span className="rs-red">Note: Form's api doesn't have any reactive capabilities, if you need to monitor a field's value, use [useWatch](#usewatch)</span>

#### useWatch

`<TValue = FieldValue>(name: FieldName) => TValue`

This hook is similar to the above `useForm`, it doesn't work in the first layer of the `render` function, only usable inside wrapped components. If you need to use it at the `render` root level, you can wrap the returned content in a component layer.

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

### Outside Node Form

The following hooks are used outside node forms, such as on the canvas globally or on adjacent nodes to monitor a node form's data or state. Usually needs to pass `node: FlowNodeEntity` as a parameter

#### useWatchFormValues

Monitor the values of the entire form inside the node

`<TFormValues = any>(node: FlowNodeEntity) => TFormValues | undefined`

```tsx pur
const values = useWatchFormValues(node)
```

#### useWatchFormValueIn

Monitor the value of a specific form item inside the node

`<TValue = any>(node: FlowNodeEntity，name: string) => TFormValues | undefined`

```tsx pur
const value = useWatchFormValueIn(node, name)
```

#### useWatchFormState

Monitor the form state inside the node

`(node: FlowNodeEntity) => FormState | undefined`

```tsx pur
const formState = useWatchFormState(node)
```

#### useWatchFormErrors

Monitor the form Errors inside the node

`(node: FlowNodeEntity) => Errors | undefined`

```tsx pur
const errors = useWatchFormErrors(node)
```

#### useWatchFormWarnings

Monitor the form Warnings inside the node

`(node: FlowNodeEntity) => Warnings | undefined`

```tsx pur
const warnings = useWatchFormErrors(node)
```
