import React, { useState, useContext } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Checkbox, Typography } from "antd";

import { AuthContext } from "./../../context/authContext";
import { InterfaceContext } from "./../../context/interfaceContext";

import DissmisableAlert from "./../../components/ui/dissmisibleAlert/dissmisibleAlert";
import styles from "./login.module.css";

const { Title } = Typography;

const layout = {
  wrapperCol: {
    xs: { span: 20, offset: 2 },
    md: { span: 12, offset: 6 },
    lg: { span: 12, offset: 6 },
  },
};
const tailLayout = {
  wrapperCol: { xs: { span: 20, offset: 2 }, md: { span: 12, offset: 6 } },
};
const submitLayout = {
  wrapperCol: {
    xs: { span: 20, offset: 2 },
    md: { span: 12, offset: 6 },
    lg: { span: 12, offset: 6 },
  },
};

const Login: React.FC<any> = () => {
  const [userValidityStatus, setuserValidityStatus] = useState<
    "" | "success" | "warning" | "error" | "validating"
  >("");
  const [passwordValidityStatus, setPasswordValidityStatus] = useState<
    "" | "success" | "warning" | "error" | "validating"
  >("");
  const [isLogin, setIslogin] = useState<boolean>(true);
  const authContext = useContext(AuthContext);
  const { onsetMainAlert, ondismissMainAlert } = useContext(InterfaceContext);
  // Submit handler
  const onFinish = (values: any) => {
    const { username, password } = values;
    setuserValidityStatus("validating");
    setPasswordValidityStatus("");
    ondismissMainAlert();

    let requestBody = {
      query: `
      query{
        login(email:"${username}", password:"${password}"){
        _id
        token
        tokenExpiration
      }}`,
    };

    if (!isLogin) {
      requestBody = {
        query: `
        mutation{
          createUser(userInput:{email:"${username}", password:"${password}"}){
          _id
          email
        }}`,
      };
    }

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((res) => {
        if (res.errors) {
          throw new Error(res.errors[0]["message"]);
        }
        if (res.data?.login) {
          let { token, _id, tokenExpiration } = res.data.login;
          setuserValidityStatus("success");
          authContext.login(token, _id, tokenExpiration);
        }
      })
      .catch((err) => {
        setuserValidityStatus("");
        setPasswordValidityStatus("");
        if (err.message === "User does not exist!") {
          setuserValidityStatus("error");
        }
        if (err.message === "Incorrect password!") {
          setPasswordValidityStatus("error");
        }
        if (err.message === "User alredy exist!") {
          setPasswordValidityStatus("error");
        }
        onsetMainAlert(err.message);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.Login}>
      <Title style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        {isLogin ? "User Login" : "Create account"}
      </Title>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
       
        <Form.Item
          name="username"
          validateStatus={userValidityStatus}
          hasFeedback
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          validateStatus={passwordValidityStatus}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            size="large"
          />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...submitLayout}>
          <Button
            size="large"
            block
            type="primary"
            htmlType="submit"
            loading={userValidityStatus === "validating"}
          >
            {!isLogin ? "register now!" : "Log in!"}
          </Button>
        </Form.Item>
        <Form.Item {...submitLayout}>
          Or{" "}
          <a role="button" onClick={() => setIslogin(!isLogin)}>
            {isLogin ? "register now!" : "Log in!"}
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
