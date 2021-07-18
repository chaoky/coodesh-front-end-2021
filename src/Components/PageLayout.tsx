import { SmileOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Layout, Space, Typography } from "antd";
import { ReactNode } from "react";

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
        <Space>
          <Avatar icon={<SmileOutlined />} size="large" />
          <Typography.Title level={4} style={{ margin: 0 }}>
            Company
          </Typography.Title>
        </Space>

        <Avatar
          style={{ justifySelf: "flex-end" }}
          icon={<UserOutlined />}
          size="large"
        />
      </Layout.Header>
      <Layout.Content
        style={{
          marginTop: 64 + 32,
          padding: "24px 5vw",
          maxWidth: "1000px",
          width: "100vw",
          minHeight: "100vh",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {children}
        </div>
      </Layout.Content>
      <Layout.Footer>Coodesh Front-End Challenge 2021</Layout.Footer>
    </Layout>
  );
}
