import React from "react";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import styled from "@emotion/styled";
import { useAsync } from "../utils/use-async";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync();
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e) {
      onError(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" id={"username"} placeholder={"用户名"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" id={"password"} placeholder={"密 码"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

const LongButton = styled(Button)`
  width: 100%;
`;
