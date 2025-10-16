import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { cn } from '../../utils';

// 示例组件
function CnDemo() {
  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'danger'>('primary');

  const buttonClasses = cn(
    // 基础样式
    'px-4 py-2 rounded font-medium transition-all duration-200 cursor-pointer border',
    // 尺寸样式
    {
      'px-2 py-1 text-sm': size === 'small',
      'px-4 py-2 text-base': size === 'medium',
      'px-6 py-3 text-lg': size === 'large',
    },
    // 变体样式
    {
      'bg-blue-500 text-white border-blue-500 hover:bg-blue-600': variant === 'primary' && !isDisabled,
      'bg-gray-500 text-white border-gray-500 hover:bg-gray-600': variant === 'secondary' && !isDisabled,
      'bg-red-500 text-white border-red-500 hover:bg-red-600': variant === 'danger' && !isDisabled,
    },
    // 状态样式
    {
      'ring-2 ring-offset-2 ring-blue-300': isActive && variant === 'primary',
      'ring-2 ring-offset-2 ring-gray-300': isActive && variant === 'secondary',
      'ring-2 ring-offset-2 ring-red-300': isActive && variant === 'danger',
    },
    // 禁用样式
    isDisabled && 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500 border-gray-300'
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>cn 工具函数演示</h2>
      
      {/* 控制面板 */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3>控制面板</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>尺寸:</label>
            <select 
              value={size} 
              onChange={(e) => setSize(e.target.value as any)}
              style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>变体:</label>
            <select 
              value={variant} 
              onChange={(e) => setVariant(e.target.value as any)}
              style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="danger">Danger</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input 
                type="checkbox" 
                checked={isActive} 
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <span style={{ fontWeight: 'bold' }}>激活状态</span>
            </label>
          </div>
          
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input 
                type="checkbox" 
                checked={isDisabled} 
                onChange={(e) => setIsDisabled(e.target.checked)}
              />
              <span style={{ fontWeight: 'bold' }}>禁用状态</span>
            </label>
          </div>
        </div>
      </div>

      {/* 按钮示例 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>生成的按钮</h3>
        <button 
          className={buttonClasses}
          disabled={isDisabled}
          style={{ marginBottom: '15px' }}
        >
          示例按钮
        </button>
        
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '14px',
          border: '1px solid #dee2e6'
        }}>
          <strong>生成的类名:</strong>
          <pre style={{ margin: '10px 0', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {buttonClasses}
          </pre>
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
          <pre>{`const buttonClasses = cn(
  // 基础样式
  'px-4 py-2 rounded font-medium transition-all duration-200 cursor-pointer border',
  
  // 条件样式 - 尺寸
  {
    'px-2 py-1 text-sm': size === 'small',
    'px-4 py-2 text-base': size === 'medium',
    'px-6 py-3 text-lg': size === 'large',
  },
  
  // 条件样式 - 变体
  {
    'bg-blue-500 text-white border-blue-500 hover:bg-blue-600': variant === 'primary' && !isDisabled,
    'bg-gray-500 text-white border-gray-500 hover:bg-gray-600': variant === 'secondary' && !isDisabled,
    'bg-red-500 text-white border-red-500 hover:bg-red-600': variant === 'danger' && !isDisabled,
  },
  
  // 条件样式 - 状态
  {
    'ring-2 ring-offset-2 ring-blue-300': isActive && variant === 'primary',
    'ring-2 ring-offset-2 ring-gray-300': isActive && variant === 'secondary',
    'ring-2 ring-offset-2 ring-red-300': isActive && variant === 'danger',
  },
  
  // 禁用样式
  isDisabled && 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500 border-gray-300'
);`}</pre>
        </div>
      </div>

      {/* 其他示例 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>其他用法示例</h3>
        <div style={{ display: 'grid', gap: '15px' }}>
          {/* 简单合并 */}
          <div>
            <h4>简单类名合并</h4>
            <div style={{ 
              backgroundColor: '#e3f2fd', 
              padding: '10px', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px'
            }}>
              <code>cn('text-blue-500', 'font-bold', 'underline')</code>
              <br />
              <span style={{ fontFamily: 'Arial', marginTop: '5px', display: 'block' }}>
                结果: <span className={cn('text-blue-500', 'font-bold', 'underline')}>蓝色粗体下划线文本</span>
              </span>
            </div>
          </div>

          {/* 条件合并 */}
          <div>
            <h4>条件类名合并</h4>
            <div style={{ 
              backgroundColor: '#e8f5e8', 
              padding: '10px', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px'
            }}>
              <code>cn('base-class', {`{'active-class': isActive, 'disabled-class': isDisabled}`})</code>
              <br />
              <span style={{ fontFamily: 'Arial', marginTop: '5px', display: 'block' }}>
                结果: <code>{cn('base-class', {'active-class': isActive, 'disabled-class': isDisabled})}</code>
              </span>
            </div>
          </div>

          {/* 数组合并 */}
          <div>
            <h4>数组类名合并</h4>
            <div style={{ 
              backgroundColor: '#fff3e0', 
              padding: '10px', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px'
            }}>
              <code>cn(['class1', 'class2'], 'class3', null, undefined, false && 'class4')</code>
              <br />
              <span style={{ fontFamily: 'Arial', marginTop: '5px', display: 'block' }}>
                结果: <code>{cn(['class1', 'class2'], 'class3', null, undefined, false && 'class4')}</code>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '4px' }}>
        <h4>💡 使用说明</h4>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>基于 clsx 库，提供强大的类名合并功能</li>
          <li>支持字符串、对象、数组等多种输入格式</li>
          <li>自动过滤 falsy 值（null、undefined、false 等）</li>
          <li>特别适合与 Tailwind CSS 等原子化 CSS 框架配合使用</li>
          <li>支持条件类名，让组件样式更加灵活</li>
        </ul>
      </div>
    </div>
  );
}

