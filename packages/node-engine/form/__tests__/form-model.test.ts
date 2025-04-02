import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ValidateTrigger } from '@/types';
import { FormModel } from '@/core/form-model';

describe('FormModel', () => {
  let formModel = new FormModel();
  describe('validate trigger', () => {
    beforeEach(() => {
      formModel.dispose();
      formModel = new FormModel();
    });

    it('do not validate when value change if validateTrigger is onBlur', async () => {
      formModel.init({ validateTrigger: ValidateTrigger.onBlur });

      const field = formModel.createField('x');
      field.originalValidate = vi.fn();
      vi.spyOn(field, 'originalValidate');

      field.value = 'some value';

      expect(field.originalValidate).not.toHaveBeenCalledOnce();
    });

    describe('delete field', () => {
      beforeEach(() => {
        formModel.dispose();
        formModel = new FormModel();
      });

      it('validate onChange', async () => {
        formModel.init({ initialValues: { parent: { child1: 1 } } });

        formModel.createField('parent');
        formModel.createField('parent.child1');
        expect(formModel.values.parent?.child1).toBe(1);

        formModel.deleteField('parent');

        expect(formModel.values.parent?.child1).toBeUndefined();
        expect(formModel.getField('parent')).toBeUndefined();
        expect(formModel.getField('parent.child1')).toBeUndefined();
      });
    });
  });
  describe('FormModel.validate', () => {
    beforeEach(() => {
      formModel.dispose();
      formModel = new FormModel();
    });

    it('should run validate on all matched names', async () => {
      formModel.init({
        validate: {
          'a.b.*': () => 'error',
        },
      });

      const bField = formModel.createField('a.b');
      const xField = formModel.createField('a.b.x');

      formModel.setValueIn('a.b', { x: 1, y: 2 });

      const results = await formModel.validate();

      // 1. assert validate has been executed correctly
      expect(results.length).toEqual(2);
      expect(results[0].message).toEqual('error');
      expect(results[0].name).toEqual('a.b.x');
      expect(results[1].message).toEqual('error');
      expect(results[1].name).toEqual('a.b.y');
      // 2. assert form state has been set correctly
      expect(formModel.state?.errors?.['a.b.x']?.[0].message).toEqual('error');
      // 3. assert field state has been set correctly
      expect(xField.state?.errors?.['a.b.x']?.[0].message).toEqual('error');
      // 4. assert field state has been bubbled to its parent
      expect(bField.state?.errors?.['a.b.x']?.[0].message).toEqual('error');
    });
    it('should run validate if multiple patterns match', async () => {
      const mockValidate1 = vi.fn();
      const mockValidate2 = vi.fn();
      formModel.init({
        validate: {
          'a.b.*': mockValidate1,
          'a.b.x': mockValidate2,
        },
      });

      const bField = formModel.createField('a.b');
      const xField = formModel.createField('a.b.x');

      formModel.setValueIn('a.b', { x: 1, y: 2 });

      formModel.validate();

      expect(mockValidate1).toHaveBeenCalledTimes(2);
      expect(mockValidate2).toHaveBeenCalledTimes(1);
    });
    it('should run validate correctly if multiple patterns match but multiple layer empty value exist', async () => {
      const mockValidate1 = vi.fn();
      const mockValidate2 = vi.fn();
      formModel.init({
        validate: {
          'a.*.x': mockValidate1,
          'a.b.x': mockValidate2,
        },
      });

      const bField = formModel.createField('a.b');
      const xField = formModel.createField('a.b.x');

      formModel.setValueIn('a', {});

      formModel.validate();

      expect(mockValidate1).toHaveBeenCalledTimes(0);
      expect(mockValidate2).toHaveBeenCalledTimes(1);
    });
    it('should correctly set form errors state when field does not exist', async () => {
      formModel.init({
        validate: {
          'a.b.*': () => 'error',
        },
      });

      formModel.setValueIn('a.b', { x: 1, y: 2 });
      await formModel.validate();

      expect(formModel.state?.errors?.['a.b.x']?.[0].message).toEqual('error');
    });
    it('should set form and field state correctly when run validate twice', async () => {
      formModel.init({
        validate: {
          'a.b.*': ({ value }) => (typeof value === 'string' ? undefined : 'error'),
        },
      });

      const bField = formModel.createField('a.b');
      const xField = formModel.createField('a.b.x');

      formModel.setValueIn('a.b', { x: 1, y: 2 });

      let results = await formModel.validate();
      // both x y is string, so 2 errors
      expect(results.length).toEqual(2);
      expect(formModel.state?.errors?.['a.b.x']?.[0].message).toEqual('error');
      expect(formModel.state?.errors?.['a.b.y']?.[0].message).toEqual('error');
      expect(xField.state?.errors?.['a.b.x']?.[0].message).toEqual('error');
      expect(bField.state?.errors?.['a.b.x']?.[0].message).toEqual('error');

      formModel.setValueIn('a.b', { x: '1', y: '2' });

      results = await formModel.validate();

      expect(results.length).toEqual(0);
      expect(formModel.state?.errors?.['a.b.x']).toEqual([]);
      expect(formModel.state?.errors?.['a.b.y']).toEqual([]);
    });
  });
  describe('FormModel set/get values', () => {
    beforeEach(() => {
      formModel.dispose();
      formModel = new FormModel();
      vi.spyOn(formModel.onFormValuesInitEmitter, 'fire');
      vi.spyOn(formModel.onFormValuesChangeEmitter, 'fire');
      vi.spyOn(formModel.onFormValuesUpdatedEmitter, 'fire');
    });
    it('should set value for root path', () => {
      formModel.init({
        initialValues: {
          a: 1,
        },
      });

      formModel.values = { a: 2 };
      expect(formModel.values).toEqual({ a: 2 });
    });

    it('should set initialValues and fire init and updated events', async () => {
      formModel.init({
        initialValues: {
          a: 1,
        },
      });

      expect(formModel.values).toEqual({ a: 1 });
      expect(formModel.onFormValuesInitEmitter.fire).toHaveBeenCalledWith({
        values: {
          a: 1,
        },
        name: '',
      });
      expect(formModel.onFormValuesUpdatedEmitter.fire).toHaveBeenCalledWith({
        values: {
          a: 1,
        },
        name: '',
      });
    });

    it('should set initialValues in certain path and fire change', async () => {
      formModel.init({
        initialValues: {
          a: 1,
        },
      });

      formModel.setInitValueIn('b', 2);

      expect(formModel.values).toEqual({ a: 1, b: 2 });
      expect(formModel.onFormValuesInitEmitter.fire).toHaveBeenCalledWith({
        values: {
          a: 1,
          b: 2,
        },
        prevValues: {
          a: 1,
        },
        name: 'b',
      });
      expect(formModel.onFormValuesUpdatedEmitter.fire).toHaveBeenCalledWith({
        values: {
          a: 1,
          b: 2,
        },
        prevValues: {
          a: 1,
        },
        name: 'b',
      });
    });
    it('should not set initialValues in certain path if value exists', async () => {
      formModel.init({
        initialValues: {
          a: 1,
        },
      });

      formModel.setInitValueIn('a', 2);

      expect(formModel.values).toEqual({ a: 1 });
      // 仅在初始化时调用一次，setInitValueIn 没有调用
      expect(formModel.onFormValuesInitEmitter.fire).toHaveBeenCalledTimes(1);
      expect(formModel.onFormValuesUpdatedEmitter.fire).toHaveBeenCalledTimes(1);
    });
    it('should set values in certain path and fire change and updated events', async () => {
      formModel.init({
        initialValues: {
          a: 1,
        },
      });

      formModel.setValueIn('a', 2);

      expect(formModel.values).toEqual({ a: 2 });
      // 仅在初始化时调用一次，setInitValueIn 没有调用
      expect(formModel.onFormValuesChangeEmitter.fire).toHaveBeenCalledTimes(1);
      // 初始化一次，变更值一次，所以是两次
      expect(formModel.onFormValuesUpdatedEmitter.fire).toHaveBeenCalledTimes(2);
      expect(formModel.onFormValuesChangeEmitter.fire).toHaveBeenCalledWith({
        values: {
          a: 2,
        },
        prevValues: {
          a: 1,
        },
        name: 'a',
      });
      expect(formModel.onFormValuesUpdatedEmitter.fire).toHaveBeenCalledWith({
        values: {
          a: 2,
        },
        prevValues: {
          a: 1,
        },
        name: 'a',
      });
    });
  });
});
