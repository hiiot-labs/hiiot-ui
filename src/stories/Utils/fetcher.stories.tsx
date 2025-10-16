import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { 
  fetchGet, 
  fetchPost, 
  fetchPut, 
  fetchDelete, 
  configureFetcher, 
  getFetcherConfig,
  type FetcherConfig 
} from '../../utils/fetcher';

// 主演示组件
function FetcherDemo() {
  const [config, setConfig] = useState<Partial<FetcherConfig>>({
    tokenKey: 'token',
    tokenPrefix: 'Bearer',
    loginMethod: 'jwt',
    baseURL: 'https://api.example.com'
  });
  
  const [requestUrl, setRequestUrl] = useState('/users');
  const [requestMethod, setRequestMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [requestBody, setRequestBody] = useState('{"name": "John", "age": 30}');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const updateConfig = () => {
    configureFetcher(config);
    setResponse('配置已更新！当前配置：\n' + JSON.stringify(getFetcherConfig(), null, 2));
  };

  const simulateRequest = async () => {
    setLoading(true);
    setResponse('');
    
    try {
      // 模拟请求（实际不会发送）
      const mockResponse = {
        method: requestMethod,
        url: requestUrl,
        config: getFetcherConfig(),
        body: requestMethod !== 'GET' ? JSON.parse(requestBody || '{}') : undefined,
        timestamp: new Date().toISOString(),
        status: 'success'
      };
      
      setTimeout(() => {
        setResponse('模拟请求结果：\n' + JSON.stringify(mockResponse, null, 2));
        setLoading(false);
      }, 1000);
    } catch (error) {
      setResponse('请求失败：' + (error as Error).message);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Fetcher 工具函数演示</h2>
      <p>灵活的 HTTP 请求工具，支持全局配置和局部配置。</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        {/* 配置面板 */}
        <div>
          <h3>配置设置</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Token Key:</label>
              <input
                type="text"
                value={config.tokenKey || ''}
                onChange={(e) => setConfig({...config, tokenKey: e.target.value})}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Token Prefix:</label>
              <input
                type="text"
                value={config.tokenPrefix || ''}
                onChange={(e) => setConfig({...config, tokenPrefix: e.target.value})}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Login Method:</label>
              <select
                value={config.loginMethod || ''}
                onChange={(e) => setConfig({...config, loginMethod: e.target.value})}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              >
                <option value="jwt">JWT</option>
                <option value="oauth">OAuth</option>
                <option value="session">Session</option>
                <option value="wallet">Wallet</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Base URL:</label>
              <input
                type="text"
                value={config.baseURL || ''}
                onChange={(e) => setConfig({...config, baseURL: e.target.value})}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            
            <button
              onClick={updateConfig}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              更新配置
            </button>
          </div>
        </div>

        {/* 请求面板 */}
        <div>
          <h3>请求设置</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>请求方法:</label>
              <select
                value={requestMethod}
                onChange={(e) => setRequestMethod(e.target.value as any)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>请求 URL:</label>
              <input
                type="text"
                value={requestUrl}
                onChange={(e) => setRequestUrl(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            
            {requestMethod !== 'GET' && (
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>请求体 (JSON):</label>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  rows={4}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
            )}
            
            <button
              onClick={simulateRequest}
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: loading ? '#6c757d' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '请求中...' : '发送请求'}
            </button>
          </div>
        </div>
      </div>

      {/* 响应面板 */}
      {response && (
        <div style={{ marginTop: '20px' }}>
          <h3>响应结果</h3>
          <pre style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '8px',
            fontSize: '12px',
            overflow: 'auto',
            whiteSpace: 'pre-wrap'
          }}>
            {response}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <h3>使用代码</h3>
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          <code>
            {`// 配置 fetcher
configureFetcher({
  tokenKey: '${config.tokenKey}',
  tokenPrefix: '${config.tokenPrefix}',
  loginMethod: '${config.loginMethod}',
  baseURL: '${config.baseURL}'
});

// 发送请求
const data = await fetch${requestMethod.charAt(0) + requestMethod.slice(1).toLowerCase()}('${requestUrl}'${requestMethod !== 'GET' ? `, ${requestBody}` : ''});`}
          </code>
        </div>
      </div>
    </div>
  );
}

// 基本用法示例
function BasicUsageExample() {
  const examples = [
    {
      title: 'GET 请求',
      code: `import { fetchGet } from '@hiiot/ui';

const users = await fetchGet<User[]>('/api/users');
const user = await fetchGet<User>('/api/users/123');`,
      description: '获取数据的 GET 请求'
    },
    {
      title: 'POST 请求',
      code: `import { fetchPost } from '@hiiot/ui';

const newUser = await fetchPost<User>('/api/users', {
  name: 'John Doe',
  email: 'john@example.com'
});`,
      description: '创建数据的 POST 请求'
    },
    {
      title: 'PUT 请求',
      code: `import { fetchPut } from '@hiiot/ui';

const updatedUser = await fetchPut<User>('/api/users/123', {
  name: 'Jane Doe',
  email: 'jane@example.com'
});`,
      description: '更新数据的 PUT 请求'
    },
    {
      title: 'DELETE 请求',
      code: `import { fetchDelete } from '@hiiot/ui';

await fetchDelete('/api/users/123');`,
      description: '删除数据的 DELETE 请求'
    }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>基本用法示例</h3>
      <div style={{ display: 'grid', gap: '20px' }}>
        {examples.map((example, index) => (
          <div 
            key={index}
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '15px',
              backgroundColor: '#fafafa'
            }}
          >
            <h4>{example.title}</h4>
            <p style={{ color: '#666', fontSize: '14px' }}>{example.description}</p>
            
            <pre style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '15px', 
              borderRadius: '6px',
              fontSize: '13px',
              overflow: 'auto'
            }}>
              {example.code}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

// 配置示例
function ConfigurationExample() {
  const configExamples = [
    {
      title: '全局配置',
      code: `import { configureFetcher } from '@hiiot/ui';

// 应用启动时配置一次
configureFetcher({
  tokenKey: 'authToken',
  tokenPrefix: 'Bearer',
  loginMethod: 'jwt',
  baseURL: 'https://api.myapp.com'
});

// 之后的所有请求都会使用这个配置
const data = await fetchGet('/users');`,
      description: '设置全局配置，所有请求都会使用'
    },
    {
      title: '局部配置',
      code: `import { fetchGet } from '@hiiot/ui';

// 为特定请求提供不同配置
const adminData = await fetchGet('/admin/users', {}, {}, {
  tokenKey: 'adminToken',
  tokenPrefix: 'Admin',
  baseURL: 'https://admin-api.myapp.com'
});`,
      description: '为特定请求覆盖全局配置'
    },
    {
      title: '环境配置',
      code: `import { configureFetcher } from '@hiiot/ui';

const configs = {
  development: {
    baseURL: 'http://localhost:3001',
    tokenKey: 'dev_token'
  },
  production: {
    baseURL: 'https://api.myapp.com',
    tokenKey: 'prod_token'
  }
};

const env = process.env.NODE_ENV;
configureFetcher({
  ...configs[env],
  tokenPrefix: 'Bearer',
  loginMethod: 'jwt'
});`,
      description: '根据环境动态配置'
    }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>配置示例</h3>
      <div style={{ display: 'grid', gap: '20px' }}>
        {configExamples.map((example, index) => (
          <div 
            key={index}
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '15px',
              backgroundColor: '#fafafa'
            }}
          >
            <h4>{example.title}</h4>
            <p style={{ color: '#666', fontSize: '14px' }}>{example.description}</p>
            
            <pre style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '15px', 
              borderRadius: '6px',
              fontSize: '13px',
              overflow: 'auto'
            }}>
              {example.code}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

// 错误处理示例
function ErrorHandlingExample() {
  const errorExamples = [
    {
      title: '基本错误处理',
      code: `import { fetchGet } from '@hiiot/ui';

try {
  const data = await fetchGet<User[]>('/api/users');
  console.log('用户数据:', data);
} catch (error) {
  console.error('请求失败:', error);
  // 处理错误，如显示错误消息
}`,
      description: '使用 try-catch 处理请求错误'
    },
    {
      title: '带重试的错误处理',
      code: `import { fetchGet } from '@hiiot/ui';

async function fetchWithRetry<T>(
  url: string, 
  maxRetries = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetchGet<T>(url);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => 
        setTimeout(resolve, 1000 * (i + 1))
      );
    }
  }
  throw new Error('Max retries exceeded');
}`,
      description: '实现带重试机制的请求'
    },
    {
      title: '统一错误处理',
      code: `import { fetchGet } from '@hiiot/ui';

class ApiService {
  private async handleRequest<T>(
    requestFn: () => Promise<T>
  ): Promise<T> {
    try {
      return await requestFn();
    } catch (error) {
      // 统一错误处理逻辑
      if (error === 'Unauthorized') {
        // 重定向到登录页
        window.location.href = '/login';
      }
      throw error;
    }
  }

  async getUsers() {
    return this.handleRequest(() => 
      fetchGet<User[]>('/api/users')
    );
  }
}`,
      description: '创建服务类统一处理错误'
    }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>错误处理示例</h3>
      <div style={{ display: 'grid', gap: '20px' }}>
        {errorExamples.map((example, index) => (
          <div 
            key={index}
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '15px',
              backgroundColor: '#fafafa'
            }}
          >
            <h4>{example.title}</h4>
            <p style={{ color: '#666', fontSize: '14px' }}>{example.description}</p>
            
            <pre style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '15px', 
              borderRadius: '6px',
              fontSize: '13px',
              overflow: 'auto'
            }}>
              {example.code}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta<typeof FetcherDemo> = {
  title: 'Utils/fetcher',
  component: FetcherDemo,
  parameters: {
    docs: {
      description: {
        component: `
## Fetcher

灵活的 HTTP 请求工具函数集合，支持全局配置和局部配置，提供完整的 TypeScript 支持。

### 特性
- 🔧 **灵活配置**: 支持全局和局部配置
- 🔑 **认证支持**: 内置 token 认证机制
- 🌐 **多环境**: 支持不同环境的配置
- 🎯 **类型安全**: 完整的 TypeScript 支持
- 🚀 **简单易用**: 简洁的 API 设计
- 🛡️ **错误处理**: 内置错误处理机制

### API

#### 配置函数
\`\`\`typescript
function configureFetcher(config: Partial<FetcherConfig>): void
function getFetcherConfig(): FetcherConfig
\`\`\`

#### 请求函数
\`\`\`typescript
function fetchGet<T>(url: string, params?: Record<string, any>, header?: Record<string, any>, options?: Partial<FetcherConfig>): Promise<T>
function fetchPost<T, B = any>(url: string, body: B, header?: Record<string, any>, options?: Partial<FetcherConfig>): Promise<T>
function fetchPut<T, B = any>(url: string, body: B, header?: Record<string, any>, options?: Partial<FetcherConfig>): Promise<T>
function fetchDelete<T>(url: string, params?: Record<string, any>, header?: Record<string, any>, options?: Partial<FetcherConfig>): Promise<T>
\`\`\`

#### 配置接口
\`\`\`typescript
interface FetcherConfig {
  tokenKey?: string        // localStorage 中 token 的 key
  tokenPrefix?: string     // token 前缀，如 'Bearer'
  loginMethod?: string     // 登录方式标识
  getToken?: (key: string) => string | null  // 自定义获取 token 的函数
  baseURL?: string         // API 基础 URL
}
\`\`\`

### 使用示例

#### 基本用法
\`\`\`typescript
import { fetchGet, fetchPost, configureFetcher } from '@hiiot/ui';

// 配置 fetcher
configureFetcher({
  tokenKey: 'authToken',
  tokenPrefix: 'Bearer',
  baseURL: 'https://api.example.com'
});

// GET 请求
const users = await fetchGet<User[]>('/users');

// POST 请求
const newUser = await fetchPost<User>('/users', {
  name: 'John',
  email: 'john@example.com'
});
\`\`\`

#### 高级配置
\`\`\`typescript
// 环境配置
const config = {
  development: { baseURL: 'http://localhost:3001' },
  production: { baseURL: 'https://api.example.com' }
}[process.env.NODE_ENV];

configureFetcher({
  ...config,
  tokenKey: 'token',
  tokenPrefix: 'Bearer',
  loginMethod: 'jwt'
});

// 局部配置
const adminData = await fetchGet('/admin/users', {}, {}, {
  tokenKey: 'adminToken',
  baseURL: 'https://admin-api.example.com'
});
\`\`\`

### 常见场景

1. **API 客户端**: 构建统一的 API 请求层
2. **多环境支持**: 开发、测试、生产环境配置
3. **认证管理**: 自动处理 token 认证
4. **微服务**: 不同服务使用不同配置

### 最佳实践

1. **全局配置**: 在应用启动时配置一次
2. **类型安全**: 使用 TypeScript 接口定义响应类型
3. **错误处理**: 使用 try-catch 处理请求错误
4. **环境管理**: 根据环境动态配置
5. **服务封装**: 创建服务类封装相关 API
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FetcherDemo>;

export const Default: Story = {
  name: '交互式演示',
};

export const BasicUsage: Story = {
  name: '基本用法',
  render: () => <BasicUsageExample />,
  parameters: {
    docs: {
      source: {
        code: `import { fetchGet, fetchPost, fetchPut, fetchDelete } from '@hiiot/ui';

// GET 请求
const users = await fetchGet<User[]>('/api/users');
const user = await fetchGet<User>('/api/users/123');

// POST 请求
const newUser = await fetchPost<User>('/api/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// PUT 请求
const updatedUser = await fetchPut<User>('/api/users/123', {
  name: 'Jane Doe',
  email: 'jane@example.com'
});

// DELETE 请求
await fetchDelete('/api/users/123');`,
        language: 'tsx',
      },
    },
  },
};

export const Configuration: Story = {
  name: '配置示例',
  render: () => <ConfigurationExample />,
  parameters: {
    docs: {
      source: {
        code: `import { configureFetcher, fetchGet } from '@hiiot/ui';

// 全局配置
configureFetcher({
  tokenKey: 'authToken',
  tokenPrefix: 'Bearer',
  loginMethod: 'jwt',
  baseURL: 'https://api.myapp.com'
});

// 局部配置
const adminData = await fetchGet('/admin/users', {}, {}, {
  tokenKey: 'adminToken',
  tokenPrefix: 'Admin',
  baseURL: 'https://admin-api.myapp.com'
});

// 环境配置
const configs = {
  development: {
    baseURL: 'http://localhost:3001',
    tokenKey: 'dev_token'
  },
  production: {
    baseURL: 'https://api.myapp.com',
    tokenKey: 'prod_token'
  }
};

const env = process.env.NODE_ENV;
configureFetcher({
  ...configs[env],
  tokenPrefix: 'Bearer',
  loginMethod: 'jwt'
});`,
        language: 'tsx',
      },
    },
  },
};

export const ErrorHandling: Story = {
  name: '错误处理',
  render: () => <ErrorHandlingExample />,
  parameters: {
    docs: {
      source: {
        code: `import { fetchGet } from '@hiiot/ui';

// 基本错误处理
try {
  const data = await fetchGet<User[]>('/api/users');
  console.log('用户数据:', data);
} catch (error) {
  console.error('请求失败:', error);
}

// 带重试的错误处理
async function fetchWithRetry<T>(url: string, maxRetries = 3): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetchGet<T>(url);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Max retries exceeded');
}

// 统一错误处理
class ApiService {
  private async handleRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    try {
      return await requestFn();
    } catch (error) {
      if (error === 'Unauthorized') {
        window.location.href = '/login';
      }
      throw error;
    }
  }

  async getUsers() {
    return this.handleRequest(() => fetchGet<User[]>('/api/users'));
  }
}`,
        language: 'tsx',
      },
    },
  },
};