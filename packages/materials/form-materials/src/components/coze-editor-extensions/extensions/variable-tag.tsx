/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useLayoutEffect } from 'react';

import { isEqual, last } from 'lodash-es';
import {
  BaseVariableField,
  Disposable,
  DisposableCollection,
  Scope,
  useCurrentScope,
} from '@flowgram.ai/editor';
import { useInjector } from '@flowgram.ai/coze-editor/react';
import { Popover, Tag } from '@douyinfe/semi-ui';
import { IconIssueStroked } from '@douyinfe/semi-icons';
import {
  Decoration,
  DecorationSet,
  EditorView,
  MatchDecorator,
  ViewPlugin,
  WidgetType,
} from '@codemirror/view';

import { IPolyfillRoot, polyfillCreateRoot } from '@/shared';

import '../styles.css';

class VariableTagWidget extends WidgetType {
  keyPath?: string[];

  toDispose = new DisposableCollection();

  scope: Scope;

  root: IPolyfillRoot;

  constructor({ keyPath, scope }: { keyPath?: string[]; scope: Scope }) {
    super();

    this.keyPath = keyPath;
    this.scope = scope;
  }

  renderIcon = (icon: string | JSX.Element) => {
    if (typeof icon === 'string') {
      return <img style={{ marginRight: 8 }} width={12} height={12} src={icon} />;
    }

    return icon;
  };

  renderVariable(v?: BaseVariableField) {
    if (!v) {
      this.root.render(
        <Tag className="gedit-m-coze-editor-tag" color="amber">
          <IconIssueStroked style={{ marginRight: '4px' }} />
          <span>Unknown</span>
        </Tag>
      );
      return;
    }

    const rootField = last(v.parentFields) || v;
    const isRoot = v === rootField;

    const rootTitle = (
      <span className="gedit-m-coze-editor-root-title">
        {rootField.meta?.title ? `${rootField.meta.title} ${isRoot ? '' : '-'} ` : ''}
      </span>
    );
    const rootIcon = this.renderIcon(rootField?.meta.icon);

    this.root.render(
      <Popover
        content={
          <div className="gedit-m-coze-editor-popover-content">
            {rootIcon}
            {rootTitle}
            <span className="gedit-m-coze-editor-var-name">{v?.keyPath.slice(1).join('.')}</span>
          </div>
        }
      >
        <Tag
          className="gedit-m-coze-editor-tag"
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          {rootIcon}
          {rootTitle}
          {!isRoot && <span className="gedit-m-coze-editor-var-name">{v?.key}</span>}
        </Tag>
      </Popover>
    );
  }

  toDOM(view: EditorView): HTMLElement {
    const dom = document.createElement('span');

    this.root = polyfillCreateRoot(dom);

    this.toDispose.push(
      Disposable.create(() => {
        this.root.unmount();
      })
    );

    this.toDispose.push(
      this.scope.available.trackByKeyPath(
        this.keyPath,
        (v) => {
          this.renderVariable(v);
        },
        { triggerOnInit: false }
      )
    );

    this.renderVariable(this.scope.available.getByKeyPath(this.keyPath));

    return dom;
  }

  eq(other: VariableTagWidget) {
    return isEqual(this.keyPath, other.keyPath);
  }

  ignoreEvent(): boolean {
    return false;
  }

  destroy(dom: HTMLElement): void {
    this.toDispose.dispose();
  }
}

export function VariableTagInject() {
  const injector = useInjector();

  const scope = useCurrentScope({ strict: true });

  // 基于 {{var}} 的正则进行匹配，匹配后进行自定义渲染
  useLayoutEffect(() => {
    const atMatcher = new MatchDecorator({
      regexp: /\{\{([^\}\{]+)\}\}/g,
      decoration: (match) =>
        Decoration.replace({
          widget: new VariableTagWidget({
            keyPath: match[1]?.split('.') ?? [],
            scope,
          }),
        }),
    });

    return injector.inject([
      ViewPlugin.fromClass(
        class {
          decorations: DecorationSet;

          constructor(private view: EditorView) {
            this.decorations = atMatcher.createDeco(view);
          }

          update() {
            this.decorations = atMatcher.createDeco(this.view);
          }
        },
        {
          decorations: (p) => p.decorations,
          provide(p) {
            return EditorView.atomicRanges.of(
              (view) => view.plugin(p)?.decorations ?? Decoration.none
            );
          },
        }
      ),
    ]);
  }, [injector]);

  return null;
}
