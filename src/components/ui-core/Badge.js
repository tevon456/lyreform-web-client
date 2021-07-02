import React from "react";
import { Box, Text } from ".";

function Badge({
  color = "var(--neutral-200)",
  bg = "var(--neutral-400)",
  children,
  ...rest
}) {
  return (
    <Box
      bg={bg}
      pd="0px 6px"
      mg="0px"
      // border={`1px solid ${color}`}
      mr="8px"
      width="max-content"
      radius="2px"
      style={{ display: "inline-block" }}
      {...rest}
    >
      <Text
        mt="0px"
        mb="0px"
        color={color}
        weight="300"
        className="margin-bottom--none margin-top--none"
      >
        {children}
      </Text>
    </Box>
  );
}

export default Badge;

/*
description
required
type
options for option fields
*/
