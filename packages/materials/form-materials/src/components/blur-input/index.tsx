/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable react/prop-types */
/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useEffect, useState } from 'react';

import { Input } from '@douyinfe/semi-ui';

type InputProps = React.ComponentPropsWithRef<typeof Input>;

export function BlurInput(props: InputProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value as string);
  }, [props.value]);

  return (
    <Input
      ref={props.ref}
      {...props}
      value={value}
      onChange={(value) => {
        setValue(value);
      }}
      onBlur={(e) => {
        props.onChange?.(value, e);
        props.onBlur?.(e);
      }}
    />
  );
}
