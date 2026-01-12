/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { inject, injectable } from 'inversify';
import { FlowDocument } from '@flowgram.ai/document';

import { getWorkflowRect } from './utils';
import { type IFlowExportImageService, type ExportImageOptions } from './type';
import {
  IN_SAFARI,
  IN_FIREFOX,
  EXPORT_IMAGE_WATERMARK_SVG,
  EXPORT_IMAGE_STYLE_PROPERTIES,
} from './constant';
import { FlowDownloadFormat } from '../constant';

const PADDING_X = 58;
const PADDING_Y = 138;

@injectable()
export class FlowExportImageService implements IFlowExportImageService {
  private modernScreenshot: any;

  @inject(FlowDocument)
  private document: FlowDocument;

  public async export(options: ExportImageOptions): Promise<string | undefined> {
    try {
      const imgUrl = await this.doExport(options);
      return imgUrl;
    } catch (e) {
      console.error('Export image failed:', e);
      return;
    }
  }

  private async loadModernScreenshot() {
    if (this.modernScreenshot) {
      return this.modernScreenshot;
    }

    const modernScreenshot = await import('modern-screenshot');
    this.modernScreenshot = modernScreenshot;
  }

  private async doExport(exportOptions: ExportImageOptions): Promise<string | undefined> {
    if (this.document.layout.name.includes('fixed-layout')) {
      return await this.doFixedExport(exportOptions);
    }
    return await this.doFreeExport(exportOptions);
  }

  private async doFreeExport(exportOptions: ExportImageOptions): Promise<string | undefined> {
    const { format } = exportOptions;
    // const el = this.stackingContextManager.node as HTMLElement;
    const renderLayer = window.document.querySelector('.gedit-flow-render-layer') as HTMLElement;

    if (!renderLayer) {
      return;
    }

    const { width, height, x, y } = getWorkflowRect(this.document);

    await this.loadModernScreenshot();
    const { domToPng, domToForeignObjectSvg, domToJpeg } = this.modernScreenshot;
    let imgUrl: string;
    const options = {
      scale: 2,
      includeStyleProperties: IN_SAFARI || IN_FIREFOX ? EXPORT_IMAGE_STYLE_PROPERTIES : undefined,
      width: width + PADDING_X * 2,
      height: height + PADDING_Y * 2,
      onCloneEachNode: (cloned: HTMLElement) => {
        this.handleFreeClone(cloned, { width, height, x, y, options: exportOptions });
      },
    };
    switch (format) {
      case FlowDownloadFormat.PNG:
        imgUrl = await domToPng(renderLayer, options);
        break;
      case FlowDownloadFormat.SVG: {
        const svg = await domToForeignObjectSvg(renderLayer, options);
        imgUrl = await this.svgToDataURL(svg);
        break;
      }
      case FlowDownloadFormat.JPEG:
        imgUrl = await domToJpeg(renderLayer, options);
        break;
      default:
        imgUrl = await domToPng(renderLayer, options);
    }
    return imgUrl;
  }

  private async doFixedExport(exportOptions: ExportImageOptions): Promise<string | undefined> {
    const { format } = exportOptions;

    const el = window.document.querySelector('.gedit-flow-nodes-layer') as HTMLElement;

    if (!el) {
      return;
    }

    const { width, height, x, y } = getWorkflowRect(this.document);
    await this.loadModernScreenshot();
    const { domToPng, domToForeignObjectSvg, domToJpeg } = this.modernScreenshot;
    let imgUrl: string;
    const options = {
      scale: 2,
      includeStyleProperties: IN_SAFARI || IN_FIREFOX ? EXPORT_IMAGE_STYLE_PROPERTIES : undefined,
      width: width + PADDING_X * 2,
      height: height + PADDING_Y * 2,
      onCloneEachNode: (cloned: HTMLElement) => {
        this.handleFixedClone(cloned, { width, height, x, y, options: exportOptions });
      },
    };
    switch (format) {
      case FlowDownloadFormat.PNG:
        imgUrl = await domToPng(el, options);
        break;
      case FlowDownloadFormat.SVG: {
        const svg = await domToForeignObjectSvg(el, options);
        imgUrl = await this.svgToDataURL(svg);
        break;
      }
      case FlowDownloadFormat.JPEG:
        imgUrl = await domToJpeg(el, options);
        break;
      default:
        imgUrl = await domToPng(el, options);
    }
    return imgUrl;
  }

