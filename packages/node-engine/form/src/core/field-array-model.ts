import { Emitter } from '@flowgram.ai/utils';

import { FieldValue } from '../types';
import { Path } from './path';
import { FieldModel } from './field-model';

export class FieldArrayModel<TValue = FieldValue> extends FieldModel<Array<TValue>> {
  protected onAppendEmitter = new Emitter<{
    index: number;
    value: TValue | undefined;
    arrayValue: Array<TValue>;
  }>();

  readonly onAppend = this.onAppendEmitter.event;

  protected onDeleteEmitter = new Emitter<{
    arrayValue: Array<TValue> | undefined;
    index: number;
  }>();

  readonly onDelete = this.onDeleteEmitter.event;

  get children() {
    const fields: FieldModel[] = [];
    this.form.fieldMap.forEach((field, name: string) => {
      if (this.path.isChild(name)) {
        fields.push(field);
      }
    });

    // 按 index 排序
    return fields.sort((f1, f2) => {
      const p1 = f1.path.value;
      const p2 = f2.path.value;
      const i1 = parseInt(p1[p1.length - 1]);
      const i2 = parseInt(p1[p2.length - 1]);
      return i1 - i2;
    });
  }

  map<T>(cb: (f: FieldModel, index: number, arr: FieldModel[]) => T) {
    const fields = (this.value || []).map((v: TValue, i: number) => {
      const pathString = this.path.concat(i).toString();
      let field = this.form.getField(pathString);
      if (!field) {
        field = this.form.createField(pathString);
      }
      return field;
    });
    return fields.map(cb);
  }

  append(value?: TValue) {
    const curLength = this.value?.length || 0;
    const newElemPath = this.path.concat(curLength).toString();
    const newElemField = this.form.createField(newElemPath);
    const newArrayValue = this.value ? [...this.value, value] : [value];

    const prevFormValues = this.form.values;

    // 设置新的数组值并触发事件
    this.form.store.setIn(new Path(this.name), newArrayValue);
    this.form.fireOnFormValuesChange({
      values: this.form.values,
      prevValues: prevFormValues,
      name: this.name,
      options: {
        action: 'array-append',
        indexes: [curLength],
      },
    });
    // 触发新元素的初始值变更
    this.form.fireOnFormValuesInit({
      values: this.form.values,
      prevValues: prevFormValues,
      name: newElemPath,
    });

    this.onAppendEmitter.fire({
      value,
      arrayValue: this.value as Array<TValue>,
      index: this.value!.length - 1,
    });
    return newElemField;
  }

  /**
   * Delete the element in given index and delete the corresponding FieldModel as well
   * @param index
   */
  delete(index: number) {
    // const field = this.form.getField(name);
    // if (!field) {
    //   throw new Error(
    //     `[Form] Error in FieldArrayModel.delete: delete failed, no field found for name ${name}`,
    //   );
    // }
    // const index = field.path.getArrayIndex(this.path);
    this._splice(index, 1);

    this.onDeleteEmitter.fire({ arrayValue: this.value, index });
  }

  _splice(start: number, deleteCount = 1) {
    if (start < 0 || deleteCount < 0) {
      throw new Error(
        `[Form] Error in FieldArrayModel.splice: Invalid Params, start and deleteCount should > 0`
      );
    }

    if (!this.value || this.value.length === 0 || deleteCount > this.value.length) {
      throw new Error(
        `[Form] Error in FieldArrayModel.splice: delete count exceeds array length, tried to delete ${deleteCount} elements, but array length is ${
          this.value?.length || 0
        }`
      );
    }
    const oldFormValues = this.form.values;

    const tempValue = [...this.value];
    tempValue.splice(start, deleteCount);

    // 设置数组值并触发事件
    this.form.store.setIn(new Path(this.name), tempValue);

    this.form.fireOnFormValuesChange({
      values: this.form.values,
      prevValues: oldFormValues,
      name: this.name,
      options: {
        action: 'array-splice',
        indexes: Array.from({ length: deleteCount }, (_, i) => i + start),
      },
    });

    const children = this.children;

    // 如果要删除的元素都在数组末端， 直接删除
    if (start + deleteCount >= children.length) {
      for (let i = start; i < children.length; i++) {
        this.form.disposeField(children[i].name);
      }
    }

    const toDispose: FieldModel[] = [];
    const newFieldMap = new Map<string, FieldModel>(this.form.fieldMap);

    const recursiveHandleChildField = (field: FieldModel, index: number) => {
      if (field.children?.length) {
        field.children.forEach((cField) => {
          recursiveHandleChildField(cField, index);
        });
      }
      // start 以前的项不变
      if (index < start) {
        newFieldMap.set(field.name, field);
      }
      // 要删除的项， 放入toDispose
      else if (index < start + deleteCount) {
        toDispose.push(field);
      }
      // 剩余的项 index 向前移动 {deleteCount} 位， 并触发变更事件
      else {
        const originName = field.name;
        const targetName = field.path
          .replaceParent(this.path.concat(index), this.path.concat(index - deleteCount))
          .toString();
        newFieldMap.set(targetName, field);
        if (!field.children.length) {
          field.updateNameForLeafState(targetName);
          field.bubbleState();
        }
        field.name = targetName;

        // 最后 {deleteCount} 项，需要fire 被变更为undefined， 并从 newMap 中删除
        if (index > children.length - deleteCount - 1) {
          newFieldMap.delete(originName);
        }
      }
    };

    // 对数组所有子项做删除或 index 移动操作
    children.map((field, index) => {
      recursiveHandleChildField(field, index);
    });

    toDispose.forEach((f) => {
      f.dispose();
    });
    this.form.fieldMap = newFieldMap;
    this.form.alignStateWithFieldMap();
  }

