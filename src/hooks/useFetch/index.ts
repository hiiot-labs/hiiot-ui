import useSWR, { SWRConfiguration, mutate as globalMutate } from "swr";
import { useToast } from "@/hooks/useToast";
import { fetcherGet } from "@/utils/fetcher";

type ConfigType = SWRConfiguration & {
  proxy?: <T>(data: T) => void;
  shouldFetch?: boolean;
  callback?: (res: Record<string, any>) => void;
};
export function useFetch<T = any>(
  key: string,
  body: Record<string, any> = {},
  config: ConfigType = {}
) {
  const { toast } = useToast();
  const { data, error, isLoading, mutate } = useSWR<T>(
    !config.shouldFetch ? [key, body] : null,
    async ([url, body]) => {
      try {
        const res: any = await fetcherGet<T>(url, "GET", body);

        // 回调函数,无论错误还是成功可以在此处做逻辑
        if (config.callback) {
          config.callback(res);
        }
        if (res.error.code !== 0) {
          return Promise.reject(res.error.message);
        }
        // 代理劫持修改数据
        if (config.proxy) {
          config.proxy(res);
        }
        return res;
      } catch (err: any) {
        toast.error(err || "request error");
        throw err;
      }
    },
    {
      revalidateOnFocus: false,
      ...config,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
    refresh: () => mutate(), // 手动刷新
    globalMutate: () => globalMutate(key), // 跨组件刷新
  };
}
