/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';

import { useWatch } from '../src/react/use-watch';
import { FormModelContext } from '../src/react/context';
import { FormModel } from '../src/core/form-model';

const models: FormModel[] = [];

function createModel(initialValues: unknown) {
  const model = new FormModel();
  model.init({ initialValues });
  models.push(model);
  return model;
}

function WatchedValue({ name, onRender }: { name: string; onRender?: () => void }) {
  const value = useWatch(name);
  onRender?.();
  return <span data-testid="watched">{JSON.stringify(value) ?? 'undefined'}</span>;
}

function renderWatcher(model: FormModel, name: string, onRender?: () => void) {
  return render(
    <FormModelContext.Provider value={model}>
      <WatchedValue name={name} onRender={onRender} />
    </FormModelContext.Provider>
  );
}

afterEach(() => {
  cleanup();
  models.splice(0).forEach((model) => model.dispose());
  vi.restoreAllMocks();
});

describe('useWatch', () => {
  it.each(['user.name', 'user', ''])('updates after replacing %j', (updatedName) => {
    const model = createModel({ user: { name: 'old' } });
    const view = renderWatcher(model, 'user.name');

    act(() => {
      if (updatedName === '') {
        model.values = { user: { name: 'new' } };
      } else {
        model.setValueIn(updatedName, updatedName === 'user' ? { name: 'new' } : 'new');
      }
    });

    expect(view.getByTestId('watched').textContent).toBe('"new"');
  });

  it('updates a watched parent after a descendant changes', () => {
    const model = createModel({ user: { name: 'old' } });
    const view = renderWatcher(model, 'user');

    act(() => model.setValueIn('user.name', 'new'));

    expect(view.getByTestId('watched').textContent).toBe('{"name":"new"}');
  });

  it('updates a watched descendant when its parent is cleared', () => {
    const model = createModel({ user: { name: 'old' } });
    const view = renderWatcher(model, 'user.name');

    act(() => model.clearValueIn('user'));

    expect(view.getByTestId('watched').textContent).toBe('undefined');
  });

  it('updates array descendants when the array is replaced', () => {
    const model = createModel({ items: [{ name: 'old' }] });
    const view = renderWatcher(model, 'items.0.name');

    act(() => model.setValueIn('items', [{ name: 'new' }]));

    expect(view.getByTestId('watched').textContent).toBe('"new"');
  });

  it.each([
    ['items.0.name', 'items[0].name'],
    ['items[0].name', 'items.0.name'],
  ])('matches watched %s with updated %s', (watchedName, updatedName) => {
    const model = createModel({ items: [{ name: 'old' }] });
    const view = renderWatcher(model, watchedName);

    act(() => model.setValueIn(updatedName, 'new'));

    expect(view.getByTestId('watched').textContent).toBe('"new"');
  });

  it.each([
    ['items.0.name', '"new"'],
    ['items.length', '1'],
  ])('observes %s when an array item is appended', (name, expected) => {
    const model = createModel({ items: [] });
    const array = model.createFieldArray('items');
    const view = renderWatcher(model, name);

    act(() => {
      array.append({ name: 'new' });
    });

    expect(view.getByTestId('watched').textContent).toBe(expected);
  });

  it.each([
    ['items.0.name', '"second"'],
    ['items.length', '1'],
  ])('observes %s when an array item is deleted', (name, expected) => {
    const model = createModel({ items: [{ name: 'first' }, { name: 'second' }] });
    const array = model.createFieldArray('items');
    array.map(() => undefined);
    const view = renderWatcher(model, name);

    act(() => array.delete(0));

    expect(view.getByTestId('watched').textContent).toBe(expected);
  });

  it('observes nested values when array items are swapped', () => {
    const model = createModel({ items: [{ name: 'first' }, { name: 'second' }] });
    const array = model.createFieldArray('items');
    array.map(() => undefined);
    const view = renderWatcher(model, 'items.0.name');

    act(() => array.swap(0, 1));

    expect(view.getByTestId('watched').textContent).toBe('"second"');
  });

  it('ignores unrelated paths with a common string prefix', () => {
    const model = createModel({ user: { name: 'old' }, username: 'initial' });
    const onRender = vi.fn();
    const view = renderWatcher(model, 'user.name', onRender);
    const renders = onRender.mock.calls.length;

    act(() => {
      model.setValueIn('username', 'new');
      model.setValueIn('user.nameSuffix', 'new');
    });

    expect(onRender).toHaveBeenCalledTimes(renders);
    expect(view.getByTestId('watched').textContent).toBe('"old"');
  });

  it('does not confuse a quoted dotted key with nested keys', () => {
    const model = createModel({ 'user.name': 'old', user: { name: 'nested' } });
    const onRender = vi.fn();
    const view = renderWatcher(model, '["user.name"]', onRender);
    const renders = onRender.mock.calls.length;

    act(() => model.setValueIn('user.name', 'changed'));

    expect(onRender).toHaveBeenCalledTimes(renders);
    expect(view.getByTestId('watched').textContent).toBe('"old"');
  });

  it('ignores array indices with a common string prefix', () => {
    const model = createModel({ items: Array.from({ length: 11 }, () => ({ name: 'old' })) });
    const onRender = vi.fn();
    const view = renderWatcher(model, 'items.1.name', onRender);
    const renders = onRender.mock.calls.length;

    act(() => model.setValueIn('items.10.name', 'new'));

    expect(onRender).toHaveBeenCalledTimes(renders);
    expect(view.getByTestId('watched').textContent).toBe('"old"');
  });

  it('rebinds when the watched path changes', () => {
    const model = createModel({ first: { name: 'a' }, second: { name: 'b' } });
    const onRender = vi.fn();
    const view = renderWatcher(model, 'first.name', onRender);
    view.rerender(
      <FormModelContext.Provider value={model}>
        <WatchedValue name="second.name" onRender={onRender} />
      </FormModelContext.Provider>
    );
    const renders = onRender.mock.calls.length;

    act(() => model.setValueIn('first', { name: 'ignored' }));
    expect(onRender).toHaveBeenCalledTimes(renders);

    act(() => model.setValueIn('second', { name: 'new' }));
    expect(view.getByTestId('watched').textContent).toBe('"new"');
  });

  it('disposes the form subscription on unmount', () => {
    const model = createModel({ user: { name: 'old' } });
    const subscribe = vi.spyOn(model, 'onFormValuesUpdated');
    const view = renderWatcher(model, 'user.name');
    const disposable = subscribe.mock.results[0].value;
    const dispose = vi.spyOn(disposable, 'dispose');

    view.unmount();

    expect(dispose).toHaveBeenCalledOnce();
  });

  it('rebinds when the form model changes', () => {
    const oldModel = createModel({ user: { name: 'old' } });
    const newModel = createModel({ user: { name: 'initial' } });
    const onRender = vi.fn();
    const view = renderWatcher(oldModel, 'user.name', onRender);
    view.rerender(
      <FormModelContext.Provider value={newModel}>
        <WatchedValue name="user.name" onRender={onRender} />
      </FormModelContext.Provider>
    );
    const renders = onRender.mock.calls.length;

    act(() => oldModel.setValueIn('user', { name: 'ignored' }));
    expect(onRender).toHaveBeenCalledTimes(renders);

    act(() => newModel.setValueIn('user', { name: 'new' }));
    expect(view.getByTestId('watched').textContent).toBe('"new"');
  });
});
