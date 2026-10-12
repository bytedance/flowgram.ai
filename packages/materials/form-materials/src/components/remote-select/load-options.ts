/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type { OptionProps } from '@douyinfe/semi-ui/lib/es/select';

export type RemoteSelectFetcher = (
  input: RequestInfo | URL,
  init?: RequestInit
) => Promise<Response>;

export type RemoteSelectResponseTransformer = (
  payload: unknown,
  response: Response
) => OptionProps[] | Promise<OptionProps[]>;

export interface LoadRemoteSelectOptionsParams {
  url: string;
  requestInit?: RequestInit;
  fetcher?: RemoteSelectFetcher;
  transformResponse?: RemoteSelectResponseTransformer;
  signal?: AbortSignal;
}

export class RemoteSelectRequestError extends Error {
  readonly status: number;

  readonly statusText: string;

  readonly url: string;

  constructor(response: Response, url: string) {
    super(
      `RemoteSelect request failed with ${response.status}${
        response.statusText ? ` ${response.statusText}` : ''
      } for ${url}`
    );
    this.name = 'RemoteSelectRequestError';
    this.status = response.status;
    this.statusText = response.statusText;
    this.url = url;
  }
}

const defaultFetcher: RemoteSelectFetcher = (input, init) => {
  if (typeof globalThis.fetch !== 'function') {
    throw new Error('RemoteSelect requires a fetch implementation. Pass the fetcher prop.');
  }
  return globalThis.fetch(input, init);
};

export async function loadRemoteSelectOptions({
  url,
  requestInit,
  fetcher = defaultFetcher,
  transformResponse,
  signal,
}: LoadRemoteSelectOptionsParams): Promise<OptionProps[]> {
  const response = await fetcher(url, {
    ...requestInit,
    signal,
  });

  if (!response.ok) {
    throw new RemoteSelectRequestError(response, url);
  }

  const payload: unknown = await response.json();
  const options = transformResponse ? await transformResponse(payload, response) : payload;

  if (!Array.isArray(options)) {
    throw new TypeError(
      'RemoteSelect expected an option array. Use transformResponse for nested backend payloads.'
    );
  }

  return options as OptionProps[];
}