  swap(from: number, to: number) {
    if (!this.value) {
      return;
    }

    if (from < 0 || to < 0 || from > this.value.length - 1 || to > this.value.length - 1) {
      throw new Error(
        `[Form]: FieldArrayModel.swap Error: invalid params 'form' and 'to', form=${from} to=${to}. expect the value between 0 to ${
          length - 1
        }`
      );
    }

    const oldFormValues = this.form.values;
    const tempValue = [...this.value];

    const fromValue = tempValue[from];
    const toValue = tempValue[to];

    tempValue[to] = fromValue;
    tempValue[from] = toValue;

    this.form.store.setIn(this.path, tempValue);
    this.form.fireOnFormValuesChange({
      values: this.form.values,
      prevValues: oldFormValues,
      name: this.name,
      options: {
        action: 'array-swap',
        indexes: [from, to],
      },
    });

    // swap related FieldModels
    const newFieldMap = new Map<string, FieldModel>(this.form.fieldMap);

    const fromFields = this.findAllFieldsAt(from);
    const toFields = this.findAllFieldsAt(to);
    const fromRootPath = this.getPathAt(from);
    const toRootPath = this.getPathAt(to);
    const leafFieldsModified: FieldModel[] = [];
    fromFields.forEach((f) => {
      const newName = f.path.replaceParent(fromRootPath, toRootPath).toString();
      f.name = newName;
      if (!f.children.length) {
        f.updateNameForLeafState(newName);
        leafFieldsModified.push(f);
      }
      newFieldMap.set(newName, f);
    });
    toFields.forEach((f) => {
      const newName = f.path.replaceParent(toRootPath, fromRootPath).toString();
      f.name = newName;
      if (!f.children.length) {
        f.updateNameForLeafState(newName);
      }
      newFieldMap.set(newName, f);
      leafFieldsModified.push(f);
    });
    this.form.fieldMap = newFieldMap;
    leafFieldsModified.forEach((f) => f.bubbleState());
    this.form.alignStateWithFieldMap();
  }

  move(from: number, to: number) {
    if (!this.value) {
      return;
    }

    if (from < 0 || to < 0 || from > this.value.length - 1 || to > this.value.length - 1) {
      throw new Error(
        `[Form]: FieldArrayModel.move Error: invalid params 'form' and 'to', form=${from} to=${to}. expect the value between 0 to ${
          length - 1
        }`
      );
    }

    const tempValue = [...this.value];

    const fromValue = tempValue[from];

    tempValue.splice(from, 1);
    tempValue.splice(to, 0, fromValue);

    this.form.setValueIn(this.name, tempValue);

    // todo(fix): should move fields in order to make sure fields' state is also moved
  }

  protected insertAt(index: number, value: TValue) {
    if (!this.value) {
      return;
    }

    if (index < 0 || index > this.value.length) {
      throw new Error(`[Form]: FieldArrayModel.insertAt Error: index exceeds array boundary`);
    }

    const tempValue = [...this.value];
    tempValue.splice(index, 0, value);
    this.form.setValueIn(this.name, tempValue);

    // todo: should move field in order to make sure field state is also moved
  }

  /**
   * get element path at given index
   * @param index
   * @protected
   */
  protected getPathAt(index: number) {
    return this.path.concat(index);
  }

  /**
   * find all fields including child and grandchild fields at given index.
   * @param index
   * @protected
   */
  protected findAllFieldsAt(index: number) {
    const rootPath = this.getPathAt(index);
    const rootPathString = rootPath.toString();

    const res: FieldModel[] = this.form.fieldMap.get(rootPathString)
      ? [this.form.fieldMap.get(rootPathString)!]
      : [];

    this.form.fieldMap.forEach((field, fieldName) => {
      if (rootPath.isChildOrGrandChild(fieldName)) {
        res.push(field);
      }
    });
    return res;
  }
}
