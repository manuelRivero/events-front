import React from 'react';
import { Layout, Menu, Typography} from 'antd';
import {Link} from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import logo from "./../../assets/images/logo.png"
const { Header } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;




const mainNav = () => {
    return (
        <Header className="header" style={{display:"flex", padding:" 0 25px"}}>
        <div className="logo" style={{flex: "0 1 175px", display:"flex", alignItems:"center", fontFamily: " Montserrat, sans-serif"}}> 
          <img src={logo} style={{width:"30px"}} alt="Logo" />
          <Title style={{color:"#fff", margin:" 0 10px", fontSize:"18px"}}>Booking App</Title>
        </div>
        <Menu theme="dark" style={{flex:"auto"}} mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">
              <Link to="/events">Events</Link>
          </Menu.Item>
          <Menu.Item key="2">
          <Link to="/bookings">Bookings</Link>
          </Menu.Item>
        </Menu>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          
          <SubMenu  icon={<UserOutlined />}>
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:4">Logout</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        </Menu>
      </Header>
    )
}

export default mainNav