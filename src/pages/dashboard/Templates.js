import React from "react";
import { Content, UICore } from "../../components";
import "styled-components/macro";

export default function Templates() {
  return (
    <UICore.Page>
      <UICore.Text weight="500" size="lg">
        Templates
      </UICore.Text>
      <Content.Card>
        <UICore.Text>Templates are coming soon</UICore.Text>
      </Content.Card>
    </UICore.Page>
  );
}
