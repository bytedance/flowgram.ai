// test src/glob.ts
import { describe, expect, it } from 'vitest';

import { Glob } from '../src/utils/glob';

describe('glob', () => {
  describe('isMatch', () => {
    it('* at the end', () => {
      expect(Glob.isMatch('a.b.*', 'a.b.c')).toBe(true);
      expect(Glob.isMatch('a.b.*', 'a.k.c')).toBe(false);
    });
    it('* at the start', () => {
      expect(Glob.isMatch('*.b.c', 'a.b.c')).toBe(true);
      expect(Glob.isMatch('*.b.c', 'a.b.x')).toBe(false);
    });
    it('multiple *', () => {
      expect(Glob.isMatch('*.b.*', 'a.b.c')).toBe(true);
      expect(Glob.isMatch('a.b.*', 'a.k.c')).toBe(false);
    });
    it('no *', () => {
      expect(Glob.isMatch('a.b.c', 'a.b.c')).toBe(true);
    });
    it('length not match', () => {
      expect(Glob.isMatch('a.b.*', 'a.b.c.c')).toBe(false);
    });
  });
  describe('isMatchOrParent', () => {
    it('* at the end', () => {
      expect(Glob.isMatchOrParent('a.b.*', 'a.b.c')).toBe(true);
      expect(Glob.isMatchOrParent('a.b.*', 'a.k.c')).toBe(false);
    });
    it('* at the start', () => {
      expect(Glob.isMatchOrParent('*.b.c', 'a.b.c')).toBe(true);
      expect(Glob.isMatchOrParent('*.b.c', 'a.b.x')).toBe(false);
      expect(Glob.isMatchOrParent('*.b', 'a.b.x')).toBe(true);
    });
    it('multiple *', () => {
      expect(Glob.isMatchOrParent('*.b.*', 'a.b.c')).toBe(true);
      expect(Glob.isMatchOrParent('*.b.*', 'a.k.c')).toBe(false);
    });
    it('no *', () => {
      expect(Glob.isMatchOrParent('a.b.c', 'a.b.c')).toBe(true);
      expect(Glob.isMatchOrParent('a.b', 'a.b.c')).toBe(true);
      expect(Glob.isMatchOrParent('a', 'a.b.c')).toBe(true);
      expect(Glob.isMatchOrParent('', 'a.b.c.')).toBe(true);
    });
    it('length not match', () => {
      expect(Glob.isMatchOrParent('a.b.*', 'a.b.c.c')).toBe(true);
      expect(Glob.isMatchOrParent('a.b.c.d', 'a.b.c.')).toBe(false);
    });
  });
  describe('getParentPathByPattern', () => {
    it('should get parent path correctly', () => {
      expect(Glob.getParentPathByPattern('a.b.*', 'a.b.c')).toBe('a.b.c');
      expect(Glob.getParentPathByPattern('a.b.*', 'a.b.c.d')).toBe('a.b.c');
      expect(Glob.getParentPathByPattern('a.b', 'a.b.c.d')).toBe('a.b');
      expect(Glob.getParentPathByPattern('a.*.c', 'a.b.c.d')).toBe('a.b.c');
    });
  });
  describe('findMatchPaths', () => {
    it('return original path array if no *', () => {
      const obj = { a: { b: { c: 1 } } };
      expect(Glob.findMatchPaths(obj, 'a.b.c')).toEqual(['a.b.c']);
    });
    it('object: when * is in middle of the path', () => {
      const obj = {
        a: { b: { c: 1 } },
        x: { y: { z: 2 } },
      };
      expect(Glob.findMatchPaths(obj, 'a.*.c')).toEqual(['a.b.c']);
    });
    it('object:when * is at the end of the path', () => {
      const obj = {
        a: { b: { c: 1 } },
        x: { y: { z: 2 } },
      };
      expect(Glob.findMatchPaths(obj, 'a.*')).toEqual(['a.b']);
    });
    // 暂时不支持该场景，见glob.ts 中 143行说明
    it('object: * 后面数据异构', () => {
      const obj = {
        a: { b: { c: 1 } },
        x: { y: { z: 2 } },
      };
      expect(Glob.findMatchPaths(obj, '*.y')).toEqual(['x.y']);
    });
    it('object:when * is at the start and end of the path', () => {
      const obj = {
        a: { b: { c: 1 } },
        x: { y: { z: 2 } },
      };
      expect(Glob.findMatchPaths(obj, '*.y.*')).toEqual(['x.y.z']);
    });
    it('array: when * is at the end of the path', () => {
      const obj = {
        other: 100,
        arr: [
          {
            x: 1,
            y: { a: 1, b: 2 },
          },
          {
            x: 10,
            y: {
              a: 10,
              b: 20,
            },
          },
        ],
      };
      expect(Glob.findMatchPaths(obj, 'arr.*')).toEqual(['arr.0', 'arr.1']);
    });
    it('array: when * is at the start of the path', () => {
      const arr = [
        {
          x: 1,
          y: { a: 1, b: 2 },
        },
        {
          x: 10,
          y: {
            a: 10,
            b: 20,
          },
        },
      ];

      expect(Glob.findMatchPaths(arr, '*')).toEqual(['0', '1']);
    });
    it('array: when * is in the middle of the path', () => {
      const obj = {
        other: 100,
        arr: [
          {
            x: 1,
            y: { a: 1, b: 2 },
          },
          {
            x: 10,
            y: {
              a: 10,
              b: 20,
            },
          },
        ],
      };

      expect(Glob.findMatchPaths(obj, 'arr.*.y')).toEqual(['arr.0.y', 'arr.1.y']);
    });
    it('array in array: when double * ', () => {
      const obj = {
        other: 100,
        arr: [
          {
            x: 1,
            y: ['1', '2'],
          },
        ],
      };

      expect(Glob.findMatchPaths(obj, 'arr.*.y.*')).toEqual(['arr.0.y.0', 'arr.0.y.1']);
    });
    it('array in object: when double * ', () => {
      const obj = {
        x: 100,
        y: {
          arr: [1, 2],
        },
      };

      expect(Glob.findMatchPaths(obj, 'y.*.*')).toEqual(['y.arr.0', 'y.arr.1']);
    });
    it('array in object: when double * start ', () => {
      const obj = {
        x: 100,
        y: {
          arr: [{ a: 1, b: 2 }],
        },
      };

      expect(Glob.findMatchPaths(obj, '*.arr.*')).toEqual(['y.arr.0']);
    });
    it('when value after * is  empty string ', () => {
      const obj = {
        $$input_decorator$$: {
          inputParameters: [{ name: '', input: 2 }],
        },
      };

      expect(Glob.findMatchPaths(obj, '$$input_decorator$$.inputParameters.*.name')).toEqual([
        '$$input_decorator$$.inputParameters.0.name',
      ]);
    });
    it('when value after * is undefined ', () => {
      const obj = {
        x: {
          arr: [{ name: undefined, input: 2 }],
        },
      };

      expect(Glob.findMatchPaths(obj, 'x.arr.*.name')).toEqual(['x.arr.0.name']);
    });
    it('when value not directly after * is undefined ', () => {
      const obj = {
        x: {
          arr: [{ name: { a: undefined }, input: 2 }],
        },
      };

      expect(Glob.findMatchPaths(obj, 'x.arr.*.name.a')).toEqual(['x.arr.0.name.a']);
    });
  });
  describe('splitPattern', () => {
    it('should splict pattern correctly', () => {
      expect(Glob.splitPattern('a.b.*.c.*.d')).toEqual(['a.b', '*', 'c', '*', 'd']);
      expect(Glob.splitPattern('a.b.*.c.*')).toEqual(['a.b', '*', 'c', '*']);
      expect(Glob.splitPattern('a.b.*.*.*.d')).toEqual(['a.b', '*', '*', '*', 'd']);
      expect(Glob.splitPattern('*.*.c.*.d')).toEqual(['*', '*', 'c', '*', 'd']);
    });
  });
  describe('getSubPaths', () => {
    it('should get sub paths for valid object', () => {
      const obj = {
        a: {
          b: {
            x1: {
              y1: 1,
            },
            x2: {
              y2: 2,
            },
          },
        },
      };
      expect(Glob.getSubPaths(['a.b'], obj)).toEqual(['a.b.x1', 'a.b.x2']);
      expect(Glob.getSubPaths(['a.b', 'a.b.x1'], obj)).toEqual(['a.b.x1', 'a.b.x2', 'a.b.x1.y1']);
    });
    it('should get sub paths for array', () => {
      const obj = {
        a: {
          b: {
            x1: [1, 2],
          },
        },
      };
      expect(Glob.getSubPaths(['a.b.x1'], obj)).toEqual(['a.b.x1.0', 'a.b.x1.1']);
    });
    it('should get sub paths when root obj is array', () => {
      const obj = [
        {
          x1: [1, 2],
        },
        {
          x2: [1, 2],
        },
      ];
      expect(Glob.getSubPaths(['0.x1'], obj)).toEqual(['0.x1.0', '0.x1.1']);
    });
    it('should return empty array when obj is not object nor array', () => {
      expect(Glob.getSubPaths(['x.y'], 1)).toEqual([]);
      expect(Glob.getSubPaths(['x.y'], 'x')).toEqual([]);
      expect(Glob.getSubPaths(['x.y'], undefined)).toEqual([]);
    });
    it('should return empty array when obj has no value for given path', () => {
      const obj = {
        a: {
          b: {
            x1: [1, 2],
          },
        },
      };
      expect(Glob.getSubPaths(['a.b.c'], obj)).toEqual([]);
    });
  });
  describe('findMatchPathsWithEmptyValue', () => {
    it('return original path array if no *', () => {
      const obj = { a: { b: { c: 1 } } };
      expect(Glob.findMatchPathsWithEmptyValue(obj, 'a.b.c')).toEqual(['a.b.c']);
    });
    it('return original path array if no * and value is empty on multiple layers', () => {
      const obj = { a: {} };
      expect(Glob.findMatchPathsWithEmptyValue(obj, 'a.b.c')).toEqual(['a.b.c']);
    });
    it('return original path array if no * and value is empty on multiple layers', () => {
      const obj = { a: { b: {} } };
      expect(Glob.findMatchPathsWithEmptyValue(obj, 'a.x.y')).toEqual(['a.x.y']);
    });
    it('return array with original path even if path does not exists, but the original path does not contain * ', () => {
      const obj = { a: { b: { c: 1 } } };
      expect(Glob.findMatchPathsWithEmptyValue(obj, 'a.b.c.d')).toEqual(['a.b.c.d']);
    });
    it('return original path array if no * and path related value is undefined in object', () => {
      const obj = { a: { b: { c: {} } } };
      expect(Glob.findMatchPathsWithEmptyValue(obj, 'a.b.c.d')).toEqual(['a.b.c.d']);
    });
    it('object: when * is in middle of the path', () => {
      const obj = {
        a: { b: { c: 1 } },
        x: { y: { z: 2 } },
      };
      expect(Glob.findMatchPathsWithEmptyValue(obj, 'a.*.c')).toEqual(['a.b.c']);
    });
    it('object:when * is at the end of the path', () => {
      const obj = {
        a: { b: { c: 1 } },
        x: { y: { z: 2 } },
      };
      expect(Glob.findMatchPathsWithEmptyValue(obj, 'a.*')).toEqual(['a.b']);
    });
    // 暂时不支持该场景，见glob.ts 中 143行说明
    it('object: * 后面数据异构', () => {
      const obj = {
        a: { b: { c: 1 } },
        x: { y: { z: 2 } },
      };
      expect(Glob.findMatchPathsWithEmptyValue(obj, '*.y')).toEqual(['a.y', 'x.y']);
    });
    it('object:when * is at the start and end of the path', () => {
      const obj = {
        a: { b: { c: 1 } },
        x: { y: { z: 2 } },
      };
      expect(Glob.findMatchPathsWithEmptyValue(obj, '*.y.*')).toEqual(['x.y.z']);
    });
    it('array: when * is at the end of the path', () => {
      const obj = {
        other: 100,
        arr: [
          {
            x: 1,
            y: { a: 1, b: 2 },
          },
          {
            x: 10,
            y: {
              a: 10,
              b: 20,
            },
          },
        ],
      };
      expect(Glob.findMatchPathsWithEmptyValue(obj, 'arr.*')).toEqual(['arr.0', 'arr.1']);
    });
    it('array: when * is at the start of the path', () => {
      const arr = [
        {
          x: 1,
          y: { a: 1, b: 2 },
        },
        {
          x: 10,
          y: {
            a: 10,
            b: 20,
          },
        },
      ];

      expect(Glob.findMatchPathsWithEmptyValue(arr, '*')).toEqual(['0', '1']);
    });
    it('array: when * is in the middle of the path', () => {
      const obj = {
        other: 100,
        arr: [
          {
            x: 1,
            y: { a: 1, b: 2 },
          },
          {
            x: 10,
            y: {
              a: 10,
              b: 20,
            },
          },
        ],
      };

      expect(Glob.findMatchPathsWithEmptyValue(obj, 'arr.*.y')).toEqual(['arr.0.y', 'arr.1.y']);
    });
    it('array: when data related to path is undefined', () => {
      const obj = [{ a: 1 }, { a: 2, b: 3 }];
      expect(Glob.findMatchPathsWithEmptyValue(obj, '*.b')).toEqual(['0.b', '1.b']);
    });
    it('array in array: when double * ', () => {
      const obj = {
        other: 100,
        arr: [
          {
            x: 1,
            y: ['1', '2'],
          },
        ],
      };

      expect(Glob.findMatchPathsWithEmptyValue(obj, 'arr.*.y.*')).toEqual([
        'arr.0.y.0',
        'arr.0.y.1',
      ]);
    });
    it('array in object: when double * ', () => {
      const obj = {
        x: 100,
        y: {
          arr: [1, 2],
        },
      };

      expect(Glob.findMatchPathsWithEmptyValue(obj, 'y.*.*')).toEqual(['y.arr.0', 'y.arr.1']);
    });
    it('array in object: when double * start ', () => {
      const obj = {
        x: 100,
        y: {
          arr: [{ a: 1, b: 2 }],
        },
      };

      expect(Glob.findMatchPathsWithEmptyValue(obj, '*.arr.*')).toEqual(['y.arr.0']);
    });
    it('when value after * is  empty string ', () => {
      const obj = {
        $$input_decorator$$: {
          inputParameters: [{ name: '', input: 2 }],
        },
      };

      expect(
        Glob.findMatchPathsWithEmptyValue(obj, '$$input_decorator$$.inputParameters.*.name')
      ).toEqual(['$$input_decorator$$.inputParameters.0.name']);
    });
    it('when value after * is undefined ', () => {
      const obj = {
        x: {
          arr: [{ name: undefined, input: 2 }],
        },
      };

      expect(Glob.findMatchPathsWithEmptyValue(obj, 'x.arr.*.name')).toEqual(['x.arr.0.name']);
    });
    it('when value not directly after * is undefined ', () => {
      const obj = {
        x: {
          arr: [{ name: { a: undefined }, input: 2 }],
        },
      };

      expect(Glob.findMatchPathsWithEmptyValue(obj, 'x.arr.*.name.a')).toEqual(['x.arr.0.name.a']);
    });
  });
});
