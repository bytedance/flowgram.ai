import { Field, FieldArray } from '../types/field';
import { toField } from './to-field';
import { FieldArrayModel } from './field-array-model';

export function toFieldArray<TValue>(model: FieldArrayModel<TValue>): FieldArray<TValue> {
  const res: FieldArray<TValue> = {
    get key() {
      return model.id;
    },
    get name() {
      return model.path.toString();
    },
    get value() {
      return model.value;
    },
    onChange: (value) => {
      model.value = value;
    },
    map: <T = any>(cb: (f: Field, index: number) => T) =>
      model.map<T>((f, index) => cb(toField(f), index)),
    append: (value) => toField<TValue>(model.append(value)),
    /**
     * @deprecated: use remove instead
     * @param index
     */
    delete: (index: number) => model.delete(index),
    remove: (index: number) => model.delete(index),
    swap: (from: number, to: number) => model.swap(from, to),
    move: (from: number, to: number) => model.move(from, to),
  } as FieldArray<TValue>;

  // Object.defineProperty(res, 'validate', {
  //   enumerable: false,
  //   get() {
  //     return model.validate.bind(model);
  //   },
  // });

  // 隐藏属性
  Object.defineProperty(res, '_fieldModel', {
    enumerable: false,
    get() {
      return model;
    },
  });
  return res;
}