const meta: Meta<typeof CnDemo> = {
  title: 'Utils/cn',
  component: CnDemo,
  parameters: {
    docs: {
      description: {
        component: `
## cn (className)

合并类名的工具函数，基于 clsx 库实现，提供强大而灵活的类名合并功能。

### 特性
- 🔧 **多格式支持**: 支持字符串、对象、数组等多种输入格式
- 🎯 **条件类名**: 支持基于条件的动态类名
- 🧹 **自动过滤**: 自动过滤 falsy 值
- 🚀 **性能优化**: 基于 clsx，性能优异
- 💡 **TypeScript**: 完整的类型支持

### API

\`\`\`typescript
function cn(...inputs: ClassValue[]): string
\`\`\`

**参数:**
- \`...inputs\`: 类名值数组，支持字符串、对象、数组等

**返回值:**
- 合并后的类名字符串

### 使用示例

#### 基本用法
\`\`\`typescript
import { cn } from '@hiiot/ui';

// 简单合并
cn('text-red-500', 'font-bold') // 'text-red-500 font-bold'

// 条件类名
cn('base-class', {
  'active-class': isActive,
  'disabled-class': isDisabled
})

// 数组合并
cn(['class1', 'class2'], 'class3') // 'class1 class2 class3'

// 混合使用
cn(
  'base-class',
  ['array-class1', 'array-class2'],
  {
    'conditional-class': condition,
    'another-class': anotherCondition
  },
  someVariable && 'dynamic-class'
)
\`\`\`

#### 在组件中使用
\`\`\`typescript
function Button({ variant, size, disabled, className, ...props }) {
  return (
    <button
      className={cn(
        // 基础样式
        'px-4 py-2 rounded font-medium transition-colors',
        
        // 变体样式
        {
          'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
          'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'secondary',
        },
        
        // 尺寸样式
        {
          'px-2 py-1 text-sm': size === 'small',
          'px-6 py-3 text-lg': size === 'large',
        },
        
        // 状态样式
        disabled && 'opacity-50 cursor-not-allowed',
        
        // 外部传入的类名
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
}
\`\`\`

### 支持的输入类型
- **字符串**: \`'class1 class2'\`
- **对象**: \`{ 'class1': true, 'class2': false }\`
- **数组**: \`['class1', 'class2']\`
- **嵌套**: \`['class1', { 'class2': true }]\`
- **Falsy 值**: \`null\`, \`undefined\`, \`false\` 等会被自动过滤
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CnDemo>;

export const Default: Story = {
  name: '交互式演示',
};

// 基本用法示例组件
function BasicUsageExample() {
  const examples = [
    {
      title: '字符串合并',
      code: `cn('text-red-500', 'font-bold')`,
      result: cn('text-red-500', 'font-bold'),
      description: '合并多个字符串类名'
    },
    {
      title: '数组合并',
      code: `cn(['flex', 'items-center'], 'justify-between')`,
      result: cn(['flex', 'items-center'], 'justify-between'),
      description: '合并数组和字符串类名'
    },
    {
      title: '对象条件',
      code: `cn({ 'text-blue-500': true, 'hidden': false })`,
      result: cn({ 'text-blue-500': true, 'hidden': false }),
      description: '基于条件的类名'
    },
    {
      title: '混合使用',
      code: `cn('base-class', ['array-class'], { 'conditional': true })`,
      result: cn('base-class', ['array-class'], { 'conditional': true }),
      description: '混合多种输入类型'
    },
    {
      title: 'Falsy 值过滤',
      code: `cn('valid', null, undefined, false, 'another-valid')`,
      result: cn('valid', null, undefined, false, 'another-valid'),
      description: '自动过滤无效值'
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
              padding: '15px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}
          >
            <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>{example.title}</h4>
            <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#6c757d' }}>
              {example.description}
            </p>
            <div style={{ 
              backgroundColor: '#e9ecef', 
              padding: '10px', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px',
              marginBottom: '10px'
            }}>
              <strong>代码:</strong> {example.code}
            </div>
            <div style={{ 
              backgroundColor: '#d4edda', 
              padding: '10px', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px',
              border: '1px solid #c3e6cb'
            }}>
              <strong>结果:</strong> "{example.result}"
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const BasicUsage: Story = {
  name: '基本用法',
  render: () => <BasicUsageExample />,
  parameters: {
    docs: {
      source: {
        code: `import { cn } from '@hiiot/ui';

function BasicUsageExample() {
  const examples = [
    {
      title: '字符串合并',
      code: \`cn('text-red-500', 'font-bold')\`,
      result: cn('text-red-500', 'font-bold'),
      description: '合并多个字符串类名'
    },
    {
      title: '数组合并',
      code: \`cn(['flex', 'items-center'], 'justify-between')\`,
      result: cn(['flex', 'items-center'], 'justify-between'),
      description: '合并数组和字符串类名'
    },
    {
      title: '对象条件',
      code: \`cn({ 'text-blue-500': true, 'hidden': false })\`,
      result: cn({ 'text-blue-500': true, 'hidden': false }),
      description: '基于条件的类名'
    },
    {
      title: '混合使用',
      code: \`cn('base-class', ['array-class'], { 'conditional': true })\`,
      result: cn('base-class', ['array-class'], { 'conditional': true }),
      description: '混合多种输入类型'
    },
    {
      title: 'Falsy 值过滤',
      code: \`cn('valid', null, undefined, false, 'another-valid')\`,
      result: cn('valid', null, undefined, false, 'another-valid'),
      description: '自动过滤无效值'
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h3>基本用法示例</h3>
      <div style={{ display: 'grid', gap: '20px' }}>
        {examples.map((example, index) => (
          <div 
            key={index}
            style={{ 
              padding: '15px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}
          >
            <h4>{example.title}</h4>
            <p>{example.description}</p>
            <div style={{ 
              backgroundColor: '#e9ecef', 
              padding: '10px', 
              borderRadius: '4px',
              fontFamily: 'monospace'
            }}>
              <strong>代码:</strong> {example.code}
            </div>
            <div style={{ 
              backgroundColor: '#d4edda', 
              padding: '10px', 
              borderRadius: '4px',
              fontFamily: 'monospace'
            }}>
              <strong>结果:</strong> "{example.result}"
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};

// 条件类名示例组件
function ConditionalClassesExample() {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const cardClasses = cn(
    // 基础样式
    'p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer',
    // 主题样式
    {
      'bg-white text-gray-900 border-gray-200': theme === 'light',
      'bg-gray-800 text-white border-gray-600': theme === 'dark',
    },
    // 状态样式
    {
      'ring-4 ring-blue-300 border-blue-500': isActive,
      'shadow-lg transform scale-105': isHovered && !isDisabled,
      'opacity-50 cursor-not-allowed': isDisabled,
    }
  );

  return (
    <div style={{ padding: '20px' }}>
      <h3>条件类名示例</h3>
      
      {/* 控制面板 */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h4>控制面板</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            激活状态
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={isHovered}
              onChange={(e) => setIsHovered(e.target.checked)}
            />
            悬停状态
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={isDisabled}
              onChange={(e) => setIsDisabled(e.target.checked)}
            />
            禁用状态
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="light">浅色主题</option>
              <option value="dark">深色主题</option>
            </select>
          </label>
        </div>
      </div>

      {/* 示例卡片 */}
      <div className={cardClasses} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h4 style={{ margin: '0 0 10px 0' }}>动态样式卡片</h4>
        <p style={{ margin: '0 0 15px 0', opacity: 0.8 }}>
          这个卡片的样式会根据上面的控制面板动态变化
        </p>
        <div style={{ 
          fontSize: '14px', 
          fontFamily: 'monospace',
          backgroundColor: theme === 'light' ? '#f8f9fa' : '#374151',
          padding: '10px',
          borderRadius: '4px',
          wordBreak: 'break-all'
        }}>
          <strong>当前类名:</strong><br />
          {cardClasses}
        </div>
      </div>
    </div>
  );
}

export const ConditionalClasses: Story = {
  name: '条件类名',
  render: () => <ConditionalClassesExample />,
  parameters: {
    docs: {
      source: {
        code: `import { cn } from '@hiiot/ui';
import { useState } from 'react';

function ConditionalClassesExample() {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const cardClasses = cn(
    // 基础样式
    'p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer',
    // 主题样式
    {
      'bg-white text-gray-900 border-gray-200': theme === 'light',
      'bg-gray-800 text-white border-gray-600': theme === 'dark',
    },
    // 状态样式
    {
      'ring-4 ring-blue-300 border-blue-500': isActive,
      'shadow-lg transform scale-105': isHovered && !isDisabled,
      'opacity-50 cursor-not-allowed': isDisabled,
    }
  );

  return (
    <div style={{ padding: '20px' }}>
      <h3>条件类名示例</h3>
      
      {/* 控制面板 */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px'
      }}>
        <h4>控制面板</h4>
        <div style={{ display: 'grid', gap: '15px' }}>
          <label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            激活状态
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={isHovered}
              onChange={(e) => setIsHovered(e.target.checked)}
            />
            悬停状态
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={isDisabled}
              onChange={(e) => setIsDisabled(e.target.checked)}
            />
            禁用状态
          </label>
          
          <label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            >
              <option value="light">浅色主题</option>
              <option value="dark">深色主题</option>
            </select>
          </label>
        </div>
      </div>

      {/* 示例卡片 */}
      <div className={cardClasses} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h4>动态样式卡片</h4>
        <p>这个卡片的样式会根据上面的控制面板动态变化</p>
        <div style={{ 
          fontSize: '14px', 
          fontFamily: 'monospace',
          backgroundColor: theme === 'light' ? '#f8f9fa' : '#374151',
          padding: '10px',
          borderRadius: '4px'
        }}>
          <strong>当前类名:</strong><br />
          {cardClasses}
        </div>
      </div>
    </div>
  );
}`,
        language: 'tsx',
      },
    },
  },
};