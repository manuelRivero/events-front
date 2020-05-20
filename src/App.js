import React from "react";
import { BrowserRouter} from "react-router-dom";

import { Layout } from "antd";

import Routes from "./pages/routes/routes";
import MainNav from "./components/navigation/mainNav";
import AuthContextProvider from "./context/authContext";
import InterfaceContextProvider from "./context/interfaceContext";

import DissmisableAlert from "./components/ui/dissmisibleAlert/dissmisibleAlert"

import "antd/dist/antd.css";

const { Content, Footer, Sider } = Layout;

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <InterfaceContextProvider>
          <Layout className="layout">
            <MainNav />
            <Layout>
              <Sider>Sider</Sider>
              <Layout style={{ padding: "0 24px 24px" }}>
                <Content
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: '80vh',
                  }}
                >
                   <DissmisableAlert />
                    <Routes></Routes>
                </Content>
              </Layout>
            </Layout>
            <Footer>Footer</Footer>
          </Layout>
        </InterfaceContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
