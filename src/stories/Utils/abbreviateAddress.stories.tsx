import type { Meta, StoryObj } from '@storybook/react-vite-vite';
import { useState } from 'react';
import { abbreviateAddress } from '../../utils';

// 示例组件
function AbbreviateAddressDemo() {
  const [address, setAddress] = useState('0x742d35Cc6634C0532925a3b8D4C9db96590e4265');
  const [charsToShow, setCharsToShow] = useState(5);

  const sampleAddresses = [
    '0x742d35Cc6634C0532925a3b8D4C9db96590e4265',
    '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
    'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    'cosmos1depk54cuajgkzea6zpgkq36tnjwdzv4afc3d27',
    '0x1234567890123456789012345678901234567890',
    'short',
    '',
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>abbreviateAddress 工具函数演示</h2>
      
      {/* 控制面板 */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3>控制面板</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>地址:</label>
            <input 
              type="text"
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
              style={{ 
                padding: '8px', 
                border: '1px solid #ccc', 
                borderRadius: '4px', 
                width: '100%',
                fontSize: '14px',
                fontFamily: 'monospace'
              }}
              placeholder="输入钱包地址"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>显示字符数:</label>
            <input 
              type="number"
              value={charsToShow} 
              onChange={(e) => setCharsToShow(Number(e.target.value))}
              min="1"
              max="20"
              style={{ 
                padding: '8px', 
                border: '1px solid #ccc', 
                borderRadius: '4px', 
                width: '100%',
                fontSize: '14px'
              }}
            />
          </div>
        </div>
      </div>

      {/* 实时预览 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>实时预览</h3>
        <div style={{ 
          backgroundColor: '#e3f2fd', 
          padding: '20px', 
          borderRadius: '4px',
          border: '1px solid #90caf9'
        }}>
          <div style={{ marginBottom: '15px' }}>
            <strong>原始地址:</strong>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '14px', 
              backgroundColor: '#ffffff', 
              padding: '10px', 
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginTop: '5px',
              wordBreak: 'break-all'
            }}>
              {address || '(空地址)'}
            </div>
          </div>
          <div>
            <strong>缩略后:</strong>
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '16px', 
              backgroundColor: '#ffffff', 
              padding: '10px', 
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginTop: '5px',
              color: '#1976d2',
              fontWeight: 'bold'
            }}>
              {abbreviateAddress(address, charsToShow)}
            </div>
          </div>
        </div>
      </div>

      {/* 示例地址列表 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>示例地址</h3>
        <div style={{ display: 'grid', gap: '10px' }}>
          {sampleAddresses.map((addr, index) => (
            <div 
              key={index}
              style={{ 
                padding: '15px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onClick={() => setAddress(addr)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1, marginRight: '15px' }}>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                    {addr === '' ? '空地址' : 
                     addr === 'short' ? '短地址' :
                     addr.startsWith('0x') ? 'Ethereum 地址' :
                     addr.startsWith('bc1') ? 'Bitcoin 地址' :
                     addr.startsWith('cosmos') ? 'Cosmos 地址' : '其他地址'}
                  </div>
                  <div style={{ 
                    fontFamily: 'monospace', 
                    fontSize: '14px', 
                    wordBreak: 'break-all',
                    color: '#495057'
                  }}>
                    {addr || '(空字符串)'}
                  </div>
                </div>
                <div style={{ 
                  fontFamily: 'monospace', 
                  fontSize: '14px', 
                  color: '#007bff',
                  fontWeight: 'bold',
                  minWidth: '120px',
                  textAlign: 'right'
                }}>
                  {abbreviateAddress(addr, charsToShow)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 不同字符数对比 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>不同字符数对比</h3>
        <div style={{ 
          backgroundColor: '#fff3cd', 
          padding: '15px', 
          borderRadius: '4px',
          border: '1px solid #ffeaa7'
        }}>
          <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            测试地址: {address || '(请输入地址)'}
          </div>
          <div style={{ display: 'grid', gap: '10px' }}>
            {[3, 5, 8, 10, 15].map(chars => (
              <div key={chars} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '8px',
                backgroundColor: chars === charsToShow ? '#fff3cd' : '#ffffff',
                borderRadius: '4px',
                border: chars === charsToShow ? '2px solid #856404' : '1px solid #dee2e6'
              }}>
                <span>显示 {chars} 个字符:</span>
                <code style={{ 
                  fontFamily: 'monospace', 
                  fontSize: '14px',
                  color: '#495057'
                }}>
                  {abbreviateAddress(address, chars)}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 使用场景示例 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>使用场景示例</h3>
        <div style={{ display: 'grid', gap: '15px' }}>
          
          {/* 钱包连接显示 */}
          <div style={{ 
            backgroundColor: '#e8f5e8', 
            padding: '15px', 
            borderRadius: '4px',
            border: '1px solid #c3e6cb'
          }}>
            <h4 style={{ marginTop: 0, color: '#155724' }}>钱包连接显示</h4>
            <div style={{ 
              backgroundColor: '#d4edda', 
              padding: '15px', 
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  backgroundColor: '#28a745', 
                  borderRadius: '50%',
                  marginRight: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  W
                </div>
                <div>
                  <div style={{ fontWeight: 'bold' }}>已连接钱包</div>
                  <div style={{ fontSize: '14px', fontFamily: 'monospace' }}>
                    {abbreviateAddress(address, 6)}
                  </div>
                </div>
              </div>
              <button style={{ 
                padding: '8px 16px', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                断开连接
              </button>
            </div>
          </div>

          {/* 交易记录 */}
          <div style={{ 
            backgroundColor: '#cce5ff', 
            padding: '15px', 
            borderRadius: '4px',
            border: '1px solid #99d6ff'
          }}>
            <h4 style={{ marginTop: 0, color: '#004085' }}>交易记录</h4>
            <div style={{ backgroundColor: '#e6f3ff', padding: '10px', borderRadius: '4px' }}>
              <div style={{ display: 'grid', gap: '8px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '8px',
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  <span>发送至: <code>{abbreviateAddress('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', 5)}</code></span>
                  <span style={{ color: '#dc3545' }}>-0.5 ETH</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '8px',
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  <span>接收自: <code>{abbreviateAddress('0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed', 5)}</code></span>
                  <span style={{ color: '#28a745' }}>+1.2 ETH</span>
                </div>
              </div>
            </div>
          </div>

          {/* 地址簿 */}
          <div style={{ 
            backgroundColor: '#f8d7da', 
            padding: '15px', 
            borderRadius: '4px',
            border: '1px solid #f5c6cb'
          }}>
            <h4 style={{ marginTop: 0, color: '#721c24' }}>地址簿</h4>
            <div style={{ backgroundColor: '#f5c6cb', padding: '10px', borderRadius: '4px' }}>
              <div style={{ display: 'grid', gap: '8px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '8px',
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>Alice</div>
                    <code style={{ fontSize: '12px', color: '#666' }}>
                      {abbreviateAddress('0x742d35Cc6634C0532925a3b8D4C9db96590e4265', 4)}
                    </code>
                  </div>
                  <button style={{ 
                    padding: '4px 8px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '3px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>
                    发送
                  </button>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '8px',
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>Bob</div>
                    <code style={{ fontSize: '12px', color: '#666' }}>
                      {abbreviateAddress('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', 4)}
                    </code>
                  </div>
                  <button style={{ 
                    padding: '4px 8px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '3px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>
                    发送
                  </button>
                </div>
              </div>
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
          <pre>{`import { abbreviateAddress } from '@hiiot/ui';

// 基本用法
const address = '0x742d35Cc6634C0532925a3b8D4C9db96590e4265';
const abbreviated = abbreviateAddress(address); // '0x742...4265'

// 自定义显示字符数
const custom = abbreviateAddress(address, 8); // '0x742d35...90e4265'

// 处理短地址
const short = abbreviateAddress('short'); // 'short' (不变)

// 处理空值
const empty = abbreviateAddress(''); // '' (不变)

// 在 React 组件中使用
function WalletDisplay({ address }) {
  return (
    <div>
      <span>钱包地址: {abbreviateAddress(address, 6)}</span>
    </div>
  );
}

// 在列表中使用
function TransactionList({ transactions }) {
  return (
    <ul>
      {transactions.map(tx => (
        <li key={tx.id}>
          发送至: {abbreviateAddress(tx.to, 5)}
        </li>
      ))}
    </ul>
  );
}`}</pre>
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '4px' }}>
        <h4>💡 使用说明</h4>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>专门用于缩略显示钱包地址等长字符串</li>
          <li>支持自定义显示字符数，默认为 5</li>
          <li>自动处理短地址，不会进行缩略</li>
          <li>适用于各种区块链地址格式</li>
          <li>在 UI 中显示地址时保持良好的可读性</li>
          <li>避免地址过长影响界面布局</li>
        </ul>
      </div>
    </div>
  );
}

const meta: Meta<typeof AbbreviateAddressDemo> = {
  title: 'Utils/abbreviateAddress',
  component: AbbreviateAddressDemo,
  parameters: {
    docs: {
      description: {
        component: `
## abbreviateAddress

截取钱包地址的工具函数，用于在 UI 中显示缩略的地址格式。

### 特性
- 🎯 **智能缩略**: 保留地址开头和结尾的重要部分
- 🔧 **可定制**: 支持自定义显示字符数
- 🛡️ **安全处理**: 自动处理短地址和空值
- 🌐 **通用性**: 适用于各种区块链地址格式
- 💡 **易读性**: 保持地址的可识别性

### API

\`\`\`typescript
function abbreviateAddress(address: any, charsToShow?: number): string
\`\`\`

**参数:**
- \`address\`: 要缩略的地址字符串
- \`charsToShow\` (可选): 开头和结尾各显示的字符数，默认为 5

**返回值:**
- 缩略后的地址字符串，格式为 \`{开头}...{结尾}\`

### 使用示例

#### 基本用法
\`\`\`typescript
import { abbreviateAddress } from '@hiiot/ui';

// 默认显示 5 个字符
const address = '0x742d35Cc6634C0532925a3b8D4C9db96590e4265';
const result = abbreviateAddress(address);
// 结果: '0x742...4265'

// 自定义字符数
const custom = abbreviateAddress(address, 8);
// 结果: '0x742d35...90e4265'

// 处理短地址
const short = abbreviateAddress('short');
// 结果: 'short' (不变)
\`\`\`

#### 在 React 组件中使用
\`\`\`typescript
import { abbreviateAddress } from '@hiiot/ui';

function WalletConnector({ address, isConnected }) {
  return (
    <div className="wallet-status">
      {isConnected ? (
        <div>
          <span>已连接: </span>
          <code>{abbreviateAddress(address, 6)}</code>
        </div>
      ) : (
        <button>连接钱包</button>
      )}
    </div>
  );
}

function TransactionItem({ transaction }) {
  return (
    <div className="transaction">
      <div>发送至: {abbreviateAddress(transaction.to, 5)}</div>
      <div>金额: {transaction.amount} ETH</div>
    </div>
  );
}
\`\`\`

#### 在地址簿中使用
\`\`\`typescript
function AddressBook({ contacts }) {
  return (
    <div className="address-book">
      {contacts.map(contact => (
        <div key={contact.id} className="contact-item">
          <div className="contact-name">{contact.name}</div>
          <div className="contact-address">
            {abbreviateAddress(contact.address, 4)}
          </div>
        </div>
      ))}
    </div>
  );
}
\`\`\`

### 使用场景
- **钱包连接**: 显示已连接的钱包地址
- **交易记录**: 在交易列表中显示发送/接收地址
- **地址簿**: 联系人地址的简洁显示
- **NFT 展示**: 显示 NFT 所有者地址
- **DApp 界面**: 任何需要显示区块链地址的场景

### 支持的地址格式
- **Ethereum**: \`0x742d35Cc6634C0532925a3b8D4C9db96590e4265\`
- **Bitcoin**: \`bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh\`
- **Cosmos**: \`cosmos1depk54cuajgkzea6zpgkq36tnjwdzv4afc3d27\`
- **其他**: 任何长字符串格式

### 注意事项
- 如果地址长度小于等于 \`charsToShow * 2\`，则返回原地址
- 函数会自动处理 null、undefined 等值
- 建议在不同场景下使用不同的 \`charsToShow\` 值
- 移动端建议使用较小的 \`charsToShow\` 值以适应屏幕
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AbbreviateAddressDemo>;

export const Default: Story = {
  name: '交互式演示',
};

export const BasicUsage: Story = {
  name: '基本用法',
  render: () => {
    const examples = [
      {
        title: 'Ethereum 地址',
        address: '0x742d35Cc6634C0532925a3b8D4C9db96590e4265',
        chars: 5,
        description: '标准以太坊地址缩略'
      },
      {
        title: 'Bitcoin 地址',
        address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        chars: 6,
        description: 'Bitcoin Bech32 地址缩略'
      },
      {
        title: '自定义字符数',
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        chars: 8,
        description: '显示更多字符的缩略'
      },
      {
        title: '短地址处理',
        address: 'short',
        chars: 5,
        description: '短地址不会被缩略'
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
              <h4 style={{ marginTop: 0, color: '#495057' }}>{example.title}</h4>
              <p style={{ margin: '5px 0', color: '#666' }}>{example.description}</p>
              <div style={{ 
                backgroundColor: '#e9ecef', 
                padding: '10px', 
                borderRadius: '4px',
                marginBottom: '10px',
                fontFamily: 'monospace',
                fontSize: '14px'
              }}>
                <strong>代码:</strong> abbreviateAddress('{example.address}', {example.chars})
              </div>
              <div style={{ 
                backgroundColor: '#d4edda', 
                padding: '10px', 
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#155724'
              }}>
                <strong>结果:</strong> "{abbreviateAddress(example.address, example.chars)}"
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const DifferentLengths: Story = {
  name: '不同长度对比',
  render: () => {
    const testAddress = '0x742d35Cc6634C0532925a3b8D4C9db96590e4265';
    const lengths = [3, 5, 8, 10, 15];

    return (
      <div style={{ padding: '20px' }}>
        <h3>不同字符数对比</h3>
        <div style={{ marginBottom: '20px' }}>
          <strong>测试地址:</strong>
          <div style={{ 
            fontFamily: 'monospace', 
            fontSize: '14px', 
            backgroundColor: '#f8f9fa', 
            padding: '10px', 
            borderRadius: '4px',
            marginTop: '5px'
          }}>
            {testAddress}
          </div>
        </div>
        <div style={{ display: 'grid', gap: '10px' }}>
          {lengths.map(length => (
            <div key={length} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <span style={{ fontWeight: 'bold' }}>显示 {length} 个字符:</span>
              <code style={{ 
                fontFamily: 'monospace', 
                fontSize: '16px',
                color: '#007bff',
                backgroundColor: '#ffffff',
                padding: '5px 10px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}>
                {abbreviateAddress(testAddress, length)}
              </code>
            </div>
          ))}
        </div>
      </div>
    );
  },
};