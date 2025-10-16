# HiIoT UI 组件库

一个基于 React 和 TypeScript 的现代化 UI 组件库，提供丰富的组件、自定义 Hooks 和工具函数。

## 📦 安装

```bash
npm install hiiot-ui
# 或
yarn add hiiot-ui
# 或
pnpm add hiiot-ui
```

## 🚀 快速开始

```typescript
import { Button, Input, useFetch, cn } from 'hiiot-ui'

function App() {
  const { data, loading, error } = useFetch('/api/users')
  
  return (
    <div className={cn('container', 'mx-auto')}>
      <Button variant="primary" size="lg">
        点击我
      </Button>
      <Input placeholder="请输入内容" />
    </div>
  )
}
```

## 📚 组件

### Button 按钮组件

功能丰富的按钮组件，支持多种样式和状态。

```typescript
import { Button } from 'hiiot-ui'

// 基本使用
<Button>默认按钮</Button>

// 不同变体
<Button variant="primary">主要按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="outline">轮廓按钮</Button>
<Button variant="ghost">幽灵按钮</Button>

// 不同尺寸
<Button size="sm">小按钮</Button>
<Button size="md">中等按钮</Button>
<Button size="lg">大按钮</Button>

// 加载状态
<Button loading>加载中...</Button>

// 禁用状态
<Button disabled>禁用按钮</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean - 显示加载状态
- `disabled`: boolean - 禁用按钮
- `className`: string - 自定义样式类
- `children`: ReactNode - 按钮内容

### Input 输入框组件

支持多种状态和验证的输入框组件。

```typescript
import { Input } from 'hiiot-ui'

// 基本使用
<Input placeholder="请输入内容" />

// 不同变体
<Input variant="default" placeholder="默认样式" />
<Input variant="filled" placeholder="填充样式" />
<Input variant="outline" placeholder="轮廓样式" />

// 不同尺寸
<Input size="sm" placeholder="小尺寸" />
<Input size="md" placeholder="中等尺寸" />
<Input size="lg" placeholder="大尺寸" />

// 错误状态
<Input error="请输入有效的邮箱地址" />

// 禁用状态
<Input disabled placeholder="禁用状态" />
```

**Props:**
- `variant`: 'default' | 'filled' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `error`: string - 错误信息
- `disabled`: boolean - 禁用状态
- `placeholder`: string - 占位符文本
- `className`: string - 自定义样式类

### BaseAniCount 数字动画组件

平滑的数字动画计数器组件。

```typescript
import { BaseAniCount } from 'hiiot-ui'

// 基本使用
<BaseAniCount end={1000} />

// 自定义配置
<BaseAniCount
  start={0}
  end={9999}
  duration={2}
  decimals={2}
  separator=","
  decimal="."
  prefix="$"
  suffix=" USD"
  useEasing={true}
  autoStart={true}
  onEnd={() => console.log('动画结束')}
  onStart={() => console.log('动画开始')}
/>
```

**Props:**
- `end`: number - 结束数值
- `start`: number - 起始数值（默认 0）
- `duration`: number - 动画时长（秒，默认 2）
- `decimals`: number - 小数位数（默认 0）
- `separator`: string - 千位分隔符（默认 ','）
- `decimal`: string - 小数点符号（默认 '.'）
- `prefix`: string - 前缀
- `suffix`: string - 后缀
- `useEasing`: boolean - 是否使用缓动效果（默认 true）
- `autoStart`: boolean - 是否自动开始（默认 true）
- `onEnd`: () => void - 动画结束回调
- `onStart`: () => void - 动画开始回调

### BaseDialogModal 对话框组件

灵活的模态对话框组件。

```typescript
import { BaseDialogModal } from 'hiiot-ui'

<BaseDialogModal
  open={isOpen}
  onOpenChange={setIsOpen}
  title="确认操作"
  description="此操作不可撤销，请确认是否继续？"
>
  <div>对话框内容</div>
</BaseDialogModal>
```

### BaseDrawerModal 抽屉组件

侧边滑出的抽屉组件。

```typescript
import { BaseDrawerModal } from 'hiiot-ui'

<BaseDrawerModal
  open={isOpen}
  onOpenChange={setIsOpen}
  title="设置"
  description="调整您的偏好设置"
>
  <div>抽屉内容</div>
</BaseDrawerModal>
```

## 🎣 自定义 Hooks

### useFetch 数据获取

基于 SWR 的数据获取 Hook，支持缓存、重试和错误处理。

```typescript
import { useFetch } from 'hiiot-ui'

