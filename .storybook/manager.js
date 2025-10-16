import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  
  // 品牌信息
  brandTitle: 'HiIoT UI',
  brandUrl: 'https://hiiot-ui.vercel.app/',
  brandTarget: '_self',
  
  // 自定义 logo (removed - file doesn't exist)
  
  // 颜色配置
  colorPrimary: '#3B82F6',
  colorSecondary: '#6366F1',
  
  // UI 配置
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#e5e7eb',
  appBorderRadius: 4,
  
  // 文本颜色
  textColor: '#1f2937',
  textInverseColor: '#ffffff',
  
  // 工具栏配置
  barTextColor: '#6b7280',
  barSelectedColor: '#3b82f6',
  barBg: '#ffffff',
  
  // 输入框配置
  inputBg: '#ffffff',
  inputBorder: '#d1d5db',
  inputTextColor: '#1f2937',
  inputBorderRadius: 4,
});

addons.setConfig({
  theme,
});