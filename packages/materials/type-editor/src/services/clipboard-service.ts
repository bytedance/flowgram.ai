/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { injectable } from 'inversify';
import { Event, Emitter } from '@flowgram.ai/utils';

@injectable()
export class ClipboardService {
  public readonly onClipboardChangedEmitter = new Emitter<string>();

  readonly onClipboardChanged: Event<string> = this.onClipboardChangedEmitter.event;

  /**
   * 读取浏览器数据
   */
  private get data(): Promise<string> {
    return navigator.clipboard.readText();
  }

  private async saveReadData(): Promise<{
    error?: string;
    data?: string;
  }> {
    try {
      const data = await this.data;
      return {
        data,
      };
    } catch (error) {
      return {
        error: error as string,
      };
    }
  }

  /**
   * 设置剪切板数据
   */
  public async writeData(newStrData: string): Promise<void> {
    const oldSaveData = await this.saveReadData();

    // 读取错误可能是没有读取权限，此时不校验是否相等，直接写入剪切板
    if (oldSaveData.error || oldSaveData.data !== newStrData) {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(newStrData);
        const event = document.createEvent('Event');
        event.initEvent('onchange');
        (event as unknown as { value: string }).value = newStrData;
        navigator.clipboard.dispatchEvent(event);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = newStrData;

        // 视区以外渲染 dom，无法 display none，否则无文本 copy
        textarea.style.position = 'absolute';
        textarea.style.left = '-99999999px';

        document.body.prepend(textarea);

        // highlight the content of the textarea element
        textarea.select();

        try {
          document.execCommand('copy');
        } catch (err) {
          console.log(err);
        } finally {
          textarea.remove();
        }
      }

      this.onClipboardChangedEmitter.fire(newStrData);
    }
  }

  /**
   * 获取剪切板数据
   */

  public async readData(): Promise<string> {
    const res = await this.saveReadData();
    if (res.error) {
      throw Error(res.error);
    }
    return res.data || '';
  }

  public clearData(): void {
    this.writeData('');
  }
}
