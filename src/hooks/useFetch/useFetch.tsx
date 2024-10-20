import { useState, useCallback, useEffect } from "react";
import { AxiosRequestConfig } from "axios";

import { IServerResponse } from "@/types/server-response";
import { api } from "@/utils";

export interface IUseFetchOptions<T> {
  cache?: boolean;
  initialValue?: T;
}

function useFetch<T = any>(path?: string, options: IUseFetchOptions<T> = {}) {
  const { cache, initialValue } = options;
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T>(initialValue || {} as T);

  const refresh = useCallback(
    (config?: AxiosRequestConfig<any>) => {
      const headers = config?.headers ?? {};
      if (cache) headers['x-app-cache'] = 'true';
      setLoading(true);

      if (path) {
        api
          .get<IServerResponse<T>>(path, { ...config, headers })
          .then(
            ({ data }) => {
              setData(data.data ?? (data as T))
            })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    },
    [cache, path]
  );

  useEffect(() => {
    refresh()
  }, [refresh])

  return { data, loading, refresh }
}

export { useFetch }