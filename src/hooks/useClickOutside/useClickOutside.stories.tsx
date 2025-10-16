import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useClickOutside } from './index';

// 主演示组件
function UseClickOutsideDemo() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsDropdownOpen(false);
    setClickCount(prev => prev + 1);
  });

  const modalRef = useClickOutside<HTMLDivElement>(() => {
    setIsModalOpen(false);
    setClickCount(prev => prev + 1);
  });

  const tooltipRef = useClickOutside<HTMLDivElement>(() => {
    setIsTooltipOpen(false);
    setClickCount(prev => prev + 1);
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>useClickOutside Hook 演示</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        外部点击检测次数: <strong>{clickCount}</strong>
      </p>

      {/* 下拉菜单示例 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>下拉菜单示例</h3>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isDropdownOpen ? '关闭菜单' : '打开菜单'}
          </button>
          
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 1000,
                minWidth: '150px'
              }}
            >
              <div style={{ padding: '10px', borderBottom: '1px solid #eee', cursor: 'pointer' }}>
                选项 1
              </div>
              <div style={{ padding: '10px', borderBottom: '1px solid #eee', cursor: 'pointer' }}>
                选项 2
              </div>
              <div style={{ padding: '10px', cursor: 'pointer' }}>
                选项 3
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 模态框示例 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>模态框示例</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          打开模态框
        </button>

        {isModalOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div
              ref={modalRef}
              style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                maxWidth: '400px',
                width: '90%'
              }}
            >
              <h4 style={{ margin: '0 0 15px 0' }}>模态框标题</h4>
              <p style={{ margin: '0 0 20px 0', color: '#666' }}>
                点击模态框外部区域将关闭此模态框。这是 useClickOutside Hook 的典型应用场景。
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                关闭
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 工具提示示例 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>工具提示示例</h3>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            onClick={() => setIsTooltipOpen(!isTooltipOpen)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ffc107',
              color: '#212529',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isTooltipOpen ? '隐藏提示' : '显示提示'}
          </button>
          
          {isTooltipOpen && (
            <div
              ref={tooltipRef}
              style={{
                position: 'absolute',
                top: '-60px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#333',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                zIndex: 1000
              }}
            >
              这是一个工具提示
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '5px solid #333'
              }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 基本用法示例
function BasicUsageExample() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  return (
    <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <h3>基本用法</h3>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '15px'
        }}
      >
        {isOpen ? '关闭面板' : '打开面板'}
      </button>

      {isOpen && (
        <div
          ref={ref}
          style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '4px'
          }}
        >
          <p style={{ margin: 0 }}>
            点击此面板外部的任何地方都会关闭它。
          </p>
        </div>
      )}

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '10px', 
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '14px',
        marginTop: '15px'
      }}>
        <strong>代码:</strong>
        <pre>{`const [isOpen, setIsOpen] = useState(false);
const ref = useClickOutside(() => {
  setIsOpen(false);
});

return (
  <div>
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? '关闭' : '打开'}
    </button>
    {isOpen && (
      <div ref={ref}>
        点击外部关闭
      </div>
    )}
  </div>
);`}</pre>
      </div>
    </div>
  );
}

// 下拉菜单示例
function DropdownExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('请选择选项');

  const options = ['选项 1', '选项 2', '选项 3', '选项 4'];

  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <h3>下拉菜单示例</h3>
      <div style={{ position: 'relative', display: 'inline-block', width: '200px' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>{selectedOption}</span>
          <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
            ▼
          </span>
        </button>

        {isOpen && (
          <div
            ref={dropdownRef}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderTop: 'none',
              borderRadius: '0 0 4px 4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              zIndex: 1000
            }}
          >
            {options.map((option, index) => (
              <div
                key={option}
                onClick={() => handleOptionClick(option)}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  borderBottom: index < options.length - 1 ? '1px solid #eee' : 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '10px', 
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '14px',
        marginTop: '15px'
      }}>
        <strong>代码:</strong>
        <pre>{`const [isOpen, setIsOpen] = useState(false);
const [selectedOption, setSelectedOption] = useState('请选择');
const dropdownRef = useClickOutside(() => {
  setIsOpen(false);
});

return (
  <div style={{ position: 'relative' }}>
    <button onClick={() => setIsOpen(!isOpen)}>
      {selectedOption} ▼
    </button>
    {isOpen && (
      <div ref={dropdownRef}>
        {options.map(option => (
          <div onClick={() => selectOption(option)}>
            {option}
          </div>
        ))}
      </div>
    )}
  </div>
);`}</pre>
      </div>
    </div>
  );
}

// 模态框示例
function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  return (
    <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <h3>模态框示例</h3>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        打开模态框
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div
            ref={modalRef}
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              maxWidth: '400px',
              width: '90%'
            }}
          >
            <h4 style={{ margin: '0 0 15px 0' }}>确认操作</h4>
            <p style={{ margin: '0 0 20px 0', color: '#666' }}>
              您确定要执行此操作吗？点击模态框外部或取消按钮可以关闭此对话框。
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                取消
              </button>
              <button
                onClick={() => {
                  alert('操作已确认！');
                  setIsOpen(false);
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '10px', 
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '14px',
        marginTop: '15px'
      }}>
        <strong>代码:</strong>
        <pre>{`const [isOpen, setIsOpen] = useState(false);
const modalRef = useClickOutside(() => {
  setIsOpen(false);
});

return (
  <>
    <button onClick={() => setIsOpen(true)}>
      打开模态框
    </button>
    {isOpen && (
      <div className="modal-overlay">
        <div ref={modalRef} className="modal-content">
          <h4>模态框标题</h4>
          <p>模态框内容</p>
          <button onClick={() => setIsOpen(false)}>
            关闭
          </button>
        </div>
      </div>
    )}
  </>
);`}</pre>
      </div>
    </div>
  );
}

const meta: Meta<typeof UseClickOutsideDemo> = {
  title: 'Hooks/useClickOutside',
  component: UseClickOutsideDemo,
  parameters: {
    docs: {
      description: {
        component: `
## useClickOutside

检测元素外部点击事件的 Hook，常用于关闭下拉菜单、模态框、工具提示等组件。

### 特性
- 🎯 **精确检测**: 准确识别元素外部的点击事件
- 🔄 **自动清理**: 组件卸载时自动移除事件监听器
- 📱 **触摸支持**: 同时支持鼠标点击和触摸事件
- 💡 **简单易用**: 只需传入回调函数，返回 ref 对象

### API

\`\`\`typescript
function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void
): RefObject<T>
\`\`\`

**参数:**
- \`handler\`: 外部点击时的回调函数

**返回值:**
- \`ref\`: 要绑定到目标元素的 ref 对象

### 使用示例

\`\`\`typescript
import { useClickOutside } from '@hiiot/ui';

function DropdownComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => {
    setIsOpen(false);
  });

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        切换下拉菜单
      </button>
      {isOpen && (
        <div ref={dropdownRef}>
          <div>选项 1</div>
          <div>选项 2</div>
          <div>选项 3</div>
        </div>
      )}
    </div>
  );
}
\`\`\`

### 常见应用场景

1. **下拉菜单**: 点击外部关闭菜单
2. **模态框**: 点击遮罩层关闭对话框
3. **工具提示**: 点击外部隐藏提示信息
4. **弹出面板**: 关闭侧边栏或设置面板
5. **搜索建议**: 隐藏搜索结果列表

### 最佳实践

1. **合理使用 ref**: 确保 ref 绑定到正确的 DOM 元素
2. **避免冲突**: 多个组件使用时注意事件冒泡
3. **性能考虑**: 在不需要时及时清理监听器
4. **用户体验**: 提供其他关闭方式（如 ESC 键）

### 注意事项

- Hook 会监听 \`mousedown\` 事件
- 确保传入的回调函数在组件生命周期内保持稳定
- 回调函数中可以访问原始的事件对象
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UseClickOutsideDemo>;

export const Default: Story = {
  name: '交互式演示',
};

export const BasicUsage: Story = {
  name: '基本用法',
  render: () => <BasicUsageExample />,
  parameters: {
    docs: {
      source: {
        code: `import { useClickOutside } from '@hiiot/ui';

function BasicUsageExample() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => {
    setIsOpen(false);
  });

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '关闭' : '打开'}
      </button>
      {isOpen && (
        <div ref={ref}>
          点击外部关闭
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

export const DropdownMenu: Story = {
  name: '下拉菜单',
  render: () => <DropdownExample />,
  parameters: {
    docs: {
      source: {
        code: `import { useClickOutside } from '@hiiot/ui';

function DropdownExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('请选择');
  const dropdownRef = useClickOutside(() => {
    setIsOpen(false);
  });

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {selectedOption} ▼
      </button>
      {isOpen && (
        <div ref={dropdownRef}>
          {options.map(option => (
            <div onClick={() => selectOption(option)}>
              {option}
            </div>
          ))}
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

export const Modal: Story = {
  name: '模态框',
  render: () => <ModalExample />,
  parameters: {
    docs: {
      source: {
        code: `import { useClickOutside } from '@hiiot/ui';

function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useClickOutside(() => {
    setIsOpen(false);
  });

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        打开模态框
      </button>
      {isOpen && (
        <div className="modal-overlay">
          <div ref={modalRef} className="modal-content">
            <h4>模态框标题</h4>
            <p>模态框内容</p>
            <button onClick={() => setIsOpen(false)}>
              关闭
            </button>
          </div>
        </div>
      )}
    </>
  );
}`,
        language: 'tsx',
      },
    },
  },
};