/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { createPortal } from 'react-dom';
import {
  useLayoutEffect,
  useRef,
  Fragment,
  useContext,
  useState,
  type ReactNode,
  type ButtonHTMLAttributes,
} from 'react';

import { Check, ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '../../lib/utils';
import { Popover } from './popover';
import { MenuButton } from './menu-button';
import { Input } from './input';
import { FloatingLayerOwners } from './floating-layer';
import { Button } from './button';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  lang?: string;
  separatorBefore?: boolean;
}
export interface SelectProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'value' | 'onChange' | 'defaultValue' | 'children'
  > {
  value: string;
  options: readonly SelectOption[];
  onValueChange: (value: string) => void;
  name?: string;
  placeholder?: string;
  variant?: 'default' | 'ghost';
}

// Radix reserves an empty item value. Encode every value so an explicit empty
// option is selectable without inventing a reserved value in workflow data.
const itemValue = (value: string) => `option:${value}`;
export function Select({
  value,
  options,
  onValueChange,
  name,
  placeholder = '',
  disabled,
  className,
  variant = 'default',
  ...triggerProps
}: SelectProps) {
  const owners = useContext(FloatingLayerOwners);
  const selected = options.find((option) => option.value === value);
  return (
    <>
      <SelectPrimitive.Root
        value={itemValue(value)}
        onValueChange={(next) => onValueChange(next.slice('option:'.length))}
        disabled={disabled || !options.length}
      >
        <SelectPrimitive.Trigger
          {...triggerProps}
          className={cn('fg-select-trigger', variant === 'ghost' && 'fg-select-ghost', className)}
        >
          <SelectPrimitive.Value placeholder={placeholder}>
            <span className="fg-select-value" lang={selected?.lang}>
              {selected?.label ?? (value || placeholder)}
            </span>
          </SelectPrimitive.Value>
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="fg-select-chevron" size={14} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="fg-select-content"
            data-floating-layer-owners={owners.join(' ')}
            position="popper"
            sideOffset={5}
            collisionPadding={10}
          >
            <SelectPrimitive.ScrollUpButton className="fg-select-scroll">
              <ChevronUp size={14} />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className="fg-select-viewport">
              {options.map((option) => (
                <Fragment key={option.value}>
                  {option.separatorBefore && (
                    <SelectPrimitive.Separator className="my-1 h-px bg-border" />
                  )}
                  <SelectPrimitive.Item
                    key={option.value}
                    value={itemValue(option.value)}
                    disabled={option.disabled}
                    textValue={option.label}
                    className="fg-select-option"
                    lang={option.lang}
                  >
                    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator className="fg-select-check">
                      <Check size={14} />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                </Fragment>
              ))}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className="fg-select-scroll">
              <ChevronDown size={14} />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {name && <input type="hidden" name={name} value={value} />}
    </>
  );
}

/** Composite entity picker: selection and row actions are sibling buttons, never nested options. */
export function EntitySelect({
  value,
  items,
  label,
  placeholder,
  onValueChange,
  actions,
  onAction,
  actionLabel,
  commands,
  onCommand,
  className,
}: {
  value: string;
  items: readonly { value: string; label: string }[];
  label: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  actions: readonly import('./command-menu').MenuCommand[];
  onAction: (action: string, value: string) => void;
  actionLabel: (item: { value: string; label: string }) => string;
  commands: readonly import('./command-menu').MenuCommand[];
  onCommand: (action: string) => void;
  className?: string;
}) {
  const current = items.find((item) => item.value === value);
  return (
    <div className={cn('fg-entity-select', className)}>
      <Popover
        label={label}
        width={320}
        trigger={
          <button
            type="button"
            role="combobox"
            title={current?.label || placeholder}
            aria-label={label}
            className="fg-select-trigger fg-select-ghost"
          >
            <span className="fg-select-value">{current?.label || placeholder}</span>
            <ChevronDown className="fg-select-chevron" size={14} />
          </button>
        }
      >
        {(close) => (
          <>
            <div role="list" aria-label={label} className="max-h-64 overflow-auto">
              {items.map((item) => (
                <div role="listitem" key={item.value} className="fg-entity-row">
                  <button
                    type="button"
                    className="fg-entity-choice"
                    aria-current={item.value === value ? 'true' : undefined}
                    title={item.label}
                    onClick={() => {
                      close();
                      onValueChange(item.value);
                    }}
                  >
                    <Check
                      size={14}
                      aria-hidden="true"
                      className={item.value === value ? 'shrink-0' : 'invisible shrink-0'}
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                  <MenuButton
                    label={actionLabel(item)}
                    commands={[...actions]}
                    onCommand={(action) => {
                      close();
                      onAction(action, item.value);
                    }}
                  >
                    <MoreHorizontal size={15} />
                  </MenuButton>
                </div>
              ))}
            </div>
            {!!items.length && <div className="my-1 h-px bg-border" />}
            {commands.map((command) => (
              <Button
                key={command.id}
                type="button"
                variant="ghost"
                className="w-full justify-start"
                disabled={!!command.disabled}
                onClick={() => {
                  close();
                  onCommand(command.id);
                }}
              >
                {command.label}
              </Button>
            ))}
          </>
        )}
      </Popover>
    </div>
  );
}

