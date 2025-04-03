import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Errors, FeedbackLevel, ValidateTrigger } from '@/types';
import { FormModel } from '@/core/form-model';

describe('FieldModel', () => {
  let formModel = new FormModel();
  describe('state', () => {
    beforeEach(() => {
      formModel.dispose();
      formModel = new FormModel();
    });

    it('can bubble', () => {
      formModel.createField('parent');
      formModel.createField('parent.child');
      const childField = formModel.getField('parent.child')!;
      const parentField = formModel.getField('parent')!;

      childField.value = 1;
      expect(childField.state.isTouched).toBe(true);
      expect(parentField.state.isTouched).toBe(true);
      expect(formModel.state.isTouched).toBe(true);
    });

    it('can bubble with array', () => {
      formModel.createField('parent');
      formModel.createField('parent.arr');
      formModel.createField('parent.arr.1');
      const arrChild = formModel.getField('parent.arr.1')!;
      const arrField = formModel.getField('parent.arr')!;
      const parentField = formModel.getField('parent')!;

      arrChild.value = 1;
      expect(arrChild.state.isTouched).toBe(true);
      expect(arrField.state.isTouched).toBe(true);
      expect(parentField.state.isTouched).toBe(true);
      expect(formModel.state.isTouched).toBe(true);
    });

    it('do not set isTouched for init value set', () => {
      formModel.createField('parent');
      formModel.createField('parent.child');
      const childField = formModel.getField('parent.child')!;
      const parentField = formModel.getField('parent')!;

      expect(childField.state.isTouched).toBe(false);
      expect(parentField.state.isTouched).toBe(false);
      expect(formModel.state.isTouched).toBe(false);
    });
  });
  describe('validate', () => {
    beforeEach(() => {
      formModel.dispose();
      formModel = new FormModel();
    });

    it('when validate func return only a message', async () => {
      formModel.init({ validate: { 'parent.*': () => 'some message' } });
      formModel.createField('parent');
      formModel.createField('parent.child');
      const childField = formModel.getField('parent.child')!;

      expect(childField.state.errors).toBeUndefined();

      await childField.validate();

      expect(childField.state.errors?.['parent.child'][0].message).toBe('some message');
      expect(childField.state.errors?.['parent.child'][0].level).toBe(FeedbackLevel.Error);
    });

    it('when validate func return a FieldWarning', async () => {
      formModel.init({
        validate: {
          'parent.*': () => ({
            level: FeedbackLevel.Warning,
            message: 'some message',
          }),
        },
      });
      formModel.createField('parent');
      formModel.createField('parent.child');
      const childField = formModel.getField('parent.child')!;

      expect(childField.state.errors).toBeUndefined();

      await childField.validate();

      expect(childField.state.warnings?.['parent.child'][0].message).toBe('some message');
      expect(childField.state.warnings?.['parent.child'][0].level).toBe(FeedbackLevel.Warning);
    });
    it('when validate return a FormError', async () => {
      formModel.init({
        validate: {
          'parent.*': () => ({
            level: FeedbackLevel.Error,
            message: 'some message',
          }),
        },
      });
      formModel.createField('parent');
      formModel.createField('parent.child');
      const childField = formModel.getField('parent.child')!;

      expect(childField.state.errors?.length).toBeUndefined();

      await childField.validate();

      expect(childField.state.errors?.['parent.child'][0].message).toBe('some message');
      expect(childField.state.errors?.['parent.child'][0].level).toBe(FeedbackLevel.Error);
    });
    it('should bubble errors to parent field', async () => {
      formModel.init({
        validate: {
          'parent.*': () => ({
            level: FeedbackLevel.Error,
            message: 'some message',
          }),
        },
      });
      formModel.createField('parent');
      formModel.createField('parent.child');
      const childField = formModel.getField('parent.child')!;
      const parentField = formModel.getField('parent')!;

      await childField.validate();

      expect(parentField.state.errors?.['parent.child'][0].message).toBe('some message');
      expect(parentField.state.errors?.['parent.child'][0].level).toBe(FeedbackLevel.Error);
    });

    it('should bubble errors to form', async () => {
      formModel.init({
        validate: {
          'parent.*': () => ({
            level: FeedbackLevel.Error,
            message: 'some message',
          }),
        },
      });
      formModel.createField('parent');
      formModel.createField('parent.child');
      const childField = formModel.getField('parent.child')!;

      await childField.validate();

      expect(formModel.state.errors?.['parent.child'][0].message).toBe('some message');
      expect(formModel.state.errors?.['parent.child'][0].level).toBe(FeedbackLevel.Error);
    });

    it('should correctly set and bubble invalid', async () => {
      formModel.init({
        validate: {
          'parent.*': () => ({
            level: FeedbackLevel.Error,
            message: 'some message',
          }),
        },
      });
      const parent = formModel.createField('parent');
      const child = formModel.createField('parent.child');

      await child.validate();

      expect(child.state.invalid).toBe(true);
      expect(parent.state.invalid).toBe(true);
      expect(formModel.state.invalid).toBe(true);
    });

    it('should validate self ancestors and child', async () => {
      formModel.init({
        validateTrigger: ValidateTrigger.onChange,
      });
      const root = formModel.createField('root');
      const l1 = formModel.createField('root.l1');
      const l2 = formModel.createField('root.l1.l2');
      const l3 = formModel.createField('root.l1.l2.l3');
      const l4 = formModel.createField('root.l1.l2.l3.l4');
      const other = formModel.createField('root.other');

      vi.spyOn(root, 'validate');
      vi.spyOn(l1, 'validate');
      vi.spyOn(l2, 'validate');
      vi.spyOn(l3, 'validate');
      vi.spyOn(l4, 'validate');
      vi.spyOn(other, 'validate');

      formModel.setValueIn('root.l1.l2', 1);

      expect(root.validate).toHaveBeenCalledTimes(1);
      expect(l1.validate).toHaveBeenCalledTimes(1);
      expect(l2.validate).toHaveBeenCalledTimes(1);
      expect(l3.validate).toHaveBeenCalledTimes(1);
      expect(l4.validate).toHaveBeenCalledTimes(1);
      expect(other.validate).toHaveBeenCalledTimes(0);
    });

    it('should validate when multiple pattern match ', async () => {
      const validate1 = vi.fn();
      const validate2 = vi.fn();

      formModel.init({
        validateTrigger: ValidateTrigger.onChange,
        validate: {
          'a.*.input': validate1,
          'a.1.input': validate2,
        },
        initialValues: {
          a: [{ input: '0' }, { input: '1' }],
        },
      });
      const root = formModel.createField('a');
      const i0 = formModel.createField('a.0.input');
      const i1 = formModel.createField('a.1.input');

      formModel.setValueIn('a.1.input', 'xxx');

      expect(validate1).toHaveBeenCalledTimes(1);
      expect(validate2).toHaveBeenCalledTimes(1);
    });

    // 暂时注释了从 parent 触发validate 的能力，所以注释这个单测
    // it('can trigger validate from parent', async () => {
    //   formModel.init({
    //     validate: {
    //       'parent.child1': () => ({
    //         level: FeedbackLevel.Error,
    //         message: 'error',
    //       }),
    //       'parent.child2': () => ({
    //         level: FeedbackLevel.Warning,
    //         message: 'warning',
    //       }),
    //     },
    //   });
    //   const parent = formModel.createField('parent');
    //   formModel.createField('parent.child1');
    //   formModel.createField('parent.child2');
    //
    //   await parent.validate();
    //
    //   expect(formModel.state.errors?.['parent.child1'][0].message).toBe('error');
    //   expect(formModel.state.warnings?.['parent.child2'][0].level).toBe('warning');
    // });
  });

  describe('onValueChange', () => {
    let formEffect = vi.fn();
    beforeEach(() => {
      formModel.dispose();
      formModel = new FormModel();
      formEffect = vi.fn();
      formModel.onFormValuesChange(formEffect);
    });

    it('should bubble value change', () => {
      const parent = formModel.createField('parent');
      const child1 = formModel.createField('parent.child1');

      const childOnChange = vi.fn();
      const parentOnChange = vi.fn();

      child1.onValueChange(childOnChange);
      parent.onValueChange(parentOnChange);

      child1.value = 1;

      expect(parentOnChange).toHaveBeenCalledTimes(1);
      expect(childOnChange).toHaveBeenCalledTimes(1);
      expect(formEffect).toHaveBeenCalledTimes(1);
    });
    it('should bubble value change in array when delete', () => {
      const parent = formModel.createField('parent');
      const arr = formModel.createFieldArray('parent.arr');
      const item1 = formModel.createField('parent.arr.0');

      const parentOnChange = vi.fn();
      const arrOnChange = vi.fn();
      const item1OnChange = vi.fn();

      parent.onValueChange(parentOnChange);
      arr.onValueChange(arrOnChange);
      item1.onValueChange(item1OnChange);

      formModel.setValueIn('parent.arr.0', 1);
      arr.delete(0);

      expect(item1OnChange).toHaveBeenCalledTimes(2);
      expect(arrOnChange).toHaveBeenCalledTimes(2);
      expect(parentOnChange).toHaveBeenCalledTimes(2);
    });
    it('should bubble value change in array when append', () => {
      const parent = formModel.createField('parent');
      const arr = formModel.createFieldArray('parent.arr');

      const parentOnChange = vi.fn();
      const arrOnChange = vi.fn();

      parent.onValueChange(parentOnChange);
      arr.onValueChange(arrOnChange);

      arr.append('1');

      expect(arrOnChange).toHaveBeenCalledTimes(1);
      expect(parentOnChange).toHaveBeenCalledTimes(1);
      expect(formEffect).toHaveBeenCalledTimes(1);
    });

    it('should not trigger child field change when array append', () => {
      formModel.createField('parent');
      const arr = formModel.createFieldArray('parent.arr');
      const item0 = formModel.createField('parent.arr.0');
      const item0x = formModel.createField('parent.arr.0.x');

      const item0OnChange = vi.fn();
      const item0xOnChange = vi.fn();

      item0.onValueChange(item0OnChange);
      item0x.onValueChange(item0xOnChange);

      arr.append('1');

      expect(item0OnChange).toHaveBeenCalledTimes(0);
      expect(item0xOnChange).toHaveBeenCalledTimes(0);
    });

    it('should clear and fire change', () => {
      const parent = formModel.createField('parent');
      const child1 = formModel.createField('parent.child1');

      const child1OnChange = vi.fn();
      const parentOnChange = vi.fn();
      child1.onValueChange(child1OnChange);
      parent.onValueChange(parentOnChange);

      formModel.setValueIn('parent.child1', 1);
      child1.clear();

      expect(child1OnChange).toHaveBeenCalledTimes(2);
      expect(parentOnChange).toHaveBeenCalledTimes(2);
      expect(formEffect).toHaveBeenCalledTimes(2);
    });

    it('should bubble change in array delete', () => {
      const arr = formModel.createFieldArray('arr');
      const child1 = formModel.createField('arr.0');

      const childOnChange = vi.fn();
      const arrOnChange = vi.fn();
      child1.onValueChange(childOnChange);
      arr.onValueChange(arrOnChange);

      formModel.setValueIn('arr.0', 1);
      arr.delete(0);

      expect(childOnChange).toHaveBeenCalledTimes(2);
      expect(arrOnChange).toHaveBeenCalledTimes(2);
      // formModel.setValueIn 一次，arr.delete 中 arr 本身触发一次
      expect(formEffect).toHaveBeenCalledTimes(2);
    });

    it('should bubble change in array append', () => {
      const arr = formModel.createFieldArray('arr');
      const item0 = formModel.createField('arr.0');

      const item0OnChange = vi.fn();
      const arrOnChange = vi.fn();

      item0.onValueChange(item0OnChange);
      arr.onValueChange(arrOnChange);

      formModel.setValueIn('arr.0', 'a');
      arr.append('b');

      expect(item0OnChange).toHaveBeenCalledTimes(1);
    });
    it('should ignore unchanged items when array delete', () => {
      const other = formModel.createField('other');
      const parent = formModel.createField('parent');
      const arr = formModel.createFieldArray('parent.arr');
      const item0 = formModel.createField('parent.arr.0');
      const item1 = formModel.createField('parent.arr.1');
      const item2 = formModel.createField('parent.arr.2');
      formModel.setValueIn('parent.arr', [1, 2, 3]);

      const item0OnChange = vi.fn();
      const item1OnChange = vi.fn();
      const item2OnChange = vi.fn();
      const arrOnChange = vi.fn();
      const parentOnChange = vi.fn();
      const otherOnChange = vi.fn();

      item0.onValueChange(item0OnChange);
      item1.onValueChange(item1OnChange);
      item2.onValueChange(item2OnChange);
      arr.onValueChange(arrOnChange);
      parent.onValueChange(parentOnChange);
      other.onValueChange(otherOnChange);

      arr.delete(1);

      expect(arrOnChange).toHaveBeenCalledTimes(1);
      expect(parentOnChange).toHaveBeenCalledTimes(1);
      expect(item0OnChange).not.toHaveBeenCalled();
      expect(item1OnChange).toHaveBeenCalledTimes(1);
      expect(item2OnChange).toHaveBeenCalledTimes(1);
      expect(otherOnChange).not.toHaveBeenCalled();
    });
  });
  describe('dispose', () => {
    beforeEach(() => {
      formModel.dispose();
      formModel = new FormModel();
    });

    it('should correctly cleanup when field dispose', () => {
      const parent = formModel.createField('parent');
      const child1 = formModel.createField('parent.child1');

      child1.state.errors = { 'parent.child1': 'errors' } as unknown as Errors;
      child1.bubbleState();

      expect(formModel.state.errors?.['parent.child1']).toEqual('errors');
      expect(parent.state.errors?.['parent.child1']).toEqual('errors');

      parent.dispose();

      // Ref 'dispose' method in field-model.ts
      // 1. expect state has been cleared
      // expect(child1.state.errors).toBeUndefined();
      // expect(parent.state.errors?.['parent.child1']).toBeUndefined();

      // 2. expect field model has been cleared
      expect(formModel.fieldMap.get('parent')).toBeUndefined();
      expect(formModel.fieldMap.get('parent.child1')).toBeUndefined();
    });
  });
});
