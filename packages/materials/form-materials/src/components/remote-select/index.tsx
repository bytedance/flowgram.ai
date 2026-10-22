/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useEffect, useRef, useState } from 'react';

import type { OptionProps, SelectProps } from '@douyinfe/semi-ui/lib/es/select';
import { Select } from '@douyinfe/semi-ui';

import {
  loadRemoteSelectOptions,
  type RemoteSelectFetcher,
  type RemoteSelectResponseTransformer,
} from './load-options';

export type RemoteSelectProps = Omit<SelectProps, 'children' | 'loading' | 'optionList'> & {
  /** URL that returns an option array, or a payload handled by transformResponse. */
  url: string;
  /** Fetch options such as method, headers, credentials, and body. */
  requestInit?: RequestInit;
  /** Optional fetch-compatible client for authentication, tests, or non-browser runtimes. */
  fetcher?: RemoteSelectFetcher;
  /** Convert an arbitrary backend JSON payload into Semi Select options. */
  transformResponse?: RemoteSelectResponseTransformer;
  /** Changing this value forces the current URL to reload. */
  reloadKey?: string | number;
  /** External loading state, combined with the component's request state. */
  loading?: boolean;
  /** Content shown when loading fails. */
  errorContent?: React.ReactNode | ((error: Error) => React.ReactNode);
  /** Called after fresh options have been committed. */
  onLoad?: (options: OptionProps[]) => void;
  /** Called when a non-aborted request fails. */
  onLoadError?: (error: Error) => void;
};

const isAbortError = (error: unknown): boolean =>
  error instanceof Error && error.name === 'AbortError';

const asError = (error: unknown): Error =>
  error instanceof Error ? error : new Error(String(error));

export function RemoteSelect({
  url,
  requestInit,
  fetcher,
  transformResponse,
  reloadKey,
  loading,
  errorContent = 'Failed to load options',
  onLoad,
  onLoadError,
  emptyContent,
  ...selectProps
}: RemoteSelectProps) {
  const [options, setOptions] = useState<OptionProps[]>([]);
  const [requestLoading, setRequestLoading] = useState(Boolean(url));
  const [requestError, setRequestError] = useState<Error | null>(null);
  const onLoadRef = useRef(onLoad);
  const onLoadErrorRef = useRef(onLoadError);

  onLoadRef.current = onLoad;
  onLoadErrorRef.current = onLoadError;

  useEffect(() => {
    if (!url) {
      setOptions([]);
      setRequestError(null);
      setRequestLoading(false);
      return;
    }

    let disposed = false;
    const controller = new AbortController();
    const externalSignal = requestInit?.signal;
    const abortFromExternalSignal = () => controller.abort(externalSignal?.reason);

    if (externalSignal?.aborted) {
      abortFromExternalSignal();
    } else {
      externalSignal?.addEventListener('abort', abortFromExternalSignal, {
        once: true,
      });
    }

    setRequestError(null);
    setRequestLoading(true);

    void loadRemoteSelectOptions({
      url,
      requestInit,
      fetcher,
      transformResponse,
      signal: controller.signal,
    })
      .then((nextOptions) => {
        if (disposed || controller.signal.aborted) {
          return;
        }
        setOptions(nextOptions);
        onLoadRef.current?.(nextOptions);
      })
      .catch((error: unknown) => {
        if (disposed || controller.signal.aborted || isAbortError(error)) {
          return;
        }
        const nextError = asError(error);
        setRequestError(nextError);
        onLoadErrorRef.current?.(nextError);
      })
      .finally(() => {
        if (!disposed) {
          setRequestLoading(false);
        }
      });

    return () => {
      disposed = true;
      externalSignal?.removeEventListener('abort', abortFromExternalSignal);
      controller.abort();
    };
  }, [fetcher, reloadKey, requestInit, transformResponse, url]);

  const resolvedEmptyContent = requestError
    ? typeof errorContent === 'function'
      ? errorContent(requestError)
      : errorContent
    : emptyContent;

  return (
    <Select
      {...selectProps}
      emptyContent={resolvedEmptyContent}
      loading={Boolean(loading || requestLoading)}
      optionList={options}
    />
  );
}

export {
  RemoteSelectRequestError,
  loadRemoteSelectOptions,
  type RemoteSelectFetcher,
  type RemoteSelectResponseTransformer,
} from './load-options';
