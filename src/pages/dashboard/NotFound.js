import React from "react";
import { Content, UICore } from "../../components";
import "styled-components/macro";
import { Link } from "react-router-dom";
import { SubPage } from "./components";

export default function DashboardNotFound() {
  return (
    <SubPage>
      <UICore.Flex justify="center">
        <Content.Card width="600px" mt="var(--space-lg)">
          <UICore.Text as="h1" weight="600" align="center" size="xxxl">
            404
          </UICore.Text>
          <UICore.Text as="h4" align="center" size="lg">
            Page Not Found
          </UICore.Text>
          <UICore.Text as="p" align="center" weight="300">
            The Page you are looking for may have been moved or deleted.
          </UICore.Text>
          <UICore.Flex justify="center" className="margin-bottom--xxl">
            <Link to="/dashboard" style={{ color: "var(--primary)" }}>
              Go Home
            </Link>
          </UICore.Flex>
        </Content.Card>
      </UICore.Flex>
    </SubPage>
  );
}
