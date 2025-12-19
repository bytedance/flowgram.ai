/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import * as React from 'react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ValidateTrigger } from '@/types';
import { toField, toFieldState } from '@/core/to-field';
import { FormModel } from '@/core/form-model';
import { FieldModel } from '@/core/field-model';

describe('toField', () => {
  let formModel: FormModel;
  let fieldModel: FieldModel;

  beforeEach(() => {
    formModel = new FormModel();
    formModel.init({});
    fieldModel = formModel.createField('username') as FieldModel;
  });

  it('should convert FieldModel to Field', () => {
    const field = toField(fieldModel);

    expect(field).toBeDefined();
    expect(field.name).toBe('username');
    expect(field.value).toBeUndefined();
  });

  it('should expose name property from model', () => {
    const field = toField(fieldModel);

    expect(field.name).toBe(fieldModel.name);
  });

  it('should expose value property from model', () => {
    fieldModel.value = 'John';
    const field = toField(fieldModel);

    expect(field.value).toBe('John');
    expect(field.value).toBe(fieldModel.value);
  });

  describe('onChange', () => {
    it('should update model value with plain value', () => {
      const field = toField(fieldModel);

      field.onChange('Alice');

      expect(fieldModel.value).toBe('Alice');
      expect(field.value).toBe('Alice');
    });

    it('should handle React change event for input', () => {
      const field = toField(fieldModel);
      const mockEvent = {
        target: {
          value: 'Bob',
        },
      } as React.ChangeEvent<HTMLInputElement>;

      field.onChange(mockEvent);

      expect(fieldModel.value).toBe('Bob');
    });

    it('should handle React change event for checkbox (checked)', () => {
      const field = toField(fieldModel);
      const mockEvent = {
        target: {
          type: 'checkbox',
          checked: true,
          value: 'on',
        },
      } as React.ChangeEvent<HTMLInputElement>;

      field.onChange(mockEvent);

      expect(fieldModel.value).toBe(true);
    });

    it('should handle React change event for checkbox (unchecked)', () => {
      const field = toField(fieldModel);
      const mockEvent = {
        target: {
          type: 'checkbox',
          checked: false,
          value: 'on',
        },
      } as React.ChangeEvent<HTMLInputElement>;

      field.onChange(mockEvent);

      expect(fieldModel.value).toBe(false);
    });

    it('should handle numeric value', () => {
      const field = toField(fieldModel);

      field.onChange(42);

      expect(fieldModel.value).toBe(42);
    });

    it('should handle object value', () => {
      const field = toField(fieldModel);
      const objValue = { name: 'test', value: 123 };

      field.onChange(objValue);

      expect(fieldModel.value).toEqual(objValue);
    });

    it('should handle array value', () => {
      const field = toField(fieldModel);
      const arrValue = ['a', 'b', 'c'];

      field.onChange(arrValue);

      expect(fieldModel.value).toEqual(arrValue);
    });
  });

  describe('onBlur', () => {
    it('should call validate when validateTrigger is onBlur', () => {
      formModel.dispose();
      formModel = new FormModel();
      formModel.init({ validateTrigger: ValidateTrigger.onBlur });
      fieldModel = formModel.createField('username') as FieldModel;

      const validateSpy = vi.spyOn(fieldModel, 'validate');
      const field = toField(fieldModel);

      field.onBlur?.();

      expect(validateSpy).toHaveBeenCalled();
    });

    it('should not trigger validation when validateTrigger is not onBlur', () => {
      formModel.dispose();
      formModel = new FormModel();
      formModel.init({ validateTrigger: ValidateTrigger.onChange });
      fieldModel = formModel.createField('username') as FieldModel;

      const validateSpy = vi.spyOn(fieldModel, 'validate');
      const field = toField(fieldModel);

      field.onBlur?.();

      expect(validateSpy).not.toHaveBeenCalled();
    });

    it('should not trigger validation when validateTrigger is onSubmit', () => {
      formModel.dispose();
      formModel = new FormModel();
      formModel.init({ validateTrigger: ValidateTrigger.onSubmit });
      fieldModel = formModel.createField('username') as FieldModel;

      const validateSpy = vi.spyOn(fieldModel, 'validate');
      const field = toField(fieldModel);

      field.onBlur?.();

      expect(validateSpy).not.toHaveBeenCalled();
    });
  });

  describe('onFocus', () => {
    it('should set isTouched to true', () => {
      const field = toField(fieldModel);

      expect(fieldModel.state.isTouched).toBe(false);

      field.onFocus?.();

      expect(fieldModel.state.isTouched).toBe(true);
    });

    it('should set isTouched only once', () => {
      const field = toField(fieldModel);

      field.onFocus?.();
      expect(fieldModel.state.isTouched).toBe(true);

      field.onFocus?.();
      expect(fieldModel.state.isTouched).toBe(true);
    });
  });

  it('should expose key property (non-enumerable)', () => {
    const field = toField(fieldModel);

    expect((field as any).key).toBe(fieldModel.id);
    expect(Object.keys(field)).not.toContain('key');
  });

  it('should hide _fieldModel property (non-enumerable)', () => {
    const field = toField(fieldModel);

    expect((field as any)._fieldModel).toBe(fieldModel);
    expect(Object.keys(field)).not.toContain('_fieldModel');
  });

  it('should preserve reactivity through getters', () => {
    const field = toField(fieldModel);

    expect(field.name).toBe('username');
    expect(field.value).toBeUndefined();

    fieldModel.value = 'NewValue';

    expect(field.value).toBe('NewValue');
  });
});

