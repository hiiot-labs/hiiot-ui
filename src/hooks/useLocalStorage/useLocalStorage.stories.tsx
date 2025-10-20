import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useLocalStorage } from './index';

// 示例组件
function UseLocalStorageDemo() {
  const [name, setName] = useLocalStorage('demo-name', '');
  const [count, setCount] = useLocalStorage('demo-count', 0);
  const [settings, setSettings] = useLocalStorage('demo-settings', { 
    theme: 'light', 
    language: 'zh' 
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>useLocalStorage Hook 演示</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>字符串存储</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="输入你的名字"
          style={{ padding: '8px', marginRight: '10px', border: '1px solid #ccc' }}
        />
        <p>存储的名字: {name}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>数字存储</h3>
        <button 
          onClick={() => setCount(count + 1)}
          style={{ padding: '8px 16px', marginRight: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          增加
        </button>
        <button 
          onClick={() => setCount(count - 1)}
          style={{ padding: '8px 16px', marginRight: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          减少
        </button>
        <button 
          onClick={() => setCount(0)}
          style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          重置
        </button>
        <p>计数器: {count}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>对象存储</h3>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>主题:</label>
          <select 
            value={settings.theme} 
            onChange={(e) => setSettings({...settings, theme: e.target.value})}
            style={{ padding: '4px', marginRight: '20px' }}
          >
            <option value="light">浅色</option>
            <option value="dark">深色</option>
          </select>
          
          <label style={{ marginRight: '10px' }}>语言:</label>
          <select 
            value={settings.language} 
            onChange={(e) => setSettings({...settings, language: e.target.value})}
            style={{ padding: '4px' }}
          >
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
        </div>
        <p>设置: {JSON.stringify(settings, null, 2)}</p>
      </div>
    </div>
  );
}

// 基本用法示例组件
function BasicUsageExample() {
  const [username, setUsername] = useLocalStorage('username', '');
  
  return (
    <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <h3>基本用法</h3>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="输入用户名"
        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '200px' }}
      />
      <p>存储的用户名: <strong>{username}</strong></p>
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '10px', 
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '14px',
        marginTop: '10px'
      }}>
        <strong>代码:</strong>
        <pre>{`const [username, setUsername] = useLocalStorage('username', '');

return (
  <input
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    placeholder="输入用户名"
  />
);`}</pre>
      </div>
    </div>
  );
}

// 复杂对象示例组件
function ComplexObjectExample() {
  const [userProfile, setUserProfile] = useLocalStorage('userProfile', {
    name: '',
    age: 0,
    preferences: {
      theme: 'light',
      notifications: true
    }
  });

  const updateName = (name: string) => {
    setUserProfile(prev => ({ ...prev, name }));
  };

  const updateAge = (age: number) => {
    setUserProfile(prev => ({ ...prev, age }));
  };

  const updateTheme = (theme: string) => {
    setUserProfile(prev => ({
      ...prev,
      preferences: { ...prev.preferences, theme }
    }));
  };

  const toggleNotifications = () => {
    setUserProfile(prev => ({
      ...prev,
      preferences: { ...prev.preferences, notifications: !prev.preferences.notifications }
    }));
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <h3>复杂对象存储</h3>
      <div style={{ display: 'grid', gap: '10px', marginBottom: '15px' }}>
        <div>
          <label>姓名: </label>
          <input
            type="text"
            value={userProfile.name}
            onChange={(e) => updateName(e.target.value)}
            style={{ padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label>年龄: </label>
          <input
            type="number"
            value={userProfile.age}
            onChange={(e) => updateAge(Number(e.target.value))}
            style={{ padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label>主题: </label>
          <select
            value={userProfile.preferences.theme}
            onChange={(e) => updateTheme(e.target.value)}
            style={{ padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="light">浅色</option>
            <option value="dark">深色</option>
          </select>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={userProfile.preferences.notifications}
              onChange={toggleNotifications}
              style={{ marginRight: '5px' }}
            />
            启用通知
          </label>
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '10px', 
        borderRadius: '4px',
        marginBottom: '10px'
      }}>
        <strong>当前数据:</strong>
        <pre style={{ fontSize: '12px', margin: '5px 0' }}>
          {JSON.stringify(userProfile, null, 2)}
        </pre>
      </div>

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '10px', 
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '14px'
      }}>
        <strong>代码:</strong>
        <pre>{`const [userProfile, setUserProfile] = useLocalStorage('userProfile', {
  name: '',
  age: 0,
  preferences: {
    theme: 'light',
    notifications: true
  }
});

// 更新嵌套属性
const updateTheme = (theme: string) => {
  setUserProfile(prev => ({
    ...prev,
    preferences: { ...prev.preferences, theme }
  }));
};`}</pre>
      </div>
    </div>
  );
}

const meta: Meta<typeof UseLocalStorageDemo> = {
  title: 'Hooks/useLocalStorage',
  component: UseLocalStorageDemo,
  parameters: {
    docs: {
      description: {
        component: `
## useLocalStorage

用于管理本地存储的 Hook，提供类型安全的本地存储操作。

### 特性
- 🔒 **类型安全**: 完整的 TypeScript 支持
- 🚀 **自动序列化**: 自动处理 JSON 序列化和反序列化
- 🛡️ **错误处理**: 内置错误处理机制
- 🔄 **响应式更新**: 状态变化时自动更新组件

### API

\`\`\`typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void]
\`\`\`

**参数:**
- \`key\`: 存储键名
- \`initialValue\`: 初始值

**返回值:**
- \`[value, setValue]\`: 当前值和设置函数的元组

### 使用示例

\`\`\`typescript
import { useLocalStorage } from '@hiiot/ui';

function MyComponent() {
  const [name, setName] = useLocalStorage('username', '');
  const [settings, setSettings] = useLocalStorage('settings', { theme: 'light' });

  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <button onClick={() => setSettings(prev => ({ ...prev, theme: 'dark' }))}>
        切换主题
      </button>
    </div>
  );
}
\`\`\`

### 最佳实践

1. **使用描述性的键名**: 避免键名冲突
2. **提供合理的初始值**: 确保类型一致性
3. **处理复杂对象**: 使用展开运算符更新嵌套属性
4. **避免频繁更新**: 考虑使用 debounce 优化性能
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UseLocalStorageDemo>;

export const Default: Story = {
  name: '交互式演示',
};

export const BasicUsage: Story = {
  name: '基本用法',
  render: () => <BasicUsageExample />,
  parameters: {
    docs: {
      source: {
        code: `import { useLocalStorage } from '@hiiot/ui';

function BasicUsageExample() {
  const [username, setUsername] = useLocalStorage('username', '');
  
  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="输入用户名"
      />
      <p>存储的用户名: {username}</p>
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const ComplexObject: Story = {
  name: '复杂对象存储',
  render: () => <ComplexObjectExample />,
  parameters: {
    docs: {
      source: {
        code: `import { useLocalStorage } from '@hiiot/ui';

function ComplexObjectExample() {
  const [userProfile, setUserProfile] = useLocalStorage('userProfile', {
    name: '',
    age: 0,
    preferences: {
      theme: 'light',
      notifications: true
    }
  });

  const updateTheme = (theme: string) => {
    setUserProfile(prev => ({
      ...prev,
      preferences: { ...prev.preferences, theme }
    }));
  };

  const toggleNotifications = () => {
    setUserProfile(prev => ({
      ...prev,
      preferences: { 
        ...prev.preferences, 
        notifications: !prev.preferences.notifications 
      }
    }));
  };

  return (
    <div>
      {/* 表单控件 */}
      <select value={userProfile.preferences.theme} onChange={(e) => updateTheme(e.target.value)}>
        <option value="light">浅色</option>
        <option value="dark">深色</option>
      </select>
      
      <label>
        <input
          type="checkbox"
          checked={userProfile.preferences.notifications}
          onChange={toggleNotifications}
        />
        启用通知
      </label>
      
      <pre>{JSON.stringify(userProfile, null, 2)}</pre>
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};