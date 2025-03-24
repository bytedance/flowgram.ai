import { toPath } from 'lodash';

export class Path {
  protected _path: string[] = [];

  constructor(path: string | string[]) {
    this._path = toPath(path);
  }

  get parent(): Path | undefined {
    if (this._path.length < 2) {
      return undefined;
    }
    return new Path(this._path.slice(0, -1));
  }

  toString(): string {
    return this._path.join('.');
  }

  get value(): string[] {
    return this._path;
  }

  /**
   * 仅计直系child
   * @param path
   */
  isChild(path: string) {
    const target = new Path(path).value;
    const self = this.value;

    if (target.length - self.length !== 1) {
      return false;
    }

    for (let i = 0; i < self.length; i++) {
      if (target[i] !== self[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * 比较两个数组path大小
   * 返回小于0则path1<path2, 大于0 则path1>path2, 等于0则相等
   * @param path1
   * @param path2
   */
  static compareArrayPath(path1: Path, path2: Path): number | void {
    let i = 0;
    while (path1.value[i] && path2.value[i]) {
      const index1 = parseInt(path1.value[i]);
      const index2 = parseInt(path2.value[i]);

      if (!isNaN(index1) && !isNaN(index2)) {
        return index1 - index2;
      } else if (path1.value[i] !== path2.value[i]) {
        throw new Error(
          `[Form] Path.compareArrayPath invalid input Error: two path should refers to the same array, but got path1: ${path1.toString()}, path2: ${path2.toString()}`
        );
      }
      i++;
    }
    throw new Error(
      `[Form] Path.compareArrayPath invalid input Error: got path1: ${path1.toString()}, path2: ${path2.toString()}`
    );
  }

  isChildOrGrandChild(path: string) {
    const target = new Path(path).value;
    const self = this.value;

    if (target.length - self.length < 1) {
      return false;
    }

    for (let i = 0; i < self.length; i++) {
      if (target[i] !== self[i]) {
        return false;
      }
    }
    return true;
  }

  getArrayIndex(parent: Path) {
    return parseInt(this._path[parent.value.length]);
  }

  concat(name: number | string) {
    if (typeof name === 'string' || typeof name === 'number') {
      return new Path(this._path.concat(new Path(name.toString())._path));
    }
    throw new Error(
      `[Form] Error in Path.concat: invalid param type, require number or string, but got ${typeof name}`
    );
  }

  replaceParent(parent: Path, newParent: Path) {
    if (parent.value.length > this.value.length) {
      throw new Error(
        `[Form] Error in Path.replaceParent: invalid parent param: ${parent}, parent length should not greater than current length.`
      );
    }
    const rest = [];
    for (let i = 0; i < this.value.length; i++) {
      if (i < parent.value.length && parent.value[i] !== this.value[i]) {
        throw new Error(
          `[Form] Error in Path.replaceParent: invalid parent param: '${parent}' is not a parent of '${this.toString()}'`
        );
      }
      if (i >= parent.value.length) {
        rest.push(this.value[i]);
      }
    }

    return new Path(newParent.value.concat(rest));
  }
}
