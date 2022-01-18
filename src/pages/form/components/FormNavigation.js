import React from "react";
import { UICore } from "../../../components";
import "styled-components/macro";

export default function FormNavigation() {
  return (
    <UICore.Box
      mg="0px"
      bg="#fff"
      color="#fff"
      pd="6px"
      bb="1px solid rgba(0,0,0,.1)"
      pos="fixed"
      z="4"
      width={"100%"}
      css={`
        padding: 4px;
        height: 44px;
        top: 0px;
        left: 0px;
        z-index: 8;
        list-style-type: none;
        margin: 0;
        position: fixed;
        border-bottom: 1px solid var(--neutral-350);
        display: block;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 6px 8px -8px;
        transform: translate3d(0, 0, 0);
      `}
    >
      <UICore.Flex></UICore.Flex>
    </UICore.Box>
  );
}
