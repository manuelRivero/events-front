
import React, {useState,useContext} from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox } from 'antd';

import {AuthContext} from "./../../context/authContext";
import {InterfaceContext} from "./../../context/interfaceContext";

const layout = {
  wrapperCol: { xs:{span:20}, md:{span:12, offset:8}, lg:{span:10, offset:8} },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const submitLayout = {
    wrapperCol: { xs:{span:20}, md:{span:12, offset:8}, lg:{span:10, offset:8}  },

}


const Login: React.FC<any> = () => {

  const [error, seterror] = useState<null | string >(null)
  const [userValidityStatus, setuserValidityStatus] = useState <"" | "success" | "warning" | "error" | "validating">("");
  const [isLogin, setIslogin] = useState<boolean>(true)
  const authContext = useContext(AuthContext);
  const interfaceContext = useContext(InterfaceContext);

  // Submit handler
  const onFinish = (values:any) => {
    const {username, password} = values;
    setuserValidityStatus("validating")
    let requestBody ={
      query:`
      query{
        login(email:"${username}", password:"${password}"){
        _id
        token
        tokenExpiration
      }}`
    }

    if(!isLogin){
      requestBody ={
        query:`
        mutation{
          createUser(userInput:{email:"${username}", password:"${password}"}){
          _id
          email
        }}`
      }
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(res =>{
      if(res.status !== 200 && res.status !==201){
        throw new Error ('Failed!')
      }
      return res.json()
    } )
    .then(res => {
      if(res.errors){
        throw new Error(res.errors[0]['message'])
      }
      if(res.data?.login){
        let {token,_id, tokenExpiration} = res.data.login;
        setuserValidityStatus("success");
        authContext.login(token,_id, tokenExpiration);
      }
      
    }
      )
    .catch( err => {
      setuserValidityStatus("error")
     
      seterror(err.message)

    })
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };

  return (
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
        help={userValidityStatus === 'error'? error :( userValidityStatus === 'validating' ? "The information is being validated..." : '' )}
        rules={[{ required: true, message: 'Please input your username!' }]}
        
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password" />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...submitLayout}>
        <Button block type="primary" htmlType="submit" loading={userValidityStatus ==="validating"}>
        {!isLogin ? "register now!": "Log in!"}
        </Button>
      </Form.Item>
      <Form.Item {...submitLayout}>
  Or <a role="button" onClick={()=>setIslogin(!isLogin)}>{isLogin ? "register now!": "Log in!"}</a>
      </Form.Item>
    </Form>
  );
};


export default Login;