import React from "react";
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";

/**
 *  grid 和 flex 各自的应用场景
 *  1. 一维布局flex 、二维布局grid
 *  2. 从内容出发flex
 *      先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中,由内容大小决定占据空间大小
 *     从布局出发grid
 *      先规则网格(数据固定),然后再把元素往里放置
 * @constructor
 */

//登录状态的app
export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"} />
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <Button onClick={logout} type={"link"}>
                    登出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type={"link"} onClick={(e) => e.preventDefault()}>
              Hi,{user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Nav>Nav</Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside>Aside</Aside>
      <Footer>Footer</Footer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  height: 100vh;
`;

//----------- 一级布局 ------------------
const Header = styled.header`
  grid-area: header;
  //border: darkmagenta solid 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const Main = styled.main`
  grid-area: main;
  // border: salmon solid 1px;
`;
const Nav = styled.nav`
  grid-area: nav;
  //border: teal solid 1px;
`;
const Aside = styled.aside`
  grid-area: aside;
  // border: red solid 1px;
`;
const Footer = styled.footer`
  grid-area: footer;
  //border: blueviolet solid 1px;
`;

//-------------- 二级布局 ---------------
const HeaderLeft = styled(Row)`
  //border: gainsboro solid 1px;
`;
const HeaderRight = styled.div`
  //border: gainsboro solid 1px;
`;
