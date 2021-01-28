import React, { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";

/*
    npm start: 读.env.development文件中的REACT_APP_API_URL变量
    npm build: 读.env文件中的REACT_APP_API_URL变量
 */

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const [list, setList] = useState([]);

  //http请求封装应用
  const client = useHttp();

  //Loading状态
  const [isLoading, setIsLoading] = useState(false);

  //error状态
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    //开始加载时的loading状态为true
    setIsLoading(true);

    client("projects", { data: cleanObject(param) })
      .then(setList)
      .catch((error) => {
        setList([]);
        setError(error);
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  //组件初始化时调用，且仅调用一次
  useMount(() => {
    client("users", {}).then(setUsers);
  });

  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel param={param} setParam={setParam} users={users} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
