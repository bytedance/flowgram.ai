# Function: createInjectMaterial

**createInjectMaterial**<`Props`>(`Component`, `params?`): `WithRenderKey`<`React.FC`<`Props`>>

Creates a material component wrapper with dependency injection support

This Higher-Order Component (HOC) implements a dynamic component replacement mechanism
for material components. It automatically checks if a custom renderer is registered
in the editor context, using the injected component if available, otherwise
falling back to the default component.

#### Type parameters

| Name |
| :------ |
| `Props` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `Component` | `WithRenderKey`<`FC`<`Props`> | `ExoticComponent`<`Props`>> | Default React component |
| `params?` | `Object` | Optional parameters |
| `params.renderKey?` | `string` | Custom render key name, highest priority |

#### Returns

`WithRenderKey`<`React.FC`<`Props`>>

Wrapper component with dependency injection support

**`Example`**

```tsx
// 1.Create an injectable material component
const InjectVariableSelector = createInjectMaterial(VariableSelector)

// 2. Register custom components in editor
// Configure in use-editor-props.tsx:
const editorProps = {
  materials: {
    components: {
      [VariableSelector.renderKey]: YourCustomVariableSelector
    }
  }
}
```

**`Description`**

Data flow explanation:

* Register components to FlowRendererRegistry in use-editor-props
* InjectMaterial reads renderers from FlowRendererRegistry
* If registered renderer exists and type is REACT, use injected component
* If not exists or type mismatch, fallback to default component
