import type { Meta, StoryObj } from "@storybook/react";
import { url2Params } from "../../utils";
import { useState } from "react";

const meta: Meta = {
  title: "Utils/url2Params",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "URL 参数解析工具函数，将 URL 中的查询参数解析为对象格式。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 交互式演示组件
const Url2ParamsDemo = () => {
  const [url, setUrl] = useState(
    "https://example.com?name=张三&age=25&city=北京&active=true"
  );
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const parseUrl = () => {
    try {
      setError("");
      const params = url2Params(url);
      setResult(params);
    } catch (err) {
      setError(err instanceof Error ? err.message : "解析失败");
      setResult(null);
    }
  };

  const sampleUrls = [
    "https://example.com?name=张三&age=25&city=北京",
    "https://shop.com/products?category=electronics&brand=apple&price=1000&discount=10",
    "https://api.com/search?q=javascript&page=1&limit=20&sort=date",
    "https://social.com/profile?user_id=123&tab=posts&filter=recent",
    "https://blog.com/article?id=456&ref=homepage&utm_source=google&utm_medium=cpc",
    "https://game.com/play?level=5&mode=hard&player=user123&score=9999",
    "https://music.com/playlist?genre=rock&year=2023&artist=band&album=latest",
    "https://video.com/watch?v=abc123&t=120&quality=hd&autoplay=true",
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-6">URL 参数解析演示</h3>

      <div className="space-y-6">
        {/* URL 输入区域 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">输入 URL</h4>
          <div className="space-y-3">
            <textarea
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="请输入包含查询参数的 URL"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <button
              onClick={parseUrl}
              disabled={!url.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              解析参数
            </button>
          </div>
        </div>

        {/* 解析结果 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">解析结果</h4>
          {error ? (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
              错误: {error}
            </div>
          ) : result ? (
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <h5 className="text-sm font-medium text-green-800 mb-2">
                  参数对象:
                </h5>
                <pre className="text-sm font-mono bg-white p-2 rounded border overflow-x-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>

              {/* 参数列表 */}
              <div className="p-3 bg-gray-50 rounded border">
                <h5 className="text-sm font-medium mb-2">参数列表:</h5>
                {Object.keys(result).length === 0 ? (
                  <p className="text-sm text-gray-500">无查询参数</p>
                ) : (
                  <div className="space-y-1">
                    {Object.entries(result).map(([key, value], index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <span className="font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {key}
                        </span>
                        <span>=</span>
                        <span className="font-mono text-green-600 bg-green-50 px-2 py-1 rounded">
                          {String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">请输入 URL 并点击解析按钮</p>
          )}
        </div>

        {/* 示例 URL */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">示例 URL</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {sampleUrls.map((sampleUrl, index) => (
              <button
                key={index}
                onClick={() => setUrl(sampleUrl)}
                className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-gray-100 rounded border break-all"
              >
                <span className="font-mono text-blue-600">{sampleUrl}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 功能说明 */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">功能说明:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 自动解析 URL 中的查询参数（? 后面的部分）</li>
            <li>• 将参数转换为键值对对象格式</li>
            <li>• 支持中文和特殊字符参数</li>
            <li>• 使用浏览器原生 DOM API 进行 URL 解析</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// 批量解析演示
const BatchParsingDemo = () => {
  const testUrls = [
    "https://example.com?name=test&value=123",
    "https://api.com/data?page=1&limit=10&sort=asc",
    "https://shop.com/search?q=phone&category=electronics&price_min=100&price_max=1000",
    "https://blog.com/post?id=456&ref=social&utm_campaign=summer",
    "https://game.com/level?stage=5&difficulty=hard&player_id=user123",
  ];

  const [results, setResults] = useState<Array<{ url: string; params: any }>>(
    []
  );

  const parseAllUrls = () => {
    const parsed = testUrls.map((url) => ({
      url,
      params: url2Params(url),
    }));
    setResults(parsed);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">批量解析演示</h3>

      <button
        onClick={parseAllUrls}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        批量解析所有 URL
      </button>

      <div className="space-y-4">
        {results.length === 0 ? (
          <p className="text-gray-500">点击按钮开始批量解析</p>
        ) : (
          results.map((result, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-600">URL:</span>
                <div className="font-mono text-sm text-blue-600 break-all bg-blue-50 p-2 rounded mt-1">
                  {result.url}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  解析结果:
                </span>
                <pre className="text-sm font-mono bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
                  {JSON.stringify(result.params, null, 2)}
                </pre>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <Url2ParamsDemo />,
  parameters: {
    docs: {
      description: {
        story: "交互式 URL 参数解析演示，可以输入任意 URL 并查看解析结果。",
      },
    },
  },
};

export const BatchParsing: Story = {
  render: () => <BatchParsingDemo />,
  parameters: {
    docs: {
      description: {
        story: "批量解析多个 URL 的查询参数。",
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
        {/* 路由参数处理 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">🔗 路由参数处理</h4>
          <p className="text-sm text-gray-600 mb-3">
            在前端路由中解析 URL 参数，获取页面状态。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
            {`import { url2Params } from '@/utils';

// React Router 中使用
function ProductPage() {
  const currentUrl = window.location.href;
  const params = url2Params(currentUrl);
  
  // 获取产品 ID 和其他参数
  const productId = params.id;
  const category = params.category;
  const sortBy = params.sort || 'name';
  
  useEffect(() => {
    if (productId) {
      fetchProduct(productId, { category, sortBy });
    }
  }, [productId, category, sortBy]);
  
  return <div>产品页面</div>;
}

// URL: https://shop.com/products?id=123&category=electronics&sort=price
// 解析结果: { id: "123", category: "electronics", sort: "price" }`}
          </pre>
        </div>

        {/* API 请求参数 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">🌐 API 请求参数解析</h4>
          <p className="text-sm text-gray-600 mb-3">
            解析 API 请求 URL 中的参数，用于服务端处理。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
            {`import { url2Params } from '@/utils';

// 模拟 API 请求处理
function handleApiRequest(requestUrl: string) {
  const params = url2Params(requestUrl);
  
  // 解析分页参数
  const page = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 10;
  
  // 解析筛选参数
  const filters = {
    category: params.category,
    status: params.status,
    dateFrom: params.date_from,
    dateTo: params.date_to
  };
  
  // 解析排序参数
  const sort = params.sort || 'created_at';
  const order = params.order || 'desc';
  
  return {
    pagination: { page, limit },
    filters,
    sorting: { sort, order }
  };
}

// URL: https://api.com/users?page=2&limit=20&category=admin&status=active&sort=name&order=asc
// 解析结果: 
// {
//   pagination: { page: 2, limit: 20 },
//   filters: { category: "admin", status: "active", dateFrom: undefined, dateTo: undefined },
//   sorting: { sort: "name", order: "asc" }
// }`}
          </pre>
        </div>

        {/* 搜索功能 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">🔍 搜索功能实现</h4>
          <p className="text-sm text-gray-600 mb-3">
            解析搜索页面的 URL 参数，恢复搜索状态。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
            {`import { url2Params } from '@/utils';

function SearchPage() {
  const [searchState, setSearchState] = useState({
    query: '',
    filters: {},
    page: 1
  });
  
  useEffect(() => {
    // 从 URL 恢复搜索状态
    const params = url2Params(window.location.href);
    
    setSearchState({
      query: params.q || '',
      filters: {
        category: params.category,
        priceMin: params.price_min,
        priceMax: params.price_max,
        brand: params.brand
      },
      page: parseInt(params.page) || 1
    });
  }, []);
  
  const updateUrl = (newState: any) => {
    const queryParams = new URLSearchParams();
    
    if (newState.query) queryParams.set('q', newState.query);
    if (newState.filters.category) queryParams.set('category', newState.filters.category);
    if (newState.filters.priceMin) queryParams.set('price_min', newState.filters.priceMin);
    if (newState.filters.priceMax) queryParams.set('price_max', newState.filters.priceMax);
    if (newState.page > 1) queryParams.set('page', newState.page.toString());
    
    const newUrl = \`\${window.location.pathname}?\${queryParams.toString()}\`;
    window.history.pushState({}, '', newUrl);
  };
  
  return <div>搜索页面</div>;
}

// URL: https://search.com?q=laptop&category=electronics&price_min=500&price_max=2000&page=2
// 恢复的搜索状态: 
// {
//   query: "laptop",
//   filters: { category: "electronics", priceMin: "500", priceMax: "2000" },
//   page: 2
// }`}
          </pre>
        </div>

        {/* 分享链接处理 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">📤 分享链接处理</h4>
          <p className="text-sm text-gray-600 mb-3">
            解析分享链接中的参数，追踪来源和用户行为。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
            {`import { url2Params } from '@/utils';

function handleSharedLink() {
  const params = url2Params(window.location.href);
  
  // 解析 UTM 参数
  const utmParams = {
    source: params.utm_source,      // 来源
    medium: params.utm_medium,      // 媒介
    campaign: params.utm_campaign,  // 活动
    term: params.utm_term,          // 关键词
    content: params.utm_content     // 内容
  };
  
  // 解析推荐参数
  const referralCode = params.ref;
  const inviteCode = params.invite;
  
  // 解析内容参数
  const contentId = params.content_id;
  const shareType = params.share_type;
  
  // 记录分析数据
  analytics.track('page_view_from_share', {
    ...utmParams,
    referralCode,
    inviteCode,
    contentId,
    shareType
  });
  
  return {
    utm: utmParams,
    referral: { referralCode, inviteCode },
    content: { contentId, shareType }
  };
}

// URL: https://app.com/article?content_id=123&utm_source=facebook&utm_medium=social&utm_campaign=summer&ref=user456
// 解析结果:
// {
//   utm: { source: "facebook", medium: "social", campaign: "summer", term: undefined, content: undefined },
//   referral: { referralCode: "user456", inviteCode: undefined },
//   content: { contentId: "123", shareType: undefined }
// }`}
          </pre>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "展示 url2Params 函数在实际项目中的使用场景。",
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
            {`import { url2Params } from '@/utils';

// 解析简单的查询参数
const url1 = 'https://example.com?name=张三&age=25';
const params1 = url2Params(url1);
console.log(params1); // { name: "张三", age: "25" }

// 解析复杂的查询参数
const url2 = 'https://api.com/search?q=javascript&page=1&limit=20&sort=date&order=desc';
const params2 = url2Params(url2);
console.log(params2); 
// { q: "javascript", page: "1", limit: "20", sort: "date", order: "desc" }

// 解析包含特殊字符的参数
const url3 = 'https://search.com?query=hello%20world&filter=type%3Darticle';
const params3 = url2Params(url3);
console.log(params3); // { query: "hello world", filter: "type=article" }`}
          </pre>
        </div>

        {/* 类型转换 */}
        <div>
          <h4 className="font-medium mb-2">参数类型转换</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
            {`import { url2Params } from '@/utils';

// url2Params 返回的所有值都是字符串类型
// 需要手动进行类型转换

function parseUrlWithTypes(url: string) {
  const params = url2Params(url);
  
  return {
    // 字符串参数
    name: params.name || '',
    
    // 数字参数
    page: parseInt(params.page) || 1,
    limit: parseInt(params.limit) || 10,
    price: parseFloat(params.price) || 0,
    
    // 布尔参数
    active: params.active === 'true',
    featured: params.featured === '1',
    
    // 数组参数（逗号分隔）
    tags: params.tags ? params.tags.split(',') : [],
    
    // 日期参数
    startDate: params.start_date ? new Date(params.start_date) : null,
    
    // JSON 参数
    filters: params.filters ? JSON.parse(decodeURIComponent(params.filters)) : {}
  };
}

// URL: https://api.com/data?page=2&limit=50&active=true&tags=js,react,vue&start_date=2023-01-01
const typedParams = parseUrlWithTypes(url);
console.log(typedParams);
// {
//   name: "",
//   page: 2,
//   limit: 50,
//   price: 0,
//   active: true,
//   featured: false,
//   tags: ["js", "react", "vue"],
//   startDate: Date object,
//   filters: {}
// }`}
          </pre>
        </div>

        {/* React Hook 封装 */}
        <div>
          <h4 className="font-medium mb-2">React Hook 封装</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
            {`import { useState, useEffect } from 'react';
import { url2Params } from '@/utils';

// 自定义 Hook 用于获取 URL 参数
function useUrlParams() {
  const [params, setParams] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const updateParams = () => {
      const currentParams = url2Params(window.location.href);
      setParams(currentParams);
    };
    
    // 初始化
    updateParams();
    
    // 监听 URL 变化
    window.addEventListener('popstate', updateParams);
    
    return () => {
      window.removeEventListener('popstate', updateParams);
    };
  }, []);
  
  return params;
}

// 带类型转换的 Hook
function useTypedUrlParams<T extends Record<string, any>>(
  schema: (params: Record<string, string>) => T
) {
  const rawParams = useUrlParams();
  const [typedParams, setTypedParams] = useState<T>({} as T);
  
  useEffect(() => {
    const converted = schema(rawParams);
    setTypedParams(converted);
  }, [rawParams, schema]);
  
  return typedParams;
}

// 使用示例
function SearchComponent() {
  const params = useTypedUrlParams((raw) => ({
    query: raw.q || '',
    page: parseInt(raw.page) || 1,
    category: raw.category || 'all',
    sortBy: raw.sort || 'relevance'
  }));
  
  return (
    <div>
      <p>搜索: {params.query}</p>
      <p>页码: {params.page}</p>
      <p>分类: {params.category}</p>
      <p>排序: {params.sortBy}</p>
    </div>
  );
}`}
          </pre>
        </div>

        {/* 错误处理 */}
        <div>
          <h4 className="font-medium mb-2">错误处理和边界情况</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
            {`import { url2Params } from '@/utils';

function safeParseUrl(url: string) {
  try {
    // 检查 URL 格式
    if (!url || typeof url !== 'string') {
      return {};
    }
    
    // 解析参数
    const params = url2Params(url);
    
    // 过滤空值
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([key, value]) => 
        key && value !== undefined && value !== ''
      )
    );
    
    return filteredParams;
  } catch (error) {
    console.warn('URL 解析失败:', error);
    return {};
  }
}

// 测试各种边界情况
console.log(safeParseUrl(''));                           // {}
console.log(safeParseUrl('https://example.com'));        // {}
console.log(safeParseUrl('https://example.com?'));       // {}
console.log(safeParseUrl('https://example.com?a='));     // {}
console.log(safeParseUrl('https://example.com?a=1&b=')); // { a: "1" }
console.log(safeParseUrl('invalid-url'));                // {}

// 处理重复参数（URL 标准中最后一个值生效）
const urlWithDuplicates = 'https://example.com?name=first&name=second';
console.log(url2Params(urlWithDuplicates)); // { name: "second" }`}
          </pre>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "展示 url2Params 函数的各种代码使用示例。",
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
            {`url2Params(url: string): Record<string, string>`}
          </pre>
        </div>

        {/* 参数说明 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">参数</h4>
          <div className="text-sm">
            <p>
              <strong>url</strong> (string) - 要解析的完整 URL 字符串
            </p>
            <ul className="ml-4 mt-1 space-y-1 text-gray-600">
              <li>• 必须是有效的 URL 格式</li>
              <li>• 支持 HTTP/HTTPS 协议</li>
              <li>• 可以包含域名、路径和查询参数</li>
            </ul>
          </div>
        </div>

        {/* 返回值 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">返回值</h4>
          <div className="text-sm">
            <p>
              <strong>Record&lt;string, string&gt;</strong> - 参数对象
            </p>
            <ul className="ml-4 mt-1 space-y-1 text-gray-600">
              <li>• 键为参数名，值为参数值</li>
              <li>• 所有值都是字符串类型</li>
              <li>• 如果没有查询参数，返回空对象 {}</li>
              <li>• 参数值会自动进行 URL 解码</li>
            </ul>
          </div>
        </div>

        {/* 实现原理 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">实现原理</h4>
          <div className="text-sm text-gray-600 space-y-2">
            <p>函数使用浏览器原生的 DOM API 来解析 URL：</p>
            <ol className="ml-4 space-y-1">
              <li>1. 创建一个 &lt;a&gt; 元素</li>
              <li>2. 将 URL 赋值给 href 属性</li>
              <li>3. 浏览器自动解析 URL 结构</li>
              <li>4. 提取 search 属性（查询字符串）</li>
              <li>5. 去除开头的 ? 符号</li>
              <li>6. 按 & 分割参数对</li>
              <li>7. 按 = 分割键值对</li>
              <li>8. 构建并返回参数对象</li>
            </ol>
          </div>
        </div>

        {/* 使用示例 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">使用示例</h4>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
            {`// 基础示例
const url = 'https://example.com/page?name=张三&age=25&city=北京';
const params = url2Params(url);
console.log(params);
// 输出: { name: "张三", age: "25", city: "北京" }

// 复杂示例
const complexUrl = 'https://api.com/search?q=javascript&page=1&limit=20&sort=date&active=true';
const complexParams = url2Params(complexUrl);
console.log(complexParams);
// 输出: { q: "javascript", page: "1", limit: "20", sort: "date", active: "true" }

// 无参数示例
const noParamsUrl = 'https://example.com/page';
const noParams = url2Params(noParamsUrl);
console.log(noParams);
// 输出: {}`}
          </pre>
        </div>

        {/* 注意事项 */}
        <div className="p-4 border rounded-lg bg-yellow-50">
          <h4 className="font-medium mb-2 text-yellow-800">注意事项</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 所有返回值都是字符串类型，需要手动进行类型转换</li>
            <li>• 如果参数名重复，后面的值会覆盖前面的值</li>
            <li>• 参数值会自动进行 URL 解码（如 %20 转换为空格）</li>
            <li>• 函数依赖浏览器环境，不能在 Node.js 中直接使用</li>
            <li>• 空的参数值（如 ?name=）会被解析为空字符串</li>
            <li>• 不支持数组参数的自动解析，需要手动处理</li>
          </ul>
        </div>

        {/* 浏览器兼容性 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">浏览器兼容性</h4>
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              该函数使用的 DOM API 具有良好的浏览器兼容性：
            </p>
            <ul className="ml-4 space-y-1">
              <li>• Chrome: 所有版本</li>
              <li>• Firefox: 所有版本</li>
              <li>• Safari: 所有版本</li>
              <li>• Edge: 所有版本</li>
              <li>• IE: 9+</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "url2Params 函数的完整 API 文档和技术说明。",
      },
    },
  },
};
