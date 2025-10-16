import type { Meta, StoryObj } from '@storybook/react';
import { useState, useCallback, useRef, useEffect } from 'react';
import { throttle } from '../../utils';

// 主演示组件
function ThrottleDemo() {
  const [scrollCount, setScrollCount] = useState(0);
  const [resizeCount, setResizeCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // 节流滚动处理
  const throttledScroll = useCallback(
    throttle(() => {
      setScrollCount(prev => prev + 1);
    }, 100),
    []
  );

  // 节流窗口大小调整处理
  const throttledResize = useCallback(
    throttle(() => {
      setResizeCount(prev => prev + 1);
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }, 250),
    []
  );

  // 节流点击处理
  const throttledClick = useCallback(
    throttle(() => {
      setClickCount(prev => prev + 1);
    }, 500),
    []
  );

  // 节流鼠标移动处理
  const throttledMouseMove = useCallback(
    throttle((e: React.MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }, 50),
    []
  );

  // 初始化窗口大小
  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // 添加窗口大小调整监听器
    window.addEventListener('resize', throttledResize);
    return () => window.removeEventListener('resize', throttledResize);
  }, [throttledResize]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>throttle 工具函数演示</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3>滚动事件节流示例</h3>
        <div
          onScroll={throttledScroll}
          style={{
            height: '200px',
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '4px',
            overflow: 'auto',
            padding: '10px',
            backgroundColor: '#f8f9fa'
          }}
        >
          <div style={{ height: '600px', padding: '10px' }}>
            <p>滚动这个区域来测试节流效果</p>
            <p><strong>节流滚动事件触发次数:</strong> {scrollCount}</p>
            <div style={{ marginTop: '20px' }}>
              {Array.from({ length: 30 }, (_, i) => (
                <p key={i} style={{ margin: '10px 0' }}>
                  这是第 {i + 1} 行内容，继续滚动测试节流效果...
                </p>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>
          滚动事件被节流处理（100ms 间隔），减少了函数调用频率
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>鼠标移动节流示例</h3>
        <div
          onMouseMove={throttledMouseMove}
          style={{
            height: '200px',
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#e3f2fd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'crosshair',
            position: 'relative'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p>在这个区域移动鼠标</p>
            <p><strong>鼠标位置:</strong> X: {mousePosition.x}, Y: {mousePosition.y}</p>
          </div>
          <div
            style={{
              position: 'absolute',
              left: mousePosition.x - 5,
              top: mousePosition.y - 5,
              width: '10px',
              height: '10px',
              backgroundColor: 'red',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}
          />
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>
          鼠标移动事件被节流处理（50ms 间隔），提升性能
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>按钮点击节流示例</h3>
        <button
          onClick={throttledClick}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          点击我 (节流 500ms)
        </button>
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          <p>节流点击次数: {clickCount}</p>
          <p style={{ fontSize: '12px', color: '#999' }}>
            快速连续点击时，每 500ms 最多执行一次
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>窗口大小调整节流示例</h3>
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#fff3cd', 
          borderRadius: '4px',
          border: '1px solid #ffeaa7'
        }}>
          <p><strong>窗口大小调整事件触发次数:</strong> {resizeCount}</p>
          <p><strong>当前窗口大小:</strong> {windowSize.width} × {windowSize.height}</p>
          <p style={{ fontSize: '12px', color: '#856404', marginTop: '10px' }}>
            调整浏览器窗口大小来测试节流效果（250ms 间隔）
          </p>
        </div>
      </div>
    </div>
  );
}

// 基本用法示例
function BasicUsageExample() {
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState('');

  const throttledClick = useCallback(
    throttle(() => {
      setClickCount(prev => prev + 1);
      setLastClickTime(new Date().toLocaleTimeString());
    }, 1000),
    []
  );

  return (
    <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <h3>基本用法</h3>
      <button
        onClick={throttledClick}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        节流按钮 (1秒间隔)
      </button>
      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <p><strong>执行次数:</strong> {clickCount}</p>
        <p><strong>最后执行时间:</strong> {lastClickTime || '尚未执行'}</p>
      </div>
    </div>
  );
}

// 搜索建议示例
function SearchSuggestionsExample() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchCount, setSearchCount] = useState(0);

  const throttledSearch = useCallback(
    throttle((searchQuery: string) => {
      if (searchQuery.trim()) {
        setSearchCount(prev => prev + 1);
        // 模拟搜索建议 API 调用
        const mockSuggestions = [
          `${searchQuery} 建议 1`,
          `${searchQuery} 建议 2`,
          `${searchQuery} 建议 3`,
          `${searchQuery} 相关搜索`,
        ];
        setSuggestions(mockSuggestions);
      } else {
        setSuggestions([]);
      }
    }, 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    throttledSearch(value);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <h3>搜索建议节流示例</h3>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="输入搜索关键词..."
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            fontSize: '16px'
          }}
        />
        
        {suggestions.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            maxHeight: '200px',
            overflowY: 'auto',
            zIndex: 1000
          }}>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                style={{
                  padding: '10px',
                  borderBottom: index < suggestions.length - 1 ? '1px solid #eee' : 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                onClick={() => {
                  setQuery(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div style={{ 
        marginTop: '15px', 
        padding: '10px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <p><strong>搜索请求次数:</strong> {searchCount}</p>
        <p style={{ color: '#666', fontSize: '12px' }}>
          搜索建议请求被节流处理（300ms 间隔），避免过于频繁的 API 调用
        </p>
      </div>
    </div>
  );
}

// 滚动加载示例
function ScrollLoadExample() {
  const [items, setItems] = useState<number[]>(Array.from({ length: 20 }, (_, i) => i + 1));
  const [loading, setLoading] = useState(false);
  const [loadCount, setLoadCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const throttledScrollLoad = useCallback(
    throttle(() => {
      const container = containerRef.current;
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        // 当滚动到底部附近时加载更多
        if (scrollTop + clientHeight >= scrollHeight - 50 && !loading) {
          setLoading(true);
          setLoadCount(prev => prev + 1);
          
          // 模拟加载延迟
          setTimeout(() => {
            setItems(prev => [
              ...prev,
              ...Array.from({ length: 10 }, (_, i) => prev.length + i + 1)
            ]);
            setLoading(false);
          }, 1000);
        }
      }
    }, 200),
    [loading]
  );

  return (
    <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <h3>滚动加载节流示例</h3>
      <div
        ref={containerRef}
        onScroll={throttledScrollLoad}
        style={{
          height: '300px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          overflow: 'auto',
          padding: '10px'
        }}
      >
        {items.map(item => (
          <div
            key={item}
            style={{
              padding: '10px',
              margin: '5px 0',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              border: '1px solid #e9ecef'
            }}
          >
            列表项 #{item}
          </div>
        ))}
        
        {loading && (
          <div style={{
            padding: '20px',
            textAlign: 'center',
            color: '#666'
          }}>
            加载中...
          </div>
        )}
      </div>
      
      <div style={{ 
        marginTop: '15px', 
        padding: '10px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <p><strong>加载次数:</strong> {loadCount}</p>
        <p><strong>当前项目数:</strong> {items.length}</p>
        <p style={{ color: '#666', fontSize: '12px' }}>
          滚动到底部触发加载，节流处理（200ms 间隔）防止重复加载
        </p>
      </div>
    </div>
  );
}

const meta: Meta<typeof ThrottleDemo> = {
  title: 'Utils/throttle',
  component: ThrottleDemo,
  parameters: {
    docs: {
      description: {
        component: `
## throttle

节流工具函数，用于限制函数的执行频率，在指定时间间隔内最多执行一次。

### 特性
- 🚀 **性能优化**: 控制高频事件的执行频率，提升应用性能
- ⏱️ **固定间隔**: 按照固定时间间隔执行函数
- 🔄 **立即执行**: 第一次调用立即执行，后续调用按间隔执行
- 💡 **类型安全**: 完整的 TypeScript 类型支持

### API

\`\`\`typescript
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void
\`\`\`

**参数:**
- \`func\`: 要节流的函数
- \`limit\`: 节流时间间隔（毫秒）

**返回值:**
- 节流后的函数

### 使用示例

\`\`\`typescript
import { throttle } from '@hiiot/ui';

// 滚动事件节流
const throttledScroll = throttle(() => {
  handleScroll();
}, 100);

// 窗口大小调整节流
const throttledResize = throttle(() => {
  handleResize();
}, 250);

// 搜索建议节流
const throttledSearch = throttle((query: string) => {
  fetchSearchSuggestions(query);
}, 300);
\`\`\`

### 常见应用场景

1. **滚动事件**: 优化滚动监听，如无限滚动、滚动动画
2. **窗口调整**: 处理 resize 事件，避免频繁重新计算布局
3. **鼠标移动**: 优化鼠标跟踪、拖拽等交互
4. **搜索建议**: 控制搜索建议请求频率
5. **按钮点击**: 防止用户快速连续点击

### 最佳实践

1. **合理设置间隔时间**:
   - 滚动事件: 100-200ms
   - 窗口调整: 250-500ms
   - 鼠标移动: 16-50ms (60fps-20fps)
   - 搜索建议: 200-500ms

2. **使用 useCallback**: 在 React 组件中配合 useCallback 使用
3. **考虑用户体验**: 确保响应性和性能的平衡
4. **区分使用场景**: 
   - 需要立即响应且控制频率时使用 throttle
   - 需要等待操作完成后执行时使用 debounce

### 与 debounce 的区别

- **throttle**: 按固定间隔执行，适合滚动、动画等需要持续响应的场景
- **debounce**: 在操作停止后执行，适合搜索、表单验证等需要等待完成的场景
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThrottleDemo>;

export const Default: Story = {
  name: '交互式演示',
};

export const BasicUsage: Story = {
  name: '基本用法',
  render: () => <BasicUsageExample />,
  parameters: {
    docs: {
      source: {
        code: `import { throttle } from '@hiiot/ui';

function BasicUsageExample() {
  const [clickCount, setClickCount] = useState(0);

  const throttledClick = useCallback(
    throttle(() => {
      setClickCount(prev => prev + 1);
    }, 1000),
    []
  );

  return (
    <div>
      <button onClick={throttledClick}>
        节流按钮 (1秒间隔)
      </button>
      <p>执行次数: {clickCount}</p>
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const SearchSuggestions: Story = {
  name: '搜索建议节流',
  render: () => <SearchSuggestionsExample />,
  parameters: {
    docs: {
      source: {
        code: `import { throttle } from '@hiiot/ui';

function SearchSuggestionsExample() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const throttledSearch = useCallback(
    throttle((searchQuery: string) => {
      if (searchQuery.trim()) {
        // 执行搜索建议 API 调用
        fetchSearchSuggestions(searchQuery).then(setSuggestions);
      } else {
        setSuggestions([]);
      }
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    throttledSearch(value);
  };

  return (
    <div>
      <input
        value={query}
        onChange={handleInputChange}
        placeholder="输入搜索关键词..."
      />
      {suggestions.map(suggestion => (
        <div key={suggestion}>{suggestion}</div>
      ))}
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const ScrollLoad: Story = {
  name: '滚动加载节流',
  render: () => <ScrollLoadExample />,
  parameters: {
    docs: {
      source: {
        code: `import { throttle } from '@hiiot/ui';

function ScrollLoadExample() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const throttledScrollLoad = useCallback(
    throttle(() => {
      const container = containerRef.current;
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        // 当滚动到底部附近时加载更多
        if (scrollTop + clientHeight >= scrollHeight - 50 && !loading) {
          setLoading(true);
          // 执行加载更多数据
          loadMoreData().then(newItems => {
            setItems(prev => [...prev, ...newItems]);
            setLoading(false);
          });
        }
      }
    }, 200),
    [loading]
  );

  return (
    <div
      ref={containerRef}
      onScroll={throttledScrollLoad}
      style={{ height: '300px', overflow: 'auto' }}
    >
      {items.map(item => (
        <div key={item.id}>{item.content}</div>
      ))}
      {loading && <div>加载中...</div>}
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};