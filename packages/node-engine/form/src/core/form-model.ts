import { cloneDeep, flatten, get } from 'lodash';
import { Disposable, Emitter } from '@flowgram.ai/utils';
import { ReactiveState } from '@flowgram.ai/reactive';

import { feedbackToFieldErrorsOrWarnings, hasError, toFeedback } from '../utils/validate';
import { Glob } from '../utils/glob';
import { keepValidKeys } from '../utils';
import {
  FormModelState,
  FormOptions,
  FormState,
  OnFormValuesChangePayload,
  OnFormValuesInitPayload,
  OnFormValuesUpdatedPayload,
} from '../types/form';
import { FieldName, FieldValue } from '../types/field';
import { Errors, FormValidateReturn, Warnings } from '../types';
import { createFormModelState } from '../constants';
import { getValidByErrors, mergeFeedbacks } from './utils';
import { Store } from './store';
import { Path } from './path';
import { FieldModel } from './field-model';
import { FieldArrayModel } from './field-array-model';

export class FormModel<TValues = any> implements Disposable {
  protected _fieldMap: Map<string, FieldModel> = new Map();

  readonly store = new Store();

  protected _options: FormOptions = {};

  protected onFieldModelCreateEmitter = new Emitter<FieldModel>();

  readonly onFieldModelCreate = this.onFieldModelCreateEmitter.event;

  readonly onFormValuesChangeEmitter = new Emitter<OnFormValuesChangePayload>();

  readonly onFormValuesChange = this.onFormValuesChangeEmitter.event;

  readonly onFormValuesInitEmitter = new Emitter<OnFormValuesInitPayload>();

  readonly onFormValuesInit = this.onFormValuesInitEmitter.event;

  readonly onFormValuesUpdatedEmitter = new Emitter<OnFormValuesUpdatedPayload>();

  readonly onFormValuesUpdated = this.onFormValuesUpdatedEmitter.event;

  readonly onValidateEmitter = new Emitter<FormModelState>();

  readonly onValidate = this.onValidateEmitter.event;

  protected _state: ReactiveState<FormModelState> = new ReactiveState<FormModelState>(
    createFormModelState()
  );

  protected _initialized = false;

  set fieldMap(map) {
    this._fieldMap = map;
  }

  /**
   * 表单初始值，初始化设置后不可修改
   * @protected
   */
  // protected _initialValues?: TValues;

  get fieldMap() {
    return this._fieldMap;
  }

  get context() {
    return this._options.context;
  }

  get initialValues() {
    return this._options.initialValues;
  }

  get values() {
    return cloneDeep(this.store.values) || cloneDeep(this.initialValues);
  }

  set values(v) {
    const prevValues = this.values;
    this.store.values = v;
    this.fireOnFormValuesChange({
      values: this.values,
      prevValues,
      name: '',
    });
  }

  get validationTrigger() {
    return this._options.validateTrigger;
  }

  get state() {
    return this._state.value;
  }

  get reactiveState() {
    return this._state;
  }

  get fields(): FieldModel[] {
    return Array.from(this.fieldMap.values());
  }

  updateState(state: Partial<FormState>) {
    // todo
  }

  get initialized() {
    return this._initialized;
  }

  fireOnFormValuesChange(payload: OnFormValuesChangePayload) {
    this.onFormValuesChangeEmitter.fire(payload);
    this.onFormValuesUpdatedEmitter.fire(payload);
  }

  fireOnFormValuesInit(payload: OnFormValuesInitPayload) {
    this.onFormValuesInitEmitter.fire(payload);
    this.onFormValuesUpdatedEmitter.fire(payload);
  }

  init(options: FormOptions<TValues>) {
    this._options = options;
    if (options.initialValues) {
      const prevValues = this.store.values;
      this.store.setInitialValues(options.initialValues);
      this.fireOnFormValuesInit({
        values: options.initialValues,
        prevValues,
        name: '',
      });
    }
    this._initialized = true;
  }

  createField<TValue = FieldValue>(name: FieldName, isArray?: boolean): FieldModel<TValue> {
    const path = new Path(name);
    const pathString = path.toString();

    if (this.fieldMap.get(pathString)) {
      return this.fieldMap.get(pathString)!;
    }

    // const fieldValue = value || get(this.initialValues, pathString);

    const field: FieldModel = isArray
      ? new FieldArrayModel(path, this)
      : new FieldModel(path, this);

    this.fieldMap.set(pathString, field);
    field.onDispose(() => {
      this.fieldMap.delete(pathString);
    });
    this.onFieldModelCreateEmitter.fire(field);

    return field;
  }

