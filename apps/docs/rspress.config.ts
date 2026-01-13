/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import * as path from 'node:path';

import mermaid from 'rspress-plugin-mermaid';
import { pluginLlms } from '@rspress/plugin-llms';
import { transformerCompatibleMetaHighlight } from '@rspress/core/shiki-transformers';
import { defineConfig, RspressPlugin } from '@rspress/core';
import { pluginLess } from '@rsbuild/plugin-less';

export default defineConfig({
  root: path.join(__dirname, 'src'),
  base: '/',
  title: 'FlowGram.AI',
  description: 'FlowGram.AI',
  globalStyles: path.join(__dirname, './global.less'),
  head: ['<meta name="keywords" content="FlowGram, flowgram">'],
  builderConfig: {
    performance: {
      buildCache: false,
      // 4MB log file size limit in Vercel platform
      printFileSize: {
        compressed: false,
        detail: false,
        total: true,
      },
    },
    source: {
      decorators: {
        version: 'legacy',
      },
    },
    plugins: [pluginLess()],
    tools: {
      rspack(options, { mergeConfig }) {
        return mergeConfig(options, {
          module: {
            rules: [
              {
                test: /\.mdc$/,
                type: 'asset/source',
              },
            ],
          },
          /**
           * ignore warnings from @coze-editor/editor/language-typescript
           */
          ignoreWarnings: [/Critical dependency: the request of a dependency is an expression/],
        });
      },
    },
  },
  ssg: {
    experimentalWorker: true,
    experimentalExcludeRoutePaths: [
      /\/auto-docs\//,
      // these pages do not support SSR
      // document is not defined
      '/index',
      '/en/examples/node-form/basic',
      '/en/examples/node-form/array',
      '/en/examples/node-form/dynamic',
      '/en/guide/getting-started/free-layout',
      '/en/guide/getting-started/fixed-layout',
      '/en/examples/node-form/effect',
      '/en/guide/fixed-layout/composite-nodes',
      '/en/examples/playground',
      '/en/examples/fixed-layout/fixed-composite-nodes',
      '/en/examples/fixed-layout/fixed-layout-simple',
      '/en/examples/free-layout/free-layout-simple',
      '/en/examples/fixed-layout/fixed-feature-overview',
      '/en/examples/free-layout/free-feature-overview',
      /\/en\/materials\/.*\/.*/,
      /\/materials\/.*\/.*/,
      '/examples/node-form/basic',
      '/examples/node-form/array',
      '/examples/node-form/dynamic',
      '/guide/getting-started/free-layout',
      '/guide/getting-started/fixed-layout',
      '/examples/node-form/effect',
      '/guide/fixed-layout/composite-nodes',
      '/examples/playground',
      '/examples/fixed-layout/fixed-composite-nodes',
      '/examples/fixed-layout/fixed-layout-simple',
      '/examples/free-layout/free-layout-simple',
      '/examples/fixed-layout/fixed-feature-overview',
      '/examples/free-layout/free-feature-overview',
    ],
  },
  // locales 为一个对象数组
  locales: [
    {
      lang: 'en',
      // 导航栏切换语言的标签
      label: 'English',
      title: 'Rspress',
      description: 'Static Site Generator',
    },
    {
      lang: 'zh',
      label: '简体中文',
      title: 'Rspress',
      description: '静态网站生成器',
    },
  ],
  icon: '/flowgram-logo.svg',
  logo: {
    light: '/flowgram-logo.svg',
    dark: '/flowgram-logo.svg',
  },
  lang: 'zh',
  logoText: 'FlowGram.AI',
  markdown: {
    shiki: {
      transformers: [transformerCompatibleMetaHighlight()],
    },
  },
  plugins: [
    pluginLlms([
      {
        llmsTxt: {
          name: 'llms.txt',
        },
        llmsFullTxt: {
          name: 'llms-full.txt',
        },
        include: ({ page }) => page.lang === 'zh',
      },
      {
        llmsTxt: {
          name: 'en/llms.txt',
        },
        llmsFullTxt: {
          name: 'en/llms-full.txt',
        },
        include: ({ page }) => page.lang === 'en',
      },
    ]),
    mermaid() as RspressPlugin,
  ],
  themeConfig: {
    localeRedirect: 'auto',
    footer: {
      message: '© 2025 Bytedance Inc. All Rights Reserved.',
    },
    lastUpdated: true,
    locales: [
      {
        lang: 'en',
        label: 'en',
        outlineTitle: 'ON THIS Page',
      },
      {
        lang: 'zh',
        label: 'zh',
        outlineTitle: '大纲',
        searchNoResultsText: '未搜索到相关结果',
        searchPlaceholderText: '搜索文档',
        searchSuggestedQueryText: '可更换不同的关键字后重试',
        overview: {
          filterNameText: '过滤',
          filterPlaceholderText: '输入关键词',
          filterNoResultText: '未找到匹配的 API',
        },
      },
    ],
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/bytedance/flowgram.ai',
      },
      {
        icon: 'discord',
        mode: 'link',
        content: 'https://discord.gg/SwDWdrgA9f',
      },
      {
        icon: 'X',
        mode: 'link',
        content: 'https://x.com/FlowGramAI',
      },
    ],
  },
});
