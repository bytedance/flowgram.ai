import { nanoid } from 'nanoid';
import { get, groupBy, some } from 'lodash';
import { Disposable, DisposableCollection, Emitter } from '@flowgram.ai/utils';
import { ReactiveState } from '@flowgram.ai/reactive';

import { toFeedback } from '../utils/validate';
import { FieldModelState, FieldName, FieldValue, Ref } from '../types/field';
import {
  Errors,
  FeedbackLevel,
  FieldError,
  FieldWarning,
  Validate,
  ValidateTrigger,
  Warnings,
} from '../types';
import { createFieldModelState, DEFAULT_FIELD_STATE } from '../constants';
import {
  clearFeedbacks,
  FieldEventUtils,
  mergeFeedbacks,
  shouldValidate,
  updateFeedbacksName,
} from './utils';
import { Path } from './path';
import { FormModel } from './form-model';

interface OnValueChangePayload<TValue> {
  value: TValue | undefined;
  prevValue: TValue | undefined;
  formValues: any;
  prevFormValues: any;
}

export class FieldModel<TValue extends FieldValue = FieldValue> implements Disposable {
  readonly onValueChangeEmitter = new Emitter<OnValueChangePayload<TValue>>();

  readonly form: FormModel;

  readonly id: string;

  readonly onValueChange = this.onValueChangeEmitter.event;

  protected toDispose = new DisposableCollection();

  protected _ref?: Ref;

  protected _path: Path;

  protected _state: ReactiveState<FieldModelState> = new ReactiveState<FieldModelState>(
    createFieldModelState()
  );

  /**
   * @deprecated
   * 原用于直接给field 设置validate 逻辑，现将该逻辑放到form._options.validate 中设置，该字段暂时弃用
   */
  originalValidate?: Validate;

  protected _renderCount: number = 0;

  constructor(path: Path, form: FormModel) {
    this._path = path;
    this.form = form;
    this.id = nanoid();

    const changeDisposable = this.form.onFormValuesChange((payload) => {
      const { values, prevValues } = payload;
      if (FieldEventUtils.shouldTriggerFieldChangeEvent(payload, this.name)) {
        this.onValueChangeEmitter.fire({
          value: get(values, this.name),
          prevValue: get(prevValues, this.name),
          formValues: values,
          prevFormValues: prevValues,
        });
        if (
          shouldValidate(ValidateTrigger.onChange, this.form.validationTrigger) &&
          FieldEventUtils.shouldTriggerFieldValidateWhenChange(payload, this.name)
        ) {
          this.validate();
        }
      }
    });
    this.toDispose.push(changeDisposable);

    // if (shouldValidate(ValidateTrigger.onChange, this.form.validationTrigger)) {
    //   const validateDisposable = this.form.onFormValuesChange(({ name, values, prevValues }) => {
    //     /**
    //      * Field 值变更时，所有 ancestor 以及所有child 和 grand child 的校验都要触发
    //      */
    //     if (Glob.isMatchOrParent(this.name, name) || Glob.isMatchOrParent(name, this.name)) {
    //       this.validate();
    //     }
    //   });
    //   this.toDispose.push(validateDisposable);
    // }

    this.toDispose.push(this.onValueChangeEmitter);

    this.initState();
  }

  protected _mount: boolean = false;

  get renderCount() {
    return this._renderCount;
  }

  set renderCount(n: number) {
    this._renderCount = n;
  }

  private initState() {
    const initialErrors = get(this.form.state.errors, this.name);
    const initialWarnings = get(this.form.state.warnings, this.name);

    if (initialErrors) {
      this.state.errors = {
        [this.name]: initialErrors,
      };
    }
    if (initialWarnings) {
      this.state.warnings = {
        [this.name]: initialWarnings,
      };
    }
  }

  get path() {
    return this._path;
  }

  get name() {
    return this._path.toString();
  }

  set name(name: FieldName) {
    this._path = new Path(name);
  }

  get ref() {
    return this._ref;
  }

  set ref(ref: Ref | undefined) {
    this._ref = ref;
  }

  get state() {
    return this._state.value;
  }

  get reactiveState() {
    return this._state;
  }

  get value() {
    return this.form.getValueIn(this.name);
  }

  set value(value: TValue | undefined) {
    this.form.setValueIn(this.name, value);
    if (!this.state.isTouched) {
      this.state.isTouched = true;
      this.bubbleState();
    }
  }

  updateNameForLeafState(newName: string) {
    const { errors, warnings } = this.state;
    const nameInErrors = errors ? Object.keys(errors)?.[0] : undefined;
    if (nameInErrors && errors?.[nameInErrors] && nameInErrors !== newName) {
      this.state.errors = {
        [newName]: errors?.[nameInErrors]
          ? updateFeedbacksName(errors?.[nameInErrors], newName)
          : errors?.[nameInErrors],
      };
    }
    const nameInWarnings = warnings ? Object.keys(warnings)?.[0] : undefined;
    if (nameInWarnings && warnings?.[nameInWarnings] && nameInWarnings !== newName) {
      this.state.warnings = {
        [newName]: warnings?.[nameInWarnings]
          ? updateFeedbacksName(warnings?.[nameInWarnings], newName)
          : warnings?.[nameInWarnings],
      };
    }
  }

  // recursiveUpdateName(name: FieldName) {
  //   if (this.children?.length) {
  //     this.children.forEach(c => {
  //       c.recursiveUpdateName(c.path.replaceParent(this.path, new Path(name)).toString());
  //     });
  //   } else {
  //     this.updateNameForLeafState(name);
  //     this.bubbleState();
  //   }
  //   this.name = name;
  // }

