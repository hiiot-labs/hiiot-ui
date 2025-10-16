import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';

// 模拟 API 数据
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
];

const mockPosts = [
  { id: 1, title: 'React Hooks 最佳实践', content: '学习如何正确使用 React Hooks...', author: 'John Doe' },
  { id: 2, title: 'TypeScript 进阶指南', content: '深入了解 TypeScript 高级特性...', author: 'Jane Smith' },
  { id: 3, title: 'Storybook 文档编写', content: '如何编写优秀的组件文档...', author: 'Bob Johnson' },
];

// 模拟 API 响应
const mockApiResponse = (data: any, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        error: { code: 0, message: 'success' },
        data,
        total: Array.isArray(data) ? data.length : 1,
        timestamp: new Date().toISOString()
      });
    }, delay);
  });
};

// 主演示组件
function UseFetchDemo() {
  const [endpoint, setEndpoint] = useState('/api/users');
  const [shouldFetch, setShouldFetch] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // 模拟不同的 API 端点
  const getMockData = (url: string) => {
    if (url.includes('users')) return mockUsers;
    if (url.includes('posts')) return mockPosts;
    return { message: 'Hello from API!' };
  };

  // 使用 useFetch hook
  const { data, error, isLoading, refresh, mutate } = useFetch(
    `${endpoint}?refresh=${refreshKey}`,
    {},
    {
      shouldFetch,
      revalidateOnFocus: false,
      proxy: (response: any) => {
        // 演示数据代理功能
        if (response.data && Array.isArray(response.data)) {
          response.data = response.data.map((item: any) => ({
            ...item,
            processed: true,
            processedAt: new Date().toISOString()
          }));
        }
      }
    }
  );

  // 模拟 API 请求
  useEffect(() => {
    if (shouldFetch) {
      // 这里实际上不会发送真实请求，只是为了演示
      const mockData = getMockData(endpoint);
      // 在实际应用中，这会通过 SWR 的 fetcher 处理
    }
  }, [endpoint, shouldFetch, refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    refresh();
  };

  const handleMutate = () => {
    // 演示本地数据更新
    mutate((currentData: any) => {
      if (currentData?.data && Array.isArray(currentData.data)) {
        return {
          ...currentData,
          data: currentData.data.map((item: any, index: number) => 
            index === 0 ? { ...item, name: `${item.name} (Updated)` } : item
          )
        };
      }
      return currentData;
    }, false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>useFetch Hook 演示</h2>
      <p>基于 SWR 的数据获取 Hook，支持自动错误处理、数据代理和缓存管理。</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        {/* 控制面板 */}
        <div>
          <h3>控制面板</h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                API 端点:
              </label>
              <select
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #ddd', 
                  borderRadius: '4px' 
                }}
              >
                <option value="/api/users">用户列表 (/api/users)</option>
                <option value="/api/posts">文章列表 (/api/posts)</option>
                <option value="/api/info">基本信息 (/api/info)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={shouldFetch}
                  onChange={(e) => setShouldFetch(e.target.checked)}
                />
                启用数据获取
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                style={{
                  padding: '10px',
                  backgroundColor: isLoading ? '#6c757d' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
              >
                {isLoading ? '刷新中...' : '刷新数据'}
              </button>

              <button
                onClick={handleMutate}
                disabled={isLoading || !data}
                style={{
                  padding: '10px',
                  backgroundColor: isLoading || !data ? '#6c757d' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isLoading || !data ? 'not-allowed' : 'pointer'
                }}
              >
                更新数据
              </button>
            </div>
          </div>
        </div>

        {/* 状态显示 */}
        <div>
          <h3>Hook 状态</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            <div style={{ 
              padding: '10px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <strong>加载状态:</strong> 
              <span style={{ 
                marginLeft: '8px',
                color: isLoading ? '#dc3545' : '#28a745',
                fontWeight: 'bold'
              }}>
                {isLoading ? '加载中' : '已完成'}
              </span>
            </div>

            <div style={{ 
              padding: '10px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <strong>错误状态:</strong> 
              <span style={{ 
                marginLeft: '8px',
                color: error ? '#dc3545' : '#28a745',
                fontWeight: 'bold'
              }}>
                {error ? '有错误' : '正常'}
              </span>
            </div>

            <div style={{ 
              padding: '10px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <strong>数据状态:</strong> 
              <span style={{ 
                marginLeft: '8px',
                color: data ? '#28a745' : '#6c757d',
                fontWeight: 'bold'
              }}>
                {data ? '有数据' : '无数据'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 数据显示 */}
      <div style={{ marginTop: '20px' }}>
        <h3>响应数据</h3>
        {isLoading && (
          <div style={{ 
            padding: '20px', 
            textAlign: 'center', 
            backgroundColor: '#e3f2fd',
            borderRadius: '8px',
            color: '#1976d2'
          }}>
            正在加载数据...
          </div>
        )}

        {error && (
          <div style={{ 
            padding: '15px', 
            backgroundColor: '#ffebee',
            borderRadius: '8px',
            color: '#c62828',
            border: '1px solid #ef5350'
          }}>
            <strong>错误:</strong> {error.toString()}
          </div>
        )}

        {data && !isLoading && (
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <pre style={{ 
              margin: 0,
              fontSize: '12px',
              overflow: 'auto',
              whiteSpace: 'pre-wrap'
            }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* 使用代码示例 */}
      <div style={{ marginTop: '20px' }}>
        <h3>当前配置代码</h3>
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '14px',
          border: '1px solid #dee2e6'
        }}>
          <code>
            {`const { data, error, isLoading, refresh, mutate } = useFetch(
  '${endpoint}?refresh=${refreshKey}',
  {},
  {
    shouldFetch: ${shouldFetch},
    revalidateOnFocus: false,
    proxy: (response) => {
      // 数据代理处理
      if (response.data && Array.isArray(response.data)) {
        response.data = response.data.map(item => ({
          ...item,
          processed: true,
          processedAt: new Date().toISOString()
        }));
      }
    }
  }
);`}
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
      title: '基本数据获取',
      code: `import { useFetch } from '@hiiot/ui';

function UserList() {
  const { data, error, isLoading } = useFetch('/api/users');

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <ul>
      {data?.data?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
      description: '最基本的数据获取用法'
    },
    {
      title: '带参数的请求',
      code: `import { useFetch } from '@hiiot/ui';

function UserProfile({ userId }) {
  const { data, error, isLoading } = useFetch(
    '/api/user',
    { id: userId, include: 'profile,settings' }
  );

  return (
    <div>
      {isLoading ? '加载中...' : data?.data?.name}
    </div>
  );
}`,
      description: '传递查询参数给 API'
    },
    {
      title: '条件获取',
      code: `import { useFetch } from '@hiiot/ui';

function ConditionalFetch({ shouldLoad }) {
  const { data, error, isLoading } = useFetch(
    '/api/data',
    {},
    { shouldFetch: shouldLoad }
  );

  return shouldLoad ? (
    <div>{isLoading ? '加载中...' : data?.data}</div>
  ) : (
    <div>数据获取已禁用</div>
  );
}`,
      description: '根据条件决定是否获取数据'
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

// 高级配置示例
function AdvancedConfigExample() {
  const examples = [
    {
      title: '数据代理处理',
      code: `import { useFetch } from '@hiiot/ui';

function ProcessedData() {
  const { data, error, isLoading } = useFetch(
    '/api/users',
    {},
    {
      proxy: (response) => {
        // 对响应数据进行处理
        if (response.data) {
          response.data = response.data.map(user => ({
            ...user,
            displayName: \`\${user.firstName} \${user.lastName}\`,
            isActive: user.status === 'active'
          }));
        }
      }
    }
  );

  return (
    <div>
      {data?.data?.map(user => (
        <div key={user.id}>
          {user.displayName} - {user.isActive ? '活跃' : '非活跃'}
        </div>
      ))}
    </div>
  );
}`,
      description: '使用 proxy 函数处理响应数据'
    },
    {
      title: '手动刷新和更新',
      code: `import { useFetch } from '@hiiot/ui';

function ManualControl() {
  const { data, refresh, mutate } = useFetch('/api/users');

  const handleRefresh = () => {
    refresh(); // 重新获取数据
  };

  const handleOptimisticUpdate = () => {
    // 乐观更新：立即更新 UI，不等待服务器响应
    mutate(
      (currentData) => ({
        ...currentData,
        data: [...(currentData?.data || []), { id: Date.now(), name: '新用户' }]
      }),
      false // false 表示不重新验证
    );
  };

  return (
    <div>
      <button onClick={handleRefresh}>刷新数据</button>
      <button onClick={handleOptimisticUpdate}>添加用户</button>
      {/* 渲染数据 */}
    </div>
  );
}`,
      description: '手动控制数据刷新和更新'
    },
    {
      title: 'SWR 配置选项',
      code: `import { useFetch } from '@hiiot/ui';

function CustomConfig() {
  const { data, error, isLoading } = useFetch(
    '/api/data',
    {},
    {
      // SWR 配置选项
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 30000, // 30秒自动刷新
      dedupingInterval: 2000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      
      // 自定义配置
      shouldFetch: true,
      proxy: (response) => {
        console.log('数据处理:', response);
      }
    }
  );

  return <div>{/* 组件内容 */}</div>;
}`,
      description: '使用完整的 SWR 配置选项'
    }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>高级配置示例</h3>
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

// 错误处理示例
function ErrorHandlingExample() {
  const examples = [
    {
      title: '基本错误处理',
      code: `import { useFetch } from '@hiiot/ui';

function ErrorHandling() {
  const { data, error, isLoading } = useFetch('/api/users');

  if (isLoading) {
    return <div className="loading">加载中...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h3>加载失败</h3>
        <p>{error.toString()}</p>
        <button onClick={() => window.location.reload()}>
          重试
        </button>
      </div>
    );
  }

  return (
    <div>
      {data?.data?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}`,
      description: 'Hook 自动处理错误并显示 toast 提示'
    },
    {
      title: '自定义错误处理',
      code: `import { useFetch } from '@hiiot/ui';

function CustomErrorHandling() {
  const { data, error, isLoading, refresh } = useFetch(
    '/api/users',
    {},
    {
      onError: (error) => {
        // 自定义错误处理逻辑
        console.error('数据获取失败:', error);
        
        // 可以根据错误类型进行不同处理
        if (error.status === 401) {
          // 未授权，跳转到登录页
          window.location.href = '/login';
        } else if (error.status >= 500) {
          // 服务器错误，显示友好提示
          alert('服务器暂时不可用，请稍后重试');
        }
      },
      errorRetryCount: 3,
      errorRetryInterval: 1000
    }
  );

  return (
    <div>
      {error && (
        <div className="error-banner">
          数据加载失败，
          <button onClick={refresh}>点击重试</button>
        </div>
      )}
      {/* 正常内容 */}
    </div>
  );
}`,
      description: '自定义错误处理和重试逻辑'
    }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>错误处理示例</h3>
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

const meta: Meta<typeof UseFetchDemo> = {
  title: 'Hooks/useFetch',
  component: UseFetchDemo,
  parameters: {
    docs: {
      description: {
        component: `
## useFetch

基于 SWR 的数据获取 Hook，提供了简化的 API 和自动错误处理功能。

### 特性
- 🚀 **基于 SWR**: 利用 SWR 的强大缓存和重新验证功能
- 🔄 **自动重试**: 内置错误重试机制
- 🎯 **TypeScript 支持**: 完整的类型安全
- 🛡️ **错误处理**: 自动显示错误 toast 提示
- 🔧 **数据代理**: 支持响应数据的预处理
- ⚡ **条件获取**: 支持根据条件决定是否获取数据
- 🎮 **手动控制**: 提供手动刷新和数据更新功能

### API

#### 参数
\`\`\`typescript
function useFetch<T = any>(
  key: string,                    // SWR 缓存键，通常是 API 端点
  body?: Record<string, any>,     // 请求参数（GET 请求的查询参数）
  config?: ConfigType             // 配置选项
): UseFetchReturn<T>
\`\`\`

#### 配置选项 (ConfigType)
\`\`\`typescript
type ConfigType = SWRConfiguration & {
  proxy?: <T>(data: T) => void;   // 数据代理函数，用于预处理响应数据
  shouldFetch?: boolean;          // 是否应该获取数据，默认 true
}
\`\`\`

#### 返回值
\`\`\`typescript
interface UseFetchReturn<T> {
  data: T | undefined;            // 响应数据
  error: any;                     // 错误信息
  isLoading: boolean;             // 加载状态
  mutate: (data?: T | Promise<T> | MutatorCallback<T>, shouldRevalidate?: boolean) => Promise<T | undefined>;
  refresh: () => Promise<T | undefined>;     // 手动刷新数据
  globalMutate: () => Promise<T[] | undefined>; // 跨组件刷新
}
\`\`\`

### 使用示例

#### 基本用法
\`\`\`typescript
import { useFetch } from '@hiiot/ui';

function UserList() {
  const { data, error, isLoading } = useFetch<UserListResponse>('/api/users');

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>加载失败</div>;

  return (
    <ul>
      {data?.data?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

#### 带参数的请求
\`\`\`typescript
function UserProfile({ userId }: { userId: string }) {
  const { data, error, isLoading } = useFetch(
    '/api/user',
    { id: userId, include: 'profile,settings' }
  );

  return <div>{data?.data?.name}</div>;
}
\`\`\`

#### 数据代理处理
\`\`\`typescript
function ProcessedUserList() {
  const { data } = useFetch('/api/users', {}, {
    proxy: (response) => {
      // 对响应数据进行预处理
      if (response.data) {
        response.data = response.data.map(user => ({
          ...user,
          displayName: \`\${user.firstName} \${user.lastName}\`,
          isActive: user.status === 'active'
        }));
      }
    }
  });

  return (
    <div>
      {data?.data?.map(user => (
        <div key={user.id}>
          {user.displayName} - {user.isActive ? '活跃' : '非活跃'}
        </div>
      ))}
    </div>
  );
}
\`\`\`

#### 条件获取
\`\`\`typescript
function ConditionalFetch({ shouldLoad }: { shouldLoad: boolean }) {
  const { data, isLoading } = useFetch(
    '/api/data',
    {},
    { shouldFetch: shouldLoad }
  );

  return shouldLoad ? (
    <div>{isLoading ? '加载中...' : data?.data}</div>
  ) : (
    <div>数据获取已禁用</div>
  );
}
\`\`\`

#### 手动控制
\`\`\`typescript
function ManualControl() {
  const { data, refresh, mutate } = useFetch('/api/users');

  const handleRefresh = () => {
    refresh(); // 重新获取数据
  };

  const handleOptimisticUpdate = () => {
    // 乐观更新：立即更新 UI
    mutate(
      (currentData) => ({
        ...currentData,
        data: [...(currentData?.data || []), { id: Date.now(), name: '新用户' }]
      }),
      false // 不重新验证
    );
  };

  return (
    <div>
      <button onClick={handleRefresh}>刷新</button>
      <button onClick={handleOptimisticUpdate}>添加</button>
    </div>
  );
}
\`\`\`

### 常见场景

1. **列表数据获取**: 获取用户列表、文章列表等
2. **详情页面**: 根据 ID 获取具体数据
3. **条件加载**: 根据用户权限或状态决定是否加载
4. **实时更新**: 结合 mutate 实现乐观更新
5. **数据预处理**: 使用 proxy 统一处理响应格式

### 最佳实践

1. **类型安全**: 为响应数据定义 TypeScript 接口
2. **错误处理**: Hook 会自动显示错误 toast，无需额外处理
3. **缓存键**: 使用有意义的缓存键，包含必要的参数
4. **条件获取**: 使用 \`shouldFetch\` 避免不必要的请求
5. **数据代理**: 在 proxy 中统一处理数据格式转换
6. **手动更新**: 使用 mutate 实现乐观更新提升用户体验

### 注意事项

- Hook 依赖 \`useToast\` 和 \`fetcherGet\`，确保这些依赖可用
- 响应数据格式需要包含 \`error.code\` 字段用于错误判断
- 使用 \`shouldFetch: false\` 可以禁用自动数据获取
- \`proxy\` 函数会修改原始响应数据，请谨慎使用
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UseFetchDemo>;

export const Default: Story = {
  name: '交互式演示',
};

export const BasicUsage: Story = {
  name: '基本用法',
  render: () => <BasicUsageExample />,
  parameters: {
    docs: {
      source: {
        code: `import { useFetch } from '@hiiot/ui';

// 基本数据获取
function UserList() {
  const { data, error, isLoading } = useFetch('/api/users');

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <ul>
      {data?.data?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// 带参数的请求
function UserProfile({ userId }) {
  const { data, error, isLoading } = useFetch(
    '/api/user',
    { id: userId, include: 'profile,settings' }
  );

  return (
    <div>
      {isLoading ? '加载中...' : data?.data?.name}
    </div>
  );
}

// 条件获取
function ConditionalFetch({ shouldLoad }) {
  const { data, error, isLoading } = useFetch(
    '/api/data',
    {},
    { shouldFetch: shouldLoad }
  );

  return shouldLoad ? (
    <div>{isLoading ? '加载中...' : data?.data}</div>
  ) : (
    <div>数据获取已禁用</div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const AdvancedConfig: Story = {
  name: '高级配置',
  render: () => <AdvancedConfigExample />,
  parameters: {
    docs: {
      source: {
        code: `import { useFetch } from '@hiiot/ui';

// 数据代理处理
function ProcessedData() {
  const { data, error, isLoading } = useFetch(
    '/api/users',
    {},
    {
      proxy: (response) => {
        // 对响应数据进行处理
        if (response.data) {
          response.data = response.data.map(user => ({
            ...user,
            displayName: \`\${user.firstName} \${user.lastName}\`,
            isActive: user.status === 'active'
          }));
        }
      }
    }
  );

  return (
    <div>
      {data?.data?.map(user => (
        <div key={user.id}>
          {user.displayName} - {user.isActive ? '活跃' : '非活跃'}
        </div>
      ))}
    </div>
  );
}

// 手动刷新和更新
function ManualControl() {
  const { data, refresh, mutate } = useFetch('/api/users');

  const handleRefresh = () => {
    refresh(); // 重新获取数据
  };

  const handleOptimisticUpdate = () => {
    // 乐观更新：立即更新 UI，不等待服务器响应
    mutate(
      (currentData) => ({
        ...currentData,
        data: [...(currentData?.data || []), { id: Date.now(), name: '新用户' }]
      }),
      false // false 表示不重新验证
    );
  };

  return (
    <div>
      <button onClick={handleRefresh}>刷新数据</button>
      <button onClick={handleOptimisticUpdate}>添加用户</button>
    </div>
  );
}`,
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
        code: `import { useFetch } from '@hiiot/ui';

// 基本错误处理
function ErrorHandling() {
  const { data, error, isLoading } = useFetch('/api/users');

  if (isLoading) {
    return <div className="loading">加载中...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h3>加载失败</h3>
        <p>{error.toString()}</p>
        <button onClick={() => window.location.reload()}>
          重试
        </button>
      </div>
    );
  }

  return (
    <div>
      {data?.data?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// 自定义错误处理
function CustomErrorHandling() {
  const { data, error, isLoading, refresh } = useFetch(
    '/api/users',
    {},
    {
      onError: (error) => {
        console.error('数据获取失败:', error);
        
        if (error.status === 401) {
          window.location.href = '/login';
        } else if (error.status >= 500) {
          alert('服务器暂时不可用，请稍后重试');
        }
      },
      errorRetryCount: 3,
      errorRetryInterval: 1000
    }
  );

  return (
    <div>
      {error && (
        <div className="error-banner">
          数据加载失败，
          <button onClick={refresh}>点击重试</button>
        </div>
      )}
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};