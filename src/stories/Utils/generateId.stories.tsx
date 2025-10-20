import type { Meta, StoryObj } from '@storybook/react-vite-vite';
import { useState } from 'react';
import { generateId } from '../../utils';

// 示例组件
function GenerateIdDemo() {
  const [generatedIds, setGeneratedIds] = useState<string[]>([]);
  const [prefix, setPrefix] = useState('item');

  const generateNewId = () => {
    const newId = generateId(prefix);
    setGeneratedIds(prev => [newId, ...prev.slice(0, 9)]); // 保留最新的10个
  };

  const generateMultiple = () => {
    const newIds = Array.from({ length: 5 }, () => generateId(prefix));
    setGeneratedIds(prev => [...newIds, ...prev.slice(0, 5)]);
  };

  const clearIds = () => {
    setGeneratedIds([]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>generateId 工具函数演示</h2>
      
      {/* 控制面板 */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3>控制面板</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>前缀:</label>
            <input 
              type="text"
              value={prefix} 
              onChange={(e) => setPrefix(e.target.value)}
              style={{ 
                padding: '8px', 
                border: '1px solid #ccc', 
                borderRadius: '4px', 
                width: '100%',
                fontSize: '14px'
              }}
              placeholder="输入前缀"
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={generateNewId}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            生成单个 ID
          </button>
          
          <button 
            onClick={generateMultiple}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            生成 5 个 ID
          </button>
          
          <button 
            onClick={clearIds}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            清空列表
          </button>
        </div>
      </div>

      {/* 预览区域 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>预览</h3>
        <div style={{ 
          backgroundColor: '#e3f2fd', 
          padding: '15px', 
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '16px',
          border: '1px solid #90caf9'
        }}>
          <strong>下一个生成的 ID 预览:</strong>
          <br />
          <code style={{ fontSize: '18px', color: '#1976d2' }}>
            {prefix}-xxxxxxxxx
          </code>
          <br />
          <small style={{ fontFamily: 'Arial', color: '#666' }}>
            (实际生成时 'x' 会被随机字符替换，长度固定为 9 位)
          </small>
        </div>
      </div>

      {/* 生成的 ID 列表 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>生成的 ID 列表 ({generatedIds.length})</h3>
        {generatedIds.length === 0 ? (
          <div style={{ 
            padding: '20px', 
            textAlign: 'center', 
            color: '#666',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            border: '1px solid #dee2e6'
          }}>
            暂无生成的 ID，点击上方按钮开始生成
          </div>
        ) : (
          <div style={{ 
            maxHeight: '300px', 
            overflowY: 'auto',
            border: '1px solid #dee2e6',
            borderRadius: '4px'
          }}>
            {generatedIds.map((id, index) => (
              <div 
                key={`${id}-${index}`}
                style={{ 
                  padding: '12px 15px', 
                  borderBottom: index < generatedIds.length - 1 ? '1px solid #dee2e6' : 'none',
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <code style={{ color: '#495057' }}>{id}</code>
                <span style={{ 
                  fontSize: '12px', 
                  color: '#6c757d',
                  fontFamily: 'Arial'
                }}>
                  #{index + 1}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 使用场景示例 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>使用场景示例</h3>
        <div style={{ display: 'grid', gap: '15px' }}>
          {/* 表单字段 ID */}
          <div style={{ 
            backgroundColor: '#e8f5e8', 
            padding: '15px', 
            borderRadius: '4px',
            border: '1px solid #c3e6cb'
          }}>
            <h4 style={{ marginTop: 0, color: '#155724' }}>表单字段 ID</h4>
            <div style={{ fontFamily: 'monospace', fontSize: '14px', marginBottom: '10px' }}>
              <code>const fieldId = generateId('field');</code>
              <br />
              <code>{`/* 结果: field-a7k9m2x3n */`}</code>
            </div>
            <div style={{ backgroundColor: '#d4edda', padding: '10px', borderRadius: '4px' }}>
              <label htmlFor={generateId('field')} style={{ fontWeight: 'bold' }}>
                用户名:
              </label>
              <input 
                id={generateId('field')}
                type="text" 
                style={{ 
                  marginLeft: '10px', 
                  padding: '5px', 
                  border: '1px solid #ccc', 
                  borderRadius: '3px' 
                }}
                placeholder="输入用户名"
              />
            </div>
          </div>

          {/* 组件实例 ID */}
          <div style={{ 
            backgroundColor: '#fff3cd', 
            padding: '15px', 
            borderRadius: '4px',
            border: '1px solid #ffeaa7'
          }}>
            <h4 style={{ marginTop: 0, color: '#856404' }}>组件实例 ID</h4>
            <div style={{ fontFamily: 'monospace', fontSize: '14px', marginBottom: '10px' }}>
              <code>const componentId = generateId('modal');</code>
              <br />
              <code>{`/* 结果: modal-x3n8k7q2m */`}</code>
            </div>
            <div style={{ backgroundColor: '#fff3cd', padding: '10px', borderRadius: '4px' }}>
              模拟模态框 ID: <code>{generateId('modal')}</code>
            </div>
          </div>

          {/* 数据项 ID */}
          <div style={{ 
            backgroundColor: '#cce5ff', 
            padding: '15px', 
            borderRadius: '4px',
            border: '1px solid #99d6ff'
          }}>
            <h4 style={{ marginTop: 0, color: '#004085' }}>数据项 ID</h4>
            <div style={{ fontFamily: 'monospace', fontSize: '14px', marginBottom: '10px' }}>
              <code>const itemId = generateId('item');</code>
              <br />
              <code>{`/* 结果: item-k9m2x7n8q */`}</code>
            </div>
            <div style={{ backgroundColor: '#e6f3ff', padding: '10px', borderRadius: '4px' }}>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>数据项 1 - ID: <code>{generateId('item')}</code></li>
                <li>数据项 2 - ID: <code>{generateId('item')}</code></li>
                <li>数据项 3 - ID: <code>{generateId('item')}</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 代码示例 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>代码示例</h3>
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '14px',
          border: '1px solid #dee2e6'
        }}>
          <pre>{`import { generateId } from '@hiiot/ui';

/* 基本用法 */
const id1 = generateId(); /* 默认前缀 'hiiot' */
const id2 = generateId('user'); /* 前缀 'user' */
const id3 = generateId('item'); /* 前缀 'item' */

/* 在 React 组件中使用 */
function TodoItem({ text }) {
  const [id] = useState(() => generateId('todo'));
  
  return (
    <div id={id}>
      <input id={\`\${id}-checkbox\`} type="checkbox" />
      <label htmlFor={\`\${id}-checkbox\`}>{text}</label>
    </div>
  );
}

/* 生成多个 ID */
const ids = Array.from({ length: 5 }, () => generateId('batch'));
console.log(ids);
/* ['batch-a7k9m2x3n', 'batch-n8q5w1r4p', ...] */`}</pre>
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '4px' }}>
        <h4>💡 使用说明</h4>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>生成唯一的字符串 ID，适用于各种场景</li>
          <li>支持自定义前缀，默认前缀为 'hiiot'</li>
          <li>随机部分长度固定为 9 位字符</li>
          <li>使用随机字符确保唯一性</li>
          <li>特别适合生成表单字段 ID、组件实例 ID 等</li>
          <li>轻量级实现，性能优异</li>
        </ul>
      </div>
    </div>
  );
}

