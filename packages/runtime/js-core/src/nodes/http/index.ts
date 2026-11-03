/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  ExecutionContext,
  ExecutionResult,
  FlowGramNode,
  HTTPBodyType,
  HTTPMethod,
  HTTPNodeSchema,
  INode,
  INodeExecutor,
} from '@flowgram.ai/runtime-interface';

export interface HTTPExecutorInputs {
  method: HTTPMethod;
  url: string;
  headers: Record<string, string>;
  params: Record<string, string>;
  bodyType: HTTPBodyType;
  body: string;
  retryTimes: number;
  timeout: number;
}

export class HTTPExecutor implements INodeExecutor {
  public readonly type = FlowGramNode.HTTP;

  public async execute(context: ExecutionContext): Promise<ExecutionResult> {
    const inputs = this.parseInputs(context);
    const response = await this.request(inputs);

    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    const responseBody = await response.text();

    return {
      outputs: {
        headers: responseHeaders,
        statusCode: response.status,
        body: responseBody,
      },
    };
  }

  private async request(inputs: HTTPExecutorInputs): Promise<Response> {
    const { method, url, headers, params, bodyType, body, retryTimes, timeout } = inputs;

    // Build URL with query parameters
    const urlWithParams = this.buildUrlWithParams(url, params);

    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers: this.prepareHeaders(headers, bodyType),
    };

    // Add body if method supports it
    if (method !== 'GET' && method !== 'HEAD' && body) {
      requestOptions.body = this.prepareBody(body, bodyType);
    }

