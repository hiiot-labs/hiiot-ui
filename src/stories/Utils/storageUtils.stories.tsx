import type { Meta, StoryObj } from '@storybook/react-vite-vite';
import { storageUtils } from '../../utils';
import { useState, useEffect } from 'react';

const meta: Meta = {
  title: 'Utils/storageUtils',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '本地存储工具对象，提供了一套完整的 localStorage 操作方法，包括设置、获取、删除和清空缓存。',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 交互式演示组件
const StorageUtilsDemo = () => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [getKey, setGetKey] = useState('');
  const [result, setResult] = useState<any>(null);
  const [storageItems, setStorageItems] = useState<Array<{key: string, value: any}>>([]);

  // 刷新存储项列表
  const refreshStorageItems = () => {
    if (typeof window !== 'undefined' && localStorage) {
      const items: Array<{key: string, value: any}> = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          try {
            const value = JSON.parse(localStorage.getItem(key) || '');
            items.push({ key, value });
          } catch {
            items.push({ key, value: localStorage.getItem(key) });
          }
        }
      }
      setStorageItems(items);
    }
  };

  useEffect(() => {
    refreshStorageItems();
  }, []);

  const handleSetStorage = () => {
    if (key && value) {
      try {
        const parsedValue = JSON.parse(value);
        storageUtils.setStorage(key, parsedValue);
      } catch {
        storageUtils.setStorage(key, value);
      }
      refreshStorageItems();
      setKey('');
      setValue('');
    }
  };

  const handleGetStorage = () => {
    if (getKey) {
      const result = storageUtils.getStorage(getKey);
      setResult(result);
    }
  };

  const handleRemoveItem = (itemKey: string) => {
    storageUtils.remove(itemKey);
    refreshStorageItems();
  };

  const handleClearAll = () => {
    storageUtils.clear();
    refreshStorageItems();
    setResult(null);
  };

  const quickTestData = [
    { key: 'user', value: '{"name": "张三", "age": 25}' },
    { key: 'settings', value: '{"theme": "dark", "language": "zh"}' },
    { key: 'token', value: '"abc123xyz"' },
    { key: 'count', value: '42' },
    { key: 'isActive', value: 'true' }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-6">本地存储工具演示</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 设置存储 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">设置存储</h4>
          <div className="space-y-3">
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="键名 (key)"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="值 (支持 JSON 格式)"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <button
              onClick={handleSetStorage}
              disabled={!key || !value}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              设置存储
            </button>
          </div>
          
          {/* 快速测试数据 */}
          <div className="mt-4">
            <h5 className="text-sm font-medium mb-2">快速测试数据:</h5>
            <div className="space-y-1">
              {quickTestData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setKey(item.key);
                    setValue(item.value);
                  }}
                  className="w-full text-left px-2 py-1 text-sm bg-gray-50 hover:bg-gray-100 rounded border"
                >
                  <span className="font-mono text-blue-600">{item.key}</span>: {item.value}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 获取存储 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">获取存储</h4>
          <div className="space-y-3">
            <input
              type="text"
              value={getKey}
              onChange={(e) => setGetKey(e.target.value)}
              placeholder="要获取的键名"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleGetStorage}
              disabled={!getKey}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              获取存储
            </button>
            
            {/* 显示结果 */}
            {result !== null && (
              <div className="p-3 bg-gray-50 rounded border">
                <h5 className="text-sm font-medium mb-1">获取结果:</h5>
                <pre className="text-sm font-mono bg-white p-2 rounded border overflow-x-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 存储项列表 */}
      <div className="mt-6 p-4 border rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-medium">当前存储项</h4>
          <div className="space-x-2">
            <button
              onClick={refreshStorageItems}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded border"
            >
              刷新
            </button>
            <button
              onClick={handleClearAll}
              className="px-3 py-1 text-sm bg-red-500 text-white hover:bg-red-600 rounded"
            >
              清空所有
            </button>
          </div>
        </div>
        
        {storageItems.length === 0 ? (
          <p className="text-gray-500 text-center py-4">暂无存储项</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {storageItems.map((item, index) => (
              <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded border">
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm text-blue-600 mb-1">{item.key}</div>
                  <div className="text-sm text-gray-600 break-all">
                    {typeof item.value === 'string' ? item.value : JSON.stringify(item.value)}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.key)}
                  className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-600 hover:bg-red-200 rounded"
                >
                  删除
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 操作说明 */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">操作说明:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 设置存储时，值会自动尝试解析为 JSON，失败则存储为字符串</li>
          <li>• 获取存储时，会自动解析 JSON 格式的值</li>
          <li>• 所有操作都有错误处理，确保不会因为存储问题导致应用崩溃</li>
          <li>• 支持服务端渲染环境，会自动检测 window 和 localStorage 的可用性</li>
        </ul>
      </div>
    </div>
  );
};

// 方法演示组件
const MethodsDemoComponent = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [`${new Date().toLocaleTimeString()}: ${message}`, ...prev.slice(0, 9)]);
  };

  const testSetStorage = () => {
    storageUtils.setStorage('test-key', { message: 'Hello World', timestamp: Date.now() });
    addLog('设置存储: test-key');
  };

  const testGetStorage = () => {
    const result = storageUtils.getStorage('test-key');
    addLog(`获取存储: test-key = ${JSON.stringify(result)}`);
  };

  const testRemove = () => {
    storageUtils.remove('test-key');
    addLog('删除存储: test-key');
  };

  const testClearSomeKey = () => {
    // 先设置几个测试数据
    storageUtils.setStorage('keep-this', 'important data');
    storageUtils.setStorage('remove-this-1', 'temp data 1');
    storageUtils.setStorage('remove-this-2', 'temp data 2');
    
    // 清除除了 'keep-this' 之外的所有数据
    storageUtils.clearSomeKey('keep-this');
    addLog('清除除 keep-this 外的所有存储');
  };

  const testClearAll = () => {
    storageUtils.clear();
    addLog('清空所有存储');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">方法演示</h3>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={testSetStorage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          setStorage
        </button>
        <button
          onClick={testGetStorage}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          getStorage
        </button>
        <button
          onClick={testRemove}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          remove
        </button>
        <button
          onClick={testClearSomeKey}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          clearSomeKey
        </button>
        <button
          onClick={testClearAll}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 col-span-2"
        >
          clear (清空所有)
        </button>
      </div>

      {/* 操作日志 */}
      <div className="p-4 border rounded-lg">
        <h4 className="font-medium mb-2">操作日志:</h4>
        {logs.length === 0 ? (
          <p className="text-gray-500 text-sm">暂无操作记录</p>
        ) : (
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="text-sm font-mono bg-gray-50 p-2 rounded">
                {log}
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => setLogs([])}
          className="mt-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded border"
        >
          清空日志
        </button>
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <StorageUtilsDemo />,
  parameters: {
    docs: {
      description: {
        story: '交互式本地存储工具演示，可以设置、获取、删除和管理存储项。',
      },
    },
  },
};

export const MethodsDemo: Story = {
  render: () => <MethodsDemoComponent />,
  parameters: {
    docs: {
      description: {
        story: '演示 storageUtils 对象的各个方法功能。',
      },
    },
  },
};

// 使用场景示例
export const UsageScenarios: Story = {
  render: () => (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-6">使用场景示例</h3>
      
      <div className="grid gap-6">
        {/* 用户设置存储 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">⚙️ 用户设置存储</h4>
          <p className="text-sm text-gray-600 mb-3">
            保存用户的个性化设置，如主题、语言等。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`import { storageUtils } from '@/utils';

// 保存用户设置
const saveUserSettings = (settings: UserSettings) => {
  storageUtils.setStorage('userSettings', settings);
};

// 获取用户设置
const getUserSettings = (): UserSettings | null => {
  return storageUtils.getStorage('userSettings');
};

// 使用示例
const settings = {
  theme: 'dark',
  language: 'zh-CN',
  notifications: true
};

saveUserSettings(settings);

// 应用启动时恢复设置
const savedSettings = getUserSettings();
if (savedSettings) {
  applySettings(savedSettings);
}`}
          </pre>
        </div>

        {/* 购物车数据 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">🛒 购物车数据管理</h4>
          <p className="text-sm text-gray-600 mb-3">
            在电商应用中保存购物车数据。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`import { storageUtils } from '@/utils';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class CartManager {
  private static CART_KEY = 'shopping_cart';
  
  static addItem(item: CartItem) {
    const cart = this.getCart();
    const existingItem = cart.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.push(item);
    }
    
    storageUtils.setStorage(this.CART_KEY, cart);
  }
  
  static getCart(): CartItem[] {
    return storageUtils.getStorage(this.CART_KEY) || [];
  }
  
  static removeItem(itemId: string) {
    const cart = this.getCart().filter(item => item.id !== itemId);
    storageUtils.setStorage(this.CART_KEY, cart);
  }
  
  static clearCart() {
    storageUtils.remove(this.CART_KEY);
  }
}`}
          </pre>
        </div>

        {/* 表单草稿保存 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">📝 表单草稿保存</h4>
          <p className="text-sm text-gray-600 mb-3">
            自动保存用户输入的表单数据，防止数据丢失。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`import { storageUtils } from '@/utils';
import { useEffect } from 'react';

function useFormDraft(formId: string, formData: any) {
  const draftKey = \`form_draft_\${formId}\`;
  
  // 保存草稿
  const saveDraft = () => {
    storageUtils.setStorage(draftKey, {
      data: formData,
      timestamp: Date.now()
    });
  };
  
  // 获取草稿
  const getDraft = () => {
    const draft = storageUtils.getStorage(draftKey);
    if (draft && Date.now() - draft.timestamp < 24 * 60 * 60 * 1000) {
      return draft.data;
    }
    return null;
  };
  
  // 清除草稿
  const clearDraft = () => {
    storageUtils.remove(draftKey);
  };
  
  // 自动保存
  useEffect(() => {
    const timer = setTimeout(saveDraft, 1000);
    return () => clearTimeout(timer);
  }, [formData]);
  
  return { getDraft, clearDraft };
}`}
          </pre>
        </div>

        {/* 缓存管理 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">💾 API 数据缓存</h4>
          <p className="text-sm text-gray-600 mb-3">
            缓存 API 响应数据，提高应用性能。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`import { storageUtils } from '@/utils';

class ApiCache {
  private static getCacheKey(url: string, params?: any) {
    return \`api_cache_\${url}_\${JSON.stringify(params || {})}\`;
  }
  
  static set(url: string, data: any, params?: any, ttl = 5 * 60 * 1000) {
    const cacheKey = this.getCacheKey(url, params);
    const cacheData = {
      data,
      timestamp: Date.now(),
      ttl
    };
    storageUtils.setStorage(cacheKey, cacheData);
  }
  
  static get(url: string, params?: any) {
    const cacheKey = this.getCacheKey(url, params);
    const cached = storageUtils.getStorage(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }
    
    // 缓存过期，删除
    if (cached) {
      storageUtils.remove(cacheKey);
    }
    
    return null;
  }
  
  static clear() {
    // 清除所有 API 缓存
    if (typeof window !== 'undefined' && localStorage) {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('api_cache_')) {
          storageUtils.remove(key);
        }
      });
    }
  }
}`}
          </pre>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示 storageUtils 对象在实际项目中的使用场景。',
      },
    },
  },
};

// 代码示例
export const CodeExamples: Story = {
  render: () => (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-6">代码示例</h3>
      
      <div className="space-y-6">
        {/* 基础用法 */}
        <div>
          <h4 className="font-medium mb-2">基础用法</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`import { storageUtils } from '@/utils';

// 设置存储
storageUtils.setStorage('username', 'john_doe');
storageUtils.setStorage('user', { name: '张三', age: 25 });

// 获取存储
const username = storageUtils.getStorage('username');
const user = storageUtils.getStorage('user');

console.log(username); // 'john_doe'
console.log(user); // { name: '张三', age: 25 }

// 删除指定存储
storageUtils.remove('username');

// 清空所有存储
storageUtils.clear();`}
          </pre>
        </div>

        {/* 错误处理 */}
        <div>
          <h4 className="font-medium mb-2">错误处理</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`import { storageUtils } from '@/utils';

// storageUtils 内置了错误处理
// 即使在以下情况下也不会抛出错误：
// 1. localStorage 不可用（如隐私模式）
// 2. 存储空间已满
// 3. 数据格式错误

// 安全的存储操作
const safeSetData = (key: string, data: any) => {
  try {
    storageUtils.setStorage(key, data);
    return true;
  } catch (error) {
    console.warn('存储失败:', error);
    return false;
  }
};

// 安全的获取操作
const safeGetData = (key: string, defaultValue: any = null) => {
  const data = storageUtils.getStorage(key);
  return data !== null ? data : defaultValue;
};`}
          </pre>
        </div>

        {/* React Hook 封装 */}
        <div>
          <h4 className="font-medium mb-2">React Hook 封装</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`import { useState, useEffect } from 'react';
import { storageUtils } from '@/utils';

function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = storageUtils.getStorage(key);
    return stored !== null ? stored : defaultValue;
  });
  
  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    storageUtils.setStorage(key, newValue);
  };
  
  const removeValue = () => {
    setValue(defaultValue);
    storageUtils.remove(key);
  };
  
  return [value, setStoredValue, removeValue] as const;
}

// 使用示例
function UserProfile() {
  const [user, setUser, removeUser] = useLocalStorage('user', null);
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <div>
      <p>当前用户: {user?.name || '未登录'}</p>
      <p>当前主题: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        切换主题
      </button>
    </div>
  );
}`}
          </pre>
        </div>

        {/* 高级用法 */}
        <div>
          <h4 className="font-medium mb-2">高级用法 - 选择性清除</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`import { storageUtils } from '@/utils';

// clearSomeKey 方法的使用
// 保留指定的 key，删除其他所有数据

// 设置一些测试数据
storageUtils.setStorage('important_data', 'keep this');
storageUtils.setStorage('temp_data_1', 'remove this');
storageUtils.setStorage('temp_data_2', 'remove this too');

// 只保留 important_data，删除其他所有数据
storageUtils.clearSomeKey('important_data');

// 验证结果
console.log(storageUtils.getStorage('important_data')); // 'keep this'
console.log(storageUtils.getStorage('temp_data_1')); // null
console.log(storageUtils.getStorage('temp_data_2')); // null

// 如果不传参数，等同于 clear()
storageUtils.clearSomeKey(); // 清空所有数据`}
          </pre>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示 storageUtils 对象的各种代码使用示例。',
      },
    },
  },
};