  createFieldArray<TValue = FieldValue>(
    name: FieldName,
    value?: Array<TValue>
  ): FieldArrayModel<TValue> {
    return this.createField<Array<TValue>>(name, true) as FieldArrayModel<TValue>;
  }

  /**
   * 销毁Field 模型和子模型,但不会删除field的值
   * @param name
   */
  disposeField(name: string) {
    const field = this.fieldMap.get(name);
    if (field) {
      field.dispose();
    }
  }

  /**
   * 删除field, 会删除值和 Field 模型， 以及对应的子模型
   * @param name
   */
  deleteField(name: string) {
    const field = this.fieldMap.get(name);
    if (field) {
      // 销毁值
      field.clear();
      // 销毁模型
      field.dispose();
    }
  }

  getField<TFieldModel extends FieldModel | FieldArrayModel = FieldModel>(
    name: FieldName
  ): TFieldModel | undefined {
    return this.fieldMap.get(new Path(name).toString()) as TFieldModel | undefined;
  }

  getValueIn<TValue>(name: FieldName): TValue {
    return this.store.getIn<TValue>(new Path(name));
  }

  setValueIn<TValue>(name: FieldName, value: TValue): void {
    const prevValues = this.values;

    this.store.setIn(new Path(name), value);

    this.fireOnFormValuesChange({
      values: this.values,
      prevValues,
      name,
    });
  }

  setInitValueIn<TValue = any>(name: FieldName, value: TValue): void {
    const path = new Path(name);
    const prevValue = this.store.getIn(path);
    if (prevValue === undefined) {
      const prevValues = this.values;
      this.store.setIn(new Path(name), value);
      this.fireOnFormValuesInit({
        values: this.values,
        prevValues,
        name,
      });
    }
  }

  clearValueIn(name: FieldName) {
    this.setValueIn(name, undefined);
  }

  async validateIn(name: FieldName) {
    if (!this._options.validate) {
      return;
    }

    const validateKeys = Object.keys(this._options.validate).filter((pattern) =>
      Glob.isMatch(pattern, name)
    );

    const validatePromises = validateKeys.map(async (validateKey) => {
      const validate = this._options.validate![validateKey];

      return validate({
        value: this.getValueIn(name),
        formValues: this.values,
        context: this.context,
        name,
      });
    });

    return Promise.all(validatePromises);
  }

  async validate(): Promise<FormValidateReturn> {
    if (!this._options.validate) {
      return [];
    }

    const feedbacksArrPromises = Object.keys(this._options.validate).map(async (nameRule) => {
      const validate = this._options.validate![nameRule];
      const paths = Glob.findMatchPathsWithEmptyValue(this.values, nameRule);
      return Promise.all(
        paths.map(async (path) => {
          const result = await validate({
            value: get(this.values, path),
            formValues: this.values,
            context: this.context,
            name: path,
          });

          const feedback = toFeedback(result, path);
          const field = this.getField(path);

          const errors = feedbackToFieldErrorsOrWarnings<Errors>(path, feedback);
          const warnings = feedbackToFieldErrorsOrWarnings<Warnings>(path, feedback);

          if (field) {
            field.state.errors = errors;
            field.state.warnings = warnings;
            field.state.invalid = hasError(errors);
            field.bubbleState();
          }

          // 无论是否存在 field 都要保证 form 的state 被更新
          this.state.errors = mergeFeedbacks(this.state.errors, errors);
          this.state.warnings = mergeFeedbacks(this.state.warnings, warnings);

          this.state.invalid = !getValidByErrors(this.state.errors);
          return feedback;
        })
      );
    });

    this.state.isValidating = true;
    const feedbacksArr = await Promise.all(feedbacksArrPromises);
    this.state.isValidating = false;
    this.onValidateEmitter.fire(this.state);

    return flatten(feedbacksArr).filter(Boolean) as FormValidateReturn;
  }

  alignStateWithFieldMap() {
    const keys = Array.from(this.fieldMap.keys());

    if (this.state.errors) {
      this.state.errors = keepValidKeys(this.state.errors, keys);
    }
    if (this.state.warnings) {
      this.state.warnings = keepValidKeys(this.state.warnings, keys);
    }
    this.fieldMap.forEach((f) => {
      if (f.state.errors) {
        f.state.errors = keepValidKeys(f.state.errors, keys);
      }
      if (f.state.warnings) {
        f.state.warnings = keepValidKeys(f.state.warnings, keys);
      }
    });
  }

  dispose() {
    this.fieldMap.forEach((f) => f.dispose());
    this.store.dispose();
    this._initialized = false;
  }
}
