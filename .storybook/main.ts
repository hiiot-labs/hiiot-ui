import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  viteFinal: async (config) => {
    return {
      ...config,
      define: {
        ...config.define,
        global: 'globalThis',
      },
      css: {
        ...config.css,
        modules: {
          localsConvention: 'camelCase',
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
        preprocessorOptions: {
          scss: {
            additionalData: `@use "../src/styles/variables.scss" as *;`,
            charset: false,
          },
        },
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@': require('path').resolve(__dirname, '../src'),
          '@/components': require('path').resolve(__dirname, '../src/components'),
          '@/utils': require('path').resolve(__dirname, '../src/utils'),
          '@/types': require('path').resolve(__dirname, '../src/types'),
          '@/styles': require('path').resolve(__dirname, '../src/styles'),
        },
      },
    }
  },
};

export default config;