import type { Meta, StoryObj } from "@storybook/react-vite-vite";
import { truncateString } from "../../utils";
import { useState } from "react";

const meta: Meta = {
  title: "Utils/truncateString",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "字符串截取工具函数，用于限制字符串长度并添加省略号，常用于文本溢出处理和 UI 显示优化。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 交互式演示组件
const TruncateStringDemo = () => {
  const [inputText, setInputText] = useState(
    "这是一个很长的文本示例，用来演示字符串截取功能的效果。"
  );
  const [maxLength, setMaxLength] = useState(15);
  const [suffix, setSuffix] = useState("...");
  const [results, setResults] = useState<
    Array<{
      id: number;
      original: string;
      truncated: string;
      maxLength: number;
      suffix: string;
      timestamp: string;
    }>
  >([]);

  const handleTruncate = () => {
    const truncated = truncateString(inputText, maxLength, suffix);
    const newResult = {
      id: Date.now(),
      original: inputText,
      truncated,
      maxLength,
      suffix,
      timestamp: new Date().toLocaleTimeString(),
    };

    setResults((prev) => [newResult, ...prev.slice(0, 9)]);
  };

  const clearResults = () => {
    setResults([]);
  };

  const presetTexts = [
    "短文本",
    "这是一个中等长度的文本示例",
    "这是一个非常长的文本示例，包含了很多字符，用来测试字符串截取功能在处理长文本时的表现效果。",
    "This is a very long English text example that contains many characters to test the string truncation function.",
    "混合中英文 Mixed Chinese and English text 用来测试多语言环境下的截取效果",
    "包含特殊字符的文本：@#$%^&*()_+-=[]{}|;:,.<>?",
    "包含数字的文本：12345678901234567890",
    "包含换行符的文本\n第二行内容\n第三行内容",
    "包含emoji的文本：😀😃😄😁😆😅😂🤣😊😇",
  ];

  const presetLengths = [5, 10, 15, 20, 30, 50];
  const presetSuffixes = ["...", "…", "...more", " [...]", ">>>", ""];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h3 className="text-lg font-semibold mb-6">字符串截取演示</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：控制面板 */}
        <div className="space-y-6">
          {/* 文本输入 */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">文本设置</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  输入文本
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="输入要截取的文本..."
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
                <div className="text-xs text-gray-500 mt-1">
                  当前长度: {inputText.length} 字符
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  预设文本
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {presetTexts.map((text, index) => (
                    <button
                      key={index}
                      onClick={() => setInputText(text)}
                      className="text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded border"
                    >
                      <div className="truncate">{text}</div>
                      <div className="text-xs text-gray-500">
                        长度: {text.length}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 截取设置 */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">截取设置</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  最大长度: {maxLength}
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={maxLength}
                  onChange={(e) => setMaxLength(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>100</span>
                </div>

                <div className="mt-2">
                  <label className="block text-sm font-medium mb-2">
                    快速设置
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {presetLengths.map((length) => (
                      <button
                        key={length}
                        onClick={() => setMaxLength(length)}
                        className={`px-3 py-1 text-sm rounded ${
                          maxLength === length
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {length}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  省略号后缀
                </label>
                <input
                  type="text"
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                  placeholder="输入后缀..."
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="mt-2">
                  <label className="block text-sm font-medium mb-2">
                    预设后缀
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {presetSuffixes.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => setSuffix(preset)}
                        className={`px-3 py-1 text-sm rounded border ${
                          suffix === preset
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        {preset === "" ? "(无)" : preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 执行按钮 */}
          <div className="p-4 border rounded-lg">
            <div className="flex gap-3">
              <button
                onClick={handleTruncate}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                执行截取
              </button>
              <button
                onClick={clearResults}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                清空结果
              </button>
            </div>
          </div>

          {/* 实时预览 */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">实时预览</h4>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm font-medium text-gray-700 mb-1">
                  原始文本:
                </div>
                <div className="text-sm break-all">{inputText}</div>
                <div className="text-xs text-gray-500 mt-1">
                  长度: {inputText.length}
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded">
                <div className="text-sm font-medium text-blue-700 mb-1">
                  截取结果:
                </div>
                <div className="text-sm break-all text-blue-800">
                  {truncateString(inputText, maxLength, suffix)}
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  长度: {truncateString(inputText, maxLength, suffix).length}
                </div>
              </div>

              <div className="text-xs text-gray-600">
                <div>
                  设置: 最大长度 {maxLength}, 后缀 "{suffix}"
                </div>
                <div>
                  {inputText.length <= maxLength
                    ? "文本未超出长度限制，无需截取"
                    : `文本超出 ${inputText.length - maxLength} 字符，已截取`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：结果历史 */}
        <div className="space-y-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">截取历史</h4>
            {results.length === 0 ? (
              <p className="text-gray-500 text-sm">暂无截取记录</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="p-3 border rounded bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">截取记录</span>
                      <span className="text-xs text-gray-500">
                        {result.timestamp}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">原始:</span>
                        <div className="mt-1 p-2 bg-white rounded border text-xs break-all">
                          {result.original}
                        </div>
                        <div className="text-xs text-gray-500">
                          长度: {result.original.length}
                        </div>
                      </div>

                      <div>
                        <span className="font-medium text-blue-700">结果:</span>
                        <div className="mt-1 p-2 bg-blue-50 rounded border text-xs break-all">
                          {result.truncated}
                        </div>
                        <div className="text-xs text-blue-600">
                          长度: {result.truncated.length}
                        </div>
                      </div>

                      <div className="text-xs text-gray-600">
                        设置: 最大长度 {result.maxLength}, 后缀 "{result.suffix}
                        "
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 多语言测试演示组件
const MultiLanguageDemo = () => {
  const testCases = [
    {
      category: "中文",
      texts: [
        "这是中文测试",
        "这是一个很长的中文文本示例，用来测试中文字符的截取效果",
        "包含标点符号的中文：你好，世界！这是一个测试。",
      ],
    },
    {
      category: "英文",
      texts: [
        "English test",
        "This is a very long English text example for testing truncation",
        "English with punctuation: Hello, World! This is a test.",
      ],
    },
    {
      category: "数字",
      texts: ["1234567890", "电话号码：13812345678", "ID: 1234567890123456789"],
    },
    {
      category: "特殊字符",
      texts: [
        "@#$%^&*()",
        "Email: user@example.com",
        "URL: https://www.example.com/very/long/path",
      ],
    },
    {
      category: "Emoji",
      texts: [
        "😀😃😄😁😆",
        "用户反馈：😊 很好用！👍",
        "状态：✅ 成功 ❌ 失败 ⚠️ 警告",
      ],
    },
    {
      category: "混合",
      texts: [
        "Hello 世界 123",
        "用户名：user123@example.com 😊",
        "Product-产品-123: 这是一个混合语言的产品名称",
      ],
    },
  ];

  const [selectedLength, setSelectedLength] = useState(15);
  const [selectedSuffix, setSelectedSuffix] = useState("...");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h3 className="text-lg font-semibold mb-6">多语言截取测试</h3>

      <div className="space-y-6">
        {/* 控制面板 */}
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">最大长度</label>
              <select
                value={selectedLength}
                onChange={(e) => setSelectedLength(Number(e.target.value))}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[5, 10, 15, 20, 30].map((length) => (
                  <option key={length} value={length}>
                    {length}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">后缀</label>
              <select
                value={selectedSuffix}
                onChange={(e) => setSelectedSuffix(e.target.value)}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="...">...</option>
                <option value="…">…</option>
                <option value="...more">...more</option>
                <option value="">(无)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 测试结果 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {testCases.map((testCase) => (
            <div key={testCase.category} className="p-4 border rounded-lg">
              <h4 className="font-medium mb-3 text-center bg-gray-100 py-2 rounded">
                {testCase.category}
              </h4>

              <div className="space-y-3">
                {testCase.texts.map((text, index) => {
                  const truncated = truncateString(
                    text,
                    selectedLength,
                    selectedSuffix
                  );
                  const isTruncated = text.length > selectedLength;

                  return (
                    <div key={index} className="p-3 bg-gray-50 rounded">
                      <div className="space-y-2">
                        <div>
                          <div className="text-xs font-medium text-gray-600 mb-1">
                            原始 ({text.length}字符):
                          </div>
                          <div className="text-sm break-all p-2 bg-white rounded border">
                            {text}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-medium text-blue-600 mb-1">
                            截取 ({truncated.length}字符){" "}
                            {isTruncated ? "✂️" : "✓"}:
                          </div>
                          <div className="text-sm break-all p-2 bg-blue-50 rounded border">
                            {truncated}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 性能测试演示组件
const PerformanceDemo = () => {
  const [testResults, setTestResults] = useState<
    Array<{
      textLength: number;
      iterations: number;
      duration: number;
      avgTime: number;
    }>
  >([]);
  const [isRunning, setIsRunning] = useState(false);

  const runPerformanceTest = async () => {
    setIsRunning(true);
    setTestResults([]);

    const testSizes = [10, 100, 1000, 10000, 100000];
    const iterations = 10000;

    for (const size of testSizes) {
      const testText = "A".repeat(size);

      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        truncateString(testText, 15, "...");
      }

      const endTime = performance.now();
      const duration = endTime - startTime;
      const avgTime = duration / iterations;

      setTestResults((prev) => [
        ...prev,
        {
          textLength: size,
          iterations,
          duration,
          avgTime,
        },
      ]);

      // 让 UI 有机会更新
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    setIsRunning(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-6">性能测试</h3>

      <div className="space-y-6">
        <div className="p-4 border rounded-lg">
          <button
            onClick={runPerformanceTest}
            disabled={isRunning}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isRunning ? "测试中..." : "开始性能测试"}
          </button>

          {isRunning && (
            <div className="mt-3 flex items-center space-x-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm">正在测试不同长度文本的截取性能...</span>
            </div>
          )}
        </div>

        {testResults.length > 0 && (
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">测试结果</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">文本长度</th>
                    <th className="text-left p-2 font-medium">迭代次数</th>
                    <th className="text-left p-2 font-medium">总耗时 (ms)</th>
                    <th className="text-left p-2 font-medium">平均耗时 (ms)</th>
                    <th className="text-left p-2 font-medium">性能评级</th>
                  </tr>
                </thead>
                <tbody>
                  {testResults.map((result, index) => {
                    const rating =
                      result.avgTime < 0.001
                        ? "优秀"
                        : result.avgTime < 0.01
                        ? "良好"
                        : result.avgTime < 0.1
                        ? "一般"
                        : "较慢";
                    const ratingColor =
                      result.avgTime < 0.001
                        ? "text-green-600"
                        : result.avgTime < 0.01
                        ? "text-blue-600"
                        : result.avgTime < 0.1
                        ? "text-yellow-600"
                        : "text-red-600";

                    return (
                      <tr key={index} className="border-b">
                        <td className="p-2">
                          {result.textLength.toLocaleString()}
                        </td>
                        <td className="p-2">
                          {result.iterations.toLocaleString()}
                        </td>
                        <td className="p-2">{result.duration.toFixed(2)}</td>
                        <td className="p-2">{result.avgTime.toFixed(6)}</td>
                        <td className={`p-2 font-medium ${ratingColor}`}>
                          {rating}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>
                测试说明：每种长度的文本执行 10,000
                次截取操作，测量平均执行时间。
              </p>
              <p>
                性能评级：优秀 (&lt;0.001ms) | 良好 (&lt;0.01ms) | 一般
                (&lt;0.1ms) | 较慢 (≥0.1ms)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 基础演示
export const Default: Story = {
  render: () => <TruncateStringDemo />,
};

// 多语言测试
export const MultiLanguage: Story = {
  render: () => <MultiLanguageDemo />,
  parameters: {
    docs: {
      description: {
        story: "测试 truncateString 函数在处理不同语言和字符类型时的表现。",
      },
    },
  },
};

// 性能测试
export const Performance: Story = {
  render: () => <PerformanceDemo />,
  parameters: {
    docs: {
      description: {
        story: "测试 truncateString 函数在处理不同长度文本时的性能表现。",
      },
    },
  },
};

// 使用场景演示
export const UsageScenarios: Story = {
  render: () => (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h3 className="text-lg font-semibold">使用场景演示</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 场景 1: 列表项显示 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">场景 1: 列表项显示</h4>
          <p className="text-sm text-gray-600 mb-3">
            在列表、表格或卡片中显示有限长度的文本。
          </p>
          <div className="space-y-2">
            {[
              "用户反馈：这个产品非常好用，界面设计很棒，功能也很完善！",
              "订单备注：请在工作日上午9-12点送货，地址是北京市朝阳区某某街道",
              "商品描述：高品质材料制作，经久耐用，适合各种场合使用",
            ].map((text, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded flex items-center justify-between"
              >
                <span className="text-sm">{truncateString(text, 25)}</span>
                <span className="text-xs text-gray-500 ml-2">
                  原长度: {text.length}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 场景 2: 导航菜单 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">场景 2: 导航菜单</h4>
          <p className="text-sm text-gray-600 mb-3">
            在导航菜单中显示页面标题或用户名。
          </p>
          <div className="space-y-2">
            {[
              "系统管理与配置中心",
              "用户权限管理模块",
              "数据统计与分析报告",
            ].map((title, index) => (
              <div key={index} className="p-2 bg-blue-50 rounded">
                <span className="text-sm font-medium">
                  {truncateString(title, 12)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 场景 3: 通知消息 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">场景 3: 通知消息</h4>
          <p className="text-sm text-gray-600 mb-3">
            在通知栏或提示框中显示消息摘要。
          </p>
          <div className="space-y-2">
            {[
              "您有新的订单需要处理，订单号：#12345，请及时查看详情",
              "系统将在今晚23:00进行维护升级，预计耗时2小时",
              "恭喜您获得了新的成就徽章：连续登录30天",
            ].map((message, index) => (
              <div
                key={index}
                className="p-3 bg-yellow-50 border-l-4 border-yellow-400"
              >
                <span className="text-sm">{truncateString(message, 30)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 场景 4: 文件名显示 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">场景 4: 文件名显示</h4>
          <p className="text-sm text-gray-600 mb-3">
            在文件管理器或上传组件中显示文件名。
          </p>
          <div className="space-y-2">
            {[
              "2024年第一季度销售数据统计报告.xlsx",
              "product-design-specification-v2.1-final.pdf",
              "user-interface-mockup-homepage-mobile.png",
            ].map((filename, index) => (
              <div
                key={index}
                className="p-2 bg-gray-50 rounded flex items-center"
              >
                <span className="text-sm font-mono">
                  {truncateString(filename, 20)}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  ({filename.length}字符)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "展示 truncateString 函数在实际 UI 开发中的常见使用场景。",
      },
    },
  },
};

// 代码示例
export const CodeExamples: Story = {
  render: () => (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h3 className="text-lg font-semibold">代码示例</h3>

      <div className="space-y-6">
        {/* 基础用法 */}
        <div>
          <h4 className="font-medium mb-2">基础用法</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
            {`import { truncateString } from '@/utils';

// 基础用法 - 使用默认参数
const result1 = truncateString('这是一个很长的文本示例');
console.log(result1); // "这是一个很长的文本..."

// 自定义最大长度
const result2 = truncateString('Hello World', 5);
console.log(result2); // "He..."

// 自定义后缀
const result3 = truncateString('Long text here', 8, '..more');
console.log(result3); // "Lon..more"

// 文本未超出长度限制
const result4 = truncateString('Short', 10);
console.log(result4); // "Short"`}
          </pre>
        </div>

        {/* React 组件中的使用 */}
        <div>
          <h4 className="font-medium mb-2">React 组件中的使用</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
            {`import { truncateString } from '@/utils';

// 列表项组件
function ListItem({ title, description }) {
  return (
    <div className="p-4 border rounded">
      <h3 className="font-medium">{truncateString(title, 20)}</h3>
      <p className="text-gray-600 text-sm">
        {truncateString(description, 50)}
      </p>
    </div>
  );
}

// 用户头像组件
function UserAvatar({ user }) {
  return (
    <div className="flex items-center space-x-2">
      <img src={user.avatar} className="w-8 h-8 rounded-full" />
      <span className="text-sm">
        {truncateString(user.name, 12)}
      </span>
    </div>
  );
}

// 文件上传组件
function FileUpload({ files }) {
  return (
    <div className="space-y-2">
      {files.map(file => (
        <div key={file.id} className="flex items-center justify-between">
          <span className="text-sm">
            {truncateString(file.name, 25)}
          </span>
          <span className="text-xs text-gray-500">
            {file.size}
          </span>
        </div>
      ))}
    </div>
  );
}`}
          </pre>
        </div>

        {/* 自定义 Hook */}
        <div>
          <h4 className="font-medium mb-2">自定义 Hook</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
            {`import { useMemo } from 'react';
import { truncateString } from '@/utils';

// 响应式截取 Hook
function useTruncatedText(
  text: string, 
  maxLength: number = 15, 
  suffix: string = '...'
) {
  return useMemo(() => {
    return truncateString(text, maxLength, suffix);
  }, [text, maxLength, suffix]);
}

// 自适应截取 Hook
function useAdaptiveTruncate(text: string, containerWidth: number) {
  return useMemo(() => {
    // 根据容器宽度计算最大字符数（粗略估算）
    const maxLength = Math.floor(containerWidth / 8); // 假设每字符8px
    return truncateString(text, maxLength);
  }, [text, containerWidth]);
}

// 使用示例
function MyComponent({ title, containerRef }) {
  const [containerWidth, setContainerWidth] = useState(0);
  
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef]);
  
  const truncatedTitle = useAdaptiveTruncate(title, containerWidth);
  
  return <div ref={containerRef}>{truncatedTitle}</div>;
}`}
          </pre>
        </div>

        {/* 批量处理 */}
        <div>
          <h4 className="font-medium mb-2">批量处理</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
            {`import { truncateString } from '@/utils';

// 批量截取文本数组
function truncateTextArray(
  texts: string[], 
  maxLength: number = 15, 
  suffix: string = '...'
): string[] {
  return texts.map(text => truncateString(text, maxLength, suffix));
}

// 截取对象中的文本字段
function truncateObjectTexts<T extends Record<string, any>>(
  obj: T,
  fields: (keyof T)[],
  maxLength: number = 15,
  suffix: string = '...'
): T {
  const result = { ...obj };
  
  fields.forEach(field => {
    if (typeof result[field] === 'string') {
      result[field] = truncateString(result[field], maxLength, suffix);
    }
  });
  
  return result;
}

// 使用示例
const articles = [
  { title: '这是一个很长的文章标题', content: '文章内容...' },
  { title: '另一个长标题', content: '更多内容...' }
];

const truncatedArticles = articles.map(article => 
  truncateObjectTexts(article, ['title'], 20)
);`}
          </pre>
        </div>

        {/* 高级用法 */}
        <div>
          <h4 className="font-medium mb-2">高级用法</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
            {`import { truncateString } from '@/utils';

// 智能截取（保持单词完整）
function smartTruncate(
  text: string, 
  maxLength: number = 15, 
  suffix: string = '...'
): string {
  if (text.length <= maxLength) return text;
  
  // 先使用基础截取
  const basicTruncated = truncateString(text, maxLength, suffix);
  
  // 如果是英文，尝试在单词边界截取
  if (/^[a-zA-Z ]+$/.test(text)) {
    const words = text.split(' ');
    let result = '';
    
    for (const word of words) {
      if ((result + word + suffix).length <= maxLength) {
        result += (result ? ' ' : '') + word;
      } else {
        break;
      }
    }
    
    if (result && result.length < text.length) {
      return result + suffix;
    }
  }
  
  return basicTruncated;
}

// 多级截取
function multiLevelTruncate(
  text: string,
  levels: { maxLength: number; suffix: string }[]
): string[] {
  return levels.map(level => 
    truncateString(text, level.maxLength, level.suffix)
  );
}

// 条件截取
function conditionalTruncate(
  text: string,
  condition: boolean,
  maxLength: number = 15,
  suffix: string = '...'
): string {
  return condition ? truncateString(text, maxLength, suffix) : text;
}

// 使用示例
const longText = 'This is a very long English sentence for testing';

const smartResult = smartTruncate(longText, 20);
console.log(smartResult); // "This is a very long..."

const multiResults = multiLevelTruncate(longText, [
  { maxLength: 10, suffix: '...' },
  { maxLength: 20, suffix: '...' },
  { maxLength: 30, suffix: '...' }
]);

const conditionalResult = conditionalTruncate(
  longText, 
  window.innerWidth < 768, // 移动端才截取
  15
);`}
          </pre>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "展示 truncateString 函数的各种使用方式和最佳实践。",
      },
    },
  },
};

// API 文档
export const Documentation: Story = {
  render: () => (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h3 className="text-lg font-semibold">API 文档</h3>

      <div className="space-y-6">
        {/* 函数签名 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">函数签名</h4>
          <pre className="bg-gray-50 p-3 rounded text-sm">
            {`truncateString(str: string, maxLength?: number, suffix?: string): string`}
          </pre>
        </div>

        {/* 参数说明 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">参数说明</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">参数</th>
                  <th className="text-left p-2 font-medium">类型</th>
                  <th className="text-left p-2 font-medium">默认值</th>
                  <th className="text-left p-2 font-medium">必填</th>
                  <th className="text-left p-2 font-medium">说明</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-mono">str</td>
                  <td className="p-2 font-mono">string</td>
                  <td className="p-2">-</td>
                  <td className="p-2">是</td>
                  <td className="p-2">要截取的原始字符串</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">maxLength</td>
                  <td className="p-2 font-mono">number</td>
                  <td className="p-2">15</td>
                  <td className="p-2">否</td>
                  <td className="p-2">最大字符长度（包含后缀）</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">suffix</td>
                  <td className="p-2 font-mono">string</td>
                  <td className="p-2">"..."</td>
                  <td className="p-2">否</td>
                  <td className="p-2">截取后添加的后缀字符串</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 返回值 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">返回值</h4>
          <div className="space-y-2 text-sm">
            <div>
              <strong>类型:</strong> <code>string</code>
            </div>
            <div>
              <strong>说明:</strong> 截取后的字符串
            </div>
            <div>
              <strong>行为:</strong>
              <ul className="mt-2 space-y-1 ml-4">
                <li>• 如果原字符串长度 ≤ maxLength，直接返回原字符串</li>
                <li>• 如果原字符串长度 &gt; maxLength，截取并添加后缀</li>
                <li>• 截取长度 = maxLength - suffix.length</li>
                <li>• 返回的字符串总长度不会超过 maxLength</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 算法逻辑 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">算法逻辑</h4>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
            {`function truncateString(str, maxLength = 15, suffix = "...") {
  // 1. 检查是否需要截取
  if (str.length <= maxLength) {
    return str; // 无需截取，直接返回
  }
  
  // 2. 计算实际截取长度
  const truncateLength = maxLength - suffix.length;
  
  // 3. 截取字符串并添加后缀
  return str.slice(0, truncateLength) + suffix;
}`}
          </pre>
        </div>

        {/* 特性 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">特性</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>简单高效的字符串截取</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>支持自定义最大长度和后缀</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>自动处理边界情况</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>支持所有 Unicode 字符</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>轻量级实现，无外部依赖</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>TypeScript 类型安全</span>
            </li>
          </ul>
        </div>

        {/* 使用场景 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">适用场景</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>
                <strong>列表显示:</strong> 限制列表项文本长度
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>
                <strong>卡片组件:</strong> 控制卡片内容长度
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>
                <strong>导航菜单:</strong> 截取长标题
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>
                <strong>表格单元格:</strong> 防止内容溢出
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>
                <strong>通知消息:</strong> 显示消息摘要
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>
                <strong>文件名显示:</strong> 处理长文件名
              </span>
            </li>
          </ul>
        </div>

        {/* 注意事项 */}
        <div className="p-4 border rounded-lg bg-yellow-50">
          <h4 className="font-medium mb-3 text-yellow-800">注意事项</h4>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">⚠</span>
              <span>
                maxLength 应该大于 suffix.length，否则可能出现意外结果
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">⚠</span>
              <span>函数按字符数截取，不考虑字符显示宽度差异</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">⚠</span>
              <span>中文字符和英文字符在显示宽度上可能不同</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">⚠</span>
              <span>Emoji 等复合字符可能占用多个字符位置</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">⚠</span>
              <span>不会在单词边界截取，可能截断单词</span>
            </li>
          </ul>
        </div>

        {/* 浏览器兼容性 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3">浏览器兼容性</h4>
          <div className="text-sm">
            <p className="mb-2">
              基于标准的 String.prototype.slice() 方法，支持所有现代浏览器：
            </p>
            <ul className="space-y-1 text-gray-600">
              <li>• Chrome: 所有版本</li>
              <li>• Firefox: 所有版本</li>
              <li>• Safari: 所有版本</li>
              <li>• Edge: 所有版本</li>
              <li>• IE: 9+</li>
              <li>• Node.js: 所有版本</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "truncateString 函数的完整 API 文档，包括参数说明、返回值、算法逻辑和注意事项。",
      },
    },
  },
};
