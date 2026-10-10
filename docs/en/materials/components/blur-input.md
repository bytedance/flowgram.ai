import { SourceCode } from '@theme';
import { BasicStory, PlaceholderStory, DisabledStory } from 'components/form-materials/components/blur-input';

# BlurInput

BlurInput is a special input component that only triggers value updates when the input loses focus, suitable for scenarios where frequent update operations need to be avoided.

## Examples

### Basic Usage

<BasicStory />

```tsx pure title="form-meta.tsx"
const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <Field<string> name="blur_input" defaultValue="Initial text">
        {({ field }) => (
          <>
            <BlurInput
              value={field.value}
              onChange={(value) => field.onChange(value)}
              placeholder="Please enter text"
            />
            <p className="mt-2">Current value: {field.value}</p>
            <p className="text-sm text-gray-500">
              Note: Value updates after clicking outside the input
            </p>
          </>
        )}
      </Field>
    </>
  )
}
```

### With Placeholder

<PlaceholderStory />

```tsx pure title="form-meta.tsx"
const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <Field<string> name="blur_input_placeholder" defaultValue="">
        {({ field }) => (
          <>
            <BlurInput
              value={field.value}
              onChange={(value) => field.onChange(value)}
              placeholder="This is an input field with placeholder"
            />
            <p className="mt-2">Current value: {field.value || 'Empty'}</p>
          </>
        )}
      </Field>
    </>
  )
}
```

### Disabled State

<DisabledStory />

```tsx pure title="form-meta.tsx"
const formMeta = {
  render: () => (
    <>
      <FormHeader />
      <Field<string> name="blur_input_disabled" defaultValue="Disabled state text">
        {({ field }) => (
          <BlurInput value={field.value} onChange={(value) => field.onChange(value)} disabled />
        )}
      </Field>
    </>
  )
}
```

## API Reference

### Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| value | `string` | - | The value of the input |
| onChange | `(value: string, event?: React.FocusEvent) => void` | - | Callback function triggered when focus is lost |
| placeholder | `string` | - | Placeholder text for the input |
| disabled | `boolean` | `false` | Whether to disable the input |
| ref | `React.RefObject<HTMLInputElement>` | - | Reference to the input element |
| Other properties | Inherited from [Semi UI Input component](https://semi.design/input/) | - | Supports all other properties of the Semi UI Input component |

## Source Code Guide

<SourceCode href="https://github.com/bytedance/flowgram.ai/tree/main/packages/materials/form-materials/src/components/blur-input" />

You can copy the source code to your local machine using the CLI command:

```bash
npx @flowgram.ai/cli@latest materials components/blur-input
```

### Directory Structure

```
components/blur-input/
└── index.tsx  # Component implementation file
```

### Core Implementation

The core implementation of the BlurInput component is very concise and mainly includes the following parts:

1. **State Management**: Uses `useState` to maintain internal value state, decoupled from the incoming `value` property
2. **Value Synchronization**: Uses `useEffect` to update the internal state when the external `value` changes
3. **Delayed Update**: Only updates the internal state during user input, and calls the externally passed `onChange` callback only when the `onBlur` event is triggered

This implementation ensures that value updates only occur when the user finishes inputting and clicks outside the area, effectively reducing unnecessary update operations, especially suitable for scenarios requiring form validation or remote data requests.

### Dependency Analysis

#### Third-party Libraries

[**Semi UI Input component**](https://semi.design/input/) provides basic input box functionality support, and the BlurInput component inherits all its properties and adds the feature of updating on blur.
