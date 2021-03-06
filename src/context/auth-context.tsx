import React, { ReactNode, useState } from "react";
import * as auth from "../auth-provider";
import { User } from "../screens/project-list/search-panel";
import { http } from "../utils/http";
import { useMount } from "../utils";

interface AuthForm {
  username: string;
  password: string;
}

//1.创建Context容器对象,所有的后代都能访问到的地方
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

//页面刷新时，重新设置一下user
const initUser = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    return data.user;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  //调用auth-provider中的login方法,用户登录成功以后,就把user中的token设置到window的localStorage的__auth_provider_token__中
  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user));
  const register = (form: AuthForm) =>
    auth.register(form).then((user) => setUser(user));
  const logout = () => auth.logout().then(() => setUser(null));

  //组件加载时就初始化user
  useMount(() => {
    initUser().then(setUser);
  });

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

//自定义hooks
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
