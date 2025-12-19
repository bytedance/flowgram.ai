/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';

import { FieldModel } from '@/core/field-model';
import { FieldArrayModel } from '@/core/field-array-model';
import { createForm } from '@/core/create-form';

describe('createForm', () => {
  it('should create form with auto initialization by default', () => {
    const { form, control } = createForm();

    expect(form).toBeDefined();
    expect(control).toBeDefined();
    expect(control._formModel.initialized).toBe(true);
  });

  it('should disableAutoInit work', async () => {
    const { control } = createForm({ disableAutoInit: true });

    expect(control._formModel.initialized).toBe(false);

    control.init();
    expect(control._formModel.initialized).toBe(true);
  });

  it('should create form with initial values', () => {
    const initialValues = {
      username: 'John',
      email: 'john@example.com',
      age: 30,
    };
    const { form } = createForm({ initialValues });

    expect(form.initialValues).toEqual(initialValues);
    expect(form.values).toEqual(initialValues);
  });

  it('should create form with validation', async () => {
    const { form } = createForm({
      initialValues: { username: '' },
    });

    // Validation should be callable
    const errors = await form.validate();

    // Without explicit validators, errors should be empty or undefined
    expect(errors === undefined || Object.keys(errors).length === 0).toBe(true);
  });

  it('should create form with empty options', () => {
    const { form, control } = createForm({});

    expect(form).toBeDefined();
    expect(control).toBeDefined();
    expect(control._formModel.initialized).toBe(true);
  });

  it('should create form without options', () => {
    const { form, control } = createForm();

    expect(form).toBeDefined();
    expect(control).toBeDefined();
    expect(control._formModel.initialized).toBe(true);
  });

  describe('control.getField', () => {
    it('should get field by name', () => {
      const { form, control } = createForm({
        initialValues: {
          username: 'John',
        },
      });

      // Create field first
      control._formModel.createField('username');
      const field = control.getField('username');

      expect(field).toBeDefined();
      expect(field!.name).toBe('username');
      expect(field!.value).toBe('John');
    });

    it('should return undefined for non-existent field', () => {
      const { control } = createForm();

      const field = control.getField('nonexistent');

      expect(field).toBeUndefined();
    });

    it('should get FieldArray when field is array', () => {
      const { control } = createForm({
        initialValues: {
          users: [{ name: 'Alice' }, { name: 'Bob' }],
        },
      });

      // Create field array
      control._formModel.createFieldArray('users');
      const fieldArray = control.getField('users');

      expect(fieldArray).toBeDefined();
      expect(fieldArray!.name).toBe('users');
      expect(Array.isArray(fieldArray!.value)).toBe(true);
    });

    it('should return Field for regular field', () => {
      const { control } = createForm({
        initialValues: {
          username: 'John',
        },
      });

      control._formModel.createField('username');
      const field = control.getField('username');

      expect(field).toBeDefined();
      expect(field!.name).toBe('username');
      expect((field as any).onChange).toBeDefined();
    });

    it('should return FieldArray for array field with array methods', () => {
      const { control } = createForm({
        initialValues: {
          users: [{ name: 'Alice' }],
        },
      });

      control._formModel.createFieldArray('users');
      const fieldArrayModel = control._formModel.getField('users');
      expect(fieldArrayModel).toBeInstanceOf(FieldArrayModel);

      const fieldArray = control.getField('users');

      expect(fieldArray).toBeDefined();
      expect((fieldArray as any).append).toBeDefined();
      expect((fieldArray as any).remove).toBeDefined();
      expect((fieldArray as any).swap).toBeDefined();
      expect((fieldArray as any).move).toBeDefined();
    });

    it('should handle nested field names', () => {
      const { control } = createForm({
        initialValues: {
          user: {
            profile: {
              name: 'Alice',
            },
          },
        },
      });

      control._formModel.createField('user.profile.name');
      const field = control.getField('user.profile.name');

      expect(field).toBeDefined();
      expect(field!.name).toBe('user.profile.name');
      expect(field!.value).toBe('Alice');
    });

    it('should handle array index in field names', () => {
      const { control } = createForm({
        initialValues: {
          users: [{ name: 'Alice' }, { name: 'Bob' }],
        },
      });

      control._formModel.createField('users.0.name');
      const field = control.getField('users.0.name');

      expect(field).toBeDefined();
      expect(field!.name).toBe('users.0.name');
      expect(field!.value).toBe('Alice');
    });
  });

  describe('control.init', () => {
    it('should initialize form with new options', () => {
      const { control } = createForm({ disableAutoInit: true });

      expect(control._formModel.initialized).toBe(false);

      control.init();

      expect(control._formModel.initialized).toBe(true);
    });

    it('should reinitialize form', () => {
      const { control } = createForm({
        initialValues: { username: 'John' },
      });

      expect(control._formModel.initialized).toBe(true);
      expect(control._formModel.initialValues).toEqual({ username: 'John' });

      control._formModel.dispose();
      control.init();

      expect(control._formModel.initialized).toBe(true);
    });
  });

  it('should expose _formModel on control', () => {
    const { control } = createForm();

    expect(control._formModel).toBeDefined();
    expect(control._formModel.init).toBeDefined();
    expect(control._formModel.createField).toBeDefined();
  });
});
