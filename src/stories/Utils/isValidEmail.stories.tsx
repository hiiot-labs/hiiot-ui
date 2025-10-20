import type { Meta, StoryObj } from '@storybook/react-vite-vite';
import { isValidEmail } from '../../utils';
import { useState } from 'react';

const meta: Meta = {
  title: 'Utils/isValidEmail',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '验证邮箱地址格式是否正确的工具函数，使用正则表达式进行验证。',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 交互式演示组件
const EmailValidatorDemo = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [validationHistory, setValidationHistory] = useState<Array<{email: string, isValid: boolean}>>([]);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value.trim()) {
      const valid = isValidEmail(value);
      setIsValid(valid);
    } else {
      setIsValid(null);
    }
  };

  const addToHistory = () => {
    if (email.trim() && isValid !== null) {
      const newEntry = { email, isValid };
      setValidationHistory(prev => [newEntry, ...prev.slice(0, 4)]);
    }
  };

  const testEmails = [
    'user@example.com',
    'test.email@domain.co.uk',
    'invalid-email',
    'user@',
    '@domain.com',
    'user.name+tag@example.com',
    'user@domain',
    'user@domain.c',
    'user@domain.com.',
    'user..name@domain.com'
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">邮箱验证器</h3>
      
      {/* 输入区域 */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          输入邮箱地址进行验证:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="请输入邮箱地址..."
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addToHistory}
            disabled={!email.trim() || isValid === null}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            添加到历史
          </button>
        </div>
        
        {/* 验证结果 */}
        {isValid !== null && (
          <div className={`mt-2 p-2 rounded text-sm ${
            isValid 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            <span className="font-medium">
              {isValid ? '✓ 有效的邮箱地址' : '✗ 无效的邮箱地址'}
            </span>
          </div>
        )}
      </div>

      {/* 快速测试按钮 */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">快速测试:</h4>
        <div className="flex flex-wrap gap-2">
          {testEmails.map((testEmail) => (
            <button
              key={testEmail}
              onClick={() => handleEmailChange(testEmail)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded border"
            >
              {testEmail}
            </button>
          ))}
        </div>
      </div>

      {/* 验证历史 */}
      {validationHistory.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-2">验证历史:</h4>
          <div className="space-y-2">
            {validationHistory.map((entry, index) => (
              <div 
                key={index}
                className={`p-2 rounded text-sm flex justify-between items-center ${
                  entry.isValid 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <span className="font-mono">{entry.email}</span>
                <span className={`font-medium ${
                  entry.isValid ? 'text-green-700' : 'text-red-700'
                }`}>
                  {entry.isValid ? '有效' : '无效'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 验证规则说明 */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">验证规则:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 必须包含 @ 符号</li>
          <li>• @ 前必须有用户名部分</li>
          <li>• @ 后必须有域名部分</li>
          <li>• 域名必须包含至少一个点</li>
          <li>• 支持字母、数字、下划线、点号、加号、减号</li>
        </ul>
      </div>
    </div>
  );
};

// 批量验证演示组件
const BatchValidationDemo = () => {
  const [emailList, setEmailList] = useState('');
  const [results, setResults] = useState<Array<{email: string, isValid: boolean}>>([]);

  const sampleEmails = `user@example.com
test.email@domain.co.uk
invalid-email
user@domain.com
user.name+tag@example.com
user@
@domain.com
user@domain
admin@company.org
contact@website.net`;

  const handleBatchValidation = () => {
    const emails = emailList.split('\n').map(email => email.trim()).filter(email => email);
    const validationResults = emails.map(email => ({
      email,
      isValid: isValidEmail(email)
    }));
    setResults(validationResults);
  };

  const loadSampleEmails = () => {
    setEmailList(sampleEmails);
  };

  const validCount = results.filter(r => r.isValid).length;
  const invalidCount = results.filter(r => !r.isValid).length;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">批量邮箱验证</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          输入邮箱列表 (每行一个):
        </label>
        <div className="flex gap-2 mb-2">
          <button
            onClick={loadSampleEmails}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded border"
          >
            加载示例邮箱
          </button>
          <button
            onClick={() => setEmailList('')}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded border"
          >
            清空
          </button>
        </div>
        <textarea
          value={emailList}
          onChange={(e) => setEmailList(e.target.value)}
          placeholder="请输入邮箱列表，每行一个..."
          className="w-full h-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleBatchValidation}
        disabled={!emailList.trim()}
        className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        批量验证
      </button>

      {/* 验证结果统计 */}
      {results.length > 0 && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">验证结果统计:</h4>
          <div className="flex gap-4 text-sm">
            <span className="text-green-600">
              有效: <strong>{validCount}</strong>
            </span>
            <span className="text-red-600">
              无效: <strong>{invalidCount}</strong>
            </span>
            <span className="text-gray-600">
              总计: <strong>{results.length}</strong>
            </span>
          </div>
        </div>
      )}

      {/* 验证结果列表 */}
      {results.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">验证结果:</h4>
          <div className="max-h-64 overflow-y-auto space-y-1">
            {results.map((result, index) => (
              <div 
                key={index}
                className={`p-2 rounded text-sm flex justify-between items-center ${
                  result.isValid 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <span className="font-mono flex-1 truncate">{result.email}</span>
                <span className={`font-medium ml-2 ${
                  result.isValid ? 'text-green-700' : 'text-red-700'
                }`}>
                  {result.isValid ? '✓' : '✗'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const Interactive: Story = {
  render: () => <EmailValidatorDemo />,
  parameters: {
    docs: {
      description: {
        story: '交互式邮箱验证器，可以实时验证输入的邮箱地址格式。',
      },
    },
  },
};

export const BatchValidation: Story = {
  render: () => <BatchValidationDemo />,
  parameters: {
    docs: {
      description: {
        story: '批量邮箱验证功能，可以一次性验证多个邮箱地址。',
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
        {/* 表单验证 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">📝 表单验证</h4>
          <p className="text-sm text-gray-600 mb-3">
            在用户注册或登录表单中验证邮箱格式。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`import { isValidEmail } from '@/utils';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const handleEmailChange = (value: string) => {
    setEmail(value);
    
    if (value && !isValidEmail(value)) {
      setEmailError('请输入有效的邮箱地址');
    } else {
      setEmailError('');
    }
  };
  
  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => handleEmailChange(e.target.value)}
        className={emailError ? 'border-red-500' : 'border-gray-300'}
      />
      {emailError && (
        <p className="text-red-500 text-sm">{emailError}</p>
      )}
    </div>
  );
}`}
          </pre>
        </div>

        {/* 邮件列表管理 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">📧 邮件列表管理</h4>
          <p className="text-sm text-gray-600 mb-3">
            在邮件营销系统中验证邮箱列表。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`import { isValidEmail } from '@/utils';

function EmailListManager() {
  const [emailList, setEmailList] = useState<string[]>([]);
  
  const addEmail = (email: string) => {
    if (!isValidEmail(email)) {
      toast.error('邮箱格式不正确');
      return;
    }
    
    if (emailList.includes(email)) {
      toast.warning('邮箱已存在');
      return;
    }
    
    setEmailList(prev => [...prev, email]);
    toast.success('邮箱添加成功');
  };
  
  const validateEmailList = (emails: string[]) => {
    const validEmails = emails.filter(isValidEmail);
    const invalidEmails = emails.filter(email => !isValidEmail(email));
    
    return { validEmails, invalidEmails };
  };
  
  return (
    <div>
      {/* 邮箱列表管理界面 */}
    </div>
  );
}`}
          </pre>
        </div>

        {/* API 数据验证 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">🔌 API 数据验证</h4>
          <p className="text-sm text-gray-600 mb-3">
            在处理 API 数据时验证邮箱字段。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`import { isValidEmail } from '@/utils';

interface User {
  id: string;
  name: string;
  email: string;
}

function validateUserData(userData: any): User | null {
  if (!userData.email || !isValidEmail(userData.email)) {
    console.error('Invalid email address:', userData.email);
    return null;
  }
  
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email
  };
}

// 批量处理用户数据
function processUsers(usersData: any[]): User[] {
  return usersData
    .map(validateUserData)
    .filter(Boolean) as User[];
}`}
          </pre>
        </div>

        {/* 实时搜索过滤 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">🔍 实时搜索过滤</h4>
          <p className="text-sm text-gray-600 mb-3">
            在搜索功能中过滤有效的邮箱地址。
          </p>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`import { isValidEmail } from '@/utils';

function UserSearch() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  
  const filteredUsers = useMemo(() => {
    if (!query) return users;
    
    // 如果查询是邮箱格式，只显示邮箱匹配的用户
    if (isValidEmail(query)) {
      return users.filter(user => 
        user.email.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // 否则按名称搜索
    return users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, users]);
  
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索用户名或邮箱..."
      />
      {/* 显示过滤后的用户列表 */}
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
        story: '展示 isValidEmail 函数在实际项目中的使用场景。',
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
{`import { isValidEmail } from '@/utils';

// 验证邮箱格式
const email1 = 'user@example.com';
const email2 = 'invalid-email';

console.log(isValidEmail(email1)); // true
console.log(isValidEmail(email2)); // false

// 在条件语句中使用
if (isValidEmail(userInput)) {
  console.log('邮箱格式正确');
} else {
  console.log('邮箱格式错误');
}`}
          </pre>
        </div>

        {/* 数组过滤 */}
        <div>
          <h4 className="font-medium mb-2">数组过滤</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`import { isValidEmail } from '@/utils';

const emailList = [
  'user@example.com',
  'invalid-email',
  'test@domain.co.uk',
  'user@',
  'admin@company.org'
];

// 过滤出有效的邮箱
const validEmails = emailList.filter(isValidEmail);
console.log(validEmails);
// ['user@example.com', 'test@domain.co.uk', 'admin@company.org']

// 过滤出无效的邮箱
const invalidEmails = emailList.filter(email => !isValidEmail(email));
console.log(invalidEmails);
// ['invalid-email', 'user@']`}
          </pre>
        </div>

        {/* 表单验证 Hook */}
        <div>
          <h4 className="font-medium mb-2">表单验证 Hook</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`import { useState } from 'react';
import { isValidEmail } from '@/utils';

function useEmailValidation() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const validateEmail = (value: string) => {
    setEmail(value);
    
    if (!value) {
      setError('邮箱不能为空');
    } else if (!isValidEmail(value)) {
      setError('邮箱格式不正确');
    } else {
      setError('');
    }
  };
  
  const isValid = email && !error;
  
  return {
    email,
    error,
    isValid,
    validateEmail,
    setEmail: validateEmail
  };
}

// 使用示例
function EmailForm() {
  const { email, error, isValid, setEmail } = useEmailValidation();
  
  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={error ? 'border-red-500' : 'border-gray-300'}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button disabled={!isValid}>提交</button>
    </div>
  );
}`}
          </pre>
        </div>

        {/* 异步验证 */}
        <div>
          <h4 className="font-medium mb-2">异步验证</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`import { isValidEmail } from '@/utils';

async function validateEmailWithServer(email: string) {
  // 首先进行客户端格式验证
  if (!isValidEmail(email)) {
    return {
      isValid: false,
      error: '邮箱格式不正确'
    };
  }
  
  try {
    // 然后进行服务器端验证（检查是否已存在等）
    const response = await fetch('/api/validate-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    const result = await response.json();
    
    return {
      isValid: result.isValid,
      error: result.error || null
    };
  } catch (error) {
    return {
      isValid: false,
      error: '验证失败，请重试'
    };
  }
}

// 使用示例
async function handleEmailSubmit(email: string) {
  const validation = await validateEmailWithServer(email);
  
  if (validation.isValid) {
    console.log('邮箱验证通过');
  } else {
    console.error('邮箱验证失败:', validation.error);
  }
}`}
          </pre>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示 isValidEmail 函数的各种代码使用示例。',
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
{`isValidEmail(email: string): boolean`}
          </pre>
        </div>

        {/* 参数说明 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">参数</h4>
          <div className="space-y-2">
            <div className="flex">
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded mr-2">email</span>
              <div>
                <div className="text-sm font-medium">string</div>
                <div className="text-sm text-gray-600">要验证的邮箱地址字符串</div>
              </div>
            </div>
          </div>
        </div>

        {/* 返回值 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">返回值</h4>
          <div className="space-y-2">
            <div className="flex">
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded mr-2">boolean</span>
              <span className="text-sm">验证结果</span>
            </div>
            <ul className="text-sm text-gray-600 ml-4 space-y-1">
              <li>• <code>true</code> - 邮箱格式正确</li>
              <li>• <code>false</code> - 邮箱格式错误</li>
            </ul>
          </div>
        </div>

        {/* 正则表达式说明 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">验证规则</h4>
          <div className="mb-2">
            <span className="text-sm font-medium">使用的正则表达式:</span>
            <pre className="bg-gray-50 p-2 rounded text-sm mt-1 font-mono">
{`/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$/`}
            </pre>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>规则解释:</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• <code>^</code> - 字符串开始</li>
              <li>• <code>[a-zA-Z0-9_.+-]+</code> - 用户名部分：字母、数字、下划线、点、加号、减号，至少一个字符</li>
              <li>• <code>@</code> - 必须包含 @ 符号</li>
              <li>• <code>[a-zA-Z0-9-]+</code> - 域名部分：字母、数字、减号，至少一个字符</li>
              <li>• <code>\\.</code> - 必须包含点号</li>
              <li>• <code>[a-zA-Z0-9-.]+</code> - 顶级域名：字母、数字、减号、点，至少一个字符</li>
              <li>• <code>$</code> - 字符串结束</li>
            </ul>
          </div>
        </div>

        {/* 有效邮箱示例 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">有效邮箱示例</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-mono">
            <div className="text-green-600">user@example.com</div>
            <div className="text-green-600">test.email@domain.co.uk</div>
            <div className="text-green-600">user.name+tag@example.com</div>
            <div className="text-green-600">admin@company.org</div>
            <div className="text-green-600">contact@website.net</div>
            <div className="text-green-600">user123@test-domain.com</div>
          </div>
        </div>

        {/* 无效邮箱示例 */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">无效邮箱示例</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-mono">
            <div className="text-red-600">invalid-email</div>
            <div className="text-red-600">user@</div>
            <div className="text-red-600">@domain.com</div>
            <div className="text-red-600">user@domain</div>
            <div className="text-red-600">user@domain.</div>
            <div className="text-red-600">user..name@domain.com</div>
          </div>
        </div>

        {/* 注意事项 */}
        <div className="p-4 border rounded-lg bg-yellow-50">
          <h4 className="font-medium mb-2 text-yellow-800">注意事项</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 此函数仅进行基本的格式验证，不验证邮箱是否真实存在</li>
            <li>• 对于更严格的验证，建议结合服务器端验证</li>
            <li>• 某些特殊的邮箱格式可能不被支持</li>
            <li>• 国际化域名（IDN）可能需要特殊处理</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'isValidEmail 函数的完整 API 文档和技术说明。',
      },
    },
  },
};