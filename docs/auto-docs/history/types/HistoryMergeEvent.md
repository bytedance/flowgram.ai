# Type alias: HistoryMergeEvent

**HistoryMergeEvent**: { `type`: [`ADD`](/auto-docs/history/enums/HistoryMergeEventType.md#add) ; `value`: { `element`: [`IUndoRedoElement`](/auto-docs/history/interfaces/IUndoRedoElement.md) ; `operation`: [`Operation`](/auto-docs/history/interfaces/Operation.md)  }  } | { `type`: [`UPDATE`](/auto-docs/history/enums/HistoryMergeEventType.md#update) ; `value`: { `element`: [`IUndoRedoElement`](/auto-docs/history/interfaces/IUndoRedoElement.md) ; `operation`: [`Operation`](/auto-docs/history/interfaces/Operation.md) ; `value`: `any`  }  }

历史合并事件