/** Searchable grouped choices with descriptive rows and a separate command footer. */
export function GroupedSelect({
  value,
  label,
  trigger,
  searchLabel,
  groups,
  empty,
  leading,
  footer,
  onValueChange,
  disabled,
  title,
}: {
  value: string;
  label: string;
  trigger: string;
  searchLabel: string;
  groups: {
    id: string;
    label: string;
    items: { value: string; label: string; description?: string; disabled?: boolean }[];
  }[];
  empty: string;
  leading?: (close: () => void) => ReactNode;
  footer?: (close: () => void) => ReactNode;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  title?: string;
}) {
  const [query, setQuery] = useState('');
  const visible = groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        `${group.label} ${item.label} ${item.description || ''}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length);
  return (
    <Popover
      label={label}
      width={340}
      trigger={
        <button
          type="button"
          disabled={disabled}
          aria-label={`${label}: ${trigger}`}
          title={title}
          className="fg-select-trigger fg-select-ghost max-w-full text-xs"
        >
          <span className="truncate">{trigger}</span>
          <ChevronDown size={13} />
        </button>
      }
    >
      {(close) => (
        <div
          className="space-y-2"
          onKeyDown={(event) => {
            if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
            const choices = [
              ...event.currentTarget.querySelectorAll<HTMLButtonElement>(
                'button[data-select-choice]:not(:disabled)'
              ),
            ];
            if (!choices.length) return;
            event.preventDefault();
            const index = choices.indexOf(document.activeElement as HTMLButtonElement);
            choices[
              (index + (event.key === 'ArrowDown' ? 1 : choices.length - 1) + choices.length) %
                choices.length
            ].focus();
          }}
        >
          <Input
            aria-label={searchLabel}
            placeholder={searchLabel}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="max-h-72 overflow-auto" role="group" aria-label={label}>
            {leading?.(close)}
            {visible.map((group) => (
              <div key={group.id} role="group" aria-label={group.label}>
                <p className="px-2 pb-1 pt-3 text-xs font-medium text-muted-foreground">
                  {group.label}
                </p>
                {group.items.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    data-select-choice
                    disabled={item.disabled}
                    aria-pressed={item.value === value}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-muted disabled:opacity-50"
                    onClick={() => {
                      onValueChange(item.value);
                      close();
                    }}
                  >
                    <Check size={13} className={item.value === value ? '' : 'invisible'} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm">{item.label}</span>
                      <small className="block truncate text-muted-foreground">
                        {item.description}
                      </small>
                    </span>
                  </button>
                ))}
              </div>
            ))}
            {!visible.length && <p className="p-3 text-xs text-muted-foreground">{empty}</p>}
          </div>
          {footer?.(close)}
        </div>
      )}
    </Popover>
  );
}

/** A controlled, upward anchored picker that can leave focus in a mention editor. */
export function AnchoredSelect({
  id,
  anchor,
  options,
  label,
  empty,
  search,
  owner,
  onValueChange,
  onClose,
  onActiveChange,
  keyboardReady,
}: {
  id: string;
  anchor: { left: number; top: number; bottom: number };
  options: SelectOption[];
  label: string;
  empty: string;
  search?: { value: string; onChange: (value: string) => void; label: string };
  owner: HTMLElement | null;
  onValueChange: (value: string) => void;
  onClose: (restoreFocus?: boolean) => void;
  onActiveChange: (id: string | undefined) => void;
  keyboardReady?: () => boolean;
}) {
  const owners = useContext(FloatingLayerOwners);
  const panel = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState('');
  const enabled = options.filter((option) => !option.disabled);
  const current = enabled.find((option) => option.value === active) || enabled[0];
  const currentId = current ? `${id}-${options.indexOf(current)}` : undefined;
  const callbacks = useRef({ onClose, onValueChange, onActiveChange, keyboardReady });
  callbacks.current = { onClose, onValueChange, onActiveChange, keyboardReady };
  const state = useRef({ enabled, current });
  state.current = { enabled, current };
  useLayoutEffect(() => {
    callbacks.current.onActiveChange(currentId);
  }, [currentId]);
  useLayoutEffect(() => {
    panel.current?.querySelector('input')?.focus({ preventScroll: true });
    const outside = (event: PointerEvent) => {
      if (!panel.current?.contains(event.target as Node) && !owner?.contains(event.target as Node))
        callbacks.current.onClose();
    };
    const keyboard = (event: KeyboardEvent) => {
      if (
        event.isComposing ||
        callbacks.current.keyboardReady?.() === false ||
        (!panel.current?.contains(event.target as Node) && !owner?.contains(event.target as Node))
      )
        return;
      const { enabled, current } = state.current;
      if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
        event.stopPropagation();
        const index = enabled.indexOf(current!);
        setActive(
          enabled[(index + (event.key === 'ArrowDown' ? 1 : enabled.length - 1)) % enabled.length]
            ?.value || ''
        );
      } else if (event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        if (current) callbacks.current.onValueChange(current.value);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        callbacks.current.onClose(true);
      } else if (event.key === 'Tab') callbacks.current.onClose();
    };
    const resize = () => callbacks.current.onClose();
    document.addEventListener('pointerdown', outside, true);
    document.addEventListener('keydown', keyboard, true);
    window.addEventListener('resize', resize);
    return () => {
      document.removeEventListener('pointerdown', outside, true);
      document.removeEventListener('keydown', keyboard, true);
      window.removeEventListener('resize', resize);
    };
  }, [owner]);
  useLayoutEffect(() => {
    if (currentId) document.getElementById(currentId)?.scrollIntoView({ block: 'nearest' });
  }, [currentId]);
  const above = Math.max(0, anchor.top - 12);
  const up = above >= 120 || above >= window.innerHeight - anchor.bottom - 12;
  const available = up ? above : window.innerHeight - anchor.bottom - 12;
  return createPortal(
    <div
      ref={panel}
      className="nf-popover mention-picker"
      data-state="open"
      data-floating-layer-owners={owners.join(' ')}
      style={{
        left: Math.max(12, Math.min(anchor.left, window.innerWidth - 332)),
        width: Math.min(320, window.innerWidth - 24),
        maxHeight: Math.min(320, Math.max(72, available)),
        ...(up ? { bottom: window.innerHeight - anchor.top + 6 } : { top: anchor.bottom + 6 }),
      }}
    >
      {search ? (
        <Input
          aria-label={search.label}
          placeholder={search.label}
          value={search.value}
          onChange={(event) => {
            setActive('');
            search.onChange(event.target.value);
          }}
          aria-controls={id}
          aria-activedescendant={currentId}
          role="combobox"
          aria-expanded
          aria-autocomplete="list"
        />
      ) : (
        <p className="px-2 pb-2 pt-1 text-xs text-muted-foreground">{label}</p>
      )}
      <div id={id} role="listbox" aria-label={label} className="mt-1 min-h-0 overflow-auto">
        {options.map((option, index) => (
          <button
            id={`${id}-${index}`}
            type="button"
            role="option"
            aria-selected={option.value === current?.value}
            disabled={option.disabled}
            tabIndex={-1}
            key={option.value}
            className="mention-option"
            onPointerDown={(event) => event.preventDefault()}
            onMouseMove={() => setActive(option.value)}
            onClick={() => onValueChange(option.value)}
          >
            {option.label}
          </button>
        ))}
        {!options.length && <p className="px-2 py-4 text-xs text-muted-foreground">{empty}</p>}
      </div>
    </div>,
    document.body
  );
}
