# Fetcher 使用指南

重构后的 `fetcher` 工具提供了灵活的配置方式，支持不同项目的需求。

## 基本使用

```typescript
import { fetchGet, fetchPost } from '@/utils/fetcher'

// 基本使用（使用默认配置）
const data = await fetchGet<UserData>('/api/users')
const result = await fetchPost<CreateResult>('/api/users', { name: 'John' })
```

## 配置方式

### 1. 全局配置（推荐）

在应用启动时配置一次，全局生效：

```typescript
import { configureFetcher } from '@/utils/fetcher'

// 项目 A：使用默认配置
configureFetcher({
  tokenKey: 'token',
  tokenPrefix: 'Bearer',
  loginMethod: 'oauth',
  baseURL: 'https://api.project-a.com'
})

// 项目 B：自定义配置
configureFetcher({
  tokenKey: 'authToken',
  tokenPrefix: 'JWT',
  loginMethod: 'jwt',
  baseURL: 'https://api.project-b.com'
})

// 项目 C：无 token 前缀
configureFetcher({
  tokenKey: 'accessToken',
  tokenPrefix: '', // 不使用前缀
  loginMethod: 'session'
})
```

### 2. 局部配置

为特定请求提供不同的配置：

```typescript
// 使用不同的 token key
const adminData = await fetchGet<AdminData>('/api/admin', {}, {}, {
  tokenKey: 'adminToken',
  tokenPrefix: 'Admin'
})

// 使用不同的 baseURL
const externalData = await fetchPost<ExternalResult>('/webhook', data, {}, {
  baseURL: 'https://external-api.com',
  tokenKey: 'webhookToken'
})
```

### 3. 自定义 getToken 函数

```typescript
import { configureFetcher } from '@/utils/fetcher'

// 自定义 token 获取逻辑
configureFetcher({
  getToken: (key: string) => {
    // 从 sessionStorage 获取
    return sessionStorage.getItem(key)
    
    // 或从 cookie 获取
    // return getCookie(key)
    
    // 或从其他存储获取
    // return customStorage.get(key)
  }
})
```

## 配置选项说明

```typescript
interface FetcherConfig {
  tokenKey?: string          // token 在存储中的 key，默认 'token'
  tokenPrefix?: string       // token 前缀，默认 'space'
  loginMethod?: string       // 登录方式，默认 'wallet'
  getToken?: (key: string) => string | null  // 自定义 token 获取函数
  baseURL?: string          // API 基础 URL
}
```

## 实际项目示例

### React 项目初始化

```typescript
// src/config/api.ts
import { configureFetcher } from '@/utils/fetcher'

export function initializeAPI() {
  configureFetcher({
    tokenKey: process.env.REACT_APP_TOKEN_KEY || 'authToken',
    tokenPrefix: 'Bearer',
    loginMethod: 'oauth2',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    getToken: (key) => {
      // 优先从 sessionStorage 获取，fallback 到 localStorage
      return sessionStorage.getItem(key) || localStorage.getItem(key)
    }
  })
}

// src/main.tsx
import { initializeAPI } from './config/api'

initializeAPI()
```

### 多环境配置

```typescript
// src/config/api.ts
import { configureFetcher } from '@/utils/fetcher'

const configs = {
  development: {
    baseURL: 'http://localhost:3001',
    tokenKey: 'dev_token'
  },
  staging: {
    baseURL: 'https://staging-api.example.com',
    tokenKey: 'staging_token'
  },
  production: {
    baseURL: 'https://api.example.com',
    tokenKey: 'prod_token'
  }
}

const env = process.env.NODE_ENV as keyof typeof configs
configureFetcher({
  ...configs[env],
  tokenPrefix: 'Bearer',
  loginMethod: 'jwt'
})
```

## 迁移指南

### 从旧版本迁移

```typescript
// 旧版本（硬编码）
const token = getToken("token")

// 新版本（配置化）
configureFetcher({
  tokenKey: 'token',  // 可以改为任何值
  tokenPrefix: 'space'
})
```

这样设计的优势：
1. **向后兼容**：默认配置与原来的行为一致
2. **灵活配置**：支持全局和局部配置
3. **类型安全**：完整的 TypeScript 支持
4. **易于测试**：可以为测试环境提供不同配置
5. **多项目复用**：同一套代码适用于不同项目