import type { Meta, StoryObj } from '@storybook/react-vite-vite';
import { junkTgDiscordXLink } from '../../utils';
import { useState } from 'react';

const meta: Meta = {
  title: 'Utils/junkTgDiscordXLink',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '社交媒体链接转换工具函数，将网页链接转换为对应的深链接格式，支持 Twitter/X、Discord、Telegram、Instagram、YouTube 等平台。',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 交互式演示组件
const JunkTgDiscordXLinkDemo = () => {
  const [url, setUrl] = useState('https://x.com/elonmusk/status/1234567890');
  const [isFollow, setIsFollow] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const convertUrl = () => {
    try {
      setError('');
      const deepLink = junkTgDiscordXLink(url, isFollow);
      setResult(deepLink);
    } catch (err) {
      setError(err instanceof Error ? err.message : '转换失败');
      setResult('');
    }
  };

  const sampleUrls = [
    // Twitter/X 链接
    { url: 'https://x.com/elonmusk', description: 'X 用户主页' },
    { url: 'https://twitter.com/elonmusk/status/1234567890', description: 'Twitter 推文' },
    { url: 'https://x.com/elonmusk/following', description: 'X 关注列表' },
    { url: 'https://x.com/elonmusk/followers', description: 'X 粉丝列表' },
    { url: 'https://x.com/intent/tweet?text=Hello', description: 'X 发推意图' },
    
    // Discord 链接
    { url: 'https://discord.gg/abc123', description: 'Discord 邀请链接' },
    { url: 'https://discord.com/channels/123/456', description: 'Discord 频道' },
    
    // Telegram 链接
    { url: 'https://t.me/username', description: 'Telegram 用户/频道' },
    { url: 'https://t.me/+abc123def', description: 'Telegram 邀请链接' },
    { url: 'https://t.me/c/123456/789', description: 'Telegram 私有频道消息' },
    
    // Instagram 链接
    { url: 'https://instagram.com/username', description: 'Instagram 用户主页' },
    { url: 'https://www.instagram.com/p/abc123', description: 'Instagram 帖子' },
    
    // YouTube 链接
    { url: 'https://youtube.com/watch?v=dQw4w9WgXcQ', description: 'YouTube 视频' },
    { url: 'https://youtu.be/dQw4w9WgXcQ', description: 'YouTube 短链接' },
    
    // 已经是深链接的情况
    { url: 'twitter://user?screen_name=elonmusk', description: '已有的 Twitter 深链接' },
    { url: 'discord://discord.com/invite/abc123', description: '已有的 Discord 深链接' },
    { url: 'tg://join?invite=abc123', description: '已有的 Telegram 深链接' }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-6">社交媒体链接转换演示</h3>
      
      <div className="space-y-6">
        {/* URL 输入区域 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">输入链接</h4>
          <div className="space-y-3">
            <textarea
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="请输入社交媒体链接"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isFollow}
                  onChange={(e) => setIsFollow(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Telegram 关注模式</span>
              </label>
              <div className="text-xs text-gray-500">
                (仅对 Telegram 邀请链接有效)
              </div>
            </div>
            
            <button
              onClick={convertUrl}
              disabled={!url.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              转换为深链接
            </button>
          </div>
        </div>

        {/* 转换结果 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">转换结果</h4>
          {error ? (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
              错误: {error}
            </div>
          ) : result ? (
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <h5 className="text-sm font-medium text-green-800 mb-2">深链接:</h5>
                <div className="font-mono text-sm bg-white p-2 rounded border break-all">
                  {result}
                </div>
              </div>
              
              {/* 链接分析 */}
              <div className="p-3 bg-gray-50 rounded border">
                <h5 className="text-sm font-medium mb-2">链接分析:</h5>
                <div className="text-sm space-y-1">
                  <div>
                    <span className="font-medium">原始链接:</span> 
                    <span className="font-mono text-blue-600 ml-2">{url}</span>
                  </div>
                  <div>
                    <span className="font-medium">深链接协议:</span> 
                    <span className="font-mono text-green-600 ml-2">
                      {result.split('://')[0]}://
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">是否已转换:</span> 
                    <span className={`ml-2 ${result !== url ? 'text-green-600' : 'text-orange-600'}`}>
                      {result !== url ? '是' : '否（原链接返回）'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">请输入链接并点击转换按钮</p>
          )}
        </div>

        {/* 示例链接 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">示例链接</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {sampleUrls.map((sample, index) => (
              <button
                key={index}
                onClick={() => setUrl(sample.url)}
                className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded border"
              >
                <div className="font-medium text-sm text-gray-700 mb-1">
                  {sample.description}
                </div>
                <div className="font-mono text-xs text-blue-600 break-all">
                  {sample.url}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 功能说明 */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">功能说明:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 支持 Twitter/X、Discord、Telegram、Instagram、YouTube 等平台</li>
            <li>• 自动识别链接类型并转换为对应的深链接格式</li>
            <li>• 如果输入的已经是深链接，则直接返回原链接</li>
            <li>• 包含错误处理，转换失败时返回原始链接</li>
            <li>• Telegram 链接支持关注模式参数</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// 平台支持演示
const PlatformSupportDemo = () => {
  const platforms = [
    {
      name: 'Twitter/X',
      icon: '🐦',
      examples: [
        { input: 'https://x.com/username', output: 'twitter://user?screen_name=username' },
        { input: 'https://twitter.com/user/status/123', output: 'twitter://status?id=123' },
        { input: 'https://x.com/user/following', output: 'twitter://user?screen_name=user&action=following' },
        { input: 'https://x.com/intent/tweet?text=hello', output: 'twitter://intent/tweet?text=hello' }
      ]
    },
    {
      name: 'Discord',
      icon: '💬',
      examples: [
        { input: 'https://discord.gg/abc123', output: 'discord://discord.com/invite/abc123' },
        { input: 'https://discord.com/channels/123/456', output: 'discord://channels/123/456' }
      ]
    },
    {
      name: 'Telegram',
      icon: '✈️',
      examples: [
        { input: 'https://t.me/username', output: 'tg://username' },
        { input: 'https://t.me/+abc123', output: 'tg://join?invite=abc123' },
        { input: 'https://t.me/c/123/456', output: 'tg://c/123/456' }
      ]
    },
    {
      name: 'Instagram',
      icon: '📷',
      examples: [
        { input: 'https://instagram.com/username', output: 'instagram://user?username=username' },
        { input: 'https://www.instagram.com/p/abc123', output: 'instagram://media?id=abc123' }
      ]
    },
    {
      name: 'YouTube',
      icon: '📺',
      examples: [
        { input: 'https://youtube.com/watch?v=abc123', output: 'youtube://watch?v=abc123' },
        { input: 'https://youtu.be/abc123', output: 'youtube://watch?v=abc123' }
      ]
    }
  ];

  const [selectedPlatform, setSelectedPlatform] = useState(0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-6">平台支持演示</h3>
      
      {/* 平台选择 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {platforms.map((platform, index) => (
          <button
            key={index}
            onClick={() => setSelectedPlatform(index)}
            className={`px-4 py-2 rounded-md border ${
              selectedPlatform === index
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {platform.icon} {platform.name}
          </button>
        ))}
      </div>

      {/* 选中平台的示例 */}
      <div className="p-4 border rounded-lg">
        <h4 className="font-medium mb-4 flex items-center">
          {platforms[selectedPlatform].icon}
          <span className="ml-2">{platforms[selectedPlatform].name} 转换示例</span>
        </h4>
        
        <div className="space-y-4">
          {platforms[selectedPlatform].examples.map((example, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded border">
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-600">输入:</span>
                <div className="font-mono text-sm text-blue-600 bg-white p-2 rounded mt-1 break-all">
                  {example.input}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">输出:</span>
                <div className="font-mono text-sm text-green-600 bg-white p-2 rounded mt-1 break-all">
                  {example.output}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <JunkTgDiscordXLinkDemo />,
  parameters: {
    docs: {
      description: {
        story: '交互式社交媒体链接转换演示，可以输入任意社交媒体链接并查看转换结果。',
      },
    },
  },
};

export const PlatformSupport: Story = {
  render: () => <PlatformSupportDemo />,
  parameters: {
    docs: {
      description: {
        story: '展示各个平台的链接转换示例和支持情况。',
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
        {/* 移动应用集成 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">📱 移动应用集成</h4>
          <p className="text-sm text-gray-600 mb-3">
            在移动应用中，将网页链接转换为深链接，提供更好的用户体验。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`import { junkTgDiscordXLink } from '@/utils';

// 移动应用中的链接处理
function handleSocialLink(url: string) {
  const deepLink = junkTgDiscordXLink(url, false);
  
  // 尝试打开深链接
  if (deepLink !== url) {
    // 转换成功，使用深链接
    try {
      window.location.href = deepLink;
    } catch (error) {
      // 深链接失败，回退到网页版本
      window.open(url, '_blank');
    }
  } else {
    // 不支持的平台，直接打开网页
    window.open(url, '_blank');
  }
}

// 使用示例
handleSocialLink('https://x.com/elonmusk');
// 尝试打开: twitter://user?screen_name=elonmusk

handleSocialLink('https://discord.gg/abc123');
// 尝试打开: discord://discord.com/invite/abc123`}
          </pre>
        </div>

        {/* DApp 浏览器优化 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">🌐 DApp 浏览器优化</h4>
          <p className="text-sm text-gray-600 mb-3">
            在 DApp 浏览器中优化社交媒体链接的打开方式。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`import { junkTgDiscordXLink, detectInAppBrowser } from '@/utils';

function openSocialLink(url: string) {
  // 检测是否在 DApp 浏览器中
  const isInDApp = detectInAppBrowser();
  
  if (isInDApp) {
    // 在 DApp 浏览器中，优先使用深链接
    const deepLink = junkTgDiscordXLink(url, false);
    
    if (deepLink !== url) {
      // 转换成功，使用深链接
      window.location.href = deepLink;
    } else {
      // 不支持转换，在当前窗口打开
      window.location.href = url;
    }
  } else {
    // 在普通浏览器中，新窗口打开
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

// 组件中使用
function SocialShareButton({ platform, url }: { platform: string, url: string }) {
  const handleClick = () => {
    openSocialLink(url);
  };
  
  return (
    <button onClick={handleClick} className="social-share-btn">
      分享到 {platform}
    </button>
  );
}`}
          </pre>
        </div>

        {/* 批量链接处理 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">📋 批量链接处理</h4>
          <p className="text-sm text-gray-600 mb-3">
            批量处理多个社交媒体链接，生成深链接列表。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`import { junkTgDiscordXLink } from '@/utils';

interface SocialLink {
  platform: string;
  url: string;
  deepLink?: string;
  converted: boolean;
}

function processSocialLinks(urls: string[]): SocialLink[] {
  return urls.map(url => {
    const deepLink = junkTgDiscordXLink(url, false);
    const converted = deepLink !== url;
    
    // 识别平台
    let platform = 'Unknown';
    if (url.includes('twitter.com') || url.includes('x.com')) {
      platform = 'Twitter/X';
    } else if (url.includes('discord')) {
      platform = 'Discord';
    } else if (url.includes('t.me')) {
      platform = 'Telegram';
    } else if (url.includes('instagram')) {
      platform = 'Instagram';
    } else if (url.includes('youtube') || url.includes('youtu.be')) {
      platform = 'YouTube';
    }
    
    return {
      platform,
      url,
      deepLink: converted ? deepLink : undefined,
      converted
    };
  });
}

// 使用示例
const socialUrls = [
  'https://x.com/elonmusk',
  'https://discord.gg/abc123',
  'https://t.me/username',
  'https://instagram.com/username',
  'https://youtube.com/watch?v=abc123'
];

const processedLinks = processSocialLinks(socialUrls);
console.log(processedLinks);
// [
//   { platform: 'Twitter/X', url: '...', deepLink: 'twitter://...', converted: true },
//   { platform: 'Discord', url: '...', deepLink: 'discord://...', converted: true },
//   ...
// ]`}
          </pre>
        </div>

        {/* React Hook 封装 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">⚛️ React Hook 封装</h4>
          <p className="text-sm text-gray-600 mb-3">
            封装为 React Hook，方便在组件中使用。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`import { useState, useCallback } from 'react';
import { junkTgDiscordXLink } from '@/utils';

function useSocialLinkConverter() {
  const [isConverting, setIsConverting] = useState(false);
  
  const convertLink = useCallback((url: string, isFollow = false) => {
    setIsConverting(true);
    
    try {
      const deepLink = junkTgDiscordXLink(url, isFollow);
      const converted = deepLink !== url;
      
      return {
        success: true,
        originalUrl: url,
        deepLink,
        converted,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        originalUrl: url,
        deepLink: url,
        converted: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    } finally {
      setIsConverting(false);
    }
  }, []);
  
  const openSocialLink = useCallback((url: string, isFollow = false) => {
    const result = convertLink(url, isFollow);
    
    if (result.success && result.converted) {
      window.location.href = result.deepLink;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    
    return result;
  }, [convertLink]);
  
  return {
    convertLink,
    openSocialLink,
    isConverting
  };
}

// 组件中使用
function SocialLinkComponent({ url }: { url: string }) {
  const { convertLink, openSocialLink, isConverting } = useSocialLinkConverter();
  const [linkInfo, setLinkInfo] = useState<any>(null);
  
  const handleConvert = () => {
    const result = convertLink(url);
    setLinkInfo(result);
  };
  
  const handleOpen = () => {
    openSocialLink(url);
  };
  
  return (
    <div>
      <button onClick={handleConvert} disabled={isConverting}>
        转换链接
      </button>
      <button onClick={handleOpen}>
        打开链接
      </button>
      {linkInfo && (
        <div>
          <p>转换结果: {linkInfo.converted ? '成功' : '失败'}</p>
          <p>深链接: {linkInfo.deepLink}</p>
        </div>
      )}
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
        story: '展示 junkTgDiscordXLink 函数在实际项目中的使用场景。',
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
{`import { junkTgDiscordXLink } from '@/utils';

// Twitter/X 链接转换
const twitterUrl = 'https://x.com/elonmusk';
const twitterDeepLink = junkTgDiscordXLink(twitterUrl, false);
console.log(twitterDeepLink); // 'twitter://user?screen_name=elonmusk'

// Discord 链接转换
const discordUrl = 'https://discord.gg/abc123';
const discordDeepLink = junkTgDiscordXLink(discordUrl, false);
console.log(discordDeepLink); // 'discord://discord.com/invite/abc123'

// Telegram 链接转换
const telegramUrl = 'https://t.me/username';
const telegramDeepLink = junkTgDiscordXLink(telegramUrl, false);
console.log(telegramDeepLink); // 'tg://username'

// Telegram 关注模式
const telegramInvite = 'https://t.me/+abc123';
const telegramFollowLink = junkTgDiscordXLink(telegramInvite, true);
console.log(telegramFollowLink); // 'tg://join?invite=abc123'`}
          </pre>
        </div>

        {/* 错误处理 */}
        <div>
          <h4 className="font-medium mb-2">错误处理</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`import { junkTgDiscordXLink } from '@/utils';

function safeConvertLink(url: string, isFollow = false) {
  try {
    const deepLink = junkTgDiscordXLink(url, isFollow);
    
    return {
      success: true,
      originalUrl: url,
      deepLink,
      converted: deepLink !== url
    };
  } catch (error) {
    console.warn('链接转换失败:', error);
    
    return {
      success: false,
      originalUrl: url,
      deepLink: url, // 返回原始链接
      converted: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// 使用示例
const result1 = safeConvertLink('https://x.com/username');
console.log(result1);
// { success: true, originalUrl: '...', deepLink: 'twitter://...', converted: true }

const result2 = safeConvertLink('invalid-url');
console.log(result2);
// { success: false, originalUrl: 'invalid-url', deepLink: 'invalid-url', converted: false, error: '...' }`}
          </pre>
        </div>

        {/* 平台检测 */}
        <div>
          <h4 className="font-medium mb-2">平台检测和分类</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`import { junkTgDiscordXLink } from '@/utils';

function detectPlatform(url: string): string {
  if (url.includes('twitter.com') || url.includes('x.com')) {
    return 'Twitter/X';
  } else if (url.includes('discord')) {
    return 'Discord';
  } else if (url.includes('t.me')) {
    return 'Telegram';
  } else if (url.includes('instagram')) {
    return 'Instagram';
  } else if (url.includes('youtube') || url.includes('youtu.be')) {
    return 'YouTube';
  } else if (url.startsWith('twitter://') || url.startsWith('discord://') || url.startsWith('tg://')) {
    return 'Deep Link';
  }
  return 'Unknown';
}

function analyzeAndConvert(url: string, isFollow = false) {
  const platform = detectPlatform(url);
  const deepLink = junkTgDiscordXLink(url, isFollow);
  const converted = deepLink !== url;
  
  return {
    platform,
    originalUrl: url,
    deepLink,
    converted,
    protocol: converted ? deepLink.split('://')[0] : null
  };
}

// 使用示例
const analysis = analyzeAndConvert('https://x.com/elonmusk');
console.log(analysis);
// {
//   platform: 'Twitter/X',
//   originalUrl: 'https://x.com/elonmusk',
//   deepLink: 'twitter://user?screen_name=elonmusk',
//   converted: true,
//   protocol: 'twitter'
// }`}
          </pre>
        </div>

        {/* 条件转换 */}
        <div>
          <h4 className="font-medium mb-2">条件转换</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`import { junkTgDiscordXLink, detectInAppBrowser } from '@/utils';

function conditionalConvert(url: string, options = {}) {
  const {
    forceDeepLink = false,
    onlyInDApp = true,
    telegramFollow = false
  } = options;
  
  // 检查是否在 DApp 浏览器中
  const isInDApp = detectInAppBrowser();
  
  // 根据条件决定是否转换
  if (onlyInDApp && !isInDApp && !forceDeepLink) {
    return url; // 不在 DApp 中，返回原链接
  }
  
  // 执行转换
  const deepLink = junkTgDiscordXLink(url, telegramFollow);
  
  return deepLink;
}

// 使用示例
const url = 'https://x.com/elonmusk';

// 只在 DApp 浏览器中转换
const result1 = conditionalConvert(url);

// 强制转换（无论在哪种浏览器）
const result2 = conditionalConvert(url, { forceDeepLink: true });

// Telegram 关注模式
const telegramUrl = 'https://t.me/+abc123';
const result3 = conditionalConvert(telegramUrl, { 
  forceDeepLink: true, 
  telegramFollow: true 
});`}
          </pre>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示 junkTgDiscordXLink 函数的各种代码使用示例。',
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
{`junkTgDiscordXLink(url: string, isFollow: boolean): string`}
          </pre>
        </div>

        {/* 参数说明 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">参数</h4>
          <div className="text-sm space-y-3">
            <div>
              <p><strong>url</strong> (string) - 要转换的社交媒体链接</p>
              <ul className="ml-4 mt-1 space-y-1 text-gray-600">
                <li>• 支持 HTTP/HTTPS 协议的完整 URL</li>
                <li>• 支持已经是深链接格式的 URL</li>
                <li>• 必须是有效的 URL 格式</li>
              </ul>
            </div>
            <div>
              <p><strong>isFollow</strong> (boolean) - Telegram 关注模式</p>
              <ul className="ml-4 mt-1 space-y-1 text-gray-600">
                <li>• 仅对 Telegram 邀请链接有效</li>
                <li>• true: 强制使用关注模式</li>
                <li>• false: 使用默认转换逻辑</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 返回值 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">返回值</h4>
          <div className="text-sm">
            <p><strong>string</strong> - 转换后的深链接或原始链接</p>
            <ul className="ml-4 mt-1 space-y-1 text-gray-600">
              <li>• 如果转换成功，返回对应的深链接</li>
              <li>• 如果不支持转换，返回原始链接</li>
              <li>• 如果已经是深链接格式，直接返回</li>
              <li>• 如果发生错误，返回原始链接</li>
            </ul>
          </div>
        </div>

        {/* 支持的平台 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">支持的平台</h4>
          <div className="space-y-3 text-sm">
            <div>
              <p><strong>Twitter/X</strong></p>
              <ul className="ml-4 space-y-1 text-gray-600">
                <li>• 用户主页: <code>https://x.com/username</code> → <code>twitter://user?screen_name=username</code></li>
                <li>• 推文: <code>https://x.com/user/status/123</code> → <code>twitter://status?id=123</code></li>
                <li>• 关注列表: <code>https://x.com/user/following</code> → <code>twitter://user?screen_name=user&action=following</code></li>
                <li>• 发推意图: <code>https://x.com/intent/tweet</code> → <code>twitter://intent/tweet</code></li>
              </ul>
            </div>
            <div>
              <p><strong>Discord</strong></p>
              <ul className="ml-4 space-y-1 text-gray-600">
                <li>• 邀请链接: <code>https://discord.gg/abc123</code> → <code>discord://discord.com/invite/abc123</code></li>
                <li>• 频道链接: <code>https://discord.com/channels/123/456</code> → <code>discord://channels/123/456</code></li>
              </ul>
            </div>
            <div>
              <p><strong>Telegram</strong></p>
              <ul className="ml-4 space-y-1 text-gray-600">
                <li>• 用户/频道: <code>https://t.me/username</code> → <code>tg://username</code></li>
                <li>• 邀请链接: <code>https://t.me/+abc123</code> → <code>tg://join?invite=abc123</code></li>
                <li>• 私有频道: <code>https://t.me/c/123/456</code> → <code>tg://c/123/456</code></li>
              </ul>
            </div>
            <div>
              <p><strong>Instagram</strong></p>
              <ul className="ml-4 space-y-1 text-gray-600">
                <li>• 用户主页: <code>https://instagram.com/username</code> → <code>instagram://user?username=username</code></li>
                <li>• 帖子: <code>https://instagram.com/p/abc123</code> → <code>instagram://media?id=abc123</code></li>
              </ul>
            </div>
            <div>
              <p><strong>YouTube</strong></p>
              <ul className="ml-4 space-y-1 text-gray-600">
                <li>• 视频: <code>https://youtube.com/watch?v=abc123</code> → <code>youtube://watch?v=abc123</code></li>
                <li>• 短链接: <code>https://youtu.be/abc123</code> → <code>youtube://watch?v=abc123</code></li>
              </ul>
            </div>
          </div>
        </div>

        {/* 实现原理 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">实现原理</h4>
          <div className="text-sm text-gray-600 space-y-2">
            <p>函数通过以下步骤进行链接转换：</p>
            <ol className="ml-4 space-y-1">
              <li>1. 检查输入是否已经是深链接格式</li>
              <li>2. 使用 URL 构造函数解析链接结构</li>
              <li>3. 根据域名识别平台类型</li>
              <li>4. 解析路径和参数，提取关键信息</li>
              <li>5. 根据平台规则构造对应的深链接</li>
              <li>6. 包含 try-catch 错误处理</li>
            </ol>
          </div>
        </div>

        {/* 注意事项 */}
        <div className="p-4 border rounded-lg bg-yellow-50">
          <h4 className="font-medium mb-2 text-yellow-800">注意事项</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 深链接的打开需要设备上安装对应的应用</li>
            <li>• 不同平台的深链接格式可能随版本更新而变化</li>
            <li>• 在 Web 环境中，深链接可能被浏览器安全策略阻止</li>
            <li>• 建议配合应用检测逻辑，提供回退方案</li>
            <li>• Telegram 的 isFollow 参数仅对邀请链接有效</li>
            <li>• 函数包含错误处理，转换失败时返回原始链接</li>
          </ul>
        </div>

        {/* 浏览器兼容性 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">浏览器兼容性</h4>
          <div className="text-sm text-gray-600">
            <p className="mb-2">函数使用的 API 具有良好的浏览器兼容性：</p>
            <ul className="ml-4 space-y-1">
              <li>• URL 构造函数: Chrome 32+, Firefox 26+, Safari 7+, Edge 12+</li>
              <li>• 字符串方法: 所有现代浏览器</li>
              <li>• try-catch 语法: 所有现代浏览器</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'junkTgDiscordXLink 函数的完整 API 文档和技术说明。',
      },
    },
  },
};