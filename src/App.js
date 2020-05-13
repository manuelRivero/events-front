import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { Layout } from "antd";

import Login from "./pages/login/login";
import Events from "./pages/events/events";
import Bookings from "./pages/bookings/bookings";
import MainNav from "./components/navigation/mainNav";

import "antd/dist/antd.css";

const { Content, Footer, Sider } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout className="layout">
        <MainNav />
        <Layout>
          <Sider>Sider</Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Switch>
                <Redirect from="/" to="/auth" exact></Redirect>
                <Route path="/auth">
                  <Login />
                </Route>
                <Route path="/events">
                  <Events />
                </Route>
                <Route path="/bookings">
                  <Bookings />
                </Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
