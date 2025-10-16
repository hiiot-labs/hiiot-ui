import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import dts from 'rollup-plugin-dts'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const packageJson = require('./package.json')

// 通用插件配置
const getPlugins = (includePostcss = true) => [
  peerDepsExternal(),
  resolve({
    browser: true,
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    exclude: [
      '**/*.stories.tsx',
      '**/*.test.tsx',
      '**/*.spec.tsx',
      'src/stories/**/*',
      'src/dev/**/*',
    ],
  }),
  ...(includePostcss ? [
    postcss({
      config: {
        path: './postcss.config.js',
      },
      extensions: ['.css'],
      minimize: true,
      inject: {
        insertAt: 'top',
      },
    })
  ] : []),
]

export default [
  // 主包构建
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: getPlugins(true),
    external: ['react', 'react-dom'],
  },
  // utils 子包构建
  {
    input: 'src/utils/index.ts',
    output: [
      {
        file: 'dist/utils.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/utils.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: getPlugins(false),
    external: ['react', 'react-dom', 'clsx'],
  },
  // hooks 子包构建
  {
    input: 'src/hooks/index.ts',
    output: [
      {
        file: 'dist/hooks.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/hooks.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: getPlugins(false),
    external: ['react', 'react-dom'],
  },
  // 类型声明文件构建
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
  // utils 类型声明文件
  {
    input: 'dist/utils/index.d.ts',
    output: [{ file: 'dist/utils.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
  // hooks 类型声明文件
  {
    input: 'dist/hooks/index.d.ts',
    output: [{ file: 'dist/hooks.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
]