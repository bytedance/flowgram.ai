# Interface: HistoryOperationRecord

## Table of contents

### Properties

* [description](/auto-docs/history-storage/interfaces/HistoryOperationRecord.md#description)
* [historyId](/auto-docs/history-storage/interfaces/HistoryOperationRecord.md#historyid)
* [id](/auto-docs/history-storage/interfaces/HistoryOperationRecord.md#id)
* [label](/auto-docs/history-storage/interfaces/HistoryOperationRecord.md#label)
* [resourceURI](/auto-docs/history-storage/interfaces/HistoryOperationRecord.md#resourceuri)
* [timestamp](/auto-docs/history-storage/interfaces/HistoryOperationRecord.md#timestamp)
* [type](/auto-docs/history-storage/interfaces/HistoryOperationRecord.md#type)
* [uri](/auto-docs/history-storage/interfaces/HistoryOperationRecord.md#uri)
* [uuid](/auto-docs/history-storage/interfaces/HistoryOperationRecord.md#uuid)
* [value](/auto-docs/history-storage/interfaces/HistoryOperationRecord.md#value)

## Properties

### description

**description**: `string`

操作显示描述

***

### historyId

**historyId**: `string`

历史记录唯一标志，记录的uuid

***

### id

`Optional` **id**: `number`

自增id

***

### label

**label**: `string`

操作显示标题

***

### resourceURI

**resourceURI**: `string`

操作资源uri，如某个流程的uri

***

### timestamp

**timestamp**: `number`

时间戳

***

### type

**type**: `string`

类型，如 addFromNode deleteFromNode

***

### uri

**uri**: `string`

uri操作对象uri，如某个node的uri

***

### uuid

**uuid**: `string`

唯一标识

***

### value

**value**: `string`

操作值，不同类型不同，json字符串
