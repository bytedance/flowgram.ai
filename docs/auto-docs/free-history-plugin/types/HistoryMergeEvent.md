# Type alias: HistoryMergeEvent

**HistoryMergeEvent**: { `type`: [`ADD`](/auto-docs/free-history-plugin/enums/HistoryMergeEventType.md#add) ; `value`: { `element`: [`IUndoRedoElement`](/auto-docs/free-history-plugin/interfaces/IUndoRedoElement.md) ; `operation`: [`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md)  }  } | { `type`: [`UPDATE`](/auto-docs/free-history-plugin/enums/HistoryMergeEventType.md#update) ; `value`: { `element`: [`IUndoRedoElement`](/auto-docs/free-history-plugin/interfaces/IUndoRedoElement.md) ; `operation`: [`Operation`](/auto-docs/free-history-plugin/interfaces/Operation.md) ; `value`: `any`  }  }

历史合并事件
