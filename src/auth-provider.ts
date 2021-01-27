//用于操控jwt中的token
import { User } from "./screens/project-list/search-panel";

const apiUrl = process.env.REACT_APP_API_URL;
const localStrorageKey = "__auth_provider_token__";

//获取浏览器中的token
export const getToken = () => window.localStorage.getItem(localStrorageKey);

//设置浏览器中的token
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStrorageKey, user.token || "");
  return user;
};

//登录成功以后,就把user中的token设置到window的localStorage的__auth_provider_token__中
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

//注册成功以后,就把user中的token设置到window的localStorage的__auth_provider_token__中
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

//登出以后，就把window的localStorage中的Key: __auth_provider_token__删除
export const logout = async () =>
  window.localStorage.removeItem(localStrorageKey);
