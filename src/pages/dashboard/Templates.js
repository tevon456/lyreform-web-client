import React from "react";
import { Content, UICore } from "../../components";
import "styled-components/macro";
import { SubPage } from "./components";

export default function Templates() {
  return (
    <SubPage>
      <UICore.Flex>
        <UICore.Text weight="500" size="lg">
          Templates
        </UICore.Text>
      </UICore.Flex>

      <Content.Card>
        <UICore.Text>Templates are coming soon</UICore.Text>
      </Content.Card>
    </SubPage>
  );
}
