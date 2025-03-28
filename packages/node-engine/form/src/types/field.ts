import React from 'react';

import { Errors, FieldError, FieldWarning, Warnings } from './validate';
import { FormState } from './form';

export type NativeFieldValue = string | number | boolean | null | undefined | unknown[];

export type FieldValue = any;
export type FieldArrayValue = Array<any> | undefined;
export type FieldName = string;

export type CustomElement = Partial<HTMLElement> & {
  name: FieldName;
  type?: string;
  value?: any;
  disabled?: boolean;
  checked?: boolean;
  options?: HTMLOptionsCollection;
  files?: FileList | null;
  focus?: () => void;
};

export type FieldElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | CustomElement;

export type Ref = FieldElement;

/**
 * Field render model, it's only available when Field is rendered
 */
export interface Field<
  TFieldValue extends FieldValue = FieldValue,
  E = React.ChangeEvent<any> | TFieldValue
> {
  /**
   * Uniq key for the Field, you can use it for the child react component's uniq key.
   */
  key: string;
  /**
   * A function which sends the input's value to Field.
   * It should be assigned to the onChange prop of the input component
   * @param e It can be the new value of the field or the event sent by original dom input or checkbox component.
   */
  onChange: (e: E) => void;
  /**
   * The current value of Field
   */
  value: TFieldValue;
  /**
   * Field's name (path)
   */
  name: FieldName;
  /**
   * A function which sends the input's onFocus event to Field. It should be assigned to the input's onFocus prop.
   */
  onFocus?: () => void;
  /**
   * A function which sends the input's onBlur event to Field. It should be assigned to the input's onBlur prop.
   */
  onBlur?: () => void;
}

/**
 * FieldArray render model, it's only available when FieldArray is rendered
 */
export interface FieldArray<TFieldValue extends FieldValue = FieldValue>
  extends Field<Array<TFieldValue> | undefined, Array<TFieldValue> | undefined> {
  /**
   * Same as native Array.map, the first param of the callback function is the child field of this FieldArray.
   * @param cb callback function
   */
  map: <T = any>(cb: (f: Field<TFieldValue>, index: number) => T) => T[];
  /**
   * Append a value at the end of the array, it will create a new Field for this value as well.
   * @param value the value to append
   */
  append: (value: TFieldValue) => Field<TFieldValue>;
  /**
   * @deprecated use remove instead
   * Delete the value and the related field at certain index of the array.
   * @param index the index of the element to delete
   */
  delete: (index: number) => void;
  /**
   * Delete the value and the related field at certain index of the array.
   * @param index the index of the element to delete
   */
  remove: (index: number) => void;
  /**
   * Move an array element from one position to another.
   * @param from from position
   * @param to to position
   */
  move: (from: number, to: number) => void;
  /**
   * Swap the position of two elements of the array.
   * @param from
   * @param to
   */
  swap: (from: number, to: number) => void;
}

export interface FieldOptions<TValue, TFormValues = any> {
  /**
   * Field's name(path), it should be uniq within a form instance.
   * Two Fields Rendered with the same name will link to the same part of data and field status such as errors is shared.
   */
  name: FieldName;
  /**
   * Default value of the field. Please notice that Field is a render model, so this default value will only be set when
   * the field is rendered. If you want to give a default value before field rendering, please set it in the Form's defaultValue.
   */
  defaultValue?: TValue;
  /**
   * This is a render prop. A function that returns a React element and provides the ability to attach events and value into the component.
   * This simplifies integrating with external controlled components with non-standard prop names. Provides field、fieldState and formState, to the child component.
   * @param props
   */
  render?: (props: FieldRenderProps<TValue>) => React.ReactElement;
}

export interface FieldRenderProps<TValue> {
  field: Field<TValue>;
  fieldState: Readonly<FieldState>;
  formState: Readonly<FormState>;
}

export interface FieldArrayOptions<TValue> {
  /**
   * Field's name(path), it should be uniq within a form instance.
   * Two Fields Rendered with the same name will link to the same part of data and field status such as errors is shared.
   */
  name: FieldName;
  /**
   * Default value of the field. Please notice that Field is a render model, so this default value will only be set when
   * the field is rendered. If you want to give a default value before field rendering, please set it in the Form's initialValues.
   */
  defaultValue?: TValue[];
  /**
   * This is a render prop. A function that returns a React element and provides the ability to attach events and value into the component.
   * This simplifies integrating with external controlled components with non-standard prop names. Provides field、fieldState and formState, to the child component.
   * @param props
   */
  render?: (props: FieldArrayRenderProps<TValue>) => React.ReactElement;
}

export interface FieldArrayRenderProps<TValue> {
  field: FieldArray<TValue>;
  fieldState: Readonly<FieldState>;
  formState: Readonly<FormState>;
}

export interface UseFieldReturn {}

export interface FieldState {
  /**
   * If field value is invalid
   */
  invalid: boolean;
  /**
   * If field input component is touched by user
   */
  isTouched: boolean;
  /**
   * If field current value is different from the initialValue.
   */
  isDirty: boolean;
  /**
   * If field is validating.
   */
  isValidating: boolean;
  /**
   * Field errors, empty array means there is no errors.
   */
  errors?: FieldError[];
  /**
   * Field warnings, empty array means there is no warnings.
   */
  warnings?: FieldWarning[];
}

export interface FieldModelState extends Omit<FieldState, 'errors' | 'warnings'> {
  errors?: Errors;
  warnings?: Warnings;
}
