import type { Meta, StoryObj } from '@storybook/react-vite-vite';
import { detectInAppBrowser } from '../../utils';
import { useState, useEffect } from 'react';

const meta: Meta = {
  title: 'Utils/detectInAppBrowser',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '检测是否在应用内浏览器中运行的工具函数，支持识别多种钱包浏览器。',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 交互式演示组件
const DetectInAppBrowserDemo = () => {
  const [isInAppBrowser, setIsInAppBrowser] = useState<boolean>(false);
  const [userAgent, setUserAgent] = useState<string>('');
  const [detectedBrowsers, setDetectedBrowsers] = useState<string[]>([]);

  useEffect(() => {
    const result = detectInAppBrowser();
    setIsInAppBrowser(result);
    setUserAgent(navigator.userAgent || navigator.vendor);
    
    // 检测具体的浏览器类型
    const browsers: string[] = [];
    const ua = navigator.userAgent || navigator.vendor;
    
    if (/Phantom/i.test(ua)) browsers.push('Phantom');
    if (/MetaMask/i.test(ua)) browsers.push('MetaMask');
    if (/OKX/i.test(ua) || /OKC/i.test(ua)) browsers.push('OKX');
    if (/CoinbaseWallet/i.test(ua)) browsers.push('Coinbase Wallet');
    if (/Brave/i.test(ua)) browsers.push('Brave');
    if (/Solflare/i.test(ua)) browsers.push('Solflare');
    if (/Backpack/i.test(ua)) browsers.push('Backpack');
    
    setDetectedBrowsers(browsers);
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">应用内浏览器检测</h3>
      
      {/* 检测结果 */}
      <div className="mb-6 p-4 rounded-lg border">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium">检测结果:</span>
          <span className={`px-2 py-1 rounded text-sm font-medium ${
            isInAppBrowser 
              ? 'bg-orange-100 text-orange-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {isInAppBrowser ? '应用内浏览器' : '标准浏览器'}
          </span>
        </div>
        
        {detectedBrowsers.length > 0 && (
          <div className="mb-2">
            <span className="font-medium">检测到的浏览器:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {detectedBrowsers.map((browser) => (
                <span 
                  key={browser}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                >
                  {browser}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Agent 信息 */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">当前 User Agent:</h4>
        <div className="p-3 bg-gray-50 rounded text-sm font-mono break-all">
          {userAgent}
        </div>
      </div>

      {/* 支持的浏览器列表 */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">支持检测的浏览器:</h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            'Phantom',
            'MetaMask', 
            'OKX',
            'Coinbase Wallet',
            'Brave',
            'Solflare',
            'Backpack'
          ].map((browser) => (
            <div 
              key={browser}
              className={`p-2 rounded border text-sm ${
                detectedBrowsers.includes(browser)
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-gray-50 border-gray-200 text-gray-600'
              }`}
            >
              {browser}
            </div>
          ))}
        </div>
      </div>

      {/* 使用建议 */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">使用建议:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 在 DApp 中使用此函数来检测用户是否在钱包应用内浏览器中</li>
          <li>• 可以根据检测结果调整 UI 或功能</li>
          <li>• 某些钱包浏览器可能有特殊的行为需要适配</li>
        </ul>
      </div>
    </div>
  );
};

// 模拟不同浏览器的演示组件
const BrowserSimulationDemo = () => {
  const [selectedBrowser, setSelectedBrowser] = useState<string>('');
  const [simulationResult, setSimulationResult] = useState<boolean | null>(null);

  const browsers = [
    { name: 'Chrome (标准)', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' },
    { name: 'Phantom', userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1 Phantom' },
    { name: 'MetaMask', userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1 MetaMask' },
    { name: 'OKX', userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1 OKX' },
    { name: 'Coinbase Wallet', userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1 CoinbaseWallet' },
  ];

  const simulateDetection = (userAgent: string) => {
    // 模拟检测逻辑
    const isPhantom = /Phantom/i.test(userAgent);
    const isMetaMask = /MetaMask/i.test(userAgent);
    const isOKC = /OKX/i.test(userAgent) || /OKC/i.test(userAgent);
    const isCoinbaseWallet = /CoinbaseWallet/i.test(userAgent);
    const isBrave = /Brave/i.test(userAgent);
    const isSolflare = /Solflare/i.test(userAgent);
    const isbackpack = /Backpack/i.test(userAgent);

    return isPhantom || isOKC || isMetaMask || isCoinbaseWallet || isBrave || isSolflare || isbackpack;
  };

  const handleBrowserSelect = (browser: typeof browsers[0]) => {
    setSelectedBrowser(browser.name);
    setSimulationResult(simulateDetection(browser.userAgent));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">浏览器检测模拟</h3>
      
      <div className="space-y-3 mb-6">
        {browsers.map((browser) => (
          <button
            key={browser.name}
            onClick={() => handleBrowserSelect(browser)}
            className={`w-full p-3 text-left rounded border transition-colors ${
              selectedBrowser === browser.name
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-medium">{browser.name}</div>
            <div className="text-sm text-gray-500 truncate">{browser.userAgent}</div>
          </button>
        ))}
      </div>

      {simulationResult !== null && (
        <div className="p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <span className="font-medium">模拟结果:</span>
            <span className={`px-2 py-1 rounded text-sm font-medium ${
              simulationResult 
                ? 'bg-orange-100 text-orange-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {simulationResult ? '应用内浏览器' : '标准浏览器'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export const Interactive: Story = {
  render: () => <DetectInAppBrowserDemo />,
  parameters: {
    docs: {
      description: {
        story: '实时检测当前浏览器环境，显示检测结果和详细信息。',
      },
    },
  },
};

export const BrowserSimulation: Story = {
  render: () => <BrowserSimulationDemo />,
  parameters: {
    docs: {
      description: {
        story: '模拟不同浏览器环境下的检测结果，帮助理解函数的工作原理。',
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
        {/* DApp 连接检测 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">🔗 DApp 钱包连接检测</h4>
          <p className="text-sm text-gray-600 mb-3">
            在 DApp 中检测用户是否在钱包应用内浏览器中，提供相应的连接指导。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`import { detectInAppBrowser } from '@/utils';

function WalletConnection() {
  const isInAppBrowser = detectInAppBrowser();
  
  if (isInAppBrowser) {
    return (
      <div className="alert alert-info">
        检测到您在钱包应用内浏览器中，
        可以直接连接钱包！
      </div>
    );
  }
  
  return (
    <div className="alert alert-warning">
      请安装钱包扩展或使用钱包应用内浏览器访问
    </div>
  );
}`}
          </pre>
        </div>

        {/* 功能适配 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">⚙️ 功能适配</h4>
          <p className="text-sm text-gray-600 mb-3">
            根据浏览器环境调整功能可用性。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`import { detectInAppBrowser } from '@/utils';

function FeatureToggle() {
  const isInAppBrowser = detectInAppBrowser();
  
  return (
    <div>
      <button 
        disabled={!isInAppBrowser}
        className={isInAppBrowser ? 'btn-primary' : 'btn-disabled'}
      >
        {isInAppBrowser ? '连接钱包' : '请使用钱包浏览器'}
      </button>
      
      {!isInAppBrowser && (
        <p className="text-sm text-gray-500 mt-2">
          此功能需要在钱包应用内浏览器中使用
        </p>
      )}
    </div>
  );
}`}
          </pre>
        </div>

        {/* 分析统计 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">📊 用户行为分析</h4>
          <p className="text-sm text-gray-600 mb-3">
            收集用户浏览器环境数据用于分析。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`import { detectInAppBrowser } from '@/utils';

function Analytics() {
  useEffect(() => {
    const isInAppBrowser = detectInAppBrowser();
    
    // 发送分析数据
    analytics.track('page_view', {
      is_in_app_browser: isInAppBrowser,
      user_agent: navigator.userAgent,
      timestamp: Date.now()
    });
  }, []);
  
  return null;
}`}
          </pre>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示 detectInAppBrowser 函数在实际项目中的使用场景。',
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
{`import { detectInAppBrowser } from '@/utils';

// 检测是否在应用内浏览器
const isInAppBrowser = detectInAppBrowser();
console.log('是否在应用内浏览器:', isInAppBrowser);

// 返回值: boolean
// true - 在支持的钱包应用内浏览器中
// false - 在标准浏览器中`}
          </pre>
        </div>

        {/* React Hook 封装 */}
        <div>
          <h4 className="font-medium mb-2">React Hook 封装</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`import { useState, useEffect } from 'react';
import { detectInAppBrowser } from '@/utils';

function useInAppBrowser() {
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const result = detectInAppBrowser();
    setIsInAppBrowser(result);
    setIsLoading(false);
  }, []);
  
  return { isInAppBrowser, isLoading };
}

// 使用示例
function MyComponent() {
  const { isInAppBrowser, isLoading } = useInAppBrowser();
  
  if (isLoading) return <div>检测中...</div>;
  
  return (
    <div>
      {isInAppBrowser ? '钱包浏览器' : '标准浏览器'}
    </div>
  );
}`}
          </pre>
        </div>

        {/* 条件渲染 */}
        <div>
          <h4 className="font-medium mb-2">条件渲染</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`import { detectInAppBrowser } from '@/utils';

function WalletConnector() {
  const isInAppBrowser = detectInAppBrowser();
  
  return (
    <div>
      {isInAppBrowser ? (
        <InAppBrowserConnector />
      ) : (
        <StandardBrowserConnector />
      )}
    </div>
  );
}

function InAppBrowserConnector() {
  return (
    <button onClick={connectWallet}>
      连接钱包
    </button>
  );
}

function StandardBrowserConnector() {
  return (
    <div>
      <p>请安装钱包扩展或使用钱包应用</p>
      <a href="https://metamask.io">下载 MetaMask</a>
    </div>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示 detectInAppBrowser 函数的各种代码使用示例。',
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
        {/* 函数签名 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">函数签名</h4>
          <pre className="bg-gray-50 p-3 rounded text-sm">
{`detectInAppBrowser(): boolean`}
          </pre>
        </div>

        {/* 参数说明 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">参数</h4>
          <p className="text-sm text-gray-600">此函数不接受任何参数。</p>
        </div>

        {/* 返回值 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">返回值</h4>
          <div className="space-y-2">
            <div className="flex">
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded mr-2">boolean</span>
              <span className="text-sm">检测结果</span>
            </div>
            <ul className="text-sm text-gray-600 ml-4 space-y-1">
              <li>• <code>true</code> - 在支持的钱包应用内浏览器中</li>
              <li>• <code>false</code> - 在标准浏览器中</li>
            </ul>
          </div>
        </div>

        {/* 支持的浏览器 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">支持检测的浏览器</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Phantom
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              MetaMask
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              OKX
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Coinbase Wallet
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Brave
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Solflare
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Backpack
            </div>
          </div>
        </div>

        {/* 检测原理 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">检测原理</h4>
          <p className="text-sm text-gray-600 mb-2">
            函数通过检测 <code>navigator.userAgent</code> 或 <code>navigator.vendor</code> 中的特定字符串来识别不同的钱包浏览器：
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 使用正则表达式进行大小写不敏感的匹配</li>
            <li>• 检测多种主流钱包浏览器的标识符</li>
            <li>• 返回布尔值表示是否在任一支持的钱包浏览器中</li>
          </ul>
        </div>

        {/* 注意事项 */}
        <div className="p-4 border rounded-lg bg-yellow-50">
          <h4 className="font-medium mb-2 text-yellow-800">注意事项</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• User Agent 字符串可能被修改，检测结果仅供参考</li>
            <li>• 新的钱包浏览器可能需要更新检测逻辑</li>
            <li>• 建议结合其他方法进行环境检测</li>
            <li>• 某些浏览器可能同时匹配多个条件</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'detectInAppBrowser 函数的完整 API 文档和技术说明。',
      },
    },
  },
};