// API 文档
export const APIDocumentation: Story = {
  render: () => (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-6">API 文档</h3>
      
      <div className="space-y-6">
        {/* 对象概述 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">对象概述</h4>
          <p className="text-sm text-gray-600 mb-2">
            <code>storageUtils</code> 是一个本地存储工具对象，提供了一套完整的 localStorage 操作方法。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm">
{`const storageUtils = {
  getStorage(key: string): any
  setStorage(key: string, value: any): void
  clear(): void
  clearSomeKey(key?: string): void
  remove(key: string): void
}`}
          </pre>
        </div>

        {/* 方法详情 */}
        <div className="space-y-4">
          {/* getStorage */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">getStorage</h4>
            <pre className="bg-gray-50 p-3 rounded text-sm mb-2">
{`getStorage(key: string): any`}
            </pre>
            <p className="text-sm text-gray-600 mb-2">从 localStorage 获取指定键的值。</p>
            <div className="text-sm">
              <p><strong>参数:</strong></p>
              <ul className="ml-4 space-y-1">
                <li>• <code>key</code> (string) - 要获取的键名</li>
              </ul>
              <p className="mt-2"><strong>返回值:</strong></p>
              <ul className="ml-4 space-y-1">
                <li>• 存储的值（自动解析 JSON）</li>
                <li>• <code>null</code> - 如果键不存在或发生错误</li>
              </ul>
            </div>
          </div>

          {/* setStorage */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">setStorage</h4>
            <pre className="bg-gray-50 p-3 rounded text-sm mb-2">
{`setStorage(key: string, value: any): void`}
            </pre>
            <p className="text-sm text-gray-600 mb-2">将值存储到 localStorage 中。</p>
            <div className="text-sm">
              <p><strong>参数:</strong></p>
              <ul className="ml-4 space-y-1">
                <li>• <code>key</code> (string) - 存储的键名</li>
                <li>• <code>value</code> (any) - 要存储的值（会自动转换为 JSON）</li>
              </ul>
            </div>
          </div>

          {/* remove */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">remove</h4>
            <pre className="bg-gray-50 p-3 rounded text-sm mb-2">
{`remove(key: string): void`}
            </pre>
            <p className="text-sm text-gray-600 mb-2">删除指定键的存储项。</p>
            <div className="text-sm">
              <p><strong>参数:</strong></p>
              <ul className="ml-4 space-y-1">
                <li>• <code>key</code> (string) - 要删除的键名</li>
              </ul>
            </div>
          </div>

          {/* clear */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">clear</h4>
            <pre className="bg-gray-50 p-3 rounded text-sm mb-2">
{`clear(): void`}
            </pre>
            <p className="text-sm text-gray-600">清空所有 localStorage 数据。</p>
          </div>

          {/* clearSomeKey */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">clearSomeKey</h4>
            <pre className="bg-gray-50 p-3 rounded text-sm mb-2">
{`clearSomeKey(key?: string): void`}
            </pre>
            <p className="text-sm text-gray-600 mb-2">选择性清除存储数据。</p>
            <div className="text-sm">
              <p><strong>参数:</strong></p>
              <ul className="ml-4 space-y-1">
                <li>• <code>key</code> (string, 可选) - 要保留的键名</li>
              </ul>
              <p className="mt-2"><strong>行为:</strong></p>
              <ul className="ml-4 space-y-1">
                <li>• 如果提供 <code>key</code>，则删除除该键外的所有数据</li>
                <li>• 如果不提供 <code>key</code>，则清空所有数据（等同于 <code>clear()</code>）</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 特性说明 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">特性说明</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>自动 JSON 处理:</strong> 存储时自动序列化，获取时自动反序列化</li>
            <li>• <strong>错误处理:</strong> 所有方法都有 try-catch 保护，不会抛出异常</li>
            <li>• <strong>SSR 兼容:</strong> 自动检测 window 和 localStorage 的可用性</li>
            <li>• <strong>类型安全:</strong> 支持 TypeScript，提供完整的类型定义</li>
          </ul>
        </div>

        {/* 注意事项 */}
        <div className="p-4 border rounded-lg bg-yellow-50">
          <h4 className="font-medium mb-2 text-yellow-800">注意事项</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• localStorage 有存储大小限制（通常为 5-10MB）</li>
            <li>• 在隐私模式下，localStorage 可能不可用</li>
            <li>• 存储的数据在用户清除浏览器数据时会被删除</li>
            <li>• 不要存储敏感信息，localStorage 数据可被用户访问</li>
            <li>• 大量数据的存储和读取可能影响性能</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'storageUtils 对象的完整 API 文档和技术说明。',
      },
    },
  },
};