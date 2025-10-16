import { ReactNode } from 'react'

// 基础组件属性
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
  id?: string
}

// 尺寸类型
export type Size = 'sm' | 'md' | 'lg' | 'xl'

// 颜色变体类型
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

// 按钮变体类型
export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'

// 输入框类型
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'

// 组件状态
export interface ComponentState {
  loading?: boolean
  disabled?: boolean
  error?: boolean
}

// 事件处理器类型
export type EventHandler<T = HTMLElement> = (event: React.MouseEvent<T>) => void
export type ChangeHandler<T = HTMLInputElement> = (event: React.ChangeEvent<T>) => void
export type FocusHandler<T = HTMLInputElement> = (event: React.FocusEvent<T>) => void

// 主题配置
export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    success: string
    warning: string
    error: string
    info: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
  }
}