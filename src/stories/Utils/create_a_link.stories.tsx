import type { Meta, StoryObj } from "@storybook/react-vite-vite";
import { create_a_link, detectInAppBrowser } from "../../utils";
import { useState, useEffect } from "react";

const meta: Meta = {
  title: "Utils/create_a_link",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "智能链接打开工具函数，根据浏览器环境自动选择最佳的链接打开方式。在 DApp 浏览器中优先使用深链接，在普通浏览器中使用标准方式打开链接。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 交互式演示组件
const CreateALinkDemo = () => {
  const [url, setUrl] = useState("https://x.com/elonmusk");
  const [target, setTarget] = useState("_blank");
  const [browserInfo, setBrowserInfo] = useState<any>(null);
  const [linkHistory, setLinkHistory] = useState<
    Array<{
      url: string;
      target: string;
      timestamp: string;
      browserType: string;
    }>
  >([]);

  useEffect(() => {
    // 获取浏览器信息
    const isInDApp = detectInAppBrowser();
    setBrowserInfo({
      isInDApp,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      vendor: navigator.vendor,
    });
  }, []);

  const handleOpenLink = () => {
    if (!url.trim()) return;

    try {
      create_a_link(url, target);

      // 记录链接打开历史
      const newRecord = {
        url,
        target,
        timestamp: new Date().toLocaleTimeString(),
        browserType: browserInfo?.isInDApp
          ? "DApp Browser"
          : "Standard Browser",
      };

      setLinkHistory((prev) => [newRecord, ...prev.slice(0, 9)]); // 保留最近10条记录
    } catch (error) {
      console.error("链接打开失败:", error);
    }
  };

  const sampleUrls = [
    // 社交媒体链接
    {
      url: "https://x.com/elonmusk",
      description: "X/Twitter 用户主页",
      category: "社交媒体",
    },
    {
      url: "https://discord.gg/abc123",
      description: "Discord 邀请链接",
      category: "社交媒体",
    },
    {
      url: "https://t.me/username",
      description: "Telegram 用户/频道",
      category: "社交媒体",
    },
    {
      url: "https://instagram.com/username",
      description: "Instagram 用户主页",
      category: "社交媒体",
    },
    {
      url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      description: "YouTube 视频",
      category: "社交媒体",
    },

    // 深链接
    {
      url: "twitter://user?screen_name=elonmusk",
      description: "Twitter 深链接",
      category: "深链接",
    },
    {
      url: "discord://discord.com/invite/abc123",
      description: "Discord 深链接",
      category: "深链接",
    },
    {
      url: "tg://username",
      description: "Telegram 深链接",
      category: "深链接",
    },

    // 普通网站
    {
      url: "https://github.com/microsoft/vscode",
      description: "GitHub 项目",
      category: "普通网站",
    },
    {
      url: "https://www.google.com",
      description: "Google 搜索",
      category: "普通网站",
    },
    {
      url: "https://docs.npmjs.com",
      description: "NPM 文档",
      category: "普通网站",
    },
  ];

  const targetOptions = [
    { value: "_blank", label: "新窗口 (_blank)" },
    { value: "_self", label: "当前窗口 (_self)" },
    { value: "_parent", label: "父窗口 (_parent)" },
    { value: "_top", label: "顶层窗口 (_top)" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h3 className="text-lg font-semibold mb-6">智能链接打开演示</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：控制面板 */}
        <div className="space-y-6">
          {/* 浏览器环境信息 */}
          <div className="p-4 border rounded-lg bg-blue-50">
            <h4 className="font-medium mb-3 text-blue-800">当前浏览器环境</h4>
            {browserInfo && (
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">环境类型:</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      browserInfo.isInDApp
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {browserInfo.isInDApp ? "DApp 浏览器" : "标准浏览器"}
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  <div>
                    <strong>User Agent:</strong> {browserInfo.userAgent}
                  </div>
                  <div>
                    <strong>Platform:</strong> {browserInfo.platform}
                  </div>
                  <div>
                    <strong>Vendor:</strong> {browserInfo.vendor}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* URL 输入 */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">链接设置</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  URL 地址
                </label>
                <textarea
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="请输入要打开的链接"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  打开方式
                </label>
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {targetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleOpenLink}
                disabled={!url.trim()}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                打开链接
              </button>
            </div>
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
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">
                      {sample.description}
                    </span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {sample.category}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-gray-600 break-all">
                    {sample.url}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：结果展示 */}
        <div className="space-y-6">
          {/* 链接分析 */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">链接分析</h4>
            {url ? (
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">原始链接:</span>
                  <div className="font-mono text-blue-600 bg-gray-50 p-2 rounded mt-1 break-all">
                    {url}
                  </div>
                </div>

                <div>
                  <span className="font-medium">链接类型:</span>
                  <span className="ml-2">
                    {url.startsWith("twitter://") ||
                    url.startsWith("discord://") ||
                    url.startsWith("tg://")
                      ? "深链接"
                      : url.includes("twitter.com") ||
                        url.includes("x.com") ||
                        url.includes("discord") ||
                        url.includes("t.me")
                      ? "社交媒体链接"
                      : "普通网站链接"}
                  </span>
                </div>

                <div>
                  <span className="font-medium">预期行为:</span>
                  <div className="ml-2 text-gray-600">
                    {browserInfo?.isInDApp
                      ? url.startsWith("twitter://") ||
                        url.startsWith("discord://") ||
                        url.startsWith("tg://")
                        ? "直接使用深链接打开，失败时回退到网页版本"
                        : url.includes("twitter.com") ||
                          url.includes("x.com") ||
                          url.includes("discord") ||
                          url.includes("t.me")
                        ? "转换为深链接打开，1秒后回退到网页版本"
                        : "直接使用网页方式打开"
                      : "使用标准浏览器方式打开"}
                  </div>
                </div>

                <div>
                  <span className="font-medium">打开目标:</span>
                  <span className="ml-2">{target}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">请输入链接进行分析</p>
            )}
          </div>

          {/* 打开历史 */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">打开历史</h4>
            {linkHistory.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {linkHistory.map((record, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded border text-sm"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{record.timestamp}</span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {record.browserType}
                      </span>
                    </div>
                    <div className="font-mono text-xs text-gray-600 break-all mb-1">
                      {record.url}
                    </div>
                    <div className="text-xs text-gray-500">
                      Target: {record.target}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">暂无打开记录</p>
            )}
          </div>

          {/* 功能说明 */}
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">功能特性:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• 自动检测浏览器环境（DApp vs 标准浏览器）</li>
              <li>• 在 DApp 浏览器中优先使用深链接</li>
              <li>• 支持深链接失败时的回退机制</li>
              <li>• 社交媒体链接自动转换为深链接</li>
              <li>• 包含错误处理和安全性考虑</li>
              <li>• 支持多种打开目标（_blank, _self 等）</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// 浏览器环境对比演示
const BrowserEnvironmentDemo = () => {
  const [simulatedEnvironment, setSimulatedEnvironment] = useState<
    "standard" | "dapp"
  >("standard");
  const [testUrl, setTestUrl] = useState("https://x.com/elonmusk");

  const environments = [
    {
      id: "standard",
      name: "标准浏览器",
      description: "如 Chrome、Firefox、Safari 等",
      icon: "🌐",
    },
    {
      id: "dapp",
      name: "DApp 浏览器",
      description: "如 MetaMask、OKX、Phantom 等",
      icon: "🔗",
    },
  ];

  const getBehaviorDescription = (env: string, url: string) => {
    const isDeepLink =
      url.startsWith("twitter://") ||
      url.startsWith("discord://") ||
      url.startsWith("tg://");
    const isSocialMedia =
      url.includes("twitter.com") ||
      url.includes("x.com") ||
      url.includes("discord") ||
      url.includes("t.me");

    if (env === "standard") {
      return {
        action: "使用标准方式打开",
        details: "创建 <a> 元素，设置 href、target 和 rel 属性，然后触发点击",
        deepLinkSupport: false,
        fallback: "无需回退机制",
      };
    } else {
      if (isDeepLink) {
        return {
          action: "直接使用深链接",
          details: "通过 window.location.href 直接跳转到深链接",
          deepLinkSupport: true,
          fallback: "失败时转换为对应的网页版本",
        };
      } else if (isSocialMedia) {
        return {
          action: "转换为深链接后打开",
          details: "先调用 junkTgDiscordXLink 转换，然后使用深链接打开",
          deepLinkSupport: true,
          fallback: "1秒后回退到标准方式打开",
        };
      } else {
        return {
          action: "使用标准方式打开",
          details: "不支持深链接转换的链接，直接使用标准方式",
          deepLinkSupport: false,
          fallback: "无需回退机制",
        };
      }
    }
  };

  const currentBehavior = getBehaviorDescription(simulatedEnvironment, testUrl);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-6">浏览器环境对比演示</h3>

      <div className="space-y-6">
        {/* 环境选择 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">选择浏览器环境</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {environments.map((env) => (
              <button
                key={env.id}
                onClick={() => setSimulatedEnvironment(env.id as any)}
                className={`p-4 border rounded-lg text-left ${
                  simulatedEnvironment === env.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{env.icon}</span>
                  <span className="font-medium">{env.name}</span>
                </div>
                <p className="text-sm text-gray-600">{env.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 测试链接输入 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">测试链接</h4>
          <input
            type="text"
            value={testUrl}
            onChange={(e) => setTestUrl(e.target.value)}
            placeholder="输入要测试的链接"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 行为分析 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">
            在 {environments.find((e) => e.id === simulatedEnvironment)?.name}{" "}
            中的行为
          </h4>

          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded">
              <h5 className="font-medium text-sm mb-2">执行动作:</h5>
              <p className="text-sm text-gray-700">{currentBehavior.action}</p>
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <h5 className="font-medium text-sm mb-2">实现细节:</h5>
              <p className="text-sm text-gray-700">{currentBehavior.details}</p>
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <h5 className="font-medium text-sm mb-2">深链接支持:</h5>
              <div className="flex items-center">
                <span
                  className={`w-3 h-3 rounded-full mr-2 ${
                    currentBehavior.deepLinkSupport
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></span>
                <span className="text-sm text-gray-700">
                  {currentBehavior.deepLinkSupport ? "支持" : "不支持"}
                </span>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <h5 className="font-medium text-sm mb-2">回退机制:</h5>
              <p className="text-sm text-gray-700">
                {currentBehavior.fallback}
              </p>
            </div>
          </div>
        </div>

        {/* 代码示例 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">对应的代码逻辑</h4>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
            {simulatedEnvironment === "standard"
              ? `// 标准浏览器环境
const a_elem = document.createElement("a");
a_elem.href = "${testUrl}";
a_elem.target = "_blank";
a_elem.rel = "noopener noreferrer";
a_elem.click();`
              : `// DApp 浏览器环境
if (detectInAppBrowser()) {
  ${
    testUrl.startsWith("twitter://") ||
    testUrl.startsWith("discord://") ||
    testUrl.startsWith("tg://")
      ? `// 已经是深链接，直接打开
  try {
    window.location.href = "${testUrl}";
  } catch (error) {
    // 失败时转换为网页版本
    const webUrl = "${testUrl}".replace("twitter://", "https://twitter.com/");
    const a_elem = document.createElement("a");
    a_elem.href = webUrl;
    a_elem.target = "_blank";
    a_elem.rel = "noopener noreferrer";
    a_elem.click();
  }`
      : testUrl.includes("twitter.com") ||
        testUrl.includes("x.com") ||
        testUrl.includes("discord") ||
        testUrl.includes("t.me")
      ? `// 转换为深链接
  const deepLink = junkTgDiscordXLink("${testUrl}", false);
  if (deepLink !== "${testUrl}") {
    window.location.href = deepLink;
    // 1秒后回退
    setTimeout(() => {
      const a_elem = document.createElement("a");
      a_elem.href = "${testUrl}";
      a_elem.target = "_blank";
      a_elem.rel = "noopener noreferrer";
      a_elem.click();
    }, 1000);
  }`
      : `// 不支持深链接，使用标准方式
  const a_elem = document.createElement("a");
  a_elem.href = "${testUrl}";
  a_elem.target = "_blank";
  a_elem.rel = "noopener noreferrer";
  a_elem.click();`
  }
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <CreateALinkDemo />,
  parameters: {
    docs: {
      description: {
        story: "交互式智能链接打开演示，展示在不同浏览器环境中的链接处理行为。",
      },
    },
  },
};

export const BrowserEnvironment: Story = {
  render: () => <BrowserEnvironmentDemo />,
  parameters: {
    docs: {
      description: {
        story: "对比标准浏览器和 DApp 浏览器中的链接打开行为差异。",
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
        {/* DApp 应用集成 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">🔗 DApp 应用集成</h4>
          <p className="text-sm text-gray-600 mb-3">
            在去中心化应用中，为用户提供最佳的链接打开体验。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
            {`import { create_a_link } from '@/utils';

// DApp 中的社交分享功能
function SocialShareButton({ platform, url, content }: {
  platform: string;
  url: string;
  content: string;
}) {
  const handleShare = () => {
    // 智能打开社交媒体链接
    create_a_link(url, '_blank');
    
    // 记录分享行为
    analytics.track('social_share', {
      platform,
      url,
      content,
      timestamp: Date.now()
    });
  };
  
  return (
    <button onClick={handleShare} className="share-btn">
      分享到 {platform}
    </button>
  );
}

// 使用示例
<SocialShareButton 
  platform="Twitter" 
  url="https://x.com/intent/tweet?text=Check out this DApp!" 
  content="DApp 推广"
/>`}
          </pre>
        </div>

        {/* 外部链接处理 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">🌐 外部链接处理</h4>
          <p className="text-sm text-gray-600 mb-3">
            统一处理应用中的所有外部链接，确保在不同环境中的一致性。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
            {`import { create_a_link } from '@/utils';

// 外部链接组件
function ExternalLink({ 
  href, 
  children, 
  target = '_blank',
  className = '',
  onClick 
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
  className?: string;
  onClick?: () => void;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // 执行自定义点击处理
    onClick?.();
    
    // 使用智能链接打开
    create_a_link(href, target);
  };
  
  return (
    <a 
      href={href}
      onClick={handleClick}
      className={\`external-link \${className}\`}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

// 使用示例
function DocumentationLinks() {
  return (
    <div>
      <ExternalLink href="https://docs.ethereum.org">
        以太坊文档
      </ExternalLink>
      
      <ExternalLink 
        href="https://discord.gg/ethereum" 
        onClick={() => console.log('Joining Discord')}
      >
        加入 Discord 社区
      </ExternalLink>
      
      <ExternalLink href="https://x.com/ethereum">
        关注 Twitter
      </ExternalLink>
    </div>
  );
}`}
          </pre>
        </div>

        {/* 链接预处理 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">⚙️ 链接预处理和分析</h4>
          <p className="text-sm text-gray-600 mb-3">
            在打开链接前进行预处理和分析，提供更好的用户体验。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
            {`import { create_a_link, detectInAppBrowser, junkTgDiscordXLink } from '@/utils';

interface LinkAnalysis {
  originalUrl: string;
  finalUrl: string;
  linkType: 'social' | 'deeplink' | 'standard';
  willUseDeepLink: boolean;
  browserType: 'dapp' | 'standard';
}

function analyzeLinkBehavior(url: string): LinkAnalysis {
  const isInDApp = detectInAppBrowser();
  const isDeepLink = url.startsWith('twitter://') || url.startsWith('discord://') || url.startsWith('tg://');
  const isSocialMedia = url.includes('twitter.com') || url.includes('x.com') || 
                       url.includes('discord') || url.includes('t.me');
  
  let linkType: LinkAnalysis['linkType'] = 'standard';
  let finalUrl = url;
  let willUseDeepLink = false;
  
  if (isDeepLink) {
    linkType = 'deeplink';
    willUseDeepLink = isInDApp;
  } else if (isSocialMedia) {
    linkType = 'social';
    if (isInDApp) {
      finalUrl = junkTgDiscordXLink(url, false);
      willUseDeepLink = finalUrl !== url;
    }
  }
  
  return {
    originalUrl: url,
    finalUrl,
    linkType,
    willUseDeepLink,
    browserType: isInDApp ? 'dapp' : 'standard'
  };
}

function SmartLinkButton({ url, children }: { url: string; children: React.ReactNode }) {
  const [analysis, setAnalysis] = useState<LinkAnalysis | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  useEffect(() => {
    setAnalysis(analyzeLinkBehavior(url));
  }, [url]);
  
  const handleClick = () => {
    create_a_link(url, '_blank');
  };
  
  return (
    <div className="relative">
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
        className="smart-link-btn"
      >
        {children}
      </button>
      
      {showPreview && analysis && (
        <div className="absolute bottom-full left-0 mb-2 p-3 bg-black text-white text-xs rounded shadow-lg z-10">
          <div>类型: {analysis.linkType}</div>
          <div>环境: {analysis.browserType}</div>
          <div>深链接: {analysis.willUseDeepLink ? '是' : '否'}</div>
          {analysis.finalUrl !== analysis.originalUrl && (
            <div>转换后: {analysis.finalUrl}</div>
          )}
        </div>
      )}
    </div>
  );
}

// 使用示例
<SmartLinkButton url="https://x.com/elonmusk">
  查看 Elon Musk 的 Twitter
</SmartLinkButton>`}
          </pre>
        </div>

        {/* 批量链接处理 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">📋 批量链接处理</h4>
          <p className="text-sm text-gray-600 mb-3">
            批量处理多个链接，提供统一的打开接口。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
            {`import { create_a_link } from '@/utils';

interface LinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  category?: string;
}

function LinkList({ links }: { links: LinkItem[] }) {
  const [openedLinks, setOpenedLinks] = useState<Set<string>>(new Set());
  
  const handleLinkClick = (link: LinkItem) => {
    // 记录已打开的链接
    setOpenedLinks(prev => new Set([...prev, link.id]));
    
    // 打开链接
    create_a_link(link.url, '_blank');
    
    // 可选：记录用户行为
    analytics.track('link_clicked', {
      linkId: link.id,
      url: link.url,
      category: link.category,
      timestamp: Date.now()
    });
  };
  
  const openAllLinks = () => {
    links.forEach((link, index) => {
      // 延迟打开，避免浏览器阻止弹窗
      setTimeout(() => {
        handleLinkClick(link);
      }, index * 100);
    });
  };
  
  return (
    <div>
      <div className="mb-4">
        <button onClick={openAllLinks} className="btn-primary">
          打开所有链接
        </button>
        <span className="ml-2 text-sm text-gray-600">
          已打开 {openedLinks.size} / {links.length} 个链接
        </span>
      </div>
      
      <div className="space-y-2">
        {links.map(link => (
          <div key={link.id} className="p-3 border rounded">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{link.title}</h4>
                {link.description && (
                  <p className="text-sm text-gray-600">{link.description}</p>
                )}
                <p className="text-xs text-blue-600 font-mono">{link.url}</p>
              </div>
              <button
                onClick={() => handleLinkClick(link)}
                className={\`btn-sm \${openedLinks.has(link.id) ? 'btn-success' : 'btn-primary'}\`}
              >
                {openedLinks.has(link.id) ? '已打开' : '打开'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 使用示例
const socialLinks: LinkItem[] = [
  { id: '1', title: 'Twitter', url: 'https://x.com/ethereum', category: 'social' },
  { id: '2', title: 'Discord', url: 'https://discord.gg/ethereum', category: 'social' },
  { id: '3', title: 'GitHub', url: 'https://github.com/ethereum', category: 'code' },
];

<LinkList links={socialLinks} />`}
          </pre>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "展示 create_a_link 函数在实际项目中的使用场景。",
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
            {`import { create_a_link } from '@/utils';

// 基本链接打开
create_a_link('https://example.com');

// 指定打开方式
create_a_link('https://example.com', '_self');

// 社交媒体链接（在 DApp 浏览器中会自动转换为深链接）
create_a_link('https://x.com/elonmusk', '_blank');

// 深链接（在 DApp 浏览器中直接使用）
create_a_link('twitter://user?screen_name=elonmusk', '_blank');`}
          </pre>
        </div>

        {/* React 组件集成 */}
        <div>
          <h4 className="font-medium mb-2">React 组件集成</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
            {`import { create_a_link } from '@/utils';

// 简单的链接按钮组件
function LinkButton({ url, children, target = '_blank' }: {
  url: string;
  children: React.ReactNode;
  target?: string;
}) {
  const handleClick = () => {
    create_a_link(url, target);
  };
  
  return (
    <button onClick={handleClick} className="link-button">
      {children}
    </button>
  );
}

// 带确认的链接组件
function ConfirmLinkButton({ url, message, children }: {
  url: string;
  message: string;
  children: React.ReactNode;
}) {
  const handleClick = () => {
    if (window.confirm(message)) {
      create_a_link(url, '_blank');
    }
  };
  
  return (
    <button onClick={handleClick} className="confirm-link-button">
      {children}
    </button>
  );
}

// 使用示例
function SocialLinks() {
  return (
    <div>
      <LinkButton url="https://x.com/ethereum">
        关注 Twitter
      </LinkButton>
      
      <ConfirmLinkButton 
        url="https://discord.gg/ethereum"
        message="即将跳转到 Discord，是否继续？"
      >
        加入 Discord
      </ConfirmLinkButton>
    </div>
  );
}`}
          </pre>
        </div>

        {/* 错误处理 */}
        <div>
          <h4 className="font-medium mb-2">错误处理和日志</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
            {`import { create_a_link, detectInAppBrowser } from '@/utils';

function safeCreateLink(url: string, target: string = '_blank') {
  try {
    // 验证 URL 格式
    new URL(url);
    
    // 记录链接打开事件
    console.log('Opening link:', {
      url,
      target,
      browserType: detectInAppBrowser() ? 'DApp' : 'Standard',
      timestamp: new Date().toISOString()
    });
    
    // 打开链接
    create_a_link(url, target);
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Failed to open link:', error);
    
    // 可选：显示用户友好的错误信息
    alert('链接格式不正确，请检查后重试');
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// 带重试机制的链接打开
function createLinkWithRetry(url: string, target: string = '_blank', maxRetries: number = 3) {
  let attempts = 0;
  
  const attemptOpen = () => {
    attempts++;
    
    try {
      create_a_link(url, target);
      console.log(\`Link opened successfully on attempt \${attempts}\`);
    } catch (error) {
      console.warn(\`Attempt \${attempts} failed:\`, error);
      
      if (attempts < maxRetries) {
        console.log(\`Retrying in 1 second... (attempt \${attempts + 1}/\${maxRetries}\`);
        setTimeout(attemptOpen, 1000);
      } else {
        console.error('All attempts failed, giving up');
        // 最后尝试使用标准方式打开
        window.open(url, target, 'noopener,noreferrer');
      }
    }
  };
  
  attemptOpen();
}

// 使用示例
safeCreateLink('https://example.com');
createLinkWithRetry('https://x.com/elonmusk', '_blank', 2);`}
          </pre>
        </div>

        {/* 高级用法 */}
        <div>
          <h4 className="font-medium mb-2">高级用法和自定义</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
            {`import { create_a_link, detectInAppBrowser, junkTgDiscordXLink } from '@/utils';

// 自定义链接处理器
class LinkHandler {
  private analytics: any;
  private preferences: {
    preferDeepLinks: boolean;
    confirmExternalLinks: boolean;
    trackClicks: boolean;
  };
  
  constructor(analytics: any, preferences: any) {
    this.analytics = analytics;
    this.preferences = preferences;
  }
  
  async openLink(url: string, options: {
    target?: string;
    confirm?: boolean;
    track?: boolean;
  } = {}) {
    const { target = '_blank', confirm = this.preferences.confirmExternalLinks, track = this.preferences.trackClicks } = options;
    
    // 确认对话框
    if (confirm && !window.confirm(\`即将打开链接: \${url}\`)) {
      return;
    }
    
    // 分析链接
    const analysis = this.analyzeLink(url);
    
    // 记录分析结果
    if (track) {
      this.analytics.track('link_analysis', analysis);
    }
    
    // 根据偏好设置决定是否使用深链接
    if (!this.preferences.preferDeepLinks && analysis.canUseDeepLink) {
      // 强制使用网页版本
      window.open(url, target, 'noopener,noreferrer');
    } else {
      // 使用智能链接打开
      create_a_link(url, target);
    }
    
    // 记录打开事件
    if (track) {
      this.analytics.track('link_opened', {
        url,
        target,
        method: analysis.canUseDeepLink && this.preferences.preferDeepLinks ? 'deep_link' : 'standard',
        timestamp: Date.now()
      });
    }
  }
  
  private analyzeLink(url: string) {
    const isInDApp = detectInAppBrowser();
    const isDeepLink = url.startsWith('twitter://') || url.startsWith('discord://') || url.startsWith('tg://');
    const isSocialMedia = url.includes('twitter.com') || url.includes('x.com') || 
                         url.includes('discord') || url.includes('t.me');
    
    return {
      url,
      isInDApp,
      isDeepLink,
      isSocialMedia,
      canUseDeepLink: isInDApp && (isDeepLink || isSocialMedia),
      convertedUrl: isSocialMedia ? junkTgDiscordXLink(url, false) : url
    };
  }
}

// 使用示例
const linkHandler = new LinkHandler(analytics, {
  preferDeepLinks: true,
  confirmExternalLinks: false,
  trackClicks: true
});

// 打开链接
linkHandler.openLink('https://x.com/elonmusk', {
  target: '_blank',
  confirm: true,
  track: true
});`}
          </pre>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "展示 create_a_link 函数的各种代码使用示例。",
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
            {`create_a_link(url: string, target: string = "_blank"): void`}
          </pre>
        </div>

        {/* 参数说明 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">参数</h4>
          <div className="text-sm space-y-3">
            <div>
              <p>
                <strong>url</strong> (string) - 要打开的链接地址
              </p>
              <ul className="ml-4 mt-1 space-y-1 text-gray-600">
                <li>• 支持 HTTP/HTTPS 协议的完整 URL</li>
                <li>• 支持深链接格式（twitter://、discord://、tg:// 等）</li>
                <li>• 必须是有效的 URL 格式</li>
              </ul>
            </div>
            <div>
              <p>
                <strong>target</strong> (string, 可选) - 链接打开目标，默认为
                "_blank"
              </p>
              <ul className="ml-4 mt-1 space-y-1 text-gray-600">
                <li>• "_blank": 在新窗口或标签页中打开</li>
                <li>• "_self": 在当前窗口中打开</li>
                <li>• "_parent": 在父窗口中打开</li>
                <li>• "_top": 在顶层窗口中打开</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 返回值 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">返回值</h4>
          <div className="text-sm">
            <p>
              <strong>void</strong> - 函数不返回值
            </p>
            <ul className="ml-4 mt-1 space-y-1 text-gray-600">
              <li>• 函数执行链接打开操作</li>
              <li>• 错误处理在函数内部完成</li>
              <li>• 不抛出异常，失败时会有回退机制</li>
            </ul>
          </div>
        </div>

        {/* 行为逻辑 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">行为逻辑</h4>
          <div className="text-sm space-y-3">
            <div>
              <p>
                <strong>标准浏览器环境:</strong>
              </p>
              <ul className="ml-4 space-y-1 text-gray-600">
                <li>• 创建 &lt;a&gt; 元素并设置相关属性</li>
                <li>• 设置 rel="noopener noreferrer" 确保安全性</li>
                <li>• 触发点击事件打开链接</li>
              </ul>
            </div>
            <div>
              <p>
                <strong>DApp 浏览器环境:</strong>
              </p>
              <ul className="ml-4 space-y-1 text-gray-600">
                <li>• 检测链接是否已经是深链接格式</li>
                <li>• 对于深链接：直接使用 window.location.href 打开</li>
                <li>• 对于社交媒体链接：先转换为深链接再打开</li>
                <li>• 设置回退机制：深链接失败时使用标准方式</li>
                <li>• 对于不支持的链接：直接使用标准方式</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 依赖函数 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">依赖函数</h4>
          <div className="text-sm space-y-2">
            <div>
              <p>
                <strong>detectInAppBrowser()</strong> - 检测是否在 DApp 浏览器中
              </p>
              <ul className="ml-4 space-y-1 text-gray-600">
                <li>• 用于判断当前浏览器环境</li>
                <li>• 决定是否使用深链接策略</li>
              </ul>
            </div>
            <div>
              <p>
                <strong>junkTgDiscordXLink(url, false)</strong> -
                社交媒体链接转换
              </p>
              <ul className="ml-4 space-y-1 text-gray-600">
                <li>• 将网页链接转换为深链接</li>
                <li>• 支持 Twitter/X、Discord、Telegram 等平台</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 安全性考虑 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">安全性考虑</h4>
          <div className="text-sm text-gray-600 space-y-2">
            <ul className="space-y-1">
              <li>
                • 所有创建的 &lt;a&gt; 元素都设置 rel="noopener noreferrer"
              </li>
              <li>• 防止新窗口访问原窗口的 window.opener</li>
              <li>• 避免 Referer 信息泄露</li>
              <li>• 包含错误处理，避免恶意链接导致的异常</li>
              <li>• 深链接失败时有安全的回退机制</li>
            </ul>
          </div>
        </div>

        {/* 浏览器兼容性 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">浏览器兼容性</h4>
          <div className="text-sm text-gray-600">
            <p className="mb-2">函数使用的 API 具有良好的浏览器兼容性：</p>
            <ul className="ml-4 space-y-1">
              <li>• document.createElement: 所有现代浏览器</li>
              <li>
                • element.click(): Chrome 9+, Firefox 3+, Safari 4+, Edge 12+
              </li>
              <li>• window.location.href: 所有现代浏览器</li>
              <li>• setTimeout: 所有现代浏览器</li>
            </ul>
          </div>
        </div>

        {/* 注意事项 */}
        <div className="p-4 border rounded-lg bg-yellow-50">
          <h4 className="font-medium mb-2 text-yellow-800">注意事项</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 深链接的打开需要设备上安装对应的应用</li>
            <li>• 浏览器可能会阻止弹窗，特别是在没有用户交互的情况下</li>
            <li>• DApp 浏览器的检测可能随着新浏览器的出现而需要更新</li>
            <li>• 回退机制的延迟时间（1秒）可能需要根据实际情况调整</li>
            <li>• 在某些环境中，深链接可能被安全策略阻止</li>
            <li>• 建议在用户交互事件中调用此函数，避免被浏览器阻止</li>
          </ul>
        </div>

        {/* 性能考虑 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">性能考虑</h4>
          <div className="text-sm text-gray-600">
            <ul className="space-y-1">
              <li>• 函数执行速度很快，主要是 DOM 操作和字符串处理</li>
              <li>• detectInAppBrowser() 会检查 user agent，但开销很小</li>
              <li>• junkTgDiscordXLink() 包含 URL 解析，但对性能影响微小</li>
              <li>• 回退机制使用 setTimeout，不会阻塞主线程</li>
              <li>• 建议避免在循环中大量调用，可以考虑批量处理</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "create_a_link 函数的完整 API 文档和技术说明。",
      },
    },
  },
};
