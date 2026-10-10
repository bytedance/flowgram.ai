# Type alias: HistoryMergeEvent

**HistoryMergeEvent**: { `type`: [`ADD`](/en/auto-docs/history/enums/HistoryMergeEventType.md#add) ; `value`: { `element`: [`IUndoRedoElement`](/en/auto-docs/history/interfaces/IUndoRedoElement.md) ; `operation`: [`Operation`](/en/auto-docs/history/interfaces/Operation.md)  }  } | { `type`: [`UPDATE`](/en/auto-docs/history/enums/HistoryMergeEventType.md#update) ; `value`: { `element`: [`IUndoRedoElement`](/en/auto-docs/history/interfaces/IUndoRedoElement.md) ; `operation`: [`Operation`](/en/auto-docs/history/interfaces/Operation.md) ; `value`: `any`  }  }

历史合并事件
