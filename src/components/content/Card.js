import React from "react";
import { UICore } from "..";

export default function Card({ width, height, children, ...rest }) {
  return (
    <UICore.Box
      border="1px solid #dee2e6"
      mg="0px"
      pd="var(--space-xs)"
      radius="4px"
      bg="#fff"
      color="var(--text-dark)"
      height={height || "auto"}
      width={width || "auto"}
      shadow=" 0 1px 1px rgba(0, 0, 0, 0.12);"
      textAlign="left"
      {...rest}
    >
      {children}
    </UICore.Box>
  );
}
