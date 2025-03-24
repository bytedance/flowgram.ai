import { clone, toPath } from 'lodash';

/**
 * These functions are copied from Formik.
 * @see https://github.com/jaredpalmer/formik
 */

export const isEmptyArray = (value?: any) => Array.isArray(value) && value.length === 0;

/** @private is the given object a Function? */
export const isFunction = (obj: any): obj is Function => typeof obj === 'function';

/** @private is the given object an Object? */
export const isObject = (obj: any): obj is Object => obj !== null && typeof obj === 'object';

/** @private is the given object an integer? */
export const isInteger = (obj: any): boolean => String(Math.floor(Number(obj))) === obj;

/** @private is the given object a string? */
export const isString = (obj: any): obj is string =>
  Object.prototype.toString.call(obj) === '[object String]';

/** @private is the given object a NaN? */
// eslint-disable-next-line no-self-compare
export const isNaN = (obj: any): boolean => obj !== obj;

/** @private is the given object/value a promise? */
export const isPromise = (value: any): value is PromiseLike<any> =>
  isObject(value) && isFunction(value.then);

/**
 * Deeply get a value from an object via its path.
 */
export function getIn(obj: any, key: string | string[], def?: any, p: number = 0) {
  const path = toPath(key);
  while (obj && p < path.length) {
    obj = obj[path[p++]];
  }

  // check if path is not in the end
  if (p !== path.length && !obj) {
    return def;
  }

  return obj === undefined ? def : obj;
}

/**
 * Deeply set a value from in object via its path. If the value at `path`
 * has changed, return a shallow copy of obj with `value` set at `path`.
 * If `value` has not changed, return the original `obj`.
 *
 * Existing objects / arrays along `path` are also shallow copied. Sibling
 * objects along path retain the same internal js reference. Since new
 * objects / arrays are only created along `path`, we can test if anything
 * changed in a nested structure by comparing the object's reference in
 * the old and new object, similar to how russian doll cache invalidation
 * works.
 */
export function shallowSetIn(obj: any, path: string, value: any): any {
  let res: any = clone(obj); // this keeps inheritance when obj is a class
  let resVal: any = res;
  let i = 0;
  let pathArray = toPath(path);

  for (; i < pathArray.length - 1; i++) {
    const currentPath: string = pathArray[i];
    let currentObj: any = getIn(obj, pathArray.slice(0, i + 1));

    if (currentObj && (isObject(currentObj) || Array.isArray(currentObj))) {
      resVal = resVal[currentPath] = clone(currentObj);
    } else {
      const nextPath: string = pathArray[i + 1];
      resVal = resVal[currentPath] = isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
    }
  }

  // Return original object if new value is the same as current
  if ((i === 0 ? obj : resVal)[pathArray[i]] === value) {
    return obj;
  }

  /**
   * In Formik, they delete the key if the value is undefined. but here we keep the key with the undefined value.
   * The reason that Formik tackle in this way is to fix the issue https://github.com/jaredpalmer/formik/issues/727
   * Their fix is https://github.com/jaredpalmer/formik/issues/727, and we roll back to the code before this PR.
   */
  resVal[pathArray[i]] = value;
  return res;
}

export function keepValidKeys(obj: Record<string, any>, validKeys: string[]) {
  const validKeysSet = new Set(validKeys);
  const newObj: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    if (validKeysSet.has(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}
