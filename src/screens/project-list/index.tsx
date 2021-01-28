import React, { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";

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

  useEffect(() => {
    client("projects", { data: cleanObject(param) }).then(setList);
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
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
