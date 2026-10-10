# Type alias: HistoryMergeEvent

**HistoryMergeEvent**: { `type`: [`ADD`](/auto-docs/fixed-history-plugin/enums/HistoryMergeEventType.md#add) ; `value`: { `element`: [`IUndoRedoElement`](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoElement.md) ; `operation`: [`Operation`](/auto-docs/fixed-history-plugin/interfaces/Operation.md)  }  } | { `type`: [`UPDATE`](/auto-docs/fixed-history-plugin/enums/HistoryMergeEventType.md#update) ; `value`: { `element`: [`IUndoRedoElement`](/auto-docs/fixed-history-plugin/interfaces/IUndoRedoElement.md) ; `operation`: [`Operation`](/auto-docs/fixed-history-plugin/interfaces/Operation.md) ; `value`: `any`  }  }

历史合并事件
