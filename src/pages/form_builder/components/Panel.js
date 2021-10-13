import React, { useState, useEffect } from "react";
import { UICore, Content } from "../../../components";
import Logo from "../../../resources/icons/logo";
import { BaseForm, GeneralForm } from "../form";
import { useHistory } from "react-router-dom";
import chroma from "chroma-js";

export default function Panel({
  form,
  fieldId,
  trigger = () => {
    /**/
  },
}) {
  const colorLogo = "#323338";
  const history = useHistory();
  const [type, setType] = useState("GENERAL");

  useEffect(() => {
    setType(form.util.fieldDetails(fieldId)?.field[0]?.field_type || "GENERAL");
    // eslint-disable-next-line
  }, [fieldId, type]);
  return (
    <UICore.Box
      height="107.5vh"
      width="160px"
      minWidth="130px"
      bg="#FFF"
      pd="0px"
      z="0"
      style={{ flexGrow: 1, overflow: "hidden" }}
    >
      <UICore.Box
        pd="5px"
        pt="4px"
        mg="0px"
        bt="none"
        bl="none"
        br="none"
        bg="none"
        border="1px solid var(--neutral-400)"
      >
        <UICore.Flex>
          <Content.DropDown
            width="150px"
            items={[
              {
                type: "action",
                text: "Back to home",
                onClick: () => {
                  history.goBack();
                },
              },
              { type: "line" },
              {
                type: "action",
                text: "Clear fields",
                onClick: () => {
                  form.clearAllFields();
                  trigger();
                },
              },
              { type: "line" },
              { type: "action", text: "Export file" },
              { type: "action", text: "Import file" },
            ]}
            x="4px"
            y="18px"
          >
            <Logo
              width="38px"
              height="38px"
              colorA={colorLogo}
              colorB={chroma(colorLogo || "#00204d")
                .darken()
                .hex()}
            />{" "}
          </Content.DropDown>
        </UICore.Flex>
      </UICore.Box>

      <UICore.Box mg="0px" pd="12px" mt="10px">
        {type === "GENERAL" ? (
          <BaseForm form={form} id={fieldId} triggerRender={trigger} />
        ) : (
          <GeneralForm form={form} id={fieldId} triggerRender={trigger} />
        )}
      </UICore.Box>
    </UICore.Box>
  );
}
