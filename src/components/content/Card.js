import React from "react";
import { UICore } from "..";

export default function Card({ width, height, children, ...rest }) {
  return (
    <UICore.Box
      border="1px solid var(--neutral-350)"
      mg="12px"
      pd="var(--space-xs)"
      radius="4px"
      bg="var(--neutral-100)"
      color="var(--text-dark)"
      height={height || "auto"}
      width={width || "auto"}
      shadow="0px 0px 5px rgba(23, 24, 24, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.15)"
      textAlign="left"
      {...rest}
    >
      {children}
    </UICore.Box>
  );
}
