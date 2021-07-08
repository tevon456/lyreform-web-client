import React, { useEffect } from "react";
import { UICore } from "../../../components";
import { BaseForm } from "../form";

export default function Panel({ form, fieldId, trigger = () => {} }) {
  useEffect(() => {
    console.log(fieldId);
  }, [fieldId]);
  return (
    <UICore.Box
      height="107.5vh"
      width="160px"
      minWidth="130px"
      border="1px solid var(--neutral-300)"
      bg="#FFF"
      pd="0px"
      z="0"
      style={{ flexGrow: 1, overflow: "hidden" }}
    >
      <UICore.Box mg="0px" pd="12px" mt="40px">
        <BaseForm form={form} id={fieldId} triggerRender={trigger} />
      </UICore.Box>
    </UICore.Box>
  );
}
