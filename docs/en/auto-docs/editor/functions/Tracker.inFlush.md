# Function: inFlush

[Tracker](/en/auto-docs/editor/modules/Tracker.md).inFlush

**inFlush**(): `boolean`

True if we are computing a computation now, either first time or recompute.  This matches Tracker.active unless we are inside Tracker.nonreactive, which nullfies currentComputation even though an enclosing computation may still be running.

#### Returns

`boolean`
