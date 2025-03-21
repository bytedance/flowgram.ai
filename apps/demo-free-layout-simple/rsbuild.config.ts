import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rsbuild/core';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: './src/app.tsx',
    },
  },
  html: {
    title: 'demo-free-layout-simple',
  },
  tools: {
    rspack: {
      module: {
        rules: [
          {
            test: /\.mdc$/,
            type: 'asset/source',
          },
        ],
      },
    },
  },
});
