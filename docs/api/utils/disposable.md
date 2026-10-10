# Disposable

## Interface

```ts
/**
 * An object that performs a cleanup operation when `.dispose()` is called.
 *
 * Some examples of how disposables are used:
 *
 * - An event listener that removes itself when `.dispose()` is called.
 * - The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.
 */
export interface Disposable {
  dispose(): void;
}
```

## Source Code

https://github.com/bytedance/flowgram.ai/blob/main/packages/common/utils/src/disposable.ts