    // Implement retry logic
    let lastError: Error | null = null;
    for (let attempt = 0; attempt <= retryTimes; attempt++) {
      try {
        const response = await fetch(urlWithParams, {
          ...requestOptions,
          signal: AbortSignal.timeout(timeout),
        });
        return response;
      } catch (error) {
        lastError = error as Error;
        if (attempt < retryTimes) {
          // Wait before retry (exponential backoff)
          await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    throw lastError || new Error('HTTP request failed after all retry attempts');
  }

  private parseInputs(context: ExecutionContext): HTTPExecutorInputs {
    const httpNode = context.node as INode<HTTPNodeSchema['data']>;
    const method = httpNode.data.api.method;
    const urlVariable = context.runtime.state.parseTemplate(httpNode.data.api.url);
    if (!urlVariable) {
      throw new Error('HTTP url is required');
    }
    const url = urlVariable.value;
    const headers = context.runtime.state.parseInputs({
      values: httpNode.data.headersValues,
      declare: httpNode.data.headers,
    });
    const params = context.runtime.state.parseInputs({
      values: httpNode.data.paramsValues,
      declare: httpNode.data.params,
    });
    const body = this.parseBody(context);
    const retryTimes = httpNode.data.timeout.retryTimes;
    const timeout = httpNode.data.timeout.timeout;
    const inputs = {
      method,
      url,
      headers,
      params,
      bodyType: body.bodyType,
      body: body.body,
      retryTimes,
      timeout,
    };
    context.snapshot.update({
      inputs: JSON.parse(JSON.stringify(inputs)),
    });
    return inputs;
  }

  private parseBody(context: ExecutionContext): {
    bodyType: HTTPBodyType;
    body: string;
  } {
    const httpNode = context.node as INode<HTTPNodeSchema['data']>;
    const bodyType = httpNode.data.body.bodyType;
    if (bodyType === HTTPBodyType.None) {
      return {
        bodyType,
        body: '',
      };
    }
    if (bodyType === HTTPBodyType.JSON) {
      if (!httpNode.data.body.json) {
        throw new Error('HTTP json body is required');
      }
      const jsonVariable = context.runtime.state.parseTemplate(httpNode.data.body.json);
      if (!jsonVariable) {
        throw new Error('HTTP json body is required');
      }
      return {
        bodyType,
        body: jsonVariable.value,
      };
    }
    if (bodyType === HTTPBodyType.FormData) {
      if (!httpNode.data.body.formData || !httpNode.data.body.formDataValues) {
        throw new Error('HTTP form-data body is required');
      }

      const formData = context.runtime.state.parseInputs({
        values: httpNode.data.body.formDataValues,
        declare: httpNode.data.body.formData,
      });
      return {
        bodyType,
        body: JSON.stringify(formData),
      };
    }
    if (bodyType === HTTPBodyType.RawText) {
      if (!httpNode.data.body.json) {
        throw new Error('HTTP json body is required');
      }
      const jsonVariable = context.runtime.state.parseTemplate(httpNode.data.body.json);
      if (!jsonVariable) {
        throw new Error('HTTP json body is required');
      }
      return {
        bodyType,
        body: jsonVariable.value,
      };
    }
    if (bodyType === HTTPBodyType.Binary) {
      if (!httpNode.data.body.binary) {
        throw new Error('HTTP binary body is required');
      }
      const binaryVariable = context.runtime.state.parseTemplate(httpNode.data.body.binary);
      if (!binaryVariable) {
        throw new Error('HTTP binary body is required');
      }
      return {
        bodyType,
        body: binaryVariable.value,
      };
    }
    if (bodyType === HTTPBodyType.XWwwFormUrlencoded) {
      if (!httpNode.data.body.xWwwFormUrlencoded || !httpNode.data.body.xWwwFormUrlencodedValues) {
        throw new Error('HTTP x-www-form-urlencoded body is required');
      }
      const xWwwFormUrlencoded = context.runtime.state.parseInputs({
        values: httpNode.data.body.xWwwFormUrlencodedValues,
        declare: httpNode.data.body.xWwwFormUrlencoded,
      });
      return {
        bodyType,
        body: JSON.stringify(xWwwFormUrlencoded),
      };
    }
    throw new Error(`HTTP invalid body type "${bodyType}"`);
  }

  private buildUrlWithParams(url: string, params: Record<string, string>): string {
    const urlObj = new URL(url);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        urlObj.searchParams.set(key, value);
      }
    });
    return urlObj.toString();
  }

  private prepareHeaders(
    headers: Record<string, string>,
    bodyType: HTTPBodyType
  ): Record<string, string> {
    const preparedHeaders = { ...headers };

    // Set Content-Type based on body type if not already set
    if (!preparedHeaders['Content-Type'] && !preparedHeaders['content-type']) {
      switch (bodyType) {
        case HTTPBodyType.JSON:
          preparedHeaders['Content-Type'] = 'application/json';
          break;
        case HTTPBodyType.FormData:
          // Don't set Content-Type for FormData, let browser set it with boundary
          break;
        case HTTPBodyType.XWwwFormUrlencoded:
          preparedHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
          break;
        case HTTPBodyType.RawText:
          preparedHeaders['Content-Type'] = 'text/plain';
          break;
        case HTTPBodyType.Binary:
          preparedHeaders['Content-Type'] = 'application/octet-stream';
          break;
      }
    }

    return preparedHeaders;
  }

  private prepareBody(body: string, bodyType: HTTPBodyType): string | FormData {
    switch (bodyType) {
      case HTTPBodyType.JSON:
        return body;
      case HTTPBodyType.FormData:
        const formData = new FormData();
        try {
          const data = JSON.parse(body);
          Object.entries(data).forEach(([key, value]) => {
            formData.append(key, String(value));
          });
        } catch (error) {
          throw new Error('Invalid FormData body format');
        }
        return formData;
      case HTTPBodyType.XWwwFormUrlencoded:
        try {
          const data = JSON.parse(body);
          const params = new URLSearchParams();
          Object.entries(data).forEach(([key, value]) => {
            params.append(key, String(value));
          });
          return params.toString();
        } catch (error) {
          throw new Error('Invalid x-www-form-urlencoded body format');
        }
      case HTTPBodyType.RawText:
      case HTTPBodyType.Binary:
      default:
        return body;
    }
  }
}
