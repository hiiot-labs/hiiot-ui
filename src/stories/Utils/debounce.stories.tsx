import type { Meta, StoryObj } from '@storybook/react';
import { useState, useCallback } from 'react';
import { debounce } from '../../utils';

// 主演示组件
function DebounceDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [scrollCount, setScrollCount] = useState(0);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 防抖搜索函数
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (term.trim()) {
        setIsSearching(true);
        // 模拟 API 调用
        setTimeout(() => {
          const mockResults = [
            `${term} - 搜索结果 1`,
            `${term} - 搜索结果 2`,
            `${term} - 搜索结果 3`,
          ];
          setSearchResults(mockResults);
          setIsSearching(false);
        }, 300);
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 500),
    []
  );

  // 防抖点击处理
  const debouncedClick = useCallback(
    debounce(() => {
      setClickCount(prev => prev + 1);
    }, 300),
    []
  );

  // 防抖滚动处理
  const debouncedScroll = useCallback(
    debounce(() => {
      setScrollCount(prev => prev + 1);
    }, 100),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>debounce 工具函数演示</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3>搜索防抖示例</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="输入搜索关键词..."
          style={{ 
            padding: '10px', 
            border: '1px solid #ccc', 
            borderRadius: '4px',
            width: '300px',
            fontSize: '16px'
          }}
        />
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          <p>输入值: "{searchTerm}"</p>
          <p>状态: {isSearching ? '搜索中...' : '空闲'}</p>
        </div>
        
        {searchResults.length > 0 && (
          <div style={{ 
            marginTop: '15px', 
            padding: '10px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '4px' 
          }}>
            <h4>搜索结果:</h4>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>按钮点击防抖示例</h3>
        <button
          onClick={debouncedClick}
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
          点击我 (防抖 300ms)
        </button>
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          <p>防抖点击次数: {clickCount}</p>
          <p style={{ fontSize: '12px', color: '#999' }}>
            快速连续点击只会在最后一次点击后 300ms 执行
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>滚动事件防抖示例</h3>
        <div
          onScroll={debouncedScroll}
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
          <div style={{ height: '500px', padding: '10px' }}>
            <p>滚动这个区域来测试防抖效果</p>
            <p>防抖滚动事件触发次数: {scrollCount}</p>
            <div style={{ marginTop: '20px' }}>
              {Array.from({ length: 20 }, (_, i) => (
                <p key={i} style={{ margin: '10px 0' }}>
                  这是第 {i + 1} 行内容，继续滚动...
                </p>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>
          滚动事件被防抖处理，减少了不必要的函数调用
        </div>
      </div>
    </div>
  );
}

// 基本用法示例
function BasicUsageExample() {
  const [inputValue, setInputValue] = useState('');
  const [processedValue, setProcessedValue] = useState('');

  const debouncedProcess = useCallback(
    debounce((value: string) => {
      setProcessedValue(`处理后的值: ${value}`);
    }, 500),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedProcess(value);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <h3>基本用法</h3>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="输入文本..."
        style={{ 
          padding: '8px', 
          border: '1px solid #ccc', 
          borderRadius: '4px', 
          width: '250px',
          marginBottom: '10px'
        }}
      />
      <div style={{ fontSize: '14px', color: '#666' }}>
        <p><strong>输入值:</strong> "{inputValue}"</p>
        <p><strong>处理结果:</strong> {processedValue || '等待输入...'}</p>
      </div>
    </div>
  );
}

// API 调用示例
function ApiCallExample() {
  const [query, setQuery] = useState('');
  const [apiCallCount, setApiCallCount] = useState(0);
  const [lastApiCall, setLastApiCall] = useState('');

  const debouncedApiCall = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim()) {
        setApiCallCount(prev => prev + 1);
        setLastApiCall(new Date().toLocaleTimeString());
        // 这里可以放置实际的 API 调用逻辑
        console.log(`API 调用: 搜索 "${searchQuery}"`);
      }
    }, 800),
    []
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedApiCall(value);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <h3>API 调用防抖示例</h3>
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="输入搜索关键词..."
        style={{ 
          padding: '10px', 
          border: '1px solid #ccc', 
          borderRadius: '4px', 
          width: '100%',
          fontSize: '16px'
        }}
      />
      <div style={{ 
        marginTop: '15px', 
        padding: '10px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <p><strong>API 调用次数:</strong> {apiCallCount}</p>
        <p><strong>最后调用时间:</strong> {lastApiCall || '尚未调用'}</p>
        <p style={{ color: '#666', fontSize: '12px' }}>
          防抖延迟: 800ms - 只有在停止输入 800ms 后才会触发 API 调用
        </p>
      </div>
    </div>
  );
}

// 表单保存示例
function FormSaveExample() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [saveCount, setSaveCount] = useState(0);
  const [lastSaveTime, setLastSaveTime] = useState('');

  const debouncedSave = useCallback(
    debounce((data: typeof formData) => {
      setSaveCount(prev => prev + 1);
      setLastSaveTime(new Date().toLocaleTimeString());
      console.log('自动保存:', data);
    }, 1000),
    []
  );

  const handleInputChange = (field: keyof typeof formData) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newData = { ...formData, [field]: e.target.value };
      setFormData(newData);
      debouncedSave(newData);
    };

  return (
    <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <h3>表单自动保存示例</h3>
      <div style={{ display: 'grid', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            标题:
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={handleInputChange('title')}
            placeholder="输入标题"
            style={{ 
              padding: '8px', 
              border: '1px solid #ccc', 
              borderRadius: '4px', 
              width: '100%'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            内容:
          </label>
          <textarea
            value={formData.content}
            onChange={handleInputChange('content')}
            placeholder="输入内容"
            rows={4}
            style={{ 
              padding: '8px', 
              border: '1px solid #ccc', 
              borderRadius: '4px', 
              width: '100%',
              resize: 'vertical'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            标签:
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={handleInputChange('tags')}
            placeholder="输入标签，用逗号分隔"
            style={{ 
              padding: '8px', 
              border: '1px solid #ccc', 
              borderRadius: '4px', 
              width: '100%'
            }}
          />
        </div>
      </div>

      <div style={{ 
        marginTop: '15px', 
        padding: '10px', 
        backgroundColor: '#e8f5e8', 
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <p><strong>自动保存次数:</strong> {saveCount}</p>
        <p><strong>最后保存时间:</strong> {lastSaveTime || '尚未保存'}</p>
        <p style={{ color: '#666', fontSize: '12px' }}>
          表单会在停止输入 1 秒后自动保存
        </p>
      </div>
    </div>
  );
}

const meta: Meta<typeof DebounceDemo> = {
  title: 'Utils/debounce',
  component: DebounceDemo,
  parameters: {
    docs: {
      description: {
        component: `
## debounce

防抖工具函数，用于限制函数的执行频率，在指定时间内只执行最后一次调用。

### 特性
- 🚀 **性能优化**: 减少不必要的函数调用，提升应用性能
- ⏱️ **可配置延迟**: 自定义防抖延迟时间
- 🔄 **自动清理**: 自动管理定时器，避免内存泄漏
- 💡 **类型安全**: 完整的 TypeScript 类型支持

### API

\`\`\`typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void
\`\`\`

**参数:**
- \`func\`: 要防抖的函数
- \`wait\`: 防抖延迟时间（毫秒）

**返回值:**
- 防抖后的函数

### 使用示例

\`\`\`typescript
import { debounce } from '@hiiot/ui';

// 搜索防抖
const debouncedSearch = debounce((query: string) => {
  searchAPI(query);
}, 500);

// 窗口大小调整防抖
const debouncedResize = debounce(() => {
  handleWindowResize();
}, 250);

// 表单自动保存防抖
const debouncedSave = debounce((formData: FormData) => {
  saveFormData(formData);
}, 1000);
\`\`\`

### 常见应用场景

1. **搜索输入**: 避免每次键入都触发搜索请求
2. **API 调用**: 减少频繁的网络请求
3. **事件处理**: 优化 scroll、resize 等高频事件
4. **表单保存**: 实现自动保存功能
5. **按钮点击**: 防止重复提交

### 最佳实践

1. **合理设置延迟时间**:
   - 搜索: 300-500ms
   - 表单验证: 500-1000ms
   - 滚动事件: 100-250ms
   - 窗口调整: 250-500ms

2. **使用 useCallback**: 在 React 组件中配合 useCallback 使用
3. **避免过度使用**: 只在需要时使用防抖
4. **考虑用户体验**: 提供适当的加载状态反馈

### 与 throttle 的区别

- **debounce**: 在事件停止触发后执行，适合搜索、表单验证
- **throttle**: 按固定间隔执行，适合滚动、动画
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DebounceDemo>;

export const Default: Story = {
  name: '交互式演示',
};

export const BasicUsage: Story = {
  name: '基本用法',
  render: () => <BasicUsageExample />,
  parameters: {
    docs: {
      source: {
        code: `import { debounce } from '@hiiot/ui';

function BasicUsageExample() {
  const [inputValue, setInputValue] = useState('');
  const [processedValue, setProcessedValue] = useState('');

  const debouncedProcess = useCallback(
    debounce((value: string) => {
      setProcessedValue(\`处理后的值: \${value}\`);
    }, 500),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedProcess(value);
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="输入文本..."
      />
      <p>输入值: {inputValue}</p>
      <p>处理结果: {processedValue}</p>
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const ApiCall: Story = {
  name: 'API 调用防抖',
  render: () => <ApiCallExample />,
  parameters: {
    docs: {
      source: {
        code: `import { debounce } from '@hiiot/ui';

function ApiCallExample() {
  const [query, setQuery] = useState('');
  const [apiCallCount, setApiCallCount] = useState(0);

  const debouncedApiCall = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim()) {
        setApiCallCount(prev => prev + 1);
        // 执行 API 调用
        searchAPI(searchQuery);
      }
    }, 800),
    []
  );

  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedApiCall(value);
  };

  return (
    <div>
      <input
        value={query}
        onChange={handleQueryChange}
        placeholder="输入搜索关键词..."
      />
      <p>API 调用次数: {apiCallCount}</p>
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

export const FormSave: Story = {
  name: '表单自动保存',
  render: () => <FormSaveExample />,
  parameters: {
    docs: {
      source: {
        code: `import { debounce } from '@hiiot/ui';

function FormSaveExample() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [saveCount, setSaveCount] = useState(0);

  const debouncedSave = useCallback(
    debounce((data) => {
      setSaveCount(prev => prev + 1);
      // 执行保存操作
      saveFormData(data);
    }, 1000),
    []
  );

  const handleInputChange = (field) => (e) => {
    const newData = { ...formData, [field]: e.target.value };
    setFormData(newData);
    debouncedSave(newData);
  };

  return (
    <form>
      <input
        value={formData.title}
        onChange={handleInputChange('title')}
        placeholder="标题"
      />
      <textarea
        value={formData.content}
        onChange={handleInputChange('content')}
        placeholder="内容"
      />
      <p>自动保存次数: {saveCount}</p>
    </form>
  );
}`,
        language: 'tsx',
      },
    },
  },
};