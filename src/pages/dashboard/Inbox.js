import React from "react";
import { UICore } from "../../components";
import "styled-components/macro";

export default function Inbox() {
  return (
    <UICore.Box pd="0px" mt="52px" width="calc(100vw - 220px)">
      <UICore.Flex>
        <SidePanel />
        <MainPanel />
      </UICore.Flex>
    </UICore.Box>
  );
}

function SidePanel() {
  return (
    <UICore.Box
      pd="0px"
      mg="0px"
      ml="16px"
      bg="var(--neutral-100)"
      br="1px solid var(--neutral-400)"
      height="calc(100vh - 52px)"
    >
      <UICore.Flex direction="column">
        <UICore.Box
          width="200px"
          border="1px solid var(--neutral-400)"
          br="none"
          mg="0px"
        >
          <UICore.Flex align="center">
            <UICore.Button fullWidth>New Form</UICore.Button>
          </UICore.Flex>
        </UICore.Box>
        <UICore.Box
          css={`
            flex-grow: 1;
          `}
        >
          sl
        </UICore.Box>
      </UICore.Flex>
    </UICore.Box>
  );
}

function MainPanel() {
  return (
    <UICore.Box
      pd="0px"
      mg="0px"
      css={`
        flex-grow: 1;
      `}
    >
      <UICore.Flex direction="column">
        <UICore.Box
          bg="var(--neutral-100)"
          border="1px solid var(--neutral-400)"
          bl="none"
        >
          <UICore.Flex align="center" justify="flex-end">
            <UICore.Button>New Form</UICore.Button>
          </UICore.Flex>
        </UICore.Box>
        <UICore.Box>mp</UICore.Box>
      </UICore.Flex>
    </UICore.Box>
  );
}
