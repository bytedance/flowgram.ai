import { describe, expect, it } from 'vitest';

import { getIn, isEmptyArray, isNaN, isPromise, shallowSetIn } from '../src/utils';

describe('object', () => {
  describe('isEmptyArray', () => {
    it('returns true when an empty array is passed in', () => {
      expect(isEmptyArray([])).toBe(true);
    });
    it('returns false when anything other than empty array is passed in', () => {
      expect(isEmptyArray()).toBe(false);
      expect(isEmptyArray(null)).toBe(false);
      expect(isEmptyArray(123)).toBe(false);
      expect(isEmptyArray('abc')).toBe(false);
      expect(isEmptyArray({})).toBe(false);
      expect(isEmptyArray({ a: 1 })).toBe(false);
      expect(isEmptyArray(['abc'])).toBe(false);
    });
  });

  describe('getIn', () => {
    const obj = {
      a: {
        b: 2,
        c: false,
        d: null,
      },
      t: true,
      s: 'a random string',
    };

    it('gets a value by array path', () => {
      expect(getIn(obj, ['a', 'b'])).toBe(2);
    });

    it('gets a value by string path', () => {
      expect(getIn(obj, 'a.b')).toBe(2);
    });

    it('return "undefined" if value was not found using given path', () => {
      expect(getIn(obj, 'a.z')).toBeUndefined();
    });

    it('return "undefined" if value was not found using given path and an intermediate value is "false"', () => {
      expect(getIn(obj, 'a.c.z')).toBeUndefined();
    });

    it('return "undefined" if value was not found using given path and an intermediate value is "null"', () => {
      expect(getIn(obj, 'a.d.z')).toBeUndefined();
    });

    it('return "undefined" if value was not found using given path and an intermediate value is "true"', () => {
      expect(getIn(obj, 't.z')).toBeUndefined();
    });

    it('return "undefined" if value was not found using given path and an intermediate value is a string', () => {
      expect(getIn(obj, 's.z')).toBeUndefined();
    });
  });

  describe('shallowSetIn', () => {
    it('sets flat value', () => {
      const obj = { x: 'y' };
      const newObj = shallowSetIn(obj, 'flat', 'value');
      expect(obj).toEqual({ x: 'y' });
      expect(newObj).toEqual({ x: 'y', flat: 'value' });
    });

    it('keep the same object if nothing is changed', () => {
      const obj = { x: 'y' };
      const newObj = shallowSetIn(obj, 'x', 'y');
      expect(obj).toBe(newObj);
    });

    it('keep key shen set undefined', () => {
      const obj = { x: 'y' };
      const newObj = shallowSetIn(obj, 'x', undefined);
      expect(obj).toEqual({ x: 'y' });
      expect(newObj).toEqual({ x: undefined });
      expect(Object.keys(newObj)).toEqual(['x']);
    });

    it('sets nested value', () => {
      const obj = { x: 'y' };
      const newObj = shallowSetIn(obj, 'nested.value', 'nested value');
      expect(obj).toEqual({ x: 'y' });
      expect(newObj).toEqual({ x: 'y', nested: { value: 'nested value' } });
    });

    it('updates nested value', () => {
      const obj = { x: 'y', nested: { value: 'a' } };
      const newObj = shallowSetIn(obj, 'nested.value', 'b');
      expect(obj).toEqual({ x: 'y', nested: { value: 'a' } });
      expect(newObj).toEqual({ x: 'y', nested: { value: 'b' } });
    });

    it('updates deep nested value', () => {
      const obj = { x: 'y', twofoldly: { nested: { value: 'a' } } };
      const newObj = shallowSetIn(obj, 'twofoldly.nested.value', 'b');
      expect(obj.twofoldly.nested === newObj.twofoldly.nested).toEqual(false); // fails, same object still
      expect(obj).toEqual({ x: 'y', twofoldly: { nested: { value: 'a' } } }); // fails, it's b here, too
      expect(newObj).toEqual({ x: 'y', twofoldly: { nested: { value: 'b' } } }); // works ofc
    });

    it('shallow clone data along the update path', () => {
      const obj = {
        x: 'y',
        twofoldly: { nested: ['a', { c: 'd' }] },
        other: { nestedOther: 'o' },
      };
      const newObj = shallowSetIn(obj, 'twofoldly.nested.0', 'b');
      // All new objects/arrays created along the update path.
      expect(obj).not.toBe(newObj);
      expect(obj.twofoldly).not.toBe(newObj.twofoldly);
      expect(obj.twofoldly.nested).not.toBe(newObj.twofoldly.nested);
      // All other objects/arrays copied, not cloned (retain same memory
      // location).
      expect(obj.other).toBe(newObj.other);
      expect(obj.twofoldly.nested[1]).toBe(newObj.twofoldly.nested[1]);
    });

    it('sets new array', () => {
      const obj = { x: 'y' };
      const newObj = shallowSetIn(obj, 'nested.0', 'value');
      expect(obj).toEqual({ x: 'y' });
      expect(newObj).toEqual({ x: 'y', nested: ['value'] });
    });

    it('sets new array when item is empty string', () => {
      const obj = { x: 'y' };
      const newObj = shallowSetIn(obj, 'nested.0', '');
      expect(obj).toEqual({ x: 'y' });
      expect(newObj).toEqual({ x: 'y', nested: [''] });
    });

    it('sets new array when item is empty string', () => {
      const obj = {};
      const newObj = shallowSetIn(obj, 'nested.0', '');
      expect(obj).toEqual({});
      expect(newObj).toEqual({ nested: [''] });
    });

    it('updates nested array value', () => {
      const obj = { x: 'y', nested: ['a'] };
      const newObj = shallowSetIn(obj, 'nested[0]', 'b');
      expect(obj).toEqual({ x: 'y', nested: ['a'] });
      expect(newObj).toEqual({ x: 'y', nested: ['b'] });
    });

    it('adds new item to nested array', () => {
      const obj = { x: 'y', nested: ['a'] };
      const newObj = shallowSetIn(obj, 'nested.1', 'b');
      expect(obj).toEqual({ x: 'y', nested: ['a'] });
      expect(newObj).toEqual({ x: 'y', nested: ['a', 'b'] });
    });

    it('sticks to object with int key when defined', () => {
      const obj = { x: 'y', nested: { 0: 'a' } };
      const newObj = shallowSetIn(obj, 'nested.0', 'b');
      expect(obj).toEqual({ x: 'y', nested: { 0: 'a' } });
      expect(newObj).toEqual({ x: 'y', nested: { 0: 'b' } });
    });

    it('supports bracket path', () => {
      const obj = { x: 'y' };
      const newObj = shallowSetIn(obj, 'nested[0]', 'value');
      expect(obj).toEqual({ x: 'y' });
      expect(newObj).toEqual({ x: 'y', nested: ['value'] });
    });

    it('supports path containing key of the object', () => {
      const obj = { x: 'y' };
      const newObj = shallowSetIn(obj, 'a.x.c', 'value');
      expect(obj).toEqual({ x: 'y' });
      expect(newObj).toEqual({ x: 'y', a: { x: { c: 'value' } } });
    });

    // This case is not used in form sdk for now，so we comment it.
    // it('should keep class inheritance for the top level object', () => {
    //   class TestClass {
    //     constructor(public key: string, public setObj?: any) {}
    //   }
    //   const obj = new TestClass('value');
    //   const newObj = shallowSetIn(obj, 'setObj.nested', 'shallowSetInValue');
    //   expect(obj).toEqual(new TestClass('value'));
    //   expect(newObj).toEqual({
    //     key: 'value',
    //     setObj: { nested: 'shallowSetInValue' },
    //   });
    //   expect(obj instanceof TestClass).toEqual(true);
    //   expect(newObj instanceof TestClass).toEqual(true);
    // });

    it('can convert primitives to objects before setting', () => {
      const obj = { x: [{ y: true }] };
      const newObj = shallowSetIn(obj, 'x.0.y.z', true);
      expect(obj).toEqual({ x: [{ y: true }] });
      expect(newObj).toEqual({ x: [{ y: { z: true } }] });
    });
  });

  describe('isPromise', () => {
    it('verifies that a value is a promise', () => {
      const alwaysResolve = (resolve: Function) => resolve();
      const promise = new Promise(alwaysResolve);
      expect(isPromise(promise)).toEqual(true);
    });

    it('verifies that a value is not a promise', () => {
      const emptyObject = {};
      const identity = (i: any) => i;
      const foo = 'foo';
      const answerToLife = 42;

      expect(isPromise(emptyObject)).toEqual(false);
      expect(isPromise(identity)).toEqual(false);
      expect(isPromise(foo)).toEqual(false);
      expect(isPromise(answerToLife)).toEqual(false);

      expect(isPromise(undefined)).toEqual(false);
      expect(isPromise(null)).toEqual(false);
    });
  });

  describe('isNaN', () => {
    it('correctly validate NaN', () => {
      expect(isNaN(NaN)).toBe(true);
    });

    it('correctly validate not NaN', () => {
      expect(isNaN(undefined)).toBe(false);
      expect(isNaN(1)).toBe(false);
      expect(isNaN('')).toBe(false);
      expect(isNaN([])).toBe(false);
    });
  });
});
