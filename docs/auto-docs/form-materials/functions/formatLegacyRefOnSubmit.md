# Function: formatLegacyRefOnSubmit

**formatLegacyRefOnSubmit**(`value`): `any`

In flowgram 0.2.0, for introducing Loop variable functionality,
the FlowRefValueSchema type definition is updated:

interface LegacyFlowRefValueSchema {
type: 'ref';
content: string;
}

interface NewFlowRefValueSchema {
type: 'ref';
content: string\[];
}

For making sure backend json will not be changed, we provide format legacy ref utils for updating the formData

How to use:

1. Call formatLegacyRefOnSubmit on the formData before submitting
2. Call formatLegacyRefOnInit on the formData after submitting

Example:
import { formatLegacyRefOnSubmit, formatLegacyRefOnInit } from '@flowgram.ai/form-materials';
formMeta: {
formatOnSubmit: (data) => formatLegacyRefOnSubmit(data),
formatOnInit: (data) => formatLegacyRefOnInit(data),
}

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`any`
