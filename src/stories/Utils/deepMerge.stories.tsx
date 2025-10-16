import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { deepMerge } from '../../utils';

// 主演示组件
function DeepMergeDemo() {
  const [target, setTarget] = useState({
    name: 'John',
    age: 30,
    address: {
      city: 'New York',
      country: 'USA'
    },
    hobbies: ['reading']
  });

  const [source, setSource] = useState({
    age: 31,
    address: {
      street: '123 Main St',
      zipCode: '10001'
    },
    hobbies: ['swimming'],
    job: 'Developer'
  });

  const mergedResult = deepMerge({...target}, source as any);

  const resetToDefaults = () => {
    setTarget({
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        country: 'USA'
      },
      hobbies: ['reading']
    });
    setSource({
      age: 31,
      address: {
        street: '123 Main St',
        zipCode: '10001'
      },
      hobbies: ['swimming'],
      job: 'Developer'
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>deepMerge 工具函数演示</h2>
      <p>深度合并两个或多个对象，支持嵌套对象的递归合并。</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '20px' }}>
        {/* 目标对象 */}
        <div>
          <h3>目标对象 (Target)</h3>
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '15px', 
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap'
          }}>
            {JSON.stringify(target, null, 2)}
          </div>
        </div>

        {/* 源对象 */}
        <div>
          <h3>源对象 (Source)</h3>
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '15px', 
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap'
          }}>
            {JSON.stringify(source, null, 2)}
          </div>
        </div>

        {/* 合并结果 */}
        <div>
          <h3>合并结果</h3>
          <div style={{ 
            backgroundColor: '#e8f5e8', 
            padding: '15px', 
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap'
          }}>
            {JSON.stringify(mergedResult, null, 2)}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>操作</h3>
        <button 
          onClick={resetToDefaults}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          重置为默认值
        </button>
      </div>

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
            {`const result = deepMerge(target, source);`}
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
      title: '简单对象合并',
      target: { a: 1, b: 2 },
      source: { b: 3, c: 4 },
      description: '合并两个简单对象'
    },
    {
      title: '嵌套对象合并',
      target: { user: { name: 'John', age: 30 } },
      source: { user: { age: 31, city: 'NYC' } },
      description: '深度合并嵌套对象'
    },
    {
      title: '多层嵌套',
      target: { 
        config: { 
          api: { url: 'localhost', port: 3000 },
          debug: true 
        } 
      },
      source: { 
        config: { 
          api: { port: 8080, timeout: 5000 },
          cache: true 
        } 
      },
      description: '多层嵌套对象合并'
    }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>基本用法示例</h3>
      <div style={{ display: 'grid', gap: '20px' }}>
        {examples.map((example, index) => {
          const result = deepMerge({...example.target}, example.source as any);
          return (
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
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '10px' }}>
                <div>
                  <strong>Target:</strong>
                  <pre style={{ 
                    backgroundColor: '#f5f5f5', 
                    padding: '8px', 
                    borderRadius: '4px',
                    fontSize: '12px',
                    margin: '5px 0'
                  }}>
                    {JSON.stringify(example.target, null, 2)}
                  </pre>
                </div>
                
                <div>
                  <strong>Source:</strong>
                  <pre style={{ 
                    backgroundColor: '#f5f5f5', 
                    padding: '8px', 
                    borderRadius: '4px',
                    fontSize: '12px',
                    margin: '5px 0'
                  }}>
                    {JSON.stringify(example.source, null, 2)}
                  </pre>
                </div>
                
                <div>
                  <strong>Result:</strong>
                  <pre style={{ 
                    backgroundColor: '#e8f5e8', 
                    padding: '8px', 
                    borderRadius: '4px',
                    fontSize: '12px',
                    margin: '5px 0'
                  }}>
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 配置合并示例
function ConfigMergeExample() {
  const defaultConfig = {
    api: {
      baseURL: 'https://api.example.com',
      timeout: 5000,
      retries: 3
    },
    ui: {
      theme: 'light',
      language: 'en'
    },
    features: {
      analytics: true,
      notifications: true
    }
  };

  const userConfig = {
    api: {
      timeout: 10000,
      headers: {
        'Custom-Header': 'value'
      }
    },
    ui: {
      theme: 'dark'
    },
    features: {
      analytics: false,
      experimental: true
    }
  };

  const finalConfig = deepMerge({...defaultConfig}, userConfig as any);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>配置合并示例</h3>
      <p>常见的配置对象合并场景，用户配置覆盖默认配置。</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div>
          <h4>默认配置</h4>
          <pre style={{ 
            backgroundColor: '#f0f8ff', 
            padding: '15px', 
            borderRadius: '8px',
            fontSize: '12px',
            overflow: 'auto'
          }}>
            {JSON.stringify(defaultConfig, null, 2)}
          </pre>
        </div>

        <div>
          <h4>用户配置</h4>
          <pre style={{ 
            backgroundColor: '#fff8f0', 
            padding: '15px', 
            borderRadius: '8px',
            fontSize: '12px',
            overflow: 'auto'
          }}>
            {JSON.stringify(userConfig, null, 2)}
          </pre>
        </div>

        <div>
          <h4>最终配置</h4>
          <pre style={{ 
            backgroundColor: '#f0fff0', 
            padding: '15px', 
            borderRadius: '8px',
            fontSize: '12px',
            overflow: 'auto'
          }}>
            {JSON.stringify(finalConfig, null, 2)}
          </pre>
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h4>代码示例</h4>
        <pre style={{ margin: 0, fontSize: '14px' }}>
{`import { deepMerge } from '@hiiot/ui';

const defaultConfig = { /* 默认配置 */ };
const userConfig = { /* 用户配置 */ };

const finalConfig = deepMerge(defaultConfig, userConfig);`}
        </pre>
      </div>
    </div>
  );
}

// 多源合并示例
function MultiSourceExample() {
  const base = { name: 'App', version: '1.0.0' };
  const env = { env: 'production', debug: false };
  const user = { user: { id: 123, name: 'John' } };
  const feature = { features: { newUI: true, beta: false } };

  const result = deepMerge({...base}, env as any, user as any, feature as any);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>多源合并示例</h3>
      <p>将多个配置对象合并为一个最终配置。</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '20px' }}>
        <div>
          <h4>基础配置</h4>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '6px',
            fontSize: '12px'
          }}>
            {JSON.stringify(base, null, 2)}
          </pre>
        </div>

        <div>
          <h4>环境配置</h4>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '6px',
            fontSize: '12px'
          }}>
            {JSON.stringify(env, null, 2)}
          </pre>
        </div>

        <div>
          <h4>用户配置</h4>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '6px',
            fontSize: '12px'
          }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        <div>
          <h4>功能配置</h4>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '6px',
            fontSize: '12px'
          }}>
            {JSON.stringify(feature, null, 2)}
          </pre>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h4>合并结果</h4>
        <pre style={{ 
          backgroundColor: '#e8f5e8', 
          padding: '15px', 
          borderRadius: '8px',
          fontSize: '12px'
        }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h4>代码示例</h4>
        <pre style={{ margin: 0, fontSize: '14px' }}>
{`const result = deepMerge(base, env, user, feature);`}
        </pre>
      </div>
    </div>
  );
}

