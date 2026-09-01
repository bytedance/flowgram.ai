/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { forwardRef, useEffect, useState } from 'react';

import { Input, type InputProps, type InputRef } from 'antd';

export interface BlurInputProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: string, event?: React.FocusEvent<HTMLInputElement>) => void;
}

export const BlurInput = forwardRef<InputRef, BlurInputProps>((props, ref) => {
  const { value: controlledValue, onChange, onBlur, ...inputProps } = props;
  const [value, setValue] = useState(String(controlledValue ?? ''));

  useEffect(() => {
    setValue(String(controlledValue ?? ''));
  }, [controlledValue]);

  return (
    <Input
      {...inputProps}
      ref={ref}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      onBlur={(e) => {
        onChange?.(value, e);
        onBlur?.(e);
      }}
    />
  );
});

BlurInput.displayName = 'BlurInput';
