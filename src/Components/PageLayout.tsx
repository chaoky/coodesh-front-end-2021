import { Layout } from "antd";
import React from "react";

import { colors } from "../../theme";

export default function PageLayout({ children }: { children: JSX.Element }) {
  return (
    <Layout>
      <Layout.Header>Company</Layout.Header>
      <Layout.Content
        style={{ backgroundColor: colors.backgroundColor, padding: "5vh 0" }}
      >
        {children}
      </Layout.Content>
      <Layout.Footer>Lordie and AntDesign</Layout.Footer>
    </Layout>
  );
}
