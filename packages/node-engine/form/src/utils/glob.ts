import { flatten, get, isArray, isObject } from 'lodash';

export namespace Glob {
  export const DIVIDER = '.';
  export const ALL = '*';

  // 仅支持一个通配符
  export function isMatch(pattern: string, path: string) {
    const patternArr = pattern.split(DIVIDER);
    const pathArr = path.split(DIVIDER);
    if (patternArr.length !== pathArr.length) {
      return false;
    }
    return patternArr.every((pattern, index) => {
      if (pattern === ALL) {
        return true;
      }
      return pattern === pathArr[index];
    });
  }

  /**
   * 判断pattern 是否match pattern 或其parent
   * @param pattern
   * @param path
   */
  export function isMatchOrParent(pattern: string, path: string) {
    if (pattern === '') {
      return true;
    }
    const patternArr = pattern.split(DIVIDER);
    const pathArr = path.split(DIVIDER);

    if (patternArr.length > pathArr.length) {
      return false;
    }

    for (let i = 0; i < patternArr.length; i++) {
      if (patternArr[i] !== ALL && patternArr[i] !== pathArr[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * 从 path 中提取出匹配pattern 的 parent path，包括是 path 自身
   * 该方法默认 isMatchOrParent(pattern, path) 为 true, 不做为false 的错误处理。
   * @param pattern
   * @param path
   */
  export function getParentPathByPattern(pattern: string, path: string) {
    const patternArr = pattern.split(DIVIDER);
    const pathArr = path.split(DIVIDER);

    return pathArr.slice(0, patternArr.length).join(DIVIDER);
  }

  function concatPath(p1: string | number, ...pathArr: (string | number)[]): string {
    const p2 = pathArr.shift();
    if (p2 === undefined) return p1.toString();
    let resultPath = '';
    if (p1 === '' && p2 === '') {
      resultPath = '';
    } else if (p1 !== '' && p2 === '') {
      resultPath = p1.toString();
    } else if (p1 === '' && p2 !== '') {
      resultPath = p2.toString();
    } else {
      resultPath = `${p1}${DIVIDER}${p2}`;
    }
    if (pathArr.length > 0) {
      return concatPath(resultPath, ...pathArr);
    }
    return resultPath;
  }

  /**
   * 找到 obj 在给与 paths 下所有子path
   * @param paths
   * @param obj
   * @private
   */
  export function getSubPaths(paths: string[], obj: any): string[] {
    if (!obj || typeof obj !== 'object') {
      return [];
    }

    return flatten(
      paths.map((path) => {
        const value = path === '' ? obj : get(obj, path);
        if (isArray(value)) {
          return value.map((_: any, index: number) => concatPath(path, index));
        } else if (isObject(value)) {
          return Object.keys(value).map((key) => concatPath(path, key));
        }
        return [];
      })
    );
  }

  /**
   * 将带有通配符的 path pattern 分割。如 a.b.*.c.*.d, 会被分割成['a.b','*','c','*','d']
   * @param pattern
   * @private
   */
  export function splitPattern(pattern: string): string[] {
    const parts = pattern.split(DIVIDER);
    const res: string[] = [];

    let i = 0;
    let curPath: string[] = [];

    while (i < parts.length) {
      if (parts[i] === ALL) {
        if (curPath.length) {
          res.push(curPath.join(DIVIDER));
        }
        res.push(ALL);
        curPath = [];
      } else {
        curPath.push(parts[i]);
      }
      i += 1;
    }
    if (curPath.length) {
      res.push(curPath.join(DIVIDER));
    }
    return res;
  }

  /**
   * Find all paths matched pattern in object. If withEmptyValue is true, it will include
   * paths  whoes value is undefined.
   * @param obj
   * @param pattern
   * @param withEmptyValue
   */

  export function findMatchPaths(obj: any, pattern: string, withEmptyValue?: boolean): string[] {
    if (!obj || !pattern) {
      return [];
    }
    const nextPaths: string[] = pattern.split(DIVIDER);
    let curKey: string | undefined = nextPaths.shift();
    let curPaths: string[] = [];
    let curValue = obj;
    while (curKey) {
      let isObject = typeof curValue === 'object';
      if (!isObject) return [];
      // 匹配 *
      if (curKey === ALL) {
        const parentPath = curPaths.join(DIVIDER);
        return flatten(
          Object.keys(curValue).map((key) => {
            if (nextPaths.length === 0) {
              return concatPath(parentPath, key);
            }
            return findMatchPaths(curValue[key], `${nextPaths.join(DIVIDER)}`, withEmptyValue).map(
              (p) => concatPath(parentPath, key, p)
            );
          })
        );
      }
      // 找不到对应 key 则不匹配
      if (!(curKey in curValue) && !withEmptyValue) {
        return [];
      }
      curValue = curValue[curKey!];
      curPaths.push(curKey);
      curKey = nextPaths.shift();
    }

    return [pattern];

    // const parts = splitPattern(pattern);
    //
    // let prePaths: string[] = [''];
    // let curPath: string = '';
    //
    // for (let i in parts) {
    //   const part = parts[i];
    //   if (part === ALL) {
    //     prePaths = getSubPaths(
    //       prePaths.map(p => concatPath(p, curPath)),
    //       obj,
    //     );
    //     curPath = '';
    //   } else {
    //     curPath = part;
    //
    //     /**
    //      * 过滤掉后续path 值不存在的prePath
    //      * 为什么： prePaths 是返回前一个通配符下所有的路径，但每个路径下的数据的field 可能不同
    //      * 这会导致一些prePath 不存在后面所需的路径。如以下场景
    //      * const obj = {
    //      *   a: { b: { c: 1 } },
    //      *   x: { y: { z: 2 } },
    //      * };
    //      * expect(Glob.findMatchPaths(obj, '*.y')).toEqual(['x.y']);
    //      */
    //
    //     prePaths = prePaths.filter(p => {
    //       const preValue = p ? get(obj, p) : obj;
    //       if (typeof preValue === 'object') {
    //         return curPath in preValue;
    //       }
    //       return true;
    //     });
    //   }
    // }
    //
    // if (curPath) {
    //   return prePaths.map(p => [p, curPath].join(DIVIDER));
    // }
    // return prePaths;
  }

  /**
   * Find all paths matched pattern in object, including paths  whoes value is undefined.
   * @param obj
   * @param pattern
   */
  export function findMatchPathsWithEmptyValue(obj: any, pattern: string): string[] {
    if (!pattern.includes('*')) {
      return [pattern];
    }
    return findMatchPaths(obj, pattern, true);
  }

  // export function findMatchPathsWithEmptyValue(obj: any, pattern: string) {
  //   const parts = splitPattern(pattern);
  //
  //   let prePaths: string[] = [''];
  //   let curPath: string = '';
  //
  //   for (let i in parts) {
  //     const part = parts[i];
  //     if (part === ALL) {
  //       prePaths = getSubPaths(
  //         prePaths.map(p => concatPath(p, curPath)),
  //         obj,
  //       );
  //       curPath = '';
  //     } else {
  //       curPath = part;
  //
  //       /**
  //        * 过滤掉后续path 值不存在的prePath
  //        * 为什么： prePaths 是返回前一个通配符下所有的路径，但每个路径下的数据的field 可能不同
  //        * 这会导致一些prePath 不存在后面所需的路径。如以下场景
  //        * const obj = {
  //        *   a: { b: { c: 1 } },
  //        *   x: { y: { z: 2 } },
  //        * };
  //        * expect(Glob.findMatchPaths(obj, '*.y')).toEqual(['x.y']);
  //        */
  //
  //       // prePaths = prePaths.filter(p => {
  //       //   const preValue = p ? get(obj, p) : obj;
  //       //   if (typeof preValue === 'object') {
  //       //     return curPath in preValue;
  //       //   }
  //       //   return true;
  //       // });
  //     }
  //   }
  //
  //   if (curPath) {
  //     return prePaths.map(p => [p, curPath].join(DIVIDER));
  //   }
  //   return prePaths;
  // }
}
