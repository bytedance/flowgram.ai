# useRefresh

## Source Code

```ts
import { useCallback, useState } from 'react';

export function useRefresh(defaultValue?: any): (v?: any) => void {
  const [, update] = useState<any>(defaultValue);
  return useCallback((v?: any) => update(v !== undefined ? v : {}), []);
}
```

## Usage

```tsx pure
import { useRefresh } from '@flowgram.ai/fixed-layout-editor';

function Demo() {
  const refresh = useRefresh();
  return (
    <div>
      <button onClick={() => refresh()}>Refresh</button>
    </div>
  )
}

```
