# Type alias: HistoryMergeEvent

**HistoryMergeEvent**: { `type`: [`ADD`](/en/auto-docs/fixed-history-plugin/enums/HistoryMergeEventType.md#add) ; `value`: { `element`: [`IUndoRedoElement`](/en/auto-docs/fixed-history-plugin/interfaces/IUndoRedoElement.md) ; `operation`: [`Operation`](/en/auto-docs/fixed-history-plugin/interfaces/Operation.md)  }  } | { `type`: [`UPDATE`](/en/auto-docs/fixed-history-plugin/enums/HistoryMergeEventType.md#update) ; `value`: { `element`: [`IUndoRedoElement`](/en/auto-docs/fixed-history-plugin/interfaces/IUndoRedoElement.md) ; `operation`: [`Operation`](/en/auto-docs/fixed-history-plugin/interfaces/Operation.md) ; `value`: `any`  }  }

历史合并事件
