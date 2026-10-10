# getNodeForm

获取节点的表单能力，需要开启 节点引擎才能使用

[> API Detail](https://flowgram.ai/auto-docs/editor/functions/getNodeForm.html)

## Usage

```tsx pure

// 1. BaseNode
function BaseNode({ node }) {
  const form = getNodeForm(node);
  console.log(form.getValueIn('title'))
  return <div>{form?.render()}</div>
}

// 2. useNodeRender
function BaseNode() {
  const { form } = useNodeRender();
  console.log(form.getValueIn('title'))
  return <div>{form?.render()}</div>
}

```

## Return Inteface

```ts pure

export interface NodeFormProps<TValues> {
  /**
   * The initialValues of the form.
   */
  initialValues: TValues;
  /**
   * Form values. Returns a deep copy of the data in the store.
   */
  values: TValues;
  /**
   * Form state
   */
  state: FormState;
  /**
   * Get value in certain path
   * @param name path
   */
  getValueIn<TValue = FieldValue>(name: FieldName): TValue;

  /**
   * Set value in certain path.
   * It will trigger the re-rendering of the Field Component if a Field is related to this path
   * @param name path
   */
  setValueIn<TValue>(name: FieldName, value: TValue): void;
  /**
   * set form values
   */
  updateFormValues(values: any): void;
  /**
   * Render form
   */
  render: () => React.ReactNode;
  /**
   * Form value change event
   */
  onFormValuesChange: Event<OnFormValuesChangePayload>;
  /**
   * Trigger form validate
   */
  validate: () => Promise<boolean>;
  /**
   * Form validate event
   */
  onValidate: Event<FormState>;
  /**
   * Form field value change event
   */
  onFormValueChangeIn<TValue = FieldValue, TFormValue = FieldValue>(
    name: FieldName,
    callback: (payload: onFormValueChangeInPayload<TValue, TFormValue>) => void
  ): Disposable;
}

```
