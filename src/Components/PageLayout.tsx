import { UserOutlined } from "@ant-design/icons";
import { Avatar, Layout, Space, Typography } from "antd";
import React, { ReactNode } from "react";

import { colors } from "../theme";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <Layout style={{ alignItems: "center" }}>
      <Layout.Header
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 999,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Title level={4} style={{ margin: 0 }}>
          Company
        </Typography.Title>
        <Avatar icon={<UserOutlined />} />
      </Layout.Header>
      <Layout.Content
        style={{
          marginTop: 64,
          padding: "24px 5vw",
          maxWidth: "1000px",
          width: "100vw",
          minHeight: "100vh",
          backgroundColor: colors.backgroundColor,
        }}
      >
        <Space size="large" direction="vertical" style={{ width: "100%" }}>
          {children}
        </Space>
      </Layout.Content>
      <Layout.Footer>Lordie and AntDesign</Layout.Footer>
    </Layout>
  );
}
