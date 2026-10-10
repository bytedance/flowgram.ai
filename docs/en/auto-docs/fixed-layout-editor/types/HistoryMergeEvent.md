# Type alias: HistoryMergeEvent

**HistoryMergeEvent**: { `type`: [`ADD`](/en/auto-docs/fixed-layout-editor/enums/HistoryMergeEventType.md#add) ; `value`: { `element`: [`IUndoRedoElement`](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md) ; `operation`: [`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md)  }  } | { `type`: [`UPDATE`](/en/auto-docs/fixed-layout-editor/enums/HistoryMergeEventType.md#update) ; `value`: { `element`: [`IUndoRedoElement`](/en/auto-docs/fixed-layout-editor/interfaces/IUndoRedoElement.md) ; `operation`: [`Operation`](/en/auto-docs/fixed-layout-editor/interfaces/Operation.md) ; `value`: `any`  }  }

历史合并事件