const meta: Meta<typeof GenerateIdDemo> = {
  title: 'Utils/generateId',
  component: GenerateIdDemo,
  parameters: {
    docs: {
      description: {
        component: `
## generateId

生成唯一字符串 ID 的工具函数，支持自定义前缀。

### 特性
- 🎯 **唯一性**: 使用随机字符确保 ID 唯一性
- 🔧 **可定制**: 支持自定义前缀
- 🚀 **轻量级**: 简单高效的实现
- 💡 **多场景**: 适用于表单字段、组件实例、数据项等
- 📝 **易读性**: 生成的 ID 具有良好的可读性

### API

\`\`\`typescript
function generateId(prefix?: string): string
\`\`\`

**参数:**
- \`prefix\` (可选): ID 前缀，默认为 'hiiot'

**返回值:**
- 生成的唯一 ID 字符串，格式为 \`{prefix}-{randomString}\`，随机部分长度为 9 位

### 使用示例

#### 基本用法
\`\`\`typescript
import { generateId } from '@hiiot/ui';

// 使用默认前缀
const id1 = generateId(); // 'hiiot-a7k9m2x3n'

// 自定义前缀
const id2 = generateId('user'); // 'user-n8q5w1r4p'
const id3 = generateId('item'); // 'item-x3n8k7q2m'
\`\`\`

#### 在 React 组件中使用
\`\`\`typescript
import { generateId } from '@hiiot/ui';
import { useState } from 'react';

function FormField({ label, type = 'text' }) {
  const [fieldId] = useState(() => generateId('field'));
  
  return (
    <div>
      <label htmlFor={fieldId}>{label}</label>
      <input id={fieldId} type={type} />
    </div>
  );
}

function Modal({ children }) {
  const [modalId] = useState(() => generateId('modal'));
  
  return (
    <div id={modalId} role="dialog" aria-labelledby={\`\${modalId}-title\`}>
      <h2 id={\`\${modalId}-title\`}>模态框标题</h2>
      {children}
    </div>
  );
}
\`\`\`

#### 批量生成 ID
\`\`\`typescript
// 生成多个 ID
const todoIds = Array.from({ length: 5 }, () => generateId('todo'));
console.log(todoIds);
// ['todo-a7k9m2x3n', 'todo-n8q5w1r4p', 'todo-x3n8k7q2m', ...]

// 为数据项生成 ID
const items = data.map(item => ({
  ...item,
  id: generateId('item')
}));
\`\`\`

### 使用场景
- **表单字段**: 为表单元素生成唯一的 ID 和 htmlFor 属性
- **组件实例**: 为组件实例生成唯一标识符
- **数据项**: 为列表项或数据对象生成唯一 key
- **DOM 元素**: 为动态创建的 DOM 元素生成 ID
- **测试标识**: 为测试用例生成唯一的测试 ID

### 注意事项
- 生成的 ID 在单次运行中是唯一的，但不保证跨会话唯一性
- 如需要全局唯一性，建议结合时间戳或使用 UUID
- 前缀应该具有描述性，便于调试和维护
- 随机部分长度固定为 9 位，基于 Math.random() 生成
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GenerateIdDemo>;

export const Default: Story = {
  name: '交互式演示',
};

export const BasicUsage: Story = {
  name: '基本用法',
  render: () => {
    const examples = [
      {
        title: '默认前缀',
        code: 'generateId()',
        result: generateId(),
        description: '使用默认前缀 "hiiot"'
      },
      {
        title: '自定义前缀',
        code: 'generateId("user")',
        result: generateId('user'),
        description: '自定义前缀为 "user"'
      },
      {
        title: '表单字段前缀',
        code: 'generateId("field")',
        result: generateId('field'),
        description: '适用于表单字段的前缀'
      },
      {
        title: '组件前缀',
        code: 'generateId("component")',
        result: generateId('component'),
        description: '适用于组件实例的前缀'
      },
      {
        title: '数据项前缀',
        code: 'generateId("item")',
        result: generateId('item'),
        description: '适用于数据项的前缀'
      }
    ];

    return (
      <div style={{ padding: '20px' }}>
        <h3>基本用法示例</h3>
        <div style={{ display: 'grid', gap: '15px' }}>
          {examples.map((example, index) => (
            <div key={index} style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '15px',
              backgroundColor: '#f8f9fa'
            }}>
              <h4 style={{ marginTop: 0, color: '#495057' }}>{example.title}</h4>
              <div style={{ 
                backgroundColor: '#e9ecef', 
                padding: '10px', 
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '14px',
                marginBottom: '10px'
              }}>
                <strong>代码:</strong> <code>{example.code}</code>
              </div>
              <div style={{ 
                backgroundColor: '#d4edda', 
                padding: '10px', 
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '14px',
                marginBottom: '10px'
              }}>
                <strong>结果:</strong> <code>{example.result}</code>
              </div>
              <div style={{ 
                fontSize: '14px',
                color: '#6c757d'
              }}>
                {example.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  name: '表单示例',
  render: () => {
    const FormField = ({ label, type = 'text', placeholder }: { label: string; type?: string; placeholder?: string }) => {
      const [fieldId] = useState(() => generateId('field'));
      
      return (
        <div style={{ marginBottom: '15px' }}>
          <label 
            htmlFor={fieldId}
            style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: 'bold',
              color: '#495057'
            }}
          >
            {label}
          </label>
          <input 
            id={fieldId}
            type={type}
            placeholder={placeholder}
            style={{ 
              width: '100%',
              padding: '8px 12px', 
              border: '1px solid #ced4da', 
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          <small style={{ 
            color: '#6c757d', 
            fontSize: '12px',
            fontFamily: 'monospace'
          }}>
            ID: {fieldId}
          </small>
        </div>
      );
    };

    return (
      <div style={{ padding: '20px' }}>
        <h3>表单字段 ID 示例</h3>
        <div style={{ 
          maxWidth: '400px',
          backgroundColor: '#ffffff',
          padding: '20px',
          border: '1px solid #dee2e6',
          borderRadius: '8px'
        }}>
          <FormField label="用户名" placeholder="请输入用户名" />
          <FormField label="邮箱" type="email" placeholder="请输入邮箱地址" />
          <FormField label="密码" type="password" placeholder="请输入密码" />
          <FormField label="确认密码" type="password" placeholder="请再次输入密码" />
        </div>
        
        <div style={{ 
          marginTop: '20px',
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          <strong>💡 说明:</strong> 每个表单字段都有唯一的 ID，确保 label 和 input 的正确关联，提升可访问性。
        </div>
      </div>
    );
  },
};