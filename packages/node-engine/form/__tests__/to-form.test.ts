/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { toForm, toFormState } from '@/core/to-form';
import { FormModel } from '@/core/form-model';

describe('toForm', () => {
  let formModel: FormModel;

  beforeEach(() => {
    formModel = new FormModel();
    formModel.init({
      initialValues: {
        username: 'John',
        email: 'john@example.com',
        age: 30,
      },
    });
  });

  it('should convert FormModel to Form', () => {
    const form = toForm(formModel);

    expect(form).toBeDefined();
    expect(form.initialValues).toEqual({
      username: 'John',
      email: 'john@example.com',
      age: 30,
    });
  });

  it('should expose initialValues from model', () => {
    const form = toForm(formModel);

    expect(form.initialValues).toBe(formModel.initialValues);
  });

  it('should expose values getter from model', () => {
    const form = toForm(formModel);

    expect(form.values).toEqual({
      username: 'John',
      email: 'john@example.com',
      age: 30,
    });
    expect(form.values).toEqual(formModel.values);
  });

  it('should expose values setter to update model', () => {
    const form = toForm(formModel);
    const newValues = {
      username: 'Alice',
      email: 'alice@example.com',
      age: 25,
    };

    form.values = newValues;

    expect(formModel.values).toEqual(newValues);
    expect(form.values).toEqual(newValues);
  });

  it('should expose state as FormState', () => {
    const form = toForm(formModel);

    expect(form.state).toBeDefined();
    expect(form.state.isTouched).toBe(false);
    expect(form.state.isDirty).toBe(false);
    expect(form.state.invalid).toBe(false);
    expect(form.state.isValidating).toBe(false);
  });

  describe('getValueIn', () => {
    it('should get value by field name', () => {
      const form = toForm(formModel);

      expect(form.getValueIn('username')).toBe('John');
      expect(form.getValueIn('email')).toBe('john@example.com');
      expect(form.getValueIn('age')).toBe(30);
    });

    it('should get nested value by path', () => {
      formModel.values = {
        user: {
          profile: {
            name: 'Alice',
            age: 25,
          },
        },
      };
      const form = toForm(formModel);

      expect(form.getValueIn('user.profile.name')).toBe('Alice');
      expect(form.getValueIn('user.profile.age')).toBe(25);
    });

    it('should get array value by index', () => {
      formModel.values = {
        users: [{ name: 'Alice' }, { name: 'Bob' }],
      };
      const form = toForm(formModel);

      expect(form.getValueIn('users.0.name')).toBe('Alice');
      expect(form.getValueIn('users.1.name')).toBe('Bob');
    });

    it('should return undefined for non-existent path', () => {
      const form = toForm(formModel);

      expect(form.getValueIn('nonexistent')).toBeUndefined();
    });
  });

  describe('setValueIn', () => {
    it('should set value by field name', () => {
      const form = toForm(formModel);

      form.setValueIn('username', 'Bob');

      expect(formModel.values.username).toBe('Bob');
      expect(form.values.username).toBe('Bob');
    });

    it('should set nested value by path', () => {
      formModel.values = {
        user: {
          profile: {
            name: 'Alice',
            age: 25,
          },
        },
      };
      const form = toForm(formModel);

      form.setValueIn('user.profile.name', 'Charlie');

      expect(formModel.values.user.profile.name).toBe('Charlie');
    });

    it('should set array value by index', () => {
      formModel.values = {
        users: [{ name: 'Alice' }, { name: 'Bob' }],
      };
      const form = toForm(formModel);

      form.setValueIn('users.0.name', 'Charlie');

      expect(formModel.values.users[0].name).toBe('Charlie');
    });

    it('should create nested structure if not exists', () => {
      formModel.values = {};
      const form = toForm(formModel);

      form.setValueIn('user.profile.name', 'Alice');

      expect(formModel.values.user.profile.name).toBe('Alice');
    });
  });

  describe('validate', () => {
    it('should bind model validate method', () => {
      const form = toForm(formModel);

      expect(form.validate).toBeDefined();
      expect(typeof form.validate).toBe('function');
    });

    it('should call form validate method', async () => {
      const form = toForm(formModel);

      // Validate should be callable
      const result = await form.validate();

      // Without validators, should return empty object or undefined
      expect(result === undefined || Object.keys(result || {}).length === 0).toBe(true);
    });
  });

  it('should hide _formModel property (non-enumerable)', () => {
    const form = toForm(formModel);

    expect((form as any)._formModel).toBe(formModel);
    expect(Object.keys(form)).not.toContain('_formModel');
  });

  it('should preserve reactivity through getters', () => {
    const form = toForm(formModel);

    expect(form.values.username).toBe('John');

    formModel.values = { username: 'Alice' };

    expect(form.values.username).toBe('Alice');
  });

  it('should work with empty initialValues', () => {
    const emptyFormModel = new FormModel();
    emptyFormModel.init({});
    const form = toForm(emptyFormModel);

    expect(form.initialValues).toBeUndefined();
    expect(form.values).toBeUndefined();
  });
});

describe('toFormState', () => {
  let formModel: FormModel;

  beforeEach(() => {
    formModel = new FormModel();
    formModel.init({
      initialValues: {
        username: 'John',
        email: 'john@example.com',
      },
    });
  });

  it('should convert FormModelState to FormState', () => {
    const formState = toFormState(formModel.state);

    expect(formState).toBeDefined();
    expect(formState.isTouched).toBe(false);
    expect(formState.isDirty).toBe(false);
    expect(formState.invalid).toBe(false);
    expect(formState.isValidating).toBe(false);
  });

  it('should reflect isTouched state', () => {
    const formState = toFormState(formModel.state);

    expect(formState.isTouched).toBe(false);

    formModel.state.isTouched = true;

    expect(formState.isTouched).toBe(true);
  });

  it('should reflect isDirty state', () => {
    const formState = toFormState(formModel.state);

    expect(formState.isDirty).toBe(false);

    // Manually set dirty state
    formModel.state.isDirty = true;

    expect(formState.isDirty).toBe(true);
  });

  it('should reflect invalid state', () => {
    const formState = toFormState(formModel.state);

    expect(formState.invalid).toBe(false);

    formModel.state.invalid = true;

    expect(formState.invalid).toBe(true);
  });

  it('should reflect isValidating state', () => {
    const formState = toFormState(formModel.state);

    expect(formState.isValidating).toBe(false);

    formModel.state.isValidating = true;

    expect(formState.isValidating).toBe(true);
  });

  it('should expose errors from model state', () => {
    const formState = toFormState(formModel.state);

    expect(formState.errors).toBeUndefined();

    formModel.state.errors = {
      username: 'Username is required',
      email: 'Invalid email format',
    };

    expect(formState.errors).toEqual({
      username: 'Username is required',
      email: 'Invalid email format',
    });
  });

  it('should expose warnings from model state', () => {
    const formState = toFormState(formModel.state);

    expect(formState.warnings).toBeUndefined();

    formModel.state.warnings = {
      username: 'Username should be longer',
      email: 'Consider using a different email',
    };

    expect(formState.warnings).toEqual({
      username: 'Username should be longer',
      email: 'Consider using a different email',
    });
  });

  it('should preserve reactivity through getters', () => {
    const formState = toFormState(formModel.state);

    expect(formState.isTouched).toBe(false);

    formModel.state.isTouched = true;

    expect(formState.isTouched).toBe(true);
  });
});
