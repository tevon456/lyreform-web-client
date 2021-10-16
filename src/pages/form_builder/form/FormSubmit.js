import React from "react";
import { UICore } from "../../../components";

export default function FormSubmit() {
  return (
    <UICore.Box
      pd="4px"
      mg="-12px"
      bb="none"
      bl="none"
      br="none"
      bg="white"
      maxWidth="300px"
      border="1px solid var(--neutral-400)"
      style={{ bottom: "0px", position: "sticky" }}
    >
      <UICore.Button
        type="submit"
        variant="outline"
        kind="secondary"
        hover="var(--primary-hovered)"
        fullWidth
        className="margin-top--sm margin-bottom--sm"
      >
        Apply Changes
      </UICore.Button>
    </UICore.Box>
  );
}
