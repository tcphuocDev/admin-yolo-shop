import React, { useState, useEffect } from "react";
import "./main-layout.css";
import { Dropdown, Layout, Menu, Space } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useWindowDimensions } from "../../common/useWindowDimensions";
import { Link, useLocation } from "react-router-dom";
import { routers } from "../../constants/endpoint";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth.action";

const { Header, Sider, Content } = Layout;

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [margin, setMargin] = useState(200);
  const [marginRight, setMarginRight] = useState(200);
  const { width } = useWindowDimensions();
  const [selecedKey, setSelectedKey] = useState();
  const { pathname } = useLocation();
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    width < 996 ? setCollapsed(true) : setCollapsed(false);
    width < 996 ? setMargin(80) : setMargin(200);
  }, [width]);

  const toggle = () => {
    setCollapsed(!collapsed);
    !collapsed ? setMargin(80) : setMargin(200);
    !collapsed ? setMarginRight(80) : setMarginRight(200);
  };

  useEffect(() => {
    routers.forEach((router, index) => {
      if (router.endpoint === pathname) {
        setSelectedKey(index);
      }
    });
  }, [pathname]);

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "hidden",
          height: "100vh",
          position: "fixed",
        }}
      >
        <div
          className="logo"
          style={{
            color: "#4267b2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: 28,
            cursor: "pointer",
          }}
        >
          {!collapsed ? "YOLO" : "YL"}
        </div>
        <Menu theme="light" mode="inline" selectedKeys={[`${selecedKey}`]}>
          {routers.map((router, index) => (
            <Menu.Item key={index} icon={<PlusOutlined />}>
              <Link to={router.endpoint} onClick={() => setSelectedKey(index)}>
                {router.text}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: margin }}>
        <Header
          className="site-layout-background"
          style={{ padding: 0, position: "fixed", width: "100%", zIndex: 1000 }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <span className="profile" style={{ marginRight: marginRight }}>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>Xin chào {state?.user?.fullname}!</Menu.Item>
                  <Menu.Item onClick={() => dispatch(logout())}>
                    Đăng xuất?
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              {/* <a onClick={(e) => e.preventDefault()}> */}
              <Space>
                <UserOutlined />
              </Space>
              {/* </a> */}
            </Dropdown>
          </span>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "80px 16px",
            padding: 24,
            minHeight: "70vh",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
