/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useRef, useState } from 'react';

import { nanoid } from 'nanoid';
import { difference, get, isObject, set } from 'lodash-es';

function genId() {
  return nanoid();
}

interface ListItem<ValueType> {
  id: string;
  key?: string;
  value?: ValueType;
}

type ObjectType<ValueType> = Record<string, ValueType | undefined>;

export function useObjectList<ValueType>({
  value,
  onChange,
  sortIndexKey,
}: {
  value?: ObjectType<ValueType>;
  onChange: (value?: ObjectType<ValueType>) => void;
  sortIndexKey?: string | ((item: ValueType | undefined) => string);
}) {
  const [list, setList] = useState<ListItem<ValueType>[]>([]);

  const effectVersion = useRef(0);
  const changeVersion = useRef(0);

  const getSortIndex = (value?: ValueType) => {
    if (typeof sortIndexKey === 'function') {
      return get(value, sortIndexKey(value)) || 0;
    }
    return get(value, sortIndexKey || '') || 0;
  };

  useEffect(() => {
    effectVersion.current = effectVersion.current + 1;
    if (effectVersion.current === changeVersion.current) {
      return;
    }
    effectVersion.current = changeVersion.current;

    setList((_prevList) => {
      const newKeys = Object.entries(value || {})
        .sort((a, b) => getSortIndex(a[1]) - getSortIndex(b[1]))
        .map(([key]) => key);

      const oldKeys = _prevList.map((item) => item.key).filter(Boolean) as string[];
      const addKeys = difference(newKeys, oldKeys);

      return _prevList
        .filter((item) => !item.key || newKeys.includes(item.key))
        .map((item) => ({
          id: item.id,
          key: item.key,
          value: item.key ? value?.[item.key!] : item.value,
        }))
        .concat(
          addKeys.map((_key) => ({
            id: genId(),
            key: _key,
            value: value?.[_key],
          }))
        );
    });
  }, [value]);

  const add = (defaultValue?: ValueType) => {
    setList((prevList) => [
      ...prevList,
      {
        id: genId(),
        value: defaultValue,
      },
    ]);
  };

  const updateValue = (itemId: string, value: ValueType) => {
    changeVersion.current = changeVersion.current + 1;

    setList((prevList) => {
      const nextList = prevList.map((_item) => {
        if (_item.id === itemId) {
          return {
            ..._item,
            value,
          };
        }
        return _item;
      });

      onChange(
        Object.fromEntries(
          nextList
            .filter((item) => item.key)
            .map((item) => [item.key!, item.value])
            .map((_res, idx) => {
              const indexKey =
                typeof sortIndexKey === 'function'
                  ? sortIndexKey(_res[1] as ValueType | undefined)
                  : sortIndexKey;

              if (isObject(_res[1]) && indexKey) {
                set(_res[1], indexKey, idx);
              }
              return _res;
            })
        )
      );

      return nextList;
    });
  };

  const updateKey = (itemId: string, key: string) => {
    changeVersion.current = changeVersion.current + 1;

    setList((prevList) => {
      const nextList = prevList.map((_item) => {
        if (_item.id === itemId) {
          return {
            ..._item,
            key,
          };
        }
        return _item;
      });

      onChange(
        Object.fromEntries(
          nextList.filter((item) => item.key).map((item) => [item.key!, item.value])
        )
      );

      return nextList;
    });
  };

  const remove = (itemId: string) => {
    changeVersion.current = changeVersion.current + 1;

    setList((prevList) => {
      const nextList = prevList.filter((_item) => _item.id !== itemId);

      onChange(
        Object.fromEntries(
          nextList.filter((item) => item.key).map((item) => [item.key!, item.value])
        )
      );

      return nextList;
    });
  };

  return { list, add, updateKey, updateValue, remove };
}
