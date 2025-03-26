import { Form, FormModelState, FormState } from '../types/form';
import { FieldName, FieldValue } from '../types/field';
import { FormModel } from './form-model';

export function toForm<TValue>(model: FormModel): Form<TValue> {
  const res = {
    initialValues: model.initialValues,
    get values() {
      return model.values;
    },
    set values(v) {
      model.values = v;
    },
    state: toFormState(model.state),
    getValueIn: <TValue = FieldValue>(name: FieldName) => model.getValueIn(name),
    setValueIn: <TValue>(name: FieldName, value: TValue) => model.setValueIn(name, value),
    validate: model.validate.bind(model),
  };

  Object.defineProperty(res, '_formModel', {
    enumerable: false,
    get() {
      return model;
    },
  });
  return res as Form<TValue>;
}

export function toFormState(modelState: FormModelState): FormState {
  return {
    get isTouched() {
      return modelState.isTouched;
    },
    get invalid() {
      return modelState.invalid;
    },
    get isDirty() {
      return modelState.isDirty;
    },
    get isValidating() {
      return modelState.isValidating;
    },
    // get dirtyFields() {
    //   return modelState.dirtyFields;
    // },
    // get isLoading() {
    //   return modelState.isLoading;
    // },
    // get touchedFields() {
    //   return modelState.touchedFields;
    // },
    get errors() {
      return modelState.errors;
    },
    get warnings() {
      return modelState.warnings;
    },
  };
}
