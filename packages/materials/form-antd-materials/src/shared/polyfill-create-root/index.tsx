/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import ReactDOM from 'react-dom';

type LegacyReactDOM = typeof ReactDOM & {
  render(children: React.ReactNode, container: HTMLElement): void;
  unmountComponentAtNode(container: HTMLElement): void;
};

const legacyReactDOM = ReactDOM as LegacyReactDOM;

export interface IPolyfillRoot {
  render(children: React.ReactNode): void;
  unmount(): void;
}

/**
 * React 18 polyfill
 * @param dom
 * @returns
 */
let unstableCreateRoot = (dom: HTMLElement): IPolyfillRoot => ({
  render(children: JSX.Element) {
    legacyReactDOM.render(children, dom);
  },
  unmount() {
    legacyReactDOM.unmountComponentAtNode(dom);
  },
});

export function polyfillCreateRoot(dom: HTMLElement): IPolyfillRoot {
  return unstableCreateRoot(dom);
}

export function unstableSetCreateRoot(createRoot: (dom: HTMLElement) => IPolyfillRoot) {
  unstableCreateRoot = createRoot;
}
