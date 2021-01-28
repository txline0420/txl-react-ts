import qs from "qs";
import * as auth from "../auth-provider";
import { useAuth } from "../context/auth-context";
/*
  封装http请求
  1.所有的请求都携带token
 */
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        //登出
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        //401 500时fetch是不会抛出异常
        return Promise.reject(data);
      }
    });
};

//自动携带token的
export const useHttp = () => {
  const { user } = useAuth();
  // todo Parameters<typeof http>
  return (...[entpoint, config]: [string, Config]) =>
    http(entpoint, { ...config, token: user?.token });
};
