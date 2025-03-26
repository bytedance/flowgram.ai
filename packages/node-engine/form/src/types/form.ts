import { FormModel } from '../core/form-model';
import { Errors, FormValidateReturn, Validate, ValidateTrigger, Warnings } from './validate';
import { Field, FieldArray, FieldName, FieldValue } from './field';
import { Context } from './common';

export interface FormState {
  // isLoading: boolean;
  /**
   * If the form data is valid
   */
  invalid: boolean;
  /**
   * If the form data is different from the intialValues
   */
  isDirty: boolean;
  /**
   * If the form fields have been touched
   */
  isTouched: boolean;
  /**
   * If the form is during validation
   */
  isValidating: boolean;
  /**
   * Form errors
   */
  errors?: Errors;
  /**
   * Form warnings
   */
  warnings?: Warnings;
}

export interface FormModelState extends Omit<FormState, 'errors' | 'warnings'> {
  errors?: Errors;
  warnings?: Warnings;
}

export interface FormOptions<TValues = any> {
  /**
   * InitialValues of the form.
   */
  initialValues?: TValues;
  /**
   * When should the validation trigger, for example onChange or onBlur.
   */
  validateTrigger?: ValidateTrigger;
  /**
   * Form data's validation rules. It's a key value map, where the key is a pattern of data's path (or field name), the value is a validate function.
   */
  validate?: Record<string, Validate>;
  /**
   * Custom context. It will be accessible via form instance or in validate function.
   */
  context?: Context;
}

export interface Form<TValues = any> {
  /**
   * The initialValues of the form.
   */
  initialValues: TValues;
  /**
   * Form values. Returns a deep copy of the data in the store.
   */
  values: TValues;
  /**
   * Form state
   */
  state: FormState;

  /**
   * Get value in certain path
   * @param name path
   */
  getValueIn<TValue = FieldValue>(name: FieldName): TValue;

  /**
   * Set value in certain path.
   * It will trigger the re-rendering of the Field Component if a Field is related to this path
   * @param name path
   */
  setValueIn<TValue>(name: FieldName, value: TValue): void;

  /**
   * Trigger validate for the whole form.
   */
  validate: () => Promise<FormValidateReturn>;
}

export interface FormRenderProps<TValues> {
  /**
   * Form instance.
   */
  form: Form<TValues>;
}

export interface FormControl<TValues> {
  _formModel: FormModel<TValues>;
  getField: <
    TValue = FieldValue,
    TField extends Field<TValue> | FieldArray<TValue> = Field<TValue>
  >(
    name: FieldName
  ) => Field<TValue> | FieldArray<TValue> | undefined;
  /** 手动初始化form */
  init: () => void;
}

export interface CreateFormReturn<TValues> {
  form: Form<TValues>;
  control: FormControl<TValues>;
}

export interface OnFormValuesChangeOptions {
  action?: 'array-append' | 'array-splice' | 'array-swap';
  indexes?: number[];
}

export interface OnFormValuesChangePayload {
  values: FieldValue;
  prevValues: FieldValue;
  name: FieldName;
  options?: OnFormValuesChangeOptions;
}

export interface OnFormValuesInitPayload {
  values: FieldValue;
  prevValues: FieldValue;
  name: FieldName;
}

export interface OnFormValuesUpdatedPayload {
  values: FieldValue;
  prevValues: FieldValue;
  name: FieldName;
  options?: OnFormValuesChangeOptions;
}
