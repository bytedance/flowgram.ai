/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useId, type ReactNode } from 'react';

import { Check } from 'lucide-react';

import { cn } from '../../lib/utils';

export function VisualChoice<T extends string>({
  label,
  value,
  options,
  onValueChange,
  className,
}: {
  label: string;
  value: T;
  options: readonly { value: T; label: string; description?: string; preview: ReactNode }[];
  onValueChange: (value: T) => void;
  className?: string;
}) {
  const name = useId();
  return (
    <fieldset className="min-w-0 border-0 p-0">
      <legend className="mb-3 text-sm font-medium">{label}</legend>
      <div className={cn('grid grid-cols-2 gap-3', className)}>
        {options.map((option) => (
          <label key={option.value} className="relative min-w-0 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onValueChange(option.value)}
              aria-label={option.label}
              className="peer sr-only"
            />
            <span className="block h-full rounded-xl border border-border p-2 transition-colors hover:bg-secondary/40 peer-checked:border-primary peer-checked:bg-secondary/40 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring">
              {option.preview}
              <span className="mt-2 flex items-center justify-between gap-1 px-1 text-xs font-medium">
                {option.label}
                <Check
                  aria-hidden
                  size={13}
                  className={value === option.value ? 'shrink-0' : 'invisible shrink-0'}
                />
              </span>
              {option.description && (
                <span className="mt-1 block px-1 text-[11px] leading-4 text-muted-foreground">
                  {option.description}
                </span>
              )}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