  private async svgToDataURL(svg: SVGElement): Promise<string> {
    return Promise.resolve()
      .then(() => new XMLSerializer().serializeToString(svg))
      .then(encodeURIComponent)
      .then((html) => `data:image/svg+xml;charset=utf-8,${html}`);
  }

  // 处理克隆节点
  private handleFreeClone(
    cloned: HTMLElement,
    {
      width,
      height,
      x,
      y,
      options,
    }: { width: number; height: number; x: number; y: number; options: ExportImageOptions }
  ) {
    if (
      cloned?.classList?.contains('gedit-flow-activity-node') ||
      cloned?.classList?.contains('gedit-flow-activity-line')
    ) {
      this.handlePosition(cloned, x, y);
    }

    if (cloned?.classList?.contains('gedit-flow-render-layer')) {
      this.handleCanvas(cloned, width, height, options);
    }

    this.handleTextareaValue(cloned);
  }

  private handleTextareaValue(cloned: HTMLElement) {
    if (cloned.tagName !== 'TEXTAREA') {
      return;
    }
    const textarea = cloned as HTMLTextAreaElement;
    const value = textarea.getAttribute('value') || textarea.value || '';
    textarea.textContent = value;
  }

  // 处理克隆节点
  private handleFixedClone(
    cloned: HTMLElement,
    {
      width,
      height,
      x,
      y,
      options,
    }: { width: number; height: number; x: number; y: number; options: ExportImageOptions }
  ) {
    if (
      cloned?.classList?.contains('gedit-flow-activity-node') ||
      cloned?.classList?.contains('gedit-flow-activity-line')
    ) {
      this.handlePosition(cloned, x, y);
    }

    if (cloned?.classList?.contains('gedit-flow-nodes-layer')) {
      const linesLayer = window.document
        .querySelector('.gedit-flow-lines-layer')
        ?.cloneNode(true) as HTMLElement;
      this.handleLines(linesLayer, width, height);
      cloned.appendChild(linesLayer);
      this.handleCanvas(cloned, width, height, options);
    }

    this.handleTextareaValue(cloned);
  }

  // 处理节点位置
  private handlePosition(cloned: HTMLElement, x: number, y: number) {
    cloned.style.transform = `translate(${-x + PADDING_X}px, ${-y + PADDING_Y}px)`;
  }

  // 处理画布
  private handleLines(cloned: HTMLElement, width: number, height: number) {
    cloned.style.position = 'absolute';
    cloned.style.width = `${width}px`;
    cloned.style.height = `${height}px`;
    cloned.style.left = `${width / 2 - PADDING_X}px`;
    cloned.style.top = `${PADDING_Y}px`;
    cloned.style.transform = 'none';
    cloned.style.backgroundColor = 'transparent';
    cloned.querySelector('.flow-lines-container')!.setAttribute('viewBox', `0 0 1000 1000`);
  }

  // 处理画布
  private handleCanvas(
    cloned: HTMLElement,
    width: number,
    height: number,
    options: ExportImageOptions
  ) {
    cloned.style.width = `${width + PADDING_X * 2}px`;
    cloned.style.height = `${height + PADDING_Y * 2}px`;
    cloned.style.transform = 'none';
    cloned.style.backgroundColor = '#ECECEE';
    this.handleWaterMark(cloned, options);
  }

  // 添加水印节点
  private handleWaterMark(element: HTMLElement, options: ExportImageOptions) {
    const watermarkNode = document.createElement('div');
    // 水印svg
    watermarkNode.innerHTML = options?.watermarkSVG ?? EXPORT_IMAGE_WATERMARK_SVG;
    watermarkNode.style.position = 'absolute';
    watermarkNode.style.bottom = '32px';
    watermarkNode.style.right = '32px';
    watermarkNode.style.zIndex = '999999';
    element.appendChild(watermarkNode);
  }
}
