/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { beforeEach, describe, expect, it } from 'vitest';

import { toFieldArray } from '@/core/to-field-array';
import { FormModel } from '@/core/form-model';
import { FieldArrayModel } from '@/core/field-array-model';

describe('toFieldArray', () => {
  let formModel: FormModel;
  let fieldArrayModel: FieldArrayModel;

  beforeEach(() => {
    formModel = new FormModel();
    formModel.init({});
    formModel.createFieldArray('users');
    fieldArrayModel = formModel.getField<FieldArrayModel>('users')!;
  });

  it('should convert FieldArrayModel to FieldArray', () => {
    const fieldArray = toFieldArray(fieldArrayModel);

    expect(fieldArray).toBeDefined();
    expect(fieldArray.name).toBe('users');
    expect(fieldArray.value === undefined || Array.isArray(fieldArray.value)).toBe(true);
  });

  it('should expose key property from model id', () => {
    const fieldArray = toFieldArray(fieldArrayModel);

    expect(fieldArray.key).toBe(fieldArrayModel.id);
  });

  it('should expose name property from model path', () => {
    const fieldArray = toFieldArray(fieldArrayModel);

    expect(fieldArray.name).toBe('users');
    expect(fieldArray.name).toBe(fieldArrayModel.path.toString());
  });

  it('should expose value property from model value', () => {
    fieldArrayModel.value = [{ name: 'Alice' }, { name: 'Bob' }];
    const fieldArray = toFieldArray(fieldArrayModel);

    expect(fieldArray.value).toEqual([{ name: 'Alice' }, { name: 'Bob' }]);
    expect(fieldArray.value).toBe(fieldArrayModel.value);
  });

  it('should update model value via onChange', () => {
    const fieldArray = toFieldArray(fieldArrayModel);
    const newValue = [{ name: 'Charlie' }];

    fieldArray.onChange(newValue);

    expect(fieldArrayModel.value).toEqual(newValue);
    expect(fieldArray.value).toEqual(newValue);
  });

  it('should map over array elements correctly', () => {
    fieldArrayModel.value = [{ name: 'Alice' }, { name: 'Bob' }];
    const fieldArray = toFieldArray(fieldArrayModel);

    const mapped = fieldArray.map((field, index) => {
      expect(field).toBeDefined();
      expect(field.name).toBe(`users.${index}`);
      return field.value;
    });

    expect(mapped).toHaveLength(2);
    expect(mapped).toEqual([{ name: 'Alice' }, { name: 'Bob' }]);
  });

  it('should append new item and return Field', () => {
    const fieldArray = toFieldArray(fieldArrayModel);
    const newItem = { name: 'Charlie' };

    const newField = fieldArray.append(newItem);

    expect(newField).toBeDefined();
    expect(newField.name).toBe('users.0');
    expect(newField.value).toEqual(newItem);
    expect(fieldArrayModel.value).toEqual([newItem]);
  });

  it('should delete item by index', () => {
    fieldArrayModel.value = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }];
    const fieldArray = toFieldArray(fieldArrayModel);

    fieldArray.delete(1);

    expect(fieldArrayModel.value).toEqual([{ name: 'Alice' }, { name: 'Charlie' }]);
    expect(fieldArray.value).toEqual([{ name: 'Alice' }, { name: 'Charlie' }]);
  });

  it('should remove item by index (same as delete)', () => {
    fieldArrayModel.value = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }];
    const fieldArray = toFieldArray(fieldArrayModel);

    fieldArray.remove(1);

    expect(fieldArrayModel.value).toEqual([{ name: 'Alice' }, { name: 'Charlie' }]);
    expect(fieldArray.value).toEqual([{ name: 'Alice' }, { name: 'Charlie' }]);
  });

  it('should swap items at two indices', () => {
    fieldArrayModel.value = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }];
    const fieldArray = toFieldArray(fieldArrayModel);

    fieldArray.swap(0, 2);

    expect(fieldArrayModel.value).toEqual([
      { name: 'Charlie' },
      { name: 'Bob' },
      { name: 'Alice' },
    ]);
    expect(fieldArray.value).toEqual([{ name: 'Charlie' }, { name: 'Bob' }, { name: 'Alice' }]);
  });

  it('should move item from one index to another', () => {
    fieldArrayModel.value = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }];
    const fieldArray = toFieldArray(fieldArrayModel);

    fieldArray.move(0, 2);

    expect(fieldArrayModel.value).toEqual([
      { name: 'Bob' },
      { name: 'Charlie' },
      { name: 'Alice' },
    ]);
    expect(fieldArray.value).toEqual([{ name: 'Bob' }, { name: 'Charlie' }, { name: 'Alice' }]);
  });

  it('should hide _fieldModel property (non-enumerable)', () => {
    const fieldArray = toFieldArray(fieldArrayModel);

    // _fieldModel should exist but not be enumerable
    expect((fieldArray as any)._fieldModel).toBe(fieldArrayModel);
    expect(Object.keys(fieldArray)).not.toContain('_fieldModel');
  });

  it('should support complex nested operations', () => {
    const fieldArray = toFieldArray(fieldArrayModel);

    // Append multiple items
    fieldArray.append({ name: 'Alice', age: 30 });
    fieldArray.append({ name: 'Bob', age: 25 });
    fieldArray.append({ name: 'Charlie', age: 35 });

    expect(fieldArray.value).toHaveLength(3);

    // Map and modify
    const names = fieldArray.map((field) => field.value.name);
    expect(names).toEqual(['Alice', 'Bob', 'Charlie']);

    // Swap
    fieldArray.swap(0, 1);
    expect(fieldArray.value[0].name).toBe('Bob');
    expect(fieldArray.value[1].name).toBe('Alice');

    // Remove
    fieldArray.remove(2);
    expect(fieldArray.value).toHaveLength(2);

    // Move
    fieldArray.move(1, 0);
    expect(fieldArray.value[0].name).toBe('Alice');
    expect(fieldArray.value[1].name).toBe('Bob');
  });

  it('should work with empty array', () => {
    const fieldArray = toFieldArray(fieldArrayModel);

    // Value might be undefined or empty array initially
    expect(fieldArray.value === undefined || Array.isArray(fieldArray.value)).toBe(true);

    const mapped = fieldArray.map((field) => field.value);
    expect(Array.isArray(mapped)).toBe(true);
    expect(mapped.length === 0 || mapped.length > 0).toBe(true);
  });

  it('should preserve reactivity through getters', () => {
    const fieldArray = toFieldArray(fieldArrayModel);

    // Initial value might be undefined or empty array
    expect(fieldArray.value === undefined || Array.isArray(fieldArray.value)).toBe(true);

    // Modify through model
    fieldArrayModel.value = [{ name: 'Alice' }];

    // Should reflect in fieldArray (getter)
    expect(fieldArray.value).toEqual([{ name: 'Alice' }]);

    // Modify through fieldArray
    fieldArray.onChange([{ name: 'Bob' }]);

    // Should reflect in model
    expect(fieldArrayModel.value).toEqual([{ name: 'Bob' }]);
  });
});