function UserList() {
  const { data, loading, error, mutate } = useFetch<User[]>('/api/users')
  
  if (loading) return <div>加载中...</div>
  if (error) return <div>错误: {error.message}</div>
  
  return (
    <div>
      {data?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={() => mutate()}>刷新</button>
    </div>
  )
}
```

**返回值:**
- `data`: T | undefined - 响应数据
- `loading`: boolean - 加载状态
- `error`: Error | undefined - 错误信息
- `mutate`: () => void - 手动重新获取数据

### useMutation 数据变更

处理数据变更操作的 Hook，支持乐观更新和缓存失效。

```typescript
import { useMutation } from 'hiiot-ui'

function CreateUser() {
  const { trigger, loading, error } = useMutation<User, CreateUserData>({
    url: '/api/users',
    method: 'POST',
    revalidateKeys: ['/api/users'], // 成功后重新验证的缓存键
    showSuccessToast: true,
    showErrorToast: true
  })
  
  const handleSubmit = async (userData: CreateUserData) => {
    try {
      const newUser = await trigger(userData)
      console.log('用户创建成功:', newUser)
    } catch (err) {
      console.error('创建失败:', err)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* 表单内容 */}
      <button type="submit" disabled={loading}>
        {loading ? '创建中...' : '创建用户'}
      </button>
    </form>
  )
}
```

**配置选项:**
- `url`: string - 请求 URL
- `method`: 'POST' | 'PUT' | 'DELETE' - HTTP 方法
- `revalidateKeys`: string[] - 成功后重新验证的缓存键
- `showSuccessToast`: boolean - 是否显示成功提示
- `showErrorToast`: boolean - 是否显示错误提示

### useLocalStorage 本地存储

类型安全的本地存储 Hook，支持自动序列化。

```typescript
import { useLocalStorage } from 'hiiot-ui'

function Settings() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light')
  const [userPrefs, setUserPrefs] = useLocalStorage('userPrefs', {
    language: 'zh-CN',
    notifications: true
  })
  
  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        切换主题: {theme}
      </button>
    </div>
  )
}
```

### useMediaQuery 媒体查询

响应式设计的媒体查询 Hook。

```typescript
import { useMediaQuery } from 'hiiot-ui'

function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')
  
  return (
    <div>
      {isMobile && <div>移动端布局</div>}
      {isTablet && <div>平板布局</div>}
      {isDesktop && <div>桌面端布局</div>}
    </div>
  )
}
```

### useClickOutside 点击外部

检测元素外部点击的 Hook。

```typescript
import { useClickOutside } from 'hiiot-ui'
import { useRef, useState } from 'react'

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  useClickOutside(dropdownRef, () => {
    setIsOpen(false)
  })
  
  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        切换下拉菜单
      </button>
      {isOpen && (
        <div>下拉菜单内容</div>
      )}
    </div>
  )
}
```

## 🛠️ 工具函数

### cn 类名合并

基于 clsx 的类名合并工具。

```typescript
import { cn } from 'hiiot-ui'

const buttonClass = cn(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-500 text-white',
  isDisabled && 'opacity-50 cursor-not-allowed',
  className
)
```

### generateId 唯一ID生成

生成唯一标识符。

```typescript
import { generateId } from 'hiiot-ui'

const id = generateId() // 'hiiot-abc123def'
const customId = generateId('custom') // 'custom-abc123def'
```

### debounce 防抖函数

防抖处理，避免频繁触发。

```typescript
import { debounce } from 'hiiot-ui'

const debouncedSearch = debounce((query: string) => {
  // 执行搜索
  console.log('搜索:', query)
}, 300)

// 使用
debouncedSearch('关键词')
```

### throttle 节流函数

节流处理，限制执行频率。

```typescript
import { throttle } from 'hiiot-ui'

const throttledScroll = throttle(() => {
  // 处理滚动事件
  console.log('滚动事件')
}, 100)

window.addEventListener('scroll', throttledScroll)
```

### deepMerge 深度合并

深度合并对象。

```typescript
import { deepMerge } from 'hiiot-ui'

const defaultConfig = {
  api: { timeout: 5000 },
  ui: { theme: 'light' }
}

const userConfig = {
  api: { retries: 3 },
  ui: { language: 'zh-CN' }
}

const finalConfig = deepMerge(defaultConfig, userConfig)
// 结果: {
//   api: { timeout: 5000, retries: 3 },
//   ui: { theme: 'light', language: 'zh-CN' }
// }
```

### Fetcher 网络请求

灵活的 HTTP 请求工具，支持全局配置。

```typescript
import { fetchGet, fetchPost, configureFetcher } from 'hiiot-ui'

// 全局配置
configureFetcher({
  baseURL: 'https://api.example.com',
  tokenKey: 'authToken',
  tokenPrefix: 'Bearer',
  loginMethod: 'oauth2'
})

// 使用
const users = await fetchGet<User[]>('/users')
const newUser = await fetchPost<User>('/users', { name: 'John' })
```

**配置选项:**
- `baseURL`: string - API 基础 URL
- `tokenKey`: string - token 存储键名
- `tokenPrefix`: string - token 前缀
- `loginMethod`: string - 登录方式
- `getToken`: (key: string) => string | null - 自定义 token 获取函数

## 📖 Storybook 文档

本项目包含完整的 Storybook 文档，提供交互式的组件演示和 API 文档。

```bash
# 启动 Storybook
npm run storybook
```

## 🔧 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build

# 运行测试
npm run test

# 启动 Storybook
npm run storybook
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

更多详细信息请查看 [Storybook 文档](./storybook-static/index.html) 或各组件的源码注释。