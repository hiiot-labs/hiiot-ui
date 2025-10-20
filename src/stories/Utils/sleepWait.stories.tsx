import type { Meta, StoryObj } from '@storybook/react';
import { sleepWait } from '../../utils';
import { useState, useRef } from 'react';

const meta: Meta = {
  title: 'Utils/sleepWait',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '延时等待工具函数，在指定延迟后执行回调函数。返回定时器 ID，可用于取消定时器。',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 交互式演示组件
const SleepWaitDemo = () => {
  const [delay, setDelay] = useState(2000);
  const [message, setMessage] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);
  const [executionHistory, setExecutionHistory] = useState<Array<{
    id: number;
    delay: number;
    startTime: string;
    endTime?: string;
    status: 'waiting' | 'completed' | 'cancelled';
    message: string;
  }>>([]);
  const [activeTimers, setActiveTimers] = useState<Map<number, NodeJS.Timeout>>(new Map());
  const nextId = useRef(1);

  const handleExecute = () => {
    const id = nextId.current++;
    const startTime = new Date().toLocaleTimeString();
    
    // 添加到执行历史
    const newRecord = {
      id,
      delay,
      startTime,
      status: 'waiting' as const,
      message: `等待 ${delay}ms 后执行...`
    };
    
    setExecutionHistory(prev => [newRecord, ...prev.slice(0, 9)]);
    setIsWaiting(true);
    
    // 执行 sleepWait
    const timerId = sleepWait(() => {
      const endTime = new Date().toLocaleTimeString();
      setMessage(`✅ 延时执行完成！(ID: ${id})`);
      setIsWaiting(false);
      
      // 更新执行历史
      setExecutionHistory(prev => 
        prev.map(record => 
          record.id === id 
            ? { ...record, endTime, status: 'completed', message: '执行完成' }
            : record
        )
      );
      
      // 从活动定时器中移除
      setActiveTimers(prev => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
    }, delay);
    
    // 添加到活动定时器
    setActiveTimers(prev => new Map(prev).set(id, timerId));
  };

  const handleCancel = (id: number) => {
    const timerId = activeTimers.get(id);
    if (timerId) {
      clearTimeout(timerId);
      setActiveTimers(prev => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
      
      // 更新执行历史
      setExecutionHistory(prev => 
        prev.map(record => 
          record.id === id 
            ? { ...record, status: 'cancelled', message: '已取消' }
            : record
        )
      );
      
      setMessage(`❌ 定时器已取消 (ID: ${id})`);
    }
  };

  const handleCancelAll = () => {
    activeTimers.forEach((timerId, id) => {
      clearTimeout(timerId);
      setExecutionHistory(prev => 
        prev.map(record => 
          record.id === id && record.status === 'waiting'
            ? { ...record, status: 'cancelled', message: '批量取消' }
            : record
        )
      );
    });
    setActiveTimers(new Map());
    setIsWaiting(false);
    setMessage('🚫 所有定时器已取消');
  };

  const presetDelays = [500, 1000, 2000, 3000, 5000];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-6">延时等待演示</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：控制面板 */}
        <div className="space-y-6">
          {/* 延时设置 */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">延时设置</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  延时时间: {delay}ms
                </label>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={delay}
                  onChange={(e) => setDelay(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>100ms</span>
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
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">操作控制</h4>
            <div className="space-y-3">
              <button
                onClick={handleExecute}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                开始延时执行
              </button>
              
              {activeTimers.size > 0 && (
                <button
                  onClick={handleCancelAll}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  取消所有定时器 ({activeTimers.size})
                </button>
              )}
            </div>
          </div>

          {/* 状态显示 */}
          {message && (
            <div className="p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-2">执行状态</h4>
              <p className="text-sm">{message}</p>
            </div>
          )}
        </div>

        {/* 右侧：执行历史 */}
        <div className="space-y-6">
          {/* 活动定时器 */}
          {activeTimers.size > 0 && (
            <div className="p-4 border rounded-lg bg-yellow-50">
              <h4 className="font-medium mb-3 text-yellow-800">活动定时器</h4>
              <div className="space-y-2">
                {Array.from(activeTimers.entries()).map(([id, timerId]) => {
                  const record = executionHistory.find(r => r.id === id);
                  return (
                    <div key={id} className="flex items-center justify-between p-2 bg-white rounded border">
                      <div className="text-sm">
                        <div className="font-medium">ID: {id}</div>
                        <div className="text-gray-600">
                          延时: {record?.delay}ms | 开始: {record?.startTime}
                        </div>
                      </div>
                      <button
                        onClick={() => handleCancel(id)}
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        取消
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 执行历史 */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">执行历史</h4>
            {executionHistory.length === 0 ? (
              <p className="text-gray-500 text-sm">暂无执行记录</p>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {executionHistory.map(record => (
                  <div
                    key={record.id}
                    className={`p-3 rounded border text-sm ${
                      record.status === 'completed' 
                        ? 'bg-green-50 border-green-200' 
                        : record.status === 'cancelled'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">ID: {record.id}</span>
                      <span className={`px-2 py-1 text-xs rounded ${
                        record.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : record.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {record.status === 'completed' ? '已完成' : 
                         record.status === 'cancelled' ? '已取消' : '等待中'}
                      </span>
                    </div>
                    <div className="text-gray-600">
                      <div>延时: {record.delay}ms</div>
                      <div>开始: {record.startTime}</div>
                      {record.endTime && <div>结束: {record.endTime}</div>}
                      <div>状态: {record.message}</div>
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

// 批量延时演示组件
const BatchSleepWaitDemo = () => {
  const [tasks, setTasks] = useState<Array<{
    id: number;
    name: string;
    delay: number;
    status: 'pending' | 'running' | 'completed' | 'cancelled';
    startTime?: string;
    endTime?: string;
  }>>([
    { id: 1, name: '任务 1', delay: 1000, status: 'pending' },
    { id: 2, name: '任务 2', delay: 2000, status: 'pending' },
    { id: 3, name: '任务 3', delay: 3000, status: 'pending' },
    { id: 4, name: '任务 4', delay: 1500, status: 'pending' },
  ]);
  const [activeTimers, setActiveTimers] = useState<Map<number, NodeJS.Timeout>>(new Map());

  const executeTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.status !== 'pending') return;

    const startTime = new Date().toLocaleTimeString();
    
    // 更新任务状态
    setTasks(prev => prev.map(t => 
      t.id === taskId 
        ? { ...t, status: 'running', startTime }
        : t
    ));

    // 执行延时任务
    const timerId = sleepWait(() => {
      const endTime = new Date().toLocaleTimeString();
      setTasks(prev => prev.map(t => 
        t.id === taskId 
          ? { ...t, status: 'completed', endTime }
          : t
      ));
      
      // 从活动定时器中移除
      setActiveTimers(prev => {
        const newMap = new Map(prev);
        newMap.delete(taskId);
        return newMap;
      });
    }, task.delay);

    // 添加到活动定时器
    setActiveTimers(prev => new Map(prev).set(taskId, timerId));
  };

  const cancelTask = (taskId: number) => {
    const timerId = activeTimers.get(taskId);
    if (timerId) {
      clearTimeout(timerId);
      setActiveTimers(prev => {
        const newMap = new Map(prev);
        newMap.delete(taskId);
        return newMap;
      });
      
      setTasks(prev => prev.map(t => 
        t.id === taskId 
          ? { ...t, status: 'cancelled' }
          : t
      ));
    }
  };

  const executeAllTasks = () => {
    tasks.forEach(task => {
      if (task.status === 'pending') {
        executeTask(task.id);
      }
    });
  };

  const resetAllTasks = () => {
    // 取消所有活动定时器
    activeTimers.forEach(timerId => clearTimeout(timerId));
    setActiveTimers(new Map());
    
    // 重置所有任务状态
    setTasks(prev => prev.map(t => ({
      ...t,
      status: 'pending',
      startTime: undefined,
      endTime: undefined
    })));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-6">批量延时任务演示</h3>
      
      <div className="space-y-6">
        {/* 控制按钮 */}
        <div className="flex gap-3">
          <button
            onClick={executeAllTasks}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            执行所有任务
          </button>
          <button
            onClick={resetAllTasks}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            重置所有任务
          </button>
        </div>

        {/* 任务列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`p-4 border rounded-lg ${
                task.status === 'completed' 
                  ? 'bg-green-50 border-green-200' 
                  : task.status === 'running'
                  ? 'bg-blue-50 border-blue-200'
                  : task.status === 'cancelled'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{task.name}</h4>
                <span className={`px-2 py-1 text-xs rounded ${
                  task.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : task.status === 'running'
                    ? 'bg-blue-100 text-blue-800'
                    : task.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {task.status === 'completed' ? '已完成' : 
                   task.status === 'running' ? '运行中' : 
                   task.status === 'cancelled' ? '已取消' : '待执行'}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-3">
                <div>延时: {task.delay}ms</div>
                {task.startTime && <div>开始: {task.startTime}</div>}
                {task.endTime && <div>结束: {task.endTime}</div>}
              </div>
              
              <div className="flex gap-2">
                {task.status === 'pending' && (
                  <button
                    onClick={() => executeTask(task.id)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    执行
                  </button>
                )}
                {task.status === 'running' && (
                  <button
                    onClick={() => cancelTask(task.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    取消
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 基础演示
export const Default: Story = {
  render: () => <SleepWaitDemo />,
};

// 批量任务演示
export const BatchTasks: Story = {
  render: () => <BatchSleepWaitDemo />,
  parameters: {
    docs: {
      description: {
        story: '演示如何使用 sleepWait 函数管理多个延时任务，包括批量执行、单独控制和状态跟踪。',
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
        {/* 场景 1: 延迟加载 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">场景 1: 延迟加载</h4>
          <p className="text-sm text-gray-600 mb-3">
            在页面加载后延迟执行某些操作，避免阻塞主要内容的渲染。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
{`// 延迟加载非关键资源
sleepWait(() => {
  // 加载分析脚本
  loadAnalytics();
  // 加载广告
  loadAds();
  // 预加载下一页内容
  preloadNextPage();
}, 2000);`}
          </pre>
        </div>

        {/* 场景 2: 用户体验优化 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">场景 2: 用户体验优化</h4>
          <p className="text-sm text-gray-600 mb-3">
            在用户操作后延迟显示提示信息或执行清理操作。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
{`// 延迟隐藏成功提示
function showSuccessMessage(message) {
  showToast(message);
  
  sleepWait(() => {
    hideToast();
  }, 3000);
}`}
          </pre>
        </div>

        {/* 场景 3: 动画序列 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">场景 3: 动画序列</h4>
          <p className="text-sm text-gray-600 mb-3">
            创建复杂的动画序列，控制动画的执行时机。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
{`// 动画序列执行
function playAnimationSequence() {
  // 第一个动画
  startAnimation1();
  
  sleepWait(() => {
    // 第二个动画
    startAnimation2();
    
    sleepWait(() => {
      // 第三个动画
      startAnimation3();
    }, 500);
  }, 1000);
}`}
          </pre>
        </div>

        {/* 场景 4: 防抖处理 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">场景 4: 防抖处理</h4>
          <p className="text-sm text-gray-600 mb-3">
            实现简单的防抖功能，延迟执行用户操作。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
{`// 简单防抖实现
let searchTimer;

function handleSearch(query) {
  if (searchTimer) {
    clearTimeout(searchTimer);
  }
  
  searchTimer = sleepWait(() => {
    performSearch(query);
  }, 300);
}`}
          </pre>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示 sleepWait 函数在实际开发中的常见使用场景。',
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
{`import { sleepWait } from '@/utils';

// 基础延时执行
const timerId = sleepWait(() => {
  console.log('延时执行完成');
}, 2000);

// 可以取消定时器
clearTimeout(timerId);`}
          </pre>
        </div>

        {/* React Hook 封装 */}
        <div>
          <h4 className="font-medium mb-2">React Hook 封装</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`import { useCallback, useRef } from 'react';
import { sleepWait } from '@/utils';

function useSleepWait() {
  const timersRef = useRef<Set<NodeJS.Timeout>>(new Set());
  
  const execute = useCallback((callback: Function, delay: number) => {
    const timerId = sleepWait(() => {
      callback();
      timersRef.current.delete(timerId);
    }, delay);
    
    timersRef.current.add(timerId);
    return timerId;
  }, []);
  
  const cancelAll = useCallback(() => {
    timersRef.current.forEach(timerId => clearTimeout(timerId));
    timersRef.current.clear();
  }, []);
  
  // 组件卸载时清理所有定时器
  useEffect(() => {
    return () => cancelAll();
  }, [cancelAll]);
  
  return { execute, cancelAll };
}

// 使用示例
function MyComponent() {
  const { execute, cancelAll } = useSleepWait();
  
  const handleClick = () => {
    execute(() => {
      console.log('延时执行');
    }, 1000);
  };
  
  return (
    <div>
      <button onClick={handleClick}>延时执行</button>
      <button onClick={cancelAll}>取消所有</button>
    </div>
  );
}`}
          </pre>
        </div>

        {/* 链式调用 */}
        <div>
          <h4 className="font-medium mb-2">链式调用</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`// 创建链式延时执行
function createChain(tasks: Array<{ callback: Function; delay: number }>) {
  let index = 0;
  
  function executeNext() {
    if (index >= tasks.length) return;
    
    const task = tasks[index++];
    sleepWait(() => {
      task.callback();
      executeNext(); // 执行下一个任务
    }, task.delay);
  }
  
  executeNext();
}

// 使用示例
createChain([
  { callback: () => console.log('第一步'), delay: 1000 },
  { callback: () => console.log('第二步'), delay: 2000 },
  { callback: () => console.log('第三步'), delay: 1500 },
]);`}
          </pre>
        </div>

        {/* 错误处理 */}
        <div>
          <h4 className="font-medium mb-2">错误处理</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`// 带错误处理的延时执行
function safeSleepWait(callback: Function, delay: number) {
  return sleepWait(() => {
    try {
      callback();
    } catch (error) {
      console.error('延时执行出错:', error);
      // 可以添加错误上报逻辑
      reportError(error);
    }
  }, delay);
}

// 带重试机制的延时执行
function sleepWaitWithRetry(
  callback: Function, 
  delay: number, 
  maxRetries: number = 3
) {
  let attempts = 0;
  
  function attempt() {
    attempts++;
    
    sleepWait(() => {
      try {
        callback();
      } catch (error) {
        console.warn(\`第 \${attempts} 次尝试失败:\`, error);
        
        if (attempts < maxRetries) {
          console.log(\`将在 \${delay}ms 后重试...\`);
          attempt(); // 重试
        } else {
          console.error('所有重试都失败了');
          throw error;
        }
      }
    }, delay);
  }
  
  attempt();
}`}
          </pre>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示 sleepWait 函数的各种使用方式和最佳实践。',
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
{`sleepWait(callback: Function, delay: number): NodeJS.Timeout`}
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
                  <th className="text-left p-2 font-medium">必填</th>
                  <th className="text-left p-2 font-medium">说明</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-mono">callback</td>
                  <td className="p-2 font-mono">Function</td>
                  <td className="p-2">是</td>
                  <td className="p-2">延时执行的回调函数</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">delay</td>
                  <td className="p-2 font-mono">number</td>
                  <td className="p-2">是</td>
                  <td className="p-2">延时时间，单位为毫秒</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 返回值 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">返回值</h4>
          <div className="space-y-2 text-sm">
            <div><strong>类型:</strong> <code>NodeJS.Timeout</code></div>
            <div><strong>说明:</strong> 返回定时器 ID，可用于 <code>clearTimeout()</code> 取消定时器</div>
          </div>
        </div>

        {/* 特性 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">特性</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>简单易用的延时执行接口</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>返回定时器 ID，支持取消操作</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>自动清理定时器，避免内存泄漏</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>TypeScript 类型支持</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>浏览器和 Node.js 环境兼容</span>
            </li>
          </ul>
        </div>

        {/* 注意事项 */}
        <div className="p-4 border rounded-lg bg-yellow-50">
          <h4 className="font-medium mb-3 text-yellow-800">注意事项</h4>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">⚠</span>
              <span>记得在组件卸载时清理未完成的定时器，避免内存泄漏</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">⚠</span>
              <span>延时时间不能为负数，建议最小值为 0</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">⚠</span>
              <span>回调函数中的错误不会被自动捕获，需要手动处理</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">⚠</span>
              <span>在 React 组件中使用时，注意闭包陷阱问题</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">⚠</span>
              <span>大量并发定时器可能影响性能，建议合理控制数量</span>
            </li>
          </ul>
        </div>

        {/* 浏览器兼容性 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">浏览器兼容性</h4>
          <div className="text-sm">
            <p className="mb-2">基于标准的 <code>setTimeout</code> API，支持所有现代浏览器：</p>
            <ul className="space-y-1 text-gray-600">
              <li>• Chrome: 所有版本</li>
              <li>• Firefox: 所有版本</li>
              <li>• Safari: 所有版本</li>
              <li>• Edge: 所有版本</li>
              <li>• IE: 9+</li>
              <li>• Node.js: 所有版本</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'sleepWait 函数的完整 API 文档，包括参数说明、返回值、特性和注意事项。',
      },
    },
  },
};