import { clsx, type ClassValue } from "clsx";

export * from "./fetcher";

export * from "./date";

/**
 * 合并类名的工具函数
 * @param inputs - 类名数组
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * 生成唯一ID
 * @param prefix - ID前缀
 * @returns 唯一ID字符串
 */
export function generateId(prefix = "hiiot"): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 防抖函数
 * @param func - 要防抖的函数
 * @param wait - 等待时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 节流函数
 * @param func - 要节流的函数
 * @param limit - 限制时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * 深度合并对象
 * @param target - 目标对象
 * @param sources - 源对象数组
 * @returns 合并后的对象
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key] as any, source[key] as any);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}

/**
 * 检查是否为对象
 * @param item - 要检查的项
 * @returns 是否为对象
 */
function isObject(item: any): item is Record<string, any> {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * @description 截取钱包地址
 * @param address
 * @param charsToShow
 * @returns
 */
export const abbreviateAddress = (address: any, charsToShow: number = 5) => {
  if (address?.length <= charsToShow * 2) {
    return address;
  }

  return (
    address?.substring(0, charsToShow) +
    "..." +
    address?.substring(address.length - charsToShow)
  );
};

// 移动端的phantom和okx内置浏览器检测
export const detectInAppBrowser = () => {
  const userAgent = navigator.userAgent || navigator.vendor;
  // 判断是否是 Phantom 钱包浏览器
  const isPhantom = /Phantom/i.test(userAgent);
  // 判断是否是 MetaMask 钱包浏览器
  const isMetaMask = /MetaMask/i.test(userAgent);
  // 判断是OKX
  const isOKC = /OKX/i.test(userAgent) || /OKC/i.test(userAgent);
  // 判断是CoinbaseWallet
  const isCoinbaseWallet = /CoinbaseWallet/i.test(userAgent);
  // 判断是Brave
  const isBrave = /Brave/i.test(userAgent);

  const isSolflare = /Solflare/i.test(userAgent);

  const isbackpack = /Backpack/i.test(userAgent);

  return (
    isPhantom ||
    isOKC ||
    isMetaMask ||
    isCoinbaseWallet ||
    isBrave ||
    isSolflare ||
    isbackpack
  );
};

export const isValidEmail = (email: string) => {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
};
/**
 *
 * @returns 本地缓存
 * 例如:
 * 设置缓存 storageUtils.storage('name', "test") 缓存name到本地缓存
 * 获取缓存的值：storageUtils.storage("name")
 * 清除缓存： storageUtils.clear();
 * 清除指定的缓存值: storageUtils.clear('name')
 *
 */
export const storageUtils = {
  getStorage(key: string) {
    try {
      if (typeof window !== "undefined" && localStorage) {
        const value = (localStorage as any).getItem(key);
        return value ? JSON.parse(value) : null;
      }
    } catch (error) {
      console.error("获取缓存时发生错误:", error);
      return null;
    }
    return null;
  },
  setStorage(key: string, value: any) {
    try {
      if (typeof window !== "undefined" && localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("设置缓存时发生错误:", error);
    }
  },
  clear() {
    try {
      if (typeof window !== "undefined" && localStorage) {
        localStorage.clear();
      }
    } catch (error) {
      console.error("清除缓存时发生错误:", error);
    }
  },
  clearSomeKey(key?: string) {
    try {
      if (typeof window !== "undefined" && localStorage) {
        if (key) {
          const keys = Object.keys(localStorage);
          keys.forEach((item) => {
            // 如果当前键不是传入的 key，则删除
            if (item !== key) {
              localStorage.removeItem(item);
            }
          });
        } else {
          localStorage.clear();
        }
      }
    } catch (error) {
      console.error("清除缓存时发生错误:", error);
    }
  },
  remove(key: string) {
    try {
      if (typeof window !== "undefined" && localStorage) {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error("清除缓存时发生错误:", error);
    }
  },
};

/**
 *
 * @param url
 * @returns 获取参数url的参数
 */
export const url2Params = (url: string) => {
  let seg,
    ret: any = {},
    atag;
  atag = document.createElement("a");
  atag.href = url;
  seg = atag.search?.replace(/^\?/, "").split("&");
  seg.forEach(function (p) {
    var s = p.split("=");
    ret[s[0]] = s[1];
  });
  return ret;
};

export const junkTgDiscordXLink = (url: string, isFollow: boolean) => {
  try {
    // 如果已经是深链接格式，直接返回
    if (
      url.startsWith("twitter://") ||
      url.startsWith("discord://") ||
      url.startsWith("tg://")
    ) {
      return url;
    }

    const { origin, pathname, search } = new URL(url);
    // Twitter/X 链接处理
    if (["https://x.com", "https://twitter.com"].includes(origin)) {
      const pathParts = pathname.split("/").filter((part) => part.length > 0);

      if (pathParts.length === 0) {
        // 主页链接
        return "twitter://timeline";
      } else if (pathParts.length === 1) {
        // 用户主页链接: https://x.com/username
        const userName = pathParts[0];
        return `twitter://user?screen_name=${userName}`;
      } else if (pathParts.length >= 2) {
        const userName = pathParts[0];
        const action = pathParts[1];
        if (action === "status" && pathParts[2]) {
          // 推文链接: https://x.com/username/status/tweetId
          const tweetId = pathParts[2];
          return `twitter://status?id=${tweetId}`;
        } else if (action === "following") {
          // 关注列表: https://x.com/username/following
          return `twitter://user?screen_name=${userName}&action=following`;
        } else if (action === "followers") {
          // 粉丝列表: https://x.com/username/followers
          return `twitter://user?screen_name=${userName}&action=followers`;
        } else if (action === "tweet") {
          return `twitter://intent/tweet${search}`;
        } else {
          // 其他用户相关页面，默认跳转到用户主页
          return `twitter://user?screen_name=${userName}`;
        }
      }
    }

    // Discord 链接处理
    if (["https://discord.gg", "https://discord.com"].includes(origin)) {
      if (origin === "https://discord.gg") {
        // 邀请链接: https://discord.gg/inviteCode
        const inviteCode = pathname.split("/")[1];
        return `discord://discord.com/invite/${inviteCode}`;
      } else {
        // 其他 Discord 链接
        return url.replace(origin, "discord:/");
      }
    }

    // Telegram 链接处理
    if (origin === "https://t.me") {
      if (isFollow) {
        const invitate = pathname.split("/+")[1];
        return `tg://join?invite=${invitate}`;
      } else {
        // 处理不同类型的 Telegram 链接
        if (pathname.includes("/+")) {
          // 邀请链接: https://t.me/+inviteCode
          const inviteCode = pathname.split("/+")[1];
          return `tg://join?invite=${inviteCode}`;
        } else if (pathname.startsWith("/c/")) {
          // 私有频道链接: https://t.me/c/channelId/messageId
          return `tg:/${pathname}${search}`;
        } else {
          // 普通用户或频道链接: https://t.me/username
          return `tg:/${pathname}${search}`;
        }
      }
    }

    // Instagram 链接处理
    if (
      origin === "https://www.instagram.com" ||
      origin === "https://instagram.com"
    ) {
      const pathParts = pathname.split("/").filter((part) => part.length > 0);
      if (pathParts.length >= 1) {
        const username = pathParts[0];
        if (username === "p" && pathParts[1]) {
          // 帖子链接: https://instagram.com/p/postId
          return `instagram://media?id=${pathParts[1]}`;
        } else {
          // 用户主页: https://instagram.com/username
          return `instagram://user?username=${username}`;
        }
      }
    }

    // YouTube 链接处理
    if (
      [
        "https://www.youtube.com",
        "https://youtube.com",
        "https://youtu.be",
      ].includes(origin)
    ) {
      if (origin === "https://youtu.be") {
        // 短链接: https://youtu.be/videoId
        const videoId = pathname.split("/")[1];
        return `youtube://watch?v=${videoId}`;
      } else {
        // 完整链接: https://youtube.com/watch?v=videoId
        const urlParams = new URLSearchParams(search);
        const videoId = urlParams.get("v");
        if (videoId) {
          return `youtube://watch?v=${videoId}`;
        }
      }
    }

    return url;
  } catch (error) {
    // 如果URL解析失败，返回原始URL
    console.warn("Failed to parse URL for deep link conversion:", error);
    return url;
  }
};

export const create_a_link = (url: string, target: string = "_blank") => {
  // 检测是否在 Telegram WebApp 中
  //   if (isInWebTg()) {
  //     if ((window as any).Telegram?.WebApp?.openLink) {
  //       // ✅ 使用 Telegram 的安全跳转方式
  //       ;(window as any).Telegram.WebApp.openLink(url, { try_instant_view: false })
  //     }
  //     return
  //   }

  // 检测是否在 DApp 浏览器中
  if (detectInAppBrowser()) {
    // 检查是否已经是深链接格式
    const isAlreadyDeepLink =
      url.startsWith("twitter://") ||
      url.startsWith("discord://") ||
      url.startsWith("tg://");

    if (isAlreadyDeepLink) {
      // 如果已经是深链接格式，直接尝试打开
      try {
        window.location.href = url;
      } catch (error) {
        console.warn("深链接打开失败:", error);
        // 如果深链接失败，尝试使用普通方式打开（如果有对应的web版本）
        if (url.startsWith("twitter://")) {
          // 对于Twitter深链接，可以尝试转换为web版本
          const webUrl = url.replace("twitter://", "https://twitter.com/");
          const a_elem = document.createElement("a");
          a_elem.href = webUrl;
          a_elem.target = target;
          a_elem.rel = "noopener noreferrer";
          a_elem.click();
        }
      }
    } else {
      // 在 DApp 浏览器中，尝试使用深度链接打开原生应用
      const deepLink = junkTgDiscordXLink(url, false);
      // 如果转换后的链接不同于原链接，说明是支持的深度链接
      if (deepLink !== url) {
        // 尝试打开深度链接
        window.location.href = deepLink;

        // 设置一个延迟回退机制，如果深度链接失败，则使用普通方式打开
        setTimeout(() => {
          // 如果页面还在当前窗口（说明深度链接可能失败），则使用普通方式打开
          const a_elem = document.createElement("a");
          a_elem.href = url;
          a_elem.target = target;
          a_elem.rel = "noopener noreferrer";
          a_elem.click();
        }, 1000);
      } else {
        // 不支持深度链接的URL，直接使用普通方式打开
        const a_elem = document.createElement("a");
        a_elem.href = url;
        a_elem.target = target;
        a_elem.rel = "noopener noreferrer";
        a_elem.click();
      }
    }
  } else {
    // 在普通浏览器中，使用标准方式打开链接
    const a_elem = document.createElement("a");
    a_elem.href = url;
    a_elem.target = target;
    a_elem.rel = "noopener noreferrer";
    a_elem.click();
  }
};

/**
 * 延时等待
 */
export const sleepWait = (callback: Function, delay: number) => {
  const timerId = setTimeout(() => {
    callback();
    clearTimeout(timerId); // 清除定时器
  }, delay);
  return timerId;
};

/**
 * @模拟异步获取数据
 */
export const waitAsyncData = (
  data: any,
  time: number = 1000,
  isWait: boolean = true
) => {
  return new Promise((resolve) => {
    if (isWait) {
      setTimeout(() => {
        resolve(data);
      }, time);
    } else {
      resolve(data);
    }
  });
};

/**
 * @return 截取字符串
 */

export const truncateString = (
  str: string,
  maxLength: number = 15,
  suffix: string = "..."
) => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
};

/**
 * @description 轮询函数，直到满足条件或超时,停止轮询执行函数
 * @param pollFn
 * @param interval
 * @param timeout
 * @returns
 */
export function pollWithTimeout(
  pollFn: () => any,
  interval = 1000,
  timeout = 10000
) {
  return new Promise((resolve, reject) => {
    let pollingTimer: ReturnType<typeof setInterval> | null = null;
    null;
    let timeoutTimer: ReturnType<typeof setTimeout> | null = null;
    null;

    // 定义轮询逻辑
    const executePoll = async () => {
      try {
        const result = await pollFn(); // 调用用户提供的轮询函数
        if (result) {
          clearInterval(pollingTimer as ReturnType<typeof setInterval>);
          clearTimeout(timeoutTimer as ReturnType<typeof setTimeout>);
          resolve(result);
        }
      } catch (err) {
        clearInterval(pollingTimer as ReturnType<typeof setInterval>);
        clearTimeout(timeoutTimer as ReturnType<typeof setTimeout>);
        reject(err);
      }
    };

    // 设置每隔 interval 轮询
    pollingTimer = setInterval(executePoll, interval);

    // 设置超时定时器
    timeoutTimer = setTimeout(() => {
      clearInterval(pollingTimer);
      resolve(null); // 超时返回 null 或你想要的标记
    }, timeout);

    // 马上执行一次
    executePoll();
  });
}

/**
 * Base64编码
 * @param str 要编码的字符串
 * @returns 编码后的base64字符串
 */
export const base64Encode = (str: string): string => {
  try {
    return btoa(str);
  } catch (error) {
    console.error("Base64编码失败:", error);
    return "";
  }
};

/**
 * Base64解码
 * @param base64Str base64编码的字符串
 * @returns 解码后的字符串
 */
export const base64Decode = (base64Str: string): string => {
  try {
    return atob(base64Str);
  } catch (error) {
    console.error("Base64解码失败，可能不是有效的base64字符串:", error);
    return "";
  }
};

// 复制文本,根据内容
export const copyContent = (content: string): Promise<boolean> => {
  // 旧方法的回退函数
  const fallbackCopy = (): boolean => {
    try {
      const tempInput = document.createElement("input");
      document.body.appendChild(tempInput);
      tempInput.value = content;
      tempInput.select();
      tempInput.setSelectionRange(0, 99999); // 移动端需要设置选择范围
      const result = document.execCommand("copy");
      document.body.removeChild(tempInput);
      return result;
    } catch (err) {
      console.error("Fallback copy failed: ", err);
      return false;
    }
  };

  // 检查是否支持现代 Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    // 使用现代API复制内容
    return navigator.clipboard
      .writeText(content)
      .then(() => true)
      .catch((err) => {
        console.warn(
          "Clipboard API failed, falling back to execCommand: ",
          err
        );
        // 如果现代API失败，回退到旧方法
        return fallbackCopy();
      });
  } else {
    // 如果不支持现代API或不在安全上下文中，直接使用旧方法
    return Promise.resolve(fallbackCopy());
  }
};

/**
 * @description: 获取窗口配置，当前浏览器窗口打开
 * @param param0
 * @returns
 */
export const windowConfig = ({
  width = 800,
  height = 600,
}: {
  width: number;
  height: number;
}) => {
  if (typeof window === "undefined" || !window.screen)
    return `popup=yes,width=${width},height=${height}`;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  return `popup=yes,width=${width},height=${height},top=${top},left=${left}`;
};

/**
 * @description 格式化金额
 * @param value
 * @returns
 */
export const formatCurrency = (
  value: number | string,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2
) => {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits,
    maximumFractionDigits,
  });
};

/**
 * @param {Number} len uuid的长度
 * @param {Boolean} firstU 将返回的首字母置为"u"
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
export const guid = (len = 32, firstU = true, radix = 0) => {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  const uuid: any[] = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    let r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return `u${uuid.join("")}`;
  }
  return uuid.join("");
};