  /**
   * @deprecated
   * @param validate
   * @param from
   */
  updateValidate(validate: Validate | undefined, from?: 'ui') {
    if (from === 'ui') {
      // todo(heyuan):暂时逻辑: 只在没有全局配置校验时来自ui 的validate 才生效。 后续需要支持多validate合并， ui 和全局的都需要生效
      if (!this.originalValidate) {
        this.originalValidate = validate;
      }
    } else {
      this.originalValidate = validate;
    }
  }

  bubbleState() {
    const { errors, warnings } = this.state;

    if (this.parent) {
      this.parent.state.isTouched = some(
        this.parent.children.map((c) => c.state.isTouched),
        Boolean
      );
      this.parent.state.invalid = some(
        this.parent.children.map((c) => c.state.invalid),
        Boolean
      );
      this.parent.state.isDirty = some(
        this.parent.children.map((c) => c.state.isDirty),
        Boolean
      );
      this.parent.state.isValidating = some(
        this.parent.children.map((c) => c.state.isValidating),
        Boolean
      );
      this.parent.state.errors = errors
        ? mergeFeedbacks<Errors>(this.parent.state.errors, errors)
        : clearFeedbacks(this.name, this.parent.state.errors);
      this.parent.state.warnings = warnings
        ? mergeFeedbacks<Warnings>(this.parent.state.warnings, warnings)
        : clearFeedbacks(this.name, this.parent.state.warnings);

      this.parent.bubbleState();
      return;
    }
    // parent 不存在，则更新form state
    this.form.state.isTouched = some(
      this.form.fields.map((f) => f.state.isTouched),
      Boolean
    );
    this.form.state.invalid = some(
      this.form.fields.map((f) => f.state.invalid),
      Boolean
    );
    this.form.state.isDirty = some(
      this.form.fields.map((f) => f.state.isDirty),
      Boolean
    );
    this.form.state.isValidating = some(
      this.form.fields.map((f) => f.state.isValidating),
      Boolean
    );
    this.form.state.errors = errors
      ? mergeFeedbacks<Errors>(this.form.state.errors, errors)
      : clearFeedbacks(this.name, this.form.state.errors);
    this.form.state.warnings = warnings
      ? mergeFeedbacks<Warnings>(this.form.state.warnings, warnings)
      : clearFeedbacks(this.name, this.form.state.warnings);
    // console.log('>>>> bubble state: ', this.form.state.errors, this.form.state.invalid, this.form.fields.map(f => f.state.invalid))
  }

  clearState() {
    this.state.errors = DEFAULT_FIELD_STATE.errors;
    this.state.warnings = DEFAULT_FIELD_STATE.warnings;
    this.state.isTouched = DEFAULT_FIELD_STATE.isTouched;
    this.state.isDirty = DEFAULT_FIELD_STATE.isDirty;
    this.bubbleState();
  }

  get children(): FieldModel[] {
    const res: FieldModel[] = [];
    this.form.fieldMap.forEach((field, path: string) => {
      if (this.path.isChild(path)) {
        res.push(field);
      }
    });
    return res;
  }

  get parent(): FieldModel | undefined {
    const parentPath = this.path.parent;
    if (!parentPath) {
      return undefined;
    }
    return this.form.fieldMap.get(parentPath.toString());
  }

  clear() {
    if (!this.value) {
      return;
    }
    this.value = undefined;
  }

  async validate() {
    // 以下代码由于导致arr 配置的校验不触发，暂时注释，支持对父节点配置校验逻辑
    // const children = this.children;

    // 如果是非叶子field, 执行children的校验。暂不支持在父级上配校验器
    // if (children?.length) {
    //   await Promise.all(this.children.map(c => c.validate()));
    //   return;
    // }
    await this.validateSelf();
  }

  async validateSelf() {
    this.state.isValidating = true;
    this.bubbleState();
    const { errors, warnings } = await this._runAsyncValidate();

    if (errors?.length) {
      this.state.errors = groupBy(errors, 'name');
      this.state.invalid = true;
    } else {
      this.state.errors = { [this.name]: [] };
      this.state.invalid = false;
    }

    if (warnings?.length) {
      this.state.warnings = groupBy(warnings, 'name');
    } else {
      this.state.warnings = { [this.name]: [] };
    }

    this.state.isValidating = false;
    this.bubbleState();
    this.form.onValidateEmitter.fire(this.form.state);
  }

  protected async _runAsyncValidate(): Promise<{
    errors?: FieldError[];
    warnings?: FieldWarning[];
  }> {
    let errors: FieldError[] = [];
    let warnings: FieldWarning[] = [];

    const results = await this.form.validateIn(this.name);
    if (!results?.length) {
      return {};
    } else {
      const feedbacks = results.map((result) => toFeedback(result, this.name)).filter(Boolean) as (
        | FieldError
        | FieldWarning
      )[];

      if (!feedbacks?.length) {
        return {};
      }

      const groupedFeedbacks = groupBy(feedbacks, 'level');

      warnings = warnings.concat(groupedFeedbacks[FeedbackLevel.Warning] as FieldWarning[]);
      errors = errors.concat(groupedFeedbacks[FeedbackLevel.Error] as FieldError[]);
    }

    return { errors, warnings };
  }

  updateState(s: Partial<FieldModel>) {
    // todo
  }

  dispose() {
    this.children.map((c) => c.dispose());
    // Do not reset state when field disposed, since it will clear errors and warnings in form model as well.
    // todo: remove following line and related ut after a few weeks test online
    // this.clearState();
    this.toDispose.dispose();
    this.form.fieldMap.delete(this.path.toString());
  }

  onDispose(fn: () => void) {
    this.toDispose.onDispose(fn);
  }
}
