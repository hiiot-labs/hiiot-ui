import type { Meta, StoryObj } from '@storybook/react';
import { waitAsyncData } from '../../utils';
import { useState, useEffect, useRef } from 'react';

const meta: Meta = {
  title: 'Utils/waitAsyncData',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '模拟异步数据获取的工具函数，可以控制是否延时返回数据，常用于测试、演示和开发环境。',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 交互式演示组件
const WaitAsyncDataDemo = () => {
  const [data, setData] = useState('Hello, World!');
  const [delay, setDelay] = useState(2000);
  const [isWait, setIsWait] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [executionHistory, setExecutionHistory] = useState<Array<{
    id: number;
    data: any;
    delay: number;
    isWait: boolean;
    startTime: string;
    endTime?: string;
    duration?: number;
    status: 'loading' | 'success' | 'error';
  }>>([]);
  const nextIdRef = useRef(1);

  const handleExecute = async () => {
    const id = nextIdRef.current++;
    const startTime = new Date().toLocaleTimeString();
    
    setLoading(true);
    setError(null);
    setResult(null);
    
    // 添加到执行历史
    const newRecord = {
      id,
      data,
      delay,
      isWait,
      startTime,
      status: 'loading' as const
    };
    
    setExecutionHistory(prev => [newRecord, ...prev.slice(0, 9)]);
    
    try {
      const startTimestamp = Date.now();
      const response = await waitAsyncData(data, delay, isWait);
      const endTimestamp = Date.now();
      const endTime = new Date().toLocaleTimeString();
      const duration = endTimestamp - startTimestamp;
      
      setResult(response);
      setLoading(false);
      
      // 更新执行历史
      setExecutionHistory(prev => 
        prev.map(record => 
          record.id === id 
            ? { ...record, endTime, duration, status: 'success' }
            : record
        )
      );
    } catch (err) {
      const endTime = new Date().toLocaleTimeString();
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
      
      // 更新执行历史
      setExecutionHistory(prev => 
        prev.map(record => 
          record.id === id 
            ? { ...record, endTime, status: 'error' }
            : record
        )
      );
    }
  };

  const dataTypes = [
    { label: '字符串', value: 'Hello, World!' },
    { label: '数字', value: 42 },
    { label: '布尔值', value: true },
    { label: '数组', value: [1, 2, 3, 'test'] },
    { label: '对象', value: { name: 'John', age: 30, city: 'New York' } },
    { label: 'null', value: null },
    { label: 'undefined', value: undefined },
  ];

  const presetDelays = [0, 500, 1000, 2000, 3000, 5000];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h3 className="text-lg font-semibold mb-6">异步数据模拟演示</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：控制面板 */}
        <div className="space-y-6">
          {/* 数据设置 */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">数据设置</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">数据类型</label>
                <select
                  value={JSON.stringify(data)}
                  onChange={(e) => setData(JSON.parse(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {dataTypes.map((type, index) => (
                    <option key={index} value={JSON.stringify(type.value)}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">自定义数据</label>
                <textarea
                  value={typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setData(parsed);
                    } catch {
                      setData(e.target.value);
                    }
                  }}
                  placeholder="输入数据或 JSON"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* 延时设置 */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">延时设置</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isWait"
                  checked={isWait}
                  onChange={(e) => setIsWait(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="isWait" className="text-sm font-medium">
                  启用延时 {!isWait && '(立即返回)'}
                </label>
              </div>
              
              {isWait && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      延时时间: {delay}ms
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={delay}
                      onChange={(e) => setDelay(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0ms</span>
                      <span>10s</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">快速设置</label>
                    <div className="flex flex-wrap gap-2">
                      {presetDelays.map(preset => (
                        <button
                          key={preset}
                          onClick={() => setDelay(preset)}
                          className={`px-3 py-1 text-sm rounded ${
                            delay === preset
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {preset}ms
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 执行按钮 */}
          <div className="p-4 border rounded-lg">
            <button
              onClick={handleExecute}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '执行中...' : '执行异步操作'}
            </button>
          </div>

          {/* 结果显示 */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">执行结果</h4>
            {loading && (
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm">正在获取数据...</span>
              </div>
            )}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                错误: {error}
              </div>
            )}
            {result !== null && !loading && (
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <div className="text-sm font-medium text-green-800 mb-2">成功获取数据:</div>
                <pre className="text-xs text-green-700 overflow-x-auto">
                  {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* 右侧：执行历史 */}
        <div className="space-y-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">执行历史</h4>
            {executionHistory.length === 0 ? (
              <p className="text-gray-500 text-sm">暂无执行记录</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {executionHistory.map(record => (
                  <div
                    key={record.id}
                    className={`p-3 rounded border text-sm ${
                      record.status === 'success' 
                        ? 'bg-green-50 border-green-200' 
                        : record.status === 'error'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">执行 #{record.id}</span>
                      <span className={`px-2 py-1 text-xs rounded ${
                        record.status === 'success' 
                          ? 'bg-green-100 text-green-800' 
                          : record.status === 'error'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {record.status === 'success' ? '成功' : 
                         record.status === 'error' ? '失败' : '执行中'}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-xs text-gray-600">
                      <div>数据: {typeof record.data === 'string' ? record.data : JSON.stringify(record.data)}</div>
                      <div>延时: {record.isWait ? `${record.delay}ms` : '无延时'}</div>
                      <div>开始: {record.startTime}</div>
                      {record.endTime && <div>结束: {record.endTime}</div>}
                      {record.duration !== undefined && (
                        <div>实际耗时: {record.duration}ms</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 批量测试演示组件
const BatchTestDemo = () => {
  const [tests, setTests] = useState([
    { id: 1, data: 'Test 1', delay: 1000, isWait: true, status: 'pending' },
    { id: 2, data: { message: 'Test 2' }, delay: 2000, isWait: true, status: 'pending' },
    { id: 3, data: [1, 2, 3], delay: 500, isWait: false, status: 'pending' },
    { id: 4, data: 42, delay: 3000, isWait: true, status: 'pending' },
  ]);
  const [results, setResults] = useState<Map<number, any>>(new Map());
  const [isRunning, setIsRunning] = useState(false);

  const runSingleTest = async (testId: number) => {
    const test = tests.find(t => t.id === testId);
    if (!test) return;

    setTests(prev => prev.map(t => 
      t.id === testId ? { ...t, status: 'running' } : t
    ));

    try {
      const result = await waitAsyncData(test.data, test.delay, test.isWait);
      setResults(prev => new Map(prev).set(testId, { success: true, data: result }));
      setTests(prev => prev.map(t => 
        t.id === testId ? { ...t, status: 'success' } : t
      ));
    } catch (error) {
      setResults(prev => new Map(prev).set(testId, { success: false, error }));
      setTests(prev => prev.map(t => 
        t.id === testId ? { ...t, status: 'error' } : t
      ));
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setResults(new Map());
    
    // 重置所有测试状态
    setTests(prev => prev.map(t => ({ ...t, status: 'pending' })));
    
    // 并行执行所有测试
    const promises = tests.map(test => runSingleTest(test.id));
    await Promise.all(promises);
    
    setIsRunning(false);
  };

  const resetTests = () => {
    setTests(prev => prev.map(t => ({ ...t, status: 'pending' })));
    setResults(new Map());
    setIsRunning(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-6">批量测试演示</h3>
      
      <div className="space-y-6">
        {/* 控制按钮 */}
        <div className="flex gap-3">
          <button
            onClick={runAllTests}
            disabled={isRunning}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isRunning ? '执行中...' : '运行所有测试'}
          </button>
          <button
            onClick={resetTests}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            重置测试
          </button>
        </div>

        {/* 测试列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tests.map(test => {
            const result = results.get(test.id);
            return (
              <div
                key={test.id}
                className={`p-4 border rounded-lg ${
                  test.status === 'success' 
                    ? 'bg-green-50 border-green-200' 
                    : test.status === 'error'
                    ? 'bg-red-50 border-red-200'
                    : test.status === 'running'
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">测试 #{test.id}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      test.status === 'success' 
                        ? 'bg-green-100 text-green-800' 
                        : test.status === 'error'
                        ? 'bg-red-100 text-red-800'
                        : test.status === 'running'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {test.status === 'success' ? '成功' : 
                       test.status === 'error' ? '失败' : 
                       test.status === 'running' ? '运行中' : '待执行'}
                    </span>
                    {test.status === 'running' && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div><strong>数据:</strong> {typeof test.data === 'string' ? test.data : JSON.stringify(test.data)}</div>
                  <div><strong>延时:</strong> {test.isWait ? `${test.delay}ms` : '无延时'}</div>
                  
                  {result && (
                    <div className="mt-3 p-2 bg-white rounded border">
                      <strong>结果:</strong>
                      {result.success ? (
                        <pre className="text-xs mt-1 text-green-700">
                          {typeof result.data === 'string' ? result.data : JSON.stringify(result.data, null, 2)}
                        </pre>
                      ) : (
                        <div className="text-xs mt-1 text-red-700">
                          错误: {result.error?.message || 'Unknown error'}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="mt-3">
                  <button
                    onClick={() => runSingleTest(test.id)}
                    disabled={test.status === 'running' || isRunning}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                  >
                    单独运行
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 基础演示
export const Default: Story = {
  render: () => <WaitAsyncDataDemo />,
};

// 批量测试演示
export const BatchTest: Story = {
  render: () => <BatchTestDemo />,
  parameters: {
    docs: {
      description: {
        story: '演示如何使用 waitAsyncData 函数进行批量异步数据测试，包括并行执行和状态管理。',
      },
    },
  },
};

// 使用场景演示
export const UsageScenarios: Story = {
  render: () => (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h3 className="text-lg font-semibold">使用场景演示</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 场景 1: 开发环境测试 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">场景 1: 开发环境测试</h4>
          <p className="text-sm text-gray-600 mb-3">
            在开发过程中模拟 API 响应，测试加载状态和错误处理。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
{`// 模拟 API 响应
async function fetchUserData(userId: string) {
  // 开发环境使用模拟数据
  if (process.env.NODE_ENV === 'development') {
    return waitAsyncData({
      id: userId,
      name: 'John Doe',
      email: 'john@example.com'
    }, 1500);
  }
  
  // 生产环境使用真实 API
  return fetch(\`/api/users/\${userId}\`).then(res => res.json());
}`}
          </pre>
        </div>

        {/* 场景 2: 组件演示 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">场景 2: 组件演示</h4>
          <p className="text-sm text-gray-600 mb-3">
            在 Storybook 或演示环境中模拟异步数据加载。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
{`// Storybook 故事中的数据模拟
export const LoadingState = {
  render: () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      waitAsyncData(['Item 1', 'Item 2', 'Item 3'], 2000)
        .then(result => {
          setData(result);
          setLoading(false);
        });
    }, []);
    
    return <DataList data={data} loading={loading} />;
  }
};`}
          </pre>
        </div>

        {/* 场景 3: 性能测试 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">场景 3: 性能测试</h4>
          <p className="text-sm text-gray-600 mb-3">
            模拟不同网络条件下的数据加载，测试应用性能。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
{`// 模拟不同网络条件
const networkConditions = {
  fast: 100,    // 快速网络
  normal: 1000, // 正常网络
  slow: 3000,   // 慢速网络
  offline: 0    // 离线模式
};

async function loadDataWithCondition(condition: keyof typeof networkConditions) {
  const delay = networkConditions[condition];
  
  if (condition === 'offline') {
    throw new Error('Network unavailable');
  }
  
  return waitAsyncData({ message: 'Data loaded' }, delay);
}`}
          </pre>
        </div>

        {/* 场景 4: 渐进式加载 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">场景 4: 渐进式加载</h4>
          <p className="text-sm text-gray-600 mb-3">
            模拟分步骤的数据加载过程，优化用户体验。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
{`// 渐进式数据加载
async function loadPageData() {
  // 第一步：加载基础数据（快速）
  const basicData = await waitAsyncData({
    title: 'Page Title',
    layout: 'default'
  }, 200);
  
  // 第二步：加载主要内容（中等速度）
  const mainContent = await waitAsyncData({
    articles: ['Article 1', 'Article 2'],
    featured: 'Featured Content'
  }, 800);
  
  // 第三步：加载次要内容（较慢）
  const secondaryContent = await waitAsyncData({
    sidebar: 'Sidebar Content',
    footer: 'Footer Content'
  }, 1500);
  
  return { basicData, mainContent, secondaryContent };
}`}
          </pre>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示 waitAsyncData 函数在实际开发中的常见使用场景。',
      },
    },
  },
};

// 代码示例
export const CodeExamples: Story = {
  render: () => (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h3 className="text-lg font-semibold">代码示例</h3>
      
      <div className="space-y-6">
        {/* 基础用法 */}
        <div>
          <h4 className="font-medium mb-2">基础用法</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`import { waitAsyncData } from '@/utils';

// 基础用法 - 延时返回数据
const data = await waitAsyncData('Hello World', 2000, true);
console.log(data); // 2秒后输出: "Hello World"

// 立即返回数据
const immediateData = await waitAsyncData('Immediate', 1000, false);
console.log(immediateData); // 立即输出: "Immediate"

// 返回复杂数据
const complexData = await waitAsyncData({
  users: [{ id: 1, name: 'John' }],
  total: 1
}, 1500);`}
          </pre>
        </div>

        {/* React Hook 封装 */}
        <div>
          <h4 className="font-medium mb-2">React Hook 封装</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`import { useState, useEffect } from 'react';
import { waitAsyncData } from '@/utils';

// 自定义 Hook
function useAsyncData<T>(
  data: T, 
  delay: number = 1000, 
  isWait: boolean = true
) {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await waitAsyncData(data, delay, isWait);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [data, delay, isWait]);
  
  return { result, loading, error, refetch: fetchData };
}

// 使用示例
function MyComponent() {
  const { result, loading, error } = useAsyncData(
    { message: 'Hello' }, 
    2000, 
    true
  );
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{JSON.stringify(result)}</div>;
}`}
          </pre>
        </div>

        {/* 错误处理 */}
        <div>
          <h4 className="font-medium mb-2">错误处理和重试</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`// 带重试机制的数据获取
async function fetchWithRetry<T>(
  data: T,
  delay: number = 1000,
  maxRetries: number = 3
): Promise<T> {
  let attempts = 0;
  
  while (attempts < maxRetries) {
    try {
      attempts++;
      
      // 模拟可能失败的操作
      if (Math.random() < 0.3) {
        throw new Error('Random failure');
      }
      
      return await waitAsyncData(data, delay);
    } catch (error) {
      console.warn(\`Attempt \${attempts} failed:\`, error);
      
      if (attempts >= maxRetries) {
        throw new Error(\`Failed after \${maxRetries} attempts: \${error.message}\`);
      }
      
      // 指数退避
      const backoffDelay = delay * Math.pow(2, attempts - 1);
      await waitAsyncData(null, backoffDelay, true);
    }
  }
  
  throw new Error('Unexpected error');
}

// 使用示例
try {
  const data = await fetchWithRetry({ id: 1 }, 1000, 3);
  console.log('Success:', data);
} catch (error) {
  console.error('Final failure:', error);
}`}
          </pre>
        </div>

        {/* 并发控制 */}
        <div>
          <h4 className="font-medium mb-2">并发控制</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`// 并发限制的数据获取
async function fetchConcurrently<T>(
  items: T[],
  delay: number = 1000,
  concurrency: number = 3
): Promise<T[]> {
  const results: T[] = [];
  
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    
    const batchPromises = batch.map(item => 
      waitAsyncData(item, delay)
    );
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    console.log(\`Processed batch \${Math.floor(i / concurrency) + 1}\`);
  }
  
  return results;
}

// 使用示例
const items = Array.from({ length: 10 }, (_, i) => \`Item \${i + 1}\`);
const results = await fetchConcurrently(items, 1000, 3);
console.log('All results:', results);`}
          </pre>
        </div>

        {/* 缓存机制 */}
        <div>
          <h4 className="font-medium mb-2">缓存机制</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`// 带缓存的数据获取
class AsyncDataCache {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private ttl = 5 * 60 * 1000; // 5分钟缓存
  
  async get<T>(
    key: string,
    data: T,
    delay: number = 1000,
    isWait: boolean = true
  ): Promise<T> {
    const cached = this.cache.get(key);
    
    // 检查缓存是否有效
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      console.log('Cache hit:', key);
      return cached.data;
    }
    
    console.log('Cache miss, fetching:', key);
    const result = await waitAsyncData(data, delay, isWait);
    
    // 更新缓存
    this.cache.set(key, {
      data: result,
      timestamp: Date.now()
    });
    
    return result;
  }
  
  clear() {
    this.cache.clear();
  }
}

// 使用示例
const cache = new AsyncDataCache();

const userData = await cache.get(
  'user:123',
  { id: 123, name: 'John' },
  2000
);`}
          </pre>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示 waitAsyncData 函数的各种使用方式和最佳实践。',
      },
    },
  },
};

// API 文档
export const Documentation: Story = {
  render: () => (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h3 className="text-lg font-semibold">API 文档</h3>
      
      <div className="space-y-6">
        {/* 函数签名 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">函数签名</h4>
          <pre className="bg-gray-50 p-3 rounded text-sm">
{`waitAsyncData<T>(data: T, time?: number, isWait?: boolean): Promise<T>`}
          </pre>
        </div>

        {/* 参数说明 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">参数说明</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">参数</th>
                  <th className="text-left p-2 font-medium">类型</th>
                  <th className="text-left p-2 font-medium">默认值</th>
                  <th className="text-left p-2 font-medium">必填</th>
                  <th className="text-left p-2 font-medium">说明</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-mono">data</td>
                  <td className="p-2 font-mono">T</td>
                  <td className="p-2">-</td>
                  <td className="p-2">是</td>
                  <td className="p-2">要返回的数据，可以是任意类型</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">time</td>
                  <td className="p-2 font-mono">number</td>
                  <td className="p-2">1000</td>
                  <td className="p-2">否</td>
                  <td className="p-2">延时时间，单位为毫秒</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">isWait</td>
                  <td className="p-2 font-mono">boolean</td>
                  <td className="p-2">true</td>
                  <td className="p-2">否</td>
                  <td className="p-2">是否启用延时，false 时立即返回数据</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 返回值 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">返回值</h4>
          <div className="space-y-2 text-sm">
            <div><strong>类型:</strong> <code>Promise&lt;T&gt;</code></div>
            <div><strong>说明:</strong> 返回一个 Promise，resolve 传入的 data 参数</div>
            <div><strong>行为:</strong> 
              <ul className="mt-2 space-y-1 ml-4">
                <li>• 当 <code>isWait</code> 为 <code>true</code> 时，在指定时间后 resolve</li>
                <li>• 当 <code>isWait</code> 为 <code>false</code> 时，立即 resolve</li>
                <li>• 始终 resolve，不会 reject（除非传入的 data 本身有问题）</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 特性 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">特性</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>支持任意数据类型（泛型支持）</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>可控制的延时行为</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Promise 接口，支持 async/await</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>轻量级实现，无外部依赖</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>TypeScript 类型安全</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>适用于测试和开发环境</span>
            </li>
          </ul>
        </div>

        {/* 使用场景 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">适用场景</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span><strong>开发测试:</strong> 模拟 API 响应，测试加载状态</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span><strong>组件演示:</strong> Storybook 中的数据模拟</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span><strong>性能测试:</strong> 模拟不同网络条件</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span><strong>原型开发:</strong> 快速构建可交互的原型</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span><strong>教学演示:</strong> 展示异步编程概念</span>
            </li>
          </ul>
        </div>

        {/* 注意事项 */}
        <div className="p-4 border rounded-lg bg-yellow-50">
          <h4 className="font-medium mb-3 text-yellow-800">注意事项</h4>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">⚠</span>
              <span>仅用于开发和测试环境，不建议在生产环境使用</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">⚠</span>
              <span>延时时间不能为负数，建议最小值为 0</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">⚠</span>
              <span>大量并发调用可能影响性能，建议控制并发数</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">⚠</span>
              <span>在 React 组件中使用时注意清理未完成的 Promise</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">⚠</span>
              <span>传入的 data 会被直接返回，不会进行深拷贝</span>
            </li>
          </ul>
        </div>

        {/* 浏览器兼容性 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">浏览器兼容性</h4>
          <div className="text-sm">
            <p className="mb-2">基于标准的 Promise 和 setTimeout API，支持所有现代浏览器：</p>
            <ul className="space-y-1 text-gray-600">
              <li>• Chrome: 32+</li>
              <li>• Firefox: 29+</li>
              <li>• Safari: 8+</li>
              <li>• Edge: 所有版本</li>
              <li>• IE: 不支持（需要 Promise polyfill）</li>
              <li>• Node.js: 0.12+</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'waitAsyncData 函数的完整 API 文档，包括参数说明、返回值、特性和注意事项。',
      },
    },
  },
};