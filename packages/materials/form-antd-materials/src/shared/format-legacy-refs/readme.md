# Notice

In `@flowgram.ai/form-materials@0.2.0`, for introducing loop-related materials,

The FlowRefValueSchema type definition is updated:

```typescript
interface LegacyFlowRefValueSchema {
  type: 'ref';
  content: string;
}

interface NewFlowRefValueSchema {
  type: 'ref';
  content: string[];
}
```



For making sure backend json will not be changed in your application, we provide `format-legacy-ref` utils for upgrading


How to use:

1. Call formatLegacyRefOnSubmit on the formData before submitting
2. Call formatLegacyRefOnInit on the formData after submitting

Example:

```typescript
import { formatLegacyRefOnSubmit, formatLegacyRefOnInit } from '@flowgram.ai/form-materials';

formMeta: {
  formatOnSubmit: (data) => formatLegacyRefOnSubmit(data),
  formatOnInit: (data) => formatLegacyRefOnInit(data),
}
```
