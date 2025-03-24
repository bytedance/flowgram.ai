import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Errors, ValidateTrigger, Warnings } from '@/types';
import { FormModel } from '@/core/form-model';
import { type FieldArrayModel } from '@/core/field-array-model';

import { FeedbackLevel } from '../src/types';

describe('FormArrayModel', () => {
  let formModel = new FormModel();
  describe('children', () => {
    let arrayField: FieldArrayModel;
    beforeEach(() => {
      formModel.dispose();
      formModel = new FormModel();
      // 创建数组
      formModel.createFieldArray('arr');
      const field = formModel.getField<FieldArrayModel>('arr');
      field!.append('a');
      field!.append('b');
      field!.append('c');
      arrayField = field!;
    });

    it('can get children', () => {
      expect(arrayField.children.length).toBe(3);
    });
  });
  describe('append & delete', () => {
    let arrayField: FieldArrayModel;
    let arrEffect = vi.fn();
    let aEffect = vi.fn();
    let bEffect = vi.fn();
    let cEffect = vi.fn();
    let appendEffect = vi.fn();
    let deleteEffect = vi.fn();
    let aValidate = vi.fn();
    let bValidate = vi.fn();
    let cValidate = vi.fn();

    beforeEach(() => {
      formModel.dispose();
      formModel = new FormModel();
      arrEffect = vi.fn();
      aEffect = vi.fn();
      bEffect = vi.fn();
      cEffect = vi.fn();
      appendEffect = vi.fn();
      deleteEffect = vi.fn();
      aValidate = vi.fn();
      bValidate = vi.fn();
      cValidate = vi.fn();
      formModel.init({
        validateTrigger: ValidateTrigger.onChange,
        validate: {
          ['arr.0']: aValidate,
          ['arr.1']: bValidate,
          ['arr.2']: cValidate,
        },
      });
      // 创建其他field, 用于测试其他元素不会被影响
      formModel.createField('other');
      // 创建数组
      formModel.createFieldArray('arr');
      const field = formModel.getField<FieldArrayModel>('arr');
      const a = field!.append('a');
      const b = field!.append('b');
      const c = field!.append('c');
      arrayField = field!;
      arrayField.onValueChange(arrEffect);
      arrayField.onAppend(appendEffect);
      arrayField.onDelete(deleteEffect);

      a.onValueChange(aEffect);
      b.onValueChange(bEffect);
      c.onValueChange(cEffect);
    });

    it('append', async () => {
      vi.spyOn(arrayField, 'validate');

      arrayField.append('d');

      expect(arrayField.children.length).toBe(4);
      expect(formModel.getField('other')).toBeDefined();
      expect(arrEffect).toHaveBeenCalledTimes(1);
      expect(appendEffect).toHaveBeenCalledTimes(1);
      expect(arrayField.validate).toHaveBeenCalledTimes(1);
    });
    it('should fire OnFormValueChange event for arr when append', () => {
      vi.spyOn(formModel.onFormValuesInitEmitter, 'fire');
      vi.spyOn(formModel.onFormValuesChangeEmitter, 'fire');

      arrayField.append('d');

      expect(formModel.onFormValuesChangeEmitter.fire).toHaveBeenCalledWith({
        values: {
          arr: ['a', 'b', 'c', 'd'],
        },
        prevValues: {
          arr: ['a', 'b', 'c'],
        },
        name: 'arr',
        options: {
          action: 'array-append',
          indexes: [3],
        },
      });
      expect(formModel.onFormValuesInitEmitter.fire).toHaveBeenCalledWith({
        values: {
          arr: ['a', 'b', 'c', 'd'],
        },
        prevValues: {
          arr: ['a', 'b', 'c'],
        },
        name: 'arr.3',
      });
    });
    it('delete first element', () => {
      vi.spyOn(formModel.onFormValuesChangeEmitter, 'fire');
      vi.spyOn(arrayField, 'validate');
      vi.spyOn(arrayField.onValueChangeEmitter, 'fire');

      arrayField.delete(0);

      // assert value
      expect(arrayField.children.length).toBe(2);
      expect(arrayField.children[0].value).toBe('b');
      expect(arrayField.children[1].value).toBe('c');
      expect(formModel.getField('other')).toBeDefined();

      // assert change events
      expect(arrayField.onValueChangeEmitter.fire).toHaveBeenCalledTimes(1);
      expect(aEffect).toHaveBeenCalledTimes(1);
      expect(bEffect).toHaveBeenCalledTimes(1);
      expect(cEffect).toHaveBeenCalledTimes(1);
      expect(deleteEffect).toHaveBeenCalledTimes(1);
      expect(formModel.onFormValuesChangeEmitter.fire).toHaveBeenCalledWith({
        values: {
          arr: ['b', 'c'],
        },
        prevValues: {
          arr: ['a', 'b', 'c'],
        },
        name: 'arr',
        options: {
          action: 'array-splice',
          indexes: [0],
        },
      });
      expect(formModel.onFormValuesChangeEmitter.fire).toHaveBeenCalledTimes(1);

      // assert validate trigger
      expect(arrayField.validate).toHaveBeenCalledTimes(1);
      expect(aValidate).not.toHaveBeenCalled();
      expect(bValidate).not.toHaveBeenCalled();
      expect(cValidate).not.toHaveBeenCalled();
    });
    it('delete middle element', () => {
      vi.spyOn(arrayField, 'validate');
      vi.spyOn(arrayField.onValueChangeEmitter, 'fire');

      arrayField.delete(1);

      // assert values
      expect(arrayField.children.length).toBe(2);
      expect(arrayField.children[0].value).toBe('a');
      expect(arrayField.children[1].value).toBe('c');
      expect(formModel.getField('other')).toBeDefined();

      // assert change events
      expect(arrayField.onValueChangeEmitter.fire).toHaveBeenCalledTimes(1);
      expect(aEffect).not.toHaveBeenCalled();
      expect(bEffect).toHaveBeenCalledTimes(1);
      expect(cEffect).toHaveBeenCalledTimes(1);

      // assert validate trigger
      expect(bValidate).not.toHaveBeenCalled();
      expect(cValidate).not.toHaveBeenCalled();
      expect(arrayField.validate).toHaveBeenCalledTimes(1);
    });
    it('delete last element', () => {
      arrayField.delete(2);
      expect(arrayField.children.length).toBe(2);
      expect(arrayField.children[0].value).toBe('a');
      expect(arrayField.children[1].value).toBe('b');
      expect(formModel.getField('other')).toBeDefined();
      expect(arrEffect).toHaveBeenCalled();
      expect(cEffect).toHaveBeenCalled();
    });
    it('delete element which has nested field', () => {
      vi.spyOn(arrayField, 'validate');
      const axField = formModel.createField('arr.0.x');
      const bxField = formModel.createField('arr.1.x');

      vi.spyOn(axField, 'validate');
      vi.spyOn(bxField, 'validate');

      formModel.setValueIn('arr.0', { x: 1 });
      formModel.setValueIn('arr.1', { x: 2 });

      expect(arrayField.value).toEqual([{ x: 1 }, { x: 2 }, 'c']);

      arrayField.delete(0);

      expect(arrayField.value).toEqual([{ x: 2 }, 'c']);

      // assert change events
      expect(aEffect).toHaveBeenCalledTimes(2); // setValueIn 触发一次， delete 触发一次
      expect(bEffect).toHaveBeenCalledTimes(2); // setValueIn 触发一次， delete 触发一次
      expect(cEffect).toHaveBeenCalledTimes(1);

      // assert validate trigger
      expect(aValidate).toHaveBeenCalledTimes(1); // setValueIn 触发一次， delete 不会触发
      expect(bValidate).toHaveBeenCalledTimes(1); // setValueIn 触发一次， delete 不会触发
      expect(cValidate).not.toHaveBeenCalled();
      expect(axField.validate).toHaveBeenCalledTimes(1); // setValueIn 触发一次， delete 不会触发
      expect(bxField.validate).toHaveBeenCalledTimes(1); // setValueIn 触发一次， delete 不会触发
    });
    it('more elements delete', () => {
      /**
       * 数组为 [a,b,c,d]
       * 删除 b
       * 希望数组值为 [a,c,d]
       * 希望formModel中的field也正确对应
       */
      arrayField.append('d');

      vi.spyOn(arrayField, 'validate');

      arrayField.delete(1);

      // assert values
      expect(arrayField.children.length).toBe(3);
      expect(arrayField.children[0].value).toBe('a');
      expect(arrayField.children[1].value).toBe('c');
      expect(arrayField.children[2].value).toBe('d');
      expect(formModel.getField('arr.2')?.value).toBe('d');
      expect(formModel.getField('other')).toBeDefined();

      // assert value change events
      expect(arrEffect).toHaveBeenCalled();
      expect(bEffect).toHaveBeenCalled();
      expect(cEffect).toHaveBeenCalled();
      expect(arrayField.validate).toHaveBeenCalledTimes(1);
    });
  });
  describe('_splice', () => {
    let arrayField: FieldArrayModel;
    let aEffect = vi.fn();
    let bEffect = vi.fn();
    let cEffect = vi.fn();
    let dEffect = vi.fn();
    let eEffect = vi.fn();
    let aValidate = vi.fn();
    let bValidate = vi.fn();
    let cValidate = vi.fn();
    let dValidate = vi.fn();
    let eValidate = vi.fn();

    beforeEach(() => {
      formModel.dispose();
      formModel = new FormModel();
      aEffect = vi.fn();
      bEffect = vi.fn();
      cEffect = vi.fn();
      dEffect = vi.fn();
      eEffect = vi.fn();
      aValidate = vi.fn();
      bValidate = vi.fn();
      cValidate = vi.fn();
      dValidate = vi.fn();
      eValidate = vi.fn();
      formModel.createFieldArray('arr');
      formModel.init({
        validateTrigger: ValidateTrigger.onChange,
        validate: {
          ['arr.0']: aValidate,
          ['arr.1']: bValidate,
          ['arr.2']: cValidate,
          ['arr.3']: dValidate,
          ['arr.4']: eValidate,
        },
      });
      const field = formModel.getField<FieldArrayModel>('arr');
      const aField = field!.append('a');
      const bField = field!.append('b');
      const cField = field!.append('c');
      const dField = field!.append('d');
      const eField = field!.append('e');

      aField.onValueChange(aEffect);
      bField.onValueChange(bEffect);
      cField.onValueChange(cEffect);
      dField.onValueChange(dEffect);
      eField.onValueChange(eEffect);

      arrayField = field!;

      vi.spyOn(arrayField, 'validate');
      vi.spyOn(arrayField.onValueChangeEmitter, 'fire');
    });

    it('should throw error when delete count exceeds array length', () => {
      expect(() => {
        arrayField._splice(0, 6);
      }).toThrowError();
    });

    it('should throw error when delete in empty array', () => {
      arrayField._splice(0, 5);

      expect(() => {
        arrayField._splice(0);
      }).toThrowError();
    });

    it('splice first 2', () => {
      arrayField._splice(0, 2);

      // assert values
      expect(arrayField.children.length).toBe(3);
      expect(arrayField.children[0].value).toBe('c');
      expect(arrayField.children[1].value).toBe('d');
      expect(arrayField.children[2].value).toBe('e');

      // assert value change events
      expect(arrayField.onValueChangeEmitter.fire).toHaveBeenCalledTimes(1);
      expect(aEffect).toHaveBeenCalledTimes(1);
      expect(bEffect).toHaveBeenCalledTimes(1);
      expect(cEffect).toHaveBeenCalledTimes(1);
      expect(dEffect).toHaveBeenCalledTimes(1);
      expect(eEffect).toHaveBeenCalledTimes(1);

      // assert validate trigger
      expect(arrayField.validate).toHaveBeenCalledTimes(1);
      expect(aValidate).not.toHaveBeenCalled();
      expect(bValidate).not.toHaveBeenCalled();
      expect(cValidate).not.toHaveBeenCalled();
      expect(dValidate).not.toHaveBeenCalled();
      expect(eValidate).not.toHaveBeenCalled();
    });
    it('splice last 2', () => {
      arrayField._splice(3, 2);

      // assert values
      expect(arrayField.children.length).toBe(3);
      expect(arrayField.children[0].value).toBe('a');
      expect(arrayField.children[1].value).toBe('b');
      expect(arrayField.children[2].value).toBe('c');

      // assert value change events
      expect(arrayField.onValueChangeEmitter.fire).toHaveBeenCalledTimes(1);
      expect(aEffect).not.toHaveBeenCalled();
      expect(bEffect).not.toHaveBeenCalled();
      expect(cEffect).not.toHaveBeenCalled();
      expect(dEffect).toHaveBeenCalledTimes(1);
      expect(eEffect).toHaveBeenCalledTimes(1);

      // assert validate trigger
      expect(arrayField.validate).toHaveBeenCalledTimes(1);
      expect(aValidate).not.toHaveBeenCalled();
      expect(bValidate).not.toHaveBeenCalled();
      expect(cValidate).not.toHaveBeenCalled();
      expect(dValidate).not.toHaveBeenCalled();
      expect(eValidate).not.toHaveBeenCalled();
    });
    it('splice middle elements', () => {
      arrayField._splice(1, 2);

      // assert values
      expect(arrayField.children.length).toBe(3);
      expect(arrayField.children[0].value).toBe('a');
      expect(arrayField.children[1].value).toBe('d');
      expect(arrayField.children[2].value).toBe('e');

      // assert value change events
      expect(arrayField.onValueChangeEmitter.fire).toHaveBeenCalledTimes(1);
      expect(aEffect).not.toHaveBeenCalled();
      expect(bEffect).toHaveBeenCalledTimes(1);
      expect(cEffect).toHaveBeenCalledTimes(1);
      expect(dEffect).toHaveBeenCalledTimes(1);
      expect(eEffect).toHaveBeenCalledTimes(1);

      // assert validate trigger
      expect(arrayField.validate).toHaveBeenCalledTimes(1);
      expect(aValidate).not.toHaveBeenCalled();
      expect(bValidate).not.toHaveBeenCalled();
      expect(cValidate).not.toHaveBeenCalled();
      expect(dValidate).not.toHaveBeenCalled();
      expect(eValidate).not.toHaveBeenCalled();
    });

    it('splice all elements', () => {
      arrayField._splice(0, 5);

      expect(arrayField.children.length).toBe(0);
      expect(arrayField.value).toEqual([]);

      // assert value change events
      expect(arrayField.onValueChangeEmitter.fire).toHaveBeenCalledTimes(1);
      expect(aEffect).toHaveBeenCalledTimes(1);
      expect(bEffect).toHaveBeenCalledTimes(1);
      expect(cEffect).toHaveBeenCalledTimes(1);
      expect(dEffect).toHaveBeenCalledTimes(1);
      expect(eEffect).toHaveBeenCalledTimes(1);

      // assert validate trigger
      expect(arrayField.validate).toHaveBeenCalledTimes(1);
      expect(aValidate).not.toHaveBeenCalled();
      expect(bValidate).not.toHaveBeenCalled();
      expect(cValidate).not.toHaveBeenCalled();
      expect(dValidate).not.toHaveBeenCalled();
      expect(eValidate).not.toHaveBeenCalled();
    });
  });

  describe('State check when _splice', () => {
    beforeEach(() => {
      formModel.dispose();
      formModel = new FormModel();
    });
    it('should keep state of rest fields after delete a prev field', () => {
      const arrayField = formModel.createFieldArray('arr');
      formModel.init({
        validateTrigger: ValidateTrigger.onChange,
      });
      arrayField!.append('a');
      arrayField!.append('b');
      arrayField!.append('c');

      // 设置第1项的state
      const aFieldModel = formModel.getField('arr.1');
      aFieldModel!.state.errors = {
        'arr.1': [{ name: 'arr.1', message: 'error' }],
      } as unknown as Errors;
      aFieldModel!.state.warnings = {
        'arr.1': [{ name: 'arr.1', message: 'warning' }],
      } as unknown as Warnings;

      // 删除第0项
      arrayField._splice(0);

      // 原第一项变为第0项且他的state 被保留了， 且errors 中的路径标识也更新了
      expect(formModel.getField('arr.0')!.state.errors).toEqual({
        'arr.0': [{ name: 'arr.0', message: 'error' }],
      });
      expect(formModel.getField('arr.0')!.state.warnings).toEqual({
        'arr.0': [{ name: 'arr.0', message: 'warning' }],
      });
      expect(formModel.getField('arr.2')).toBeUndefined();
    });

    it('should keep state of rest fields after delete a prev field, when nested field', () => {
      const arrayField = formModel.createFieldArray('arr');
      formModel.init({
        validateTrigger: ValidateTrigger.onChange,
        initialValues: {
          arr: [
            { x: 1, y: 2 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
          ],
        },
      });
      formModel.createField('arr.0');
      formModel.createField('arr.0.x');
      formModel.createField('arr.0.y');
      formModel.createField('arr.1');
      formModel.createField('arr.1.x');
      formModel.createField('arr.1.y');
      formModel.createField('arr.2');
      formModel.createField('arr.2.x');
      formModel.createField('arr.2.y');

      // 设置第1项的state
      const aFieldModel = formModel.getField('arr.1.x');
      aFieldModel!.state.errors = {
        'arr.1.x': [{ name: 'arr.1.x', message: 'error' }],
      } as unknown as Errors;

      // 删除第0项
      arrayField._splice(0);

      // 原第一项变为第0项且他的state errors 被保留了， 且errors 中的路径标识也更新了
      expect(formModel.getField('arr.0')!.state.errors).toEqual({
        'arr.0.x': [{ name: 'arr.0.x', message: 'error' }],
      });
      expect(formModel.getField('arr.0.x')!.state.errors).toEqual({
        'arr.0.x': [{ name: 'arr.0.x', message: 'error' }],
      });
      expect(formModel.getField('arr.2')).toBeUndefined();
      expect(formModel.getField('arr.2.x')).toBeUndefined();
      expect(formModel.getField('arr.2.y')).toBeUndefined();
    });
    it('should align errors and warnings state with existing field in fieldMap ', () => {
      const arrayField = formModel.createFieldArray('arr');
      formModel.init({
        validateTrigger: ValidateTrigger.onChange,
        initialValues: {
          arr: [
            { x: 1, y: 2 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
          ],
        },
      });
      const field0 = formModel.createField('arr.0');
      const field0x = formModel.createField('arr.0.x');
      const field0y = formModel.createField('arr.0.y');
      const field1 = formModel.createField('arr.1');
      const field1x = formModel.createField('arr.1.x');
      const field1y = formModel.createField('arr.1.y');
      const field2 = formModel.createField('arr.2');
      const field2x = formModel.createField('arr.2.x');
      const field2y = formModel.createField('arr.2.y');

      field0x.state.errors = {
        'arr.0.x': [{ name: 'arr.0.x', message: 'error' }],
      } as unknown as Errors;
      field0x.bubbleState();

      field1x.state.errors = {
        'arr.1.x': [{ name: 'arr.1.x', message: 'error' }],
      } as unknown as Errors;
      field1x.bubbleState();

      field2x.state.errors = {
        'arr.2.x': [{ name: 'arr.2.x', message: 'error' }],
      } as unknown as Errors;

      // 删除第0项
      arrayField._splice(0);

      expect(formModel.state.errors['arr.0.x']).toEqual([{ name: 'arr.0.x', message: 'error' }]);
      expect(formModel.state.errors['arr.1.x']).toEqual([{ name: 'arr.1.x', message: 'error' }]);
      expect(formModel.state.errors['arr.2.x']).toBeUndefined();

      expect(field0.state.errors['arr.0.x']).toEqual([{ name: 'arr.0.x', message: 'error' }]);
      expect(field1.state.errors['arr.1.x']).toEqual([{ name: 'arr.1.x', message: 'error' }]);

      expect(arrayField.state.errors['arr.0.x']).toEqual([{ name: 'arr.0.x', message: 'error' }]);
      expect(arrayField.state.errors['arr.1.x']).toEqual([{ name: 'arr.1.x', message: 'error' }]);
      expect(arrayField.state.errors['arr.2.x']).toBeUndefined();
    });

    it('should not keep previous error state when delete first elem in array then add back ', () => {
      const arrayField = formModel.createFieldArray('arr');
      formModel.init({
        validateTrigger: ValidateTrigger.onChange,
        initialValues: {
          arr: [{ x: 1, y: 2 }],
        },
      });
      const field0 = formModel.createField('arr.0');
      const field0x = formModel.createField('arr.0.x');
      const field0y = formModel.createField('arr.0.y');

      field0x.state.errors = {
        'arr.0.x': [{ name: 'arr.0.x', message: 'error' }],
      } as unknown as Errors;
      field0x.bubbleState();

      // 删除第0项
      arrayField._splice(0);
      expect(formModel.state.errors['arr.0.x']).toBeUndefined();
      expect(arrayField.state.errors['arr.0.x']).toBeUndefined();
      expect(formModel._fieldMap.get('arr.0')).toBeUndefined();

      arrayField.append({ x: 1, y: 2 });
      formModel.createField('arr.0.x');
      expect(formModel._fieldMap.get('arr.0')).toBeDefined();
      expect(formModel.state.errors['arr.0.x']).toBeUndefined();
      expect(formModel._fieldMap.get('arr.0.x').state.errors).toBeUndefined();
    });
  });
  describe('swap', () => {
    beforeEach(() => {
      formModel.dispose();
      formModel = new FormModel();
    });

    it('can swap from 0 to middle index', () => {
      const arrayField = formModel.createFieldArray('arr');
      const a = arrayField!.append('a');
      const b = arrayField!.append('b');
      const c = arrayField!.append('c');

      formModel.init({});

      a.state.errors = {
        'arr.0': [{ name: 'arr.0', message: 'err0', level: FeedbackLevel.Error }],
      };
      b.state.errors = {
        'arr.1': [{ name: 'arr.1', message: 'err1', level: FeedbackLevel.Error }],
      };

      expect(formModel.values).toEqual({ arr: ['a', 'b', 'c'] });
      arrayField.swap(0, 1);
      expect(formModel.values).toEqual({ arr: ['b', 'a', 'c'] });
      expect(formModel.getField('arr.0').state.errors).toEqual({
        'arr.0': [{ name: 'arr.0', message: 'err1', level: FeedbackLevel.Error }],
      });
      expect(formModel.getField('arr.1').state.errors).toEqual({
        'arr.1': [{ name: 'arr.1', message: 'err0', level: FeedbackLevel.Error }],
      });
    });
    it('can chained swap', () => {
      const arrayField = formModel.createFieldArray('x.arr');
      const a = arrayField!.append('a');
      const b = arrayField!.append('b');
      arrayField!.append('c');

      formModel.init({});

      a.state.errors = {
        'arr.0': [{ name: 'arr.0', message: 'err0', level: FeedbackLevel.Error }],
      };
      b.state.errors = {
        'arr.1': [{ name: 'arr.1', message: 'err1', level: FeedbackLevel.Error }],
      };

      expect(a.name).toBe('x.arr.0');
      expect(b.name).toBe('x.arr.1');
      expect(formModel.values.x).toEqual({ arr: ['a', 'b', 'c'] });

      arrayField.swap(1, 0);
      expect(a.name).toBe('x.arr.1');
      expect(b.name).toBe('x.arr.0');
      expect(formModel.values.x).toEqual({ arr: ['b', 'a', 'c'] });

      arrayField.swap(1, 0);
      expect(a.name).toBe('x.arr.0');
      expect(formModel.fieldMap.get('x.arr.0').name).toBe('x.arr.0');
      expect(b.name).toBe('x.arr.1');
      expect(formModel.fieldMap.get('x.arr.1').name).toBe('x.arr.1');
      expect(formModel.values.x).toEqual({ arr: ['a', 'b', 'c'] });

      arrayField.swap(1, 0);
      expect(a.name).toBe('x.arr.1');
      expect(formModel.fieldMap.get('x.arr.1').name).toBe('x.arr.1');
      expect(b.name).toBe('x.arr.0');
      expect(formModel.fieldMap.get('x.arr.0').name).toBe('x.arr.0');

      expect(formModel.values.x).toEqual({ arr: ['b', 'a', 'c'] });
    });

    it('can swap from 0 to last index', () => {
      const arrayField = formModel.createFieldArray('arr');
      const a = arrayField!.append('a');
      const b = arrayField!.append('b');
      const c = arrayField!.append('c');

      formModel.init({});

      a.state.errors = {
        'arr.0': [{ name: 'arr.0', message: 'err0', level: FeedbackLevel.Error }],
      };
      c.state.errors = {
        'arr.2': [{ name: 'arr.2', message: 'err2', level: FeedbackLevel.Error }],
      };

      expect(formModel.values).toEqual({ arr: ['a', 'b', 'c'] });
      arrayField.swap(0, 2);
      expect(formModel.values).toEqual({ arr: ['c', 'b', 'a'] });
      expect(formModel.getField('arr.0').state.errors).toEqual({
        'arr.0': [{ name: 'arr.0', message: 'err2', level: FeedbackLevel.Error }],
      });
      expect(formModel.getField('arr.2').state.errors).toEqual({
        'arr.2': [{ name: 'arr.2', message: 'err0', level: FeedbackLevel.Error }],
      });
    });
    it('can swap from middle index to last index', () => {
      const arrayField = formModel.createFieldArray('arr');
      const a = arrayField!.append('a');
      const b = arrayField!.append('b');
      const c = arrayField!.append('c');

      formModel.init({});

      b.state.errors = {
        'arr.1': [{ name: 'arr.1', message: 'err1', level: FeedbackLevel.Error }],
      };
      c.state.errors = {
        'arr.2': [{ name: 'arr.2', message: 'err2', level: FeedbackLevel.Error }],
      };

      expect(formModel.values).toEqual({ arr: ['a', 'b', 'c'] });
      arrayField.swap(1, 2);
      expect(formModel.values).toEqual({ arr: ['a', 'c', 'b'] });
      expect(formModel.getField('arr.1').state.errors).toEqual({
        'arr.1': [{ name: 'arr.1', message: 'err2', level: FeedbackLevel.Error }],
      });
      expect(formModel.getField('arr.2').state.errors).toEqual({
        'arr.2': [{ name: 'arr.2', message: 'err1', level: FeedbackLevel.Error }],
      });
    });
    it('can swap from middle index to another middle index', () => {
      const arrayField = formModel.createFieldArray('arr');
      arrayField!.append('a');
      const b = arrayField!.append('b');
      const c = arrayField!.append('c');
      arrayField!.append('d');

      formModel.init({});

      b.state.errors = {
        'arr.1': [{ name: 'arr.1', message: 'err1', level: FeedbackLevel.Error }],
      };
      c.state.errors = {
        'arr.2': [{ name: 'arr.2', message: 'err2', level: FeedbackLevel.Error }],
      };

      expect(formModel.values).toEqual({ arr: ['a', 'b', 'c', 'd'] });
      arrayField.swap(1, 2);
      expect(formModel.values).toEqual({ arr: ['a', 'c', 'b', 'd'] });
      expect(formModel.getField('arr.1').state.errors).toEqual({
        'arr.1': [{ name: 'arr.1', message: 'err2', level: FeedbackLevel.Error }],
      });
      expect(formModel.getField('arr.2').state.errors).toEqual({
        'arr.2': [{ name: 'arr.2', message: 'err1', level: FeedbackLevel.Error }],
      });
    });

    it('can swap for nested array', () => {
      const arrayField = formModel.createFieldArray('arr');
      const a = arrayField!.append({ x: 'x0', y: 'y0' });
      const b = arrayField!.append({ x: 'x1', y: 'y1' });
      const ax = formModel.createField('arr.0.x');
      const ay = formModel.createField('arr.0.y');
      const bx = formModel.createField('arr.1.x');
      const by = formModel.createField('arr.1.y');

      formModel.init({});

      ax.state.errors = {
        'arr.0.x': [{ name: 'arr.0.x', message: 'err0x', level: FeedbackLevel.Error }],
      };
      bx.state.errors = {
        'arr.1.x': [{ name: 'arr.1.x', message: 'err1x', level: FeedbackLevel.Error }],
      };

      expect(formModel.values).toEqual({
        arr: [
          { x: 'x0', y: 'y0' },
          { x: 'x1', y: 'y1' },
        ],
      });
      arrayField.swap(0, 1);
      expect(formModel.values).toEqual({
        arr: [
          { x: 'x1', y: 'y1' },
          { x: 'x0', y: 'y0' },
        ],
      });
      expect(formModel.getField('arr.0.x').state.errors).toEqual({
        'arr.0.x': [{ name: 'arr.0.x', message: 'err1x', level: FeedbackLevel.Error }],
      });
      expect(formModel.getField('arr.1.x').state.errors).toEqual({
        'arr.1.x': [{ name: 'arr.1.x', message: 'err0x', level: FeedbackLevel.Error }],
      });

      // assert form.state.errors
      expect(formModel.state.errors['arr.0.x']).toEqual([
        { name: 'arr.0.x', message: 'err1x', level: FeedbackLevel.Error },
      ]);
      expect(formModel.state.errors['arr.1.x']).toEqual([
        { name: 'arr.1.x', message: 'err0x', level: FeedbackLevel.Error },
      ]);
    });

    it('should have correct form.state.errors after swapping invalid field with valid field', () => {
      const arrayField = formModel.createFieldArray('arr');
      const a = arrayField!.append('a');
      const b = arrayField!.append('b');
      arrayField!.append('c');

      formModel.init({});

      b.state.errors = {
        'arr.1': [{ name: 'arr.1', message: 'err1', level: FeedbackLevel.Error }],
      };

      arrayField.swap(0, 1);
      expect(formModel.getField('arr.0').state.errors).toEqual({
        'arr.0': [{ name: 'arr.0', message: 'err1', level: FeedbackLevel.Error }],
      });
      expect(formModel.getField('arr.1').state.errors).toEqual(undefined);
    });

    it('should trigger array effect and child effect', () => {
      const arrayField = formModel.createFieldArray('arr');
      const fieldA = arrayField!.append('a');
      arrayField!.append('b');
      arrayField!.append('c');

      const arrayEffect = vi.fn();
      arrayField.onValueChange(arrayEffect);
      const fieldAEffect = vi.fn();
      fieldA.onValueChange(fieldAEffect);

      formModel.init({});

      arrayField.swap(1, 2);
      expect(arrayEffect).toHaveBeenCalledOnce();
      expect(fieldAEffect).toHaveBeenCalledOnce();
    });
  });
  describe('move', () => {
    beforeEach(() => {
      formModel.dispose();
      formModel = new FormModel();
    });

    it('should throw error when from or to exceeds bound', () => {
      const arrayField = formModel.createFieldArray('arr');
      arrayField!.append('a');
      arrayField!.append('b');
      arrayField!.append('c');
      formModel.init({});
      expect(() => arrayField.move(-1, 1)).toThrowError();
      expect(() => arrayField.move(1, -1)).toThrowError();
      expect(() => arrayField.move(1, 3)).toThrowError();
      expect(() => arrayField.move(3, 1)).toThrowError();
    });

    it('can move from 0 to middle index', () => {
      const arrayField = formModel.createFieldArray('arr');
      arrayField!.append('a');
      arrayField!.append('b');
      arrayField!.append('c');

      formModel.init({});

      expect(formModel.values).toEqual({ arr: ['a', 'b', 'c'] });
      arrayField.move(0, 1);
      expect(formModel.values).toEqual({ arr: ['b', 'a', 'c'] });
    });

    it('can move from 0 to last index', () => {
      const arrayField = formModel.createFieldArray('arr');
      arrayField!.append('a');
      arrayField!.append('b');
      arrayField!.append('c');

      formModel.init({});

      expect(formModel.values).toEqual({ arr: ['a', 'b', 'c'] });
      arrayField.move(0, 2);
      expect(formModel.values).toEqual({ arr: ['b', 'c', 'a'] });
    });
    it('can move from middle index to last index', () => {
      const arrayField = formModel.createFieldArray('arr');
      arrayField!.append('a');
      arrayField!.append('b');
      arrayField!.append('c');
      formModel.init({});

      expect(formModel.values).toEqual({ arr: ['a', 'b', 'c'] });
      arrayField.move(1, 2);
      expect(formModel.values).toEqual({ arr: ['a', 'c', 'b'] });
    });
    it('can move from middle index to another middle index', () => {
      const arrayField = formModel.createFieldArray('arr');
      arrayField!.append('a');
      arrayField!.append('b');
      arrayField!.append('c');
      arrayField!.append('d');

      formModel.init({});

      expect(formModel.values).toEqual({ arr: ['a', 'b', 'c', 'd'] });
      arrayField.move(1, 2);
      expect(formModel.values).toEqual({ arr: ['a', 'c', 'b', 'd'] });
    });

    it('can move from middle index to another middle index with more elements', () => {
      const arrayField = formModel.createFieldArray('arr');
      arrayField!.append('a');
      arrayField!.append('b');
      arrayField!.append('c');
      arrayField!.append('d');
      arrayField!.append('e');
      arrayField!.append('f');

      formModel.init({});

      expect(formModel.values).toEqual({ arr: ['a', 'b', 'c', 'd', 'e', 'f'] });
      arrayField.move(1, 4);
      expect(formModel.values).toEqual({ arr: ['a', 'c', 'd', 'e', 'b', 'f'] });
    });
    it('can move from middle index to another middle index with more elements when to is greater than from', () => {
      const arrayField = formModel.createFieldArray('arr');
      arrayField!.append('a');
      arrayField!.append('b');
      arrayField!.append('c');
      arrayField!.append('d');
      arrayField!.append('e');
      arrayField!.append('f');

      formModel.init({});

      expect(formModel.values).toEqual({ arr: ['a', 'b', 'c', 'd', 'e', 'f'] });
      arrayField.move(4, 1);
      expect(formModel.values).toEqual({ arr: ['a', 'e', 'b', 'c', 'd', 'f'] });
    });

    it('should trigger array effect and child effect', () => {
      const arrayField = formModel.createFieldArray('arr');
      const fieldA = arrayField!.append('a');
      arrayField!.append('b');
      arrayField!.append('c');

      const arrayEffect = vi.fn();
      arrayField.onValueChange(arrayEffect);
      const fieldAEffect = vi.fn();
      fieldA.onValueChange(fieldAEffect);

      formModel.init({});

      arrayField.move(1, 2);
      expect(arrayEffect).toHaveBeenCalledOnce();
      expect(fieldAEffect).toHaveBeenCalledOnce();
    });
  });
});
