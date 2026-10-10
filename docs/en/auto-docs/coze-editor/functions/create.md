# Function: create

**create**<`T`>(`«destructured»`): `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `EditorPluginSpec`<`string`, `any`, `any`>\[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `injector?` | `Injector` |
| › `plugins` | `T` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `createAPI` | (`{ view, options, events, }`: { `events`: `Emitter`<`Record`<`EventType`, `unknown`>> ; `options`: `Options` ; `view`: `EditorView`  }) => `InferEditorAPIFromPlugins`<`T`, `T`\[`number`] extends infer T\_1 ? `T_1` extends `T`\[`number`] ? `T_1` extends `EventPluginSpec`\<infer Name, infer Params> ? { \[K in Name]: Params } : `T_1` extends `DOMEventHandlerPluginSpec`\<infer Name\_1> ? `Name_1` extends keyof `HTMLElementEventMap` ? { \[K\_1 in Name\_1]: HTMLElementEventMap\[Name\_1] } : { \[K\_2 in Name\_1]: unknown } : `never` : `never` : `never` extends infer T\_2 ? `T_2` extends `T`\[`number`] extends infer T\_3 ? `T_3` extends `T`\[`number`] ? `T_3` extends `EventPluginSpec`\<infer Name, infer Params> ? { \[K in Name]: Params } : `T_3` extends `DOMEventHandlerPluginSpec`\<infer Name\_1> ? `Name_1` extends keyof `HTMLElementEventMap` ? { \[K\_1 in Name\_1]: HTMLElementEventMap\[Name\_1] } : { \[K\_2 in Name\_1]: unknown } : `never` : `never` : `never` ? `T_2` extends `any` ? (`k`: `T_2`) => `void` : `never` : `never` : `never` extends (`k`: infer I) => `void` ? `I` : `never`, `T`\[`number`] extends infer T\_4 ? `T_4` extends `T`\[`number`] ? `T_4` extends `OptionPluginSpec`\<infer Name\_2, infer Value> ? { \[K\_3 in Name\_2]: Value } : `never` : `never` : `never` extends infer T\_5 ? `T_5` extends `T`\[`number`] extends infer T\_6 ? `T_6` extends `T`\[`number`] ? `T_6` extends `OptionPluginSpec`\<infer Name\_2, infer Value> ? { \[K\_3 in Name\_2]: Value } : `never` : `never` : `never` ? `T_5` extends `any` ? (`k`: `T_5`) => `void` : `never` : `never` : `never` extends (`k`: infer I) => `void` ? `I` : `never`, `Partial`<`T`\[`number`] extends infer T\_7 ? `T_7` extends `T`\[`number`] ? `T_7` extends `OptionPluginSpec`\<infer Name\_2, infer Value> ? { \[K\_3 in Name\_2]: Value } : `never` : `never` : `never` extends infer T\_8 ? `T_8` extends `T`\[`number`] extends infer T\_9 ? `T_9` extends `T`\[`number`] ? `T_9` extends `OptionPluginSpec`\<infer Name\_2, infer Value> ? { \[K\_3 in Name\_2]: Value } : `never` : `never` : `never` ? `T_8` extends `any` ? (`k`: `T_8`) => `void` : `never` : `never` : `never` extends (`k`: infer I) => `void` ? `I` : `never`>> |
| `createEvents` | () => `Emitter`<`Record`<`EventType`, `unknown`>> |
| `createOptions` | () => `Options` |
| `eventKeys` | `string`\[] |
| `getExtensions` | (`values`: `EditorOptions`<`Partial`<`InferValues`<`T`\[`number`]>>, `InferEvents`<`T`\[`number`]>>\[`"options"`], `{ options, events, }`: { `events`: `Emitter`<`Record`<`string`, `unknown`>> ; `options`: `Options`  }) => `Extension`\[] |
| `render` | (`opts`: `EditorOptions`<`Partial`<`InferValues`<`T`\[`number`]>>, `InferEvents`<`T`\[`number`]>>) => `InferEditorAPIFromPlugins`<`T`, `T`\[`number`] extends infer T\_1 ? `T_1` extends `T`\[`number`] ? `T_1` extends `EventPluginSpec`\<infer Name, infer Params> ? { \[K in Name]: Params } : `T_1` extends `DOMEventHandlerPluginSpec`\<infer Name\_1> ? `Name_1` extends keyof `HTMLElementEventMap` ? { \[K\_1 in Name\_1]: HTMLElementEventMap\[Name\_1] } : { \[K\_2 in Name\_1]: unknown } : `never` : `never` : `never` extends infer T\_2 ? `T_2` extends `T`\[`number`] extends infer T\_3 ? `T_3` extends `T`\[`number`] ? `T_3` extends `EventPluginSpec`\<infer Name, infer Params> ? { \[K in Name]: Params } : `T_3` extends `DOMEventHandlerPluginSpec`\<infer Name\_1> ? `Name_1` extends keyof `HTMLElementEventMap` ? { \[K\_1 in Name\_1]: HTMLElementEventMap\[Name\_1] } : { \[K\_2 in Name\_1]: unknown } : `never` : `never` : `never` ? `T_2` extends `any` ? (`k`: `T_2`) => `void` : `never` : `never` : `never` extends (`k`: infer I) => `void` ? `I` : `never`, `T`\[`number`] extends infer T\_4 ? `T_4` extends `T`\[`number`] ? `T_4` extends `OptionPluginSpec`\<infer Name\_2, infer Value> ? { \[K\_3 in Name\_2]: Value } : `never` : `never` : `never` extends infer T\_5 ? `T_5` extends `T`\[`number`] extends infer T\_6 ? `T_6` extends `T`\[`number`] ? `T_6` extends `OptionPluginSpec`\<infer Name\_2, infer Value> ? { \[K\_3 in Name\_2]: Value } : `never` : `never` : `never` ? `T_5` extends `any` ? (`k`: `T_5`) => `void` : `never` : `never` : `never` extends (`k`: infer I) => `void` ? `I` : `never`, `Partial`<`T`\[`number`] extends infer T\_7 ? `T_7` extends `T`\[`number`] ? `T_7` extends `OptionPluginSpec`\<infer Name\_2, infer Value> ? { \[K\_3 in Name\_2]: Value } : `never` : `never` : `never` extends infer T\_8 ? `T_8` extends `T`\[`number`] extends infer T\_9 ? `T_9` extends `T`\[`number`] ? `T_9` extends `OptionPluginSpec`\<infer Name\_2, infer Value> ? { \[K\_3 in Name\_2]: Value } : `never` : `never` : `never` ? `T_8` extends `any` ? (`k`: `T_8`) => `void` : `never` : `never` : `never` extends (`k`: infer I) => `void` ? `I` : `never`>> |