const meta: Meta<typeof DeepMergeDemo> = {
  title: 'Utils/deepMerge',
  component: DeepMergeDemo,
  parameters: {
    docs: {
      description: {
        component: `
## deepMerge

深度合并对象的工具函数，支持嵌套对象的递归合并。

### 特性
- 🔄 **深度合并**: 递归合并嵌套对象
- 🎯 **类型安全**: 完整的 TypeScript 支持
- 🚀 **多源合并**: 支持合并多个源对象
- 🛡️ **不可变**: 不修改原始对象
- 📦 **轻量级**: 简洁高效的实现

### API

\`\`\`typescript
function deepMerge<T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T
\`\`\`

**参数:**
- \`target\`: 目标对象
- \`...sources\`: 源对象数组

**返回值:**
- 合并后的新对象

### 使用示例

#### 基本用法
\`\`\`typescript
import { deepMerge } from '@hiiot/ui';

const target = { a: 1, b: { c: 2 } };
const source = { b: { d: 3 }, e: 4 };

const result = deepMerge(target, source);
// 结果: { a: 1, b: { c: 2, d: 3 }, e: 4 }
\`\`\`

#### 配置合并
\`\`\`typescript
const defaultConfig = {
  api: { url: 'localhost', port: 3000 },
  debug: true
};

const userConfig = {
  api: { port: 8080 },
  cache: true
};

const config = deepMerge(defaultConfig, userConfig);
// 结果: { api: { url: 'localhost', port: 8080 }, debug: true, cache: true }
\`\`\`

#### 多源合并
\`\`\`typescript
const base = { name: 'App' };
const env = { env: 'prod' };
const user = { user: { id: 123 } };

const result = deepMerge(base, env, user);
// 结果: { name: 'App', env: 'prod', user: { id: 123 } }
\`\`\`

### 常见场景

1. **配置对象合并**: 默认配置 + 用户配置
2. **主题定制**: 基础主题 + 自定义主题
3. **API 响应合并**: 合并多个 API 的数据
4. **状态更新**: 深度更新复杂状态对象

### 注意事项

1. **数组处理**: 数组会被直接替换，不会合并
2. **原始值**: 原始类型值会被后面的值覆盖
3. **null/undefined**: 会被正常处理和合并
4. **循环引用**: 不支持循环引用的对象

### 最佳实践

1. **保持不可变**: 使用展开运算符复制目标对象
2. **类型安全**: 使用 TypeScript 确保类型正确
3. **性能考虑**: 避免在高频操作中使用
4. **测试验证**: 确保合并结果符合预期
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DeepMergeDemo>;

export const Default: Story = {
  name: '交互式演示',
};

export const BasicUsage: Story = {
  name: '基本用法',
  render: () => <BasicUsageExample />,
  parameters: {
    docs: {
      source: {
        code: `import { deepMerge } from '@hiiot/ui';

function BasicUsageExample() {
  const examples = [
    {
      title: '简单对象合并',
      target: { a: 1, b: 2 },
      source: { b: 3, c: 4 },
      description: '合并两个简单对象'
    },
    {
      title: '嵌套对象合并',
      target: { user: { name: 'John', age: 30 } },
      source: { user: { age: 31, city: 'NYC' } },
      description: '深度合并嵌套对象'
    },
    {
      title: '多层嵌套',
      target: { 
        config: { 
          api: { url: 'localhost', port: 3000 },
          debug: true 
        } 
      },
      source: { 
        config: { 
          api: { port: 8080, timeout: 5000 },
          cache: true 
        } 
      },
      description: '多层嵌套对象合并'
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h3>基本用法示例</h3>
      <div style={{ display: 'grid', gap: '20px' }}>
        {examples.map((example, index) => {
          const result = deepMerge({...example.target}, example.source);
          return (
            <div key={index} style={{ border: '1px solid #ddd', padding: '15px' }}>
              <h4>{example.title}</h4>
              <p>{example.description}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <strong>Target:</strong>
                  <pre>{JSON.stringify(example.target, null, 2)}</pre>
                </div>
                <div>
                  <strong>Source:</strong>
                  <pre>{JSON.stringify(example.source, null, 2)}</pre>
                </div>
                <div>
                  <strong>Result:</strong>
                  <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const ConfigMerge: Story = {
  name: '配置合并',
  render: () => <ConfigMergeExample />,
  parameters: {
    docs: {
      source: {
        code: `import { deepMerge } from '@hiiot/ui';

function ConfigMergeExample() {
  const defaultConfig = {
    api: {
      baseURL: 'https://api.example.com',
      timeout: 5000,
      retries: 3
    },
    ui: {
      theme: 'light',
      language: 'en'
    },
    features: {
      analytics: true,
      notifications: true
    }
  };

  const userConfig = {
    api: {
      timeout: 10000,
      headers: {
        'Custom-Header': 'value'
      }
    },
    ui: {
      theme: 'dark'
    },
    features: {
      analytics: false,
      experimental: true
    }
  };

  const finalConfig = deepMerge({...defaultConfig}, userConfig);

  return (
    <div>
      <h3>配置合并示例</h3>
      <p>常见的配置对象合并场景，用户配置覆盖默认配置。</p>
      {/* 显示配置对象 */}
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const MultiSource: Story = {
  name: '多源合并',
  render: () => <MultiSourceExample />,
  parameters: {
    docs: {
      source: {
        code: `import { deepMerge } from '@hiiot/ui';

function MultiSourceExample() {
  const base = { name: 'App', version: '1.0.0' };
  const env = { env: 'production', debug: false };
  const user = { user: { id: 123, name: 'John' } };
  const feature = { features: { newUI: true, beta: false } };

  const result = deepMerge({...base}, env, user, feature);

  return (
    <div>
      <h3>多源合并示例</h3>
      <p>将多个配置对象合并为一个最终配置。</p>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};