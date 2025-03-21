import * as path from 'node:path';

import { merge } from 'webpack-merge';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'src'),
  base: '/',
  title: 'FlowGram.AI',
  globalStyles: path.join(__dirname, './global.less'),
  builderConfig: {
    tools: {
      rspack(options) {
        return merge(options, {
          module: {
            rules: [
              {
                test: /\.mdc$/,
                type: 'asset/source',
              },
              {
                resourceQuery: /raw/,
                type: 'asset/source',
              },
            ],
          },
          optimization: {
            splitChunks: {
              chunks: 'all', // 拆分所有模块，包括异步和同步
              minSize: 30 * 1024, // 30KB 以下不拆分
              maxSize: 500 * 1024, // 500KB 以上强制拆分
              minChunks: 1, // 最少被引用 1 次就可以拆分
              automaticNameDelimiter: '-',
              cacheGroups: {
                vendors: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendors',
                  chunks: 'all',
                  priority: -10, // 优先级
                },
              },
            },
          },
          // 禁用 ES 模块输出（启用 CommonJS）
          experiments: {
            outputModule: false,
          },
          // 允许省略文件扩展名
          resolve: {
            fullySpecified: false,
          },
        });
      },
    },
  },
  ssg: false,
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
  icon: '/logo.png',
  logo: {
    light: '/logo.png',
    dark: '/logo.png',
  },
  lang: 'zh',
  logoText: 'FlowGram.AI',
  plugins: [],
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
