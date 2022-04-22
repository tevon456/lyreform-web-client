import React from "react";
import { UICore } from "../../../components";

export default function FormSubmit({ triggerRender = () => {}, ...rest }) {
  return (
    <UICore.Box
      pd="4px"
      mg="-12px"
      bb="none"
      bl="none"
      br="none"
      bg="white"
      maxWidth="300px"
      width="282px"
      border="1px solid var(--neutral-400)"
      style={{ bottom: "12px", position: "fixed" }}
    >
      <UICore.Button
        type="submit"
        kind="secondary"
        hover="var(--primary-hovered)"
        fullWidth
        onClick={() => triggerRender()}
        className="margin-top--sm margin-bottom--sm"
      >
        Apply changes
      </UICore.Button>
    </UICore.Box>
  );
}