describe('toFieldState', () => {
  let formModel: FormModel;
  let fieldModel: FieldModel;

  beforeEach(() => {
    formModel = new FormModel();
    formModel.init({});
    fieldModel = formModel.createField('username') as FieldModel;
  });

  it('should convert FieldModelState to FieldState', () => {
    const fieldState = toFieldState(fieldModel.state);

    expect(fieldState).toBeDefined();
    expect(fieldState.isTouched).toBe(false);
    expect(fieldState.isDirty).toBe(false);
    expect(fieldState.invalid).toBe(false);
    expect(fieldState.isValidating).toBe(false);
  });

  it('should reflect isTouched state', () => {
    const fieldState = toFieldState(fieldModel.state);

    expect(fieldState.isTouched).toBe(false);

    fieldModel.state.isTouched = true;

    expect(fieldState.isTouched).toBe(true);
  });

  it('should reflect isDirty state', () => {
    const fieldState = toFieldState(fieldModel.state);

    expect(fieldState.isDirty).toBe(false);

    // Manually set dirty state
    fieldModel.state.isDirty = true;

    expect(fieldState.isDirty).toBe(true);
  });

  it('should reflect invalid state', () => {
    const fieldState = toFieldState(fieldModel.state);

    expect(fieldState.invalid).toBe(false);

    fieldModel.state.invalid = true;

    expect(fieldState.invalid).toBe(true);
  });

  it('should reflect isValidating state', () => {
    const fieldState = toFieldState(fieldModel.state);

    expect(fieldState.isValidating).toBe(false);

    fieldModel.state.isValidating = true;

    expect(fieldState.isValidating).toBe(true);
  });

  it('should return errors as flat array', () => {
    const fieldState = toFieldState(fieldModel.state);

    expect(fieldState.errors).toBeUndefined();

    fieldModel.state.errors = {
      validate1: ['Error 1', 'Error 2'],
      validate2: ['Error 3'],
    };

    expect(fieldState.errors).toEqual(['Error 1', 'Error 2', 'Error 3']);
  });

  it('should return warnings as flat array', () => {
    const fieldState = toFieldState(fieldModel.state);

    expect(fieldState.warnings).toBeUndefined();

    fieldModel.state.warnings = {
      validate1: ['Warning 1', 'Warning 2'],
      validate2: ['Warning 3'],
    };

    expect(fieldState.warnings).toEqual(['Warning 1', 'Warning 2', 'Warning 3']);
  });

  it('should handle empty errors object', () => {
    const fieldState = toFieldState(fieldModel.state);

    fieldModel.state.errors = {};

    expect(fieldState.errors).toEqual([]);
  });

  it('should handle empty warnings object', () => {
    const fieldState = toFieldState(fieldModel.state);

    fieldModel.state.warnings = {};

    expect(fieldState.warnings).toEqual([]);
  });

  it('should preserve reactivity through getters', () => {
    const fieldState = toFieldState(fieldModel.state);

    expect(fieldState.isTouched).toBe(false);

    fieldModel.state.isTouched = true;

    expect(fieldState.isTouched).toBe(true);
  });
});
