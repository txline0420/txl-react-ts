import { User } from "../screens/project-list/search-panel";
import { useHttp } from "./http";
import { cleanObject } from "./index";
import { useAsync } from "./use-async";
import { useEffect } from "react";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...res } = useAsync<User[]>();
  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return res;
};
