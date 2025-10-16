

// 默认的 getToken 函数
const defaultGetToken = (tokenKey: string): string | null => {
  if (typeof window === 'undefined') return null

  const rawToken = localStorage.getItem(tokenKey)
  if (!rawToken) return null

  // 去除可能存在的双引号（处理JSON.stringify存储的情况）
  return rawToken.replace(/^"(.*)"$/, '$1')
}

// 导出 getToken 函数以保持向后兼容性
export const getToken = defaultGetToken

// 全局配置接口
export interface FetcherConfig {
  tokenKey?: string
  tokenPrefix?: string
  loginMethod?: string
  getToken?: (key: string) => string | null
  baseURL?: string
}

// 默认配置
let globalConfig: FetcherConfig = {
  tokenKey: 'token',
  tokenPrefix: 'space',
  loginMethod: 'wallet',
  getToken: defaultGetToken
}

// 配置 fetcher 的全局设置
export function configureFetcher(config: Partial<FetcherConfig>) {
  globalConfig = { ...globalConfig, ...config }
}

// 获取当前配置
export function getFetcherConfig(): FetcherConfig {
  return { ...globalConfig }
}

export async function fetcherGet<T, B = unknown>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: B,
  header: Record<string, any> = {},
  options: Partial<FetcherConfig> = {}
): Promise<T> {
  // 合并配置：局部配置 > 全局配置
  const config = { ...globalConfig, ...options }
  const token = config.getToken?.(config.tokenKey || 'token')
  // 处理 baseURL
  const finalUrl = config.baseURL ? `${config.baseURL}${url}` : url
  
  // 如果是 GET 方法，则将 body 序列化为 query string 加到 url 中
  let requestUrl = finalUrl
  if (method === 'GET' && body && typeof body === 'object') {
    const query = new URLSearchParams(body as any).toString()
    if (query) {
      requestUrl += `?${query}`
    }
  }
  
  const headerParams = {
    ...header,
    ...(config.loginMethod ? { 'Login-Method': config.loginMethod } : {})
  }
  
  const res: any = await fetch(requestUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headerParams,
      ...(token && config.tokenPrefix ? { authorization: `${config.tokenPrefix} ${token}` } : {}),
      ...(token && !config.tokenPrefix ? { authorization: token } : {})
    },
    // credentials: "include", 会导致接口跨域
    ...(method !== 'GET' && body ? { body: JSON.stringify(body) } : {})
  })
  if (!res.ok) {
    const errMsg = await res.statusText
    throw errMsg || `${method} ${requestUrl} failed`
  }
  return res.json()
}
export async function fetchPost<T, B = any>(
  url: string, 
  body: B, 
  header?: Record<string, any>, 
  options?: Partial<FetcherConfig>
): Promise<T> {
  return fetcherGet<T>(url, 'POST', body, header, options)
}

// 专门的 GET 请求函数，参数会自动转换为查询字符串
export async function fetchGet<T>(
  url: string, 
  params?: Record<string, any>, 
  header?: Record<string, any>, 
  options?: Partial<FetcherConfig>
): Promise<T> {
  return fetcherGet<T>(url, 'GET', params, header, options)
}

// PUT 请求函数
export async function fetchPut<T, B = any>(
  url: string, 
  body: B, 
  header?: Record<string, any>, 
  options?: Partial<FetcherConfig>
): Promise<T> {
  return fetcherGet<T>(url, 'PUT', body, header, options)
}

// DELETE 请求函数
export async function fetchDelete<T>(
  url: string, 
  params?: Record<string, any>, 
  header?: Record<string, any>, 
  options?: Partial<FetcherConfig>
): Promise<T> {
  return fetcherGet<T>(url, 'DELETE', params, header, options)
}
