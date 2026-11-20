/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useId, useState, type ReactNode } from 'react';

import { ChevronRight } from 'lucide-react';

import { Collapse } from '../ui/presence';
import { errorText } from '../../lib/i18n';

export function FormField({
  label,
  required,
  hint,
  children,
  error,
  meta,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
  error?: string;
  meta?: ReactNode;
}) {
  const id = useId();
  return (
    <div
      className="nf-field"
      role="group"
      aria-labelledby={`${id}-label`}
      aria-describedby={hint ? `${id}-hint` : undefined}
    >
      <div className="nf-label-row">
        <span id={`${id}-label`} className="nf-label">
          {label}
          {required && <span className="nf-required"> *</span>}
        </span>
        {meta}
      </div>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="nf-hint">
          {hint}
        </p>
      )}
      {error && (
        <p role="alert" className="nf-error">
          {errorText(error)}
        </p>
      )}
    </div>
  );
}
export function FormSection({
  title,
  children,
  summary,
}: {
  title: string;
  children: ReactNode;
  summary?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="nf-section">
      <button
        type="button"
        className="nf-section-trigger"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        <ChevronRight size={14} />
        <span>{title}</span>
        <span className="nf-section-summary">{summary}</span>
      </button>
      <Collapse open={open} id={id}>
        <div className="nf-section-content">{children}</div>
      </Collapse>
    </div>
  );
}
export { Select } from '../ui/select';
export function StatusLabel({ children, error = false }: { children: ReactNode; error?: boolean }) {
  return <span className={`nf-status ${error ? 'nf-error' : ''}`}>{children}</span>;
}
