import { useState } from "react";
import { mutate, mutate as globalMutate } from "swr";
import { fetcherGet } from "@/utils/index";
import { useToast } from "@/hooks/index";

export type Options = {
  toastSuccess?: string;
  toastError?: string;
  onSuccess?: (data: any) => void;
  onError?: (err: Error) => void;
  revalidateKeys?: string[]; // 哪些 key 要手动触发 SWR 刷新
  revalidateFetchKeys?: Array<{ key: string; body?: Record<string, any> }>; // 兼容 useFetch 的缓存格式
  revalidatePattern?: string; // 使用模式匹配刷新所有相关缓存
  proxy?: <T>(data: T) => void;
  callback?: (res: Record<string, any>) => void;
};

export function useMutation<B = any, R = any>(
  url: string,
  method = "POST" as "POST" | "PUT" | "DELETE",
  options: Options = {}
) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const trigger = async (body: B): Promise<R | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const data: any = await fetcherGet<R>(url, method, body);
      if (options?.callback) {
        options?.callback(data);
      }
      if (data.error.code !== 0) {
        return Promise.reject(data.error.message);
      }
      if (options.toastSuccess) toast.success(options.toastSuccess);
      if (options.proxy) {
        options.proxy(data);
      }
      options.onSuccess?.(data);

      // 刷新普通的 SWR 缓存
      options.revalidateKeys?.forEach((key) => mutate(key));

      // 刷新 useFetch 的缓存（格式为 [key, body]）
      options.revalidateFetchKeys?.forEach(({ key, body = {} }) => {
        mutate([key, body]);
      });

      // 使用模式匹配刷新所有相关缓存
      if (options.revalidatePattern) {
        globalMutate((key) => {
          if (typeof key === "string") {
            return key.includes(options.revalidatePattern!);
          }
          if (Array.isArray(key) && typeof key[0] === "string") {
            return key[0].includes(options.revalidatePattern!);
          }
          return false;
        });
      }

      return data;
    } catch (err: any) {
      setError(err);
      if (options.toastError) toast.error(options.toastError);
      options.onError?.(err);
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };

  return { trigger, loading, error };
}
