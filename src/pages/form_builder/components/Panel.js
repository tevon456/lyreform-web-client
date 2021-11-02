import React, { useState, useEffect } from "react";
import { UICore, Content } from "../../../components";
import Logo from "../../../resources/icons/logo";
import { BaseForm, GeneralForm, NumberForm, OptionForm } from "../form";
import { useHistory } from "react-router-dom";
import chroma from "chroma-js";
import { Api, Notification } from "../../../utils";

export default function Panel({
  form,
  fieldId,
  trigger = () => {
    /**/
  },
}) {
  const colorLogo = "#FFFFFF";
  const history = useHistory();
  const [type, setType] = useState("BASE");

  let general = ["SHORT_ANSWER", "LONG_ANSWER", "DATE", "EMAIL"];
  let multiple = ["DROPDOWN_SELECT", "RADIO_GROUP", "CHECKBOX_GROUP"];

  async function saveForm(data = {}, id = null) {
    if (id) {
      let payload = {
        ...data,
        uuid: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        user_id: undefined,
      };
      Api.updateForm(id, payload)
        .then((res) => {
          Notification.success("Save successful.");
          console.log(res);
        })
        .catch((error) => {
          Notification.danger("An error occurred while updating your form.");
          console.log(error);
        });
    } else {
      Api.createForm(data)
        .then((res) => {
          form.setIdFromBackend(res.data.uuid);
          Notification.success("Save successful.");
        })
        .catch((error) => {
          Notification.danger("An error occurred while saving your form.");
          console.log(error);
        });
    }
  }

  useEffect(() => {
    setType(form.util.fieldDetails(fieldId)?.field[0]?.field_type || "BASE");
    // eslint-disable-next-line
  }, [fieldId, type]);
  return (
    <UICore.Box
      height="107.5vh"
      maxWidth="290px"
      minWidth="180px"
      bg="#FFF"
      pd="0px"
      z="0"
      style={{ flexGrow: 1, overflowY: "hidden" }}
    >
      <UICore.Box
        pd="5px"
        pt="4px"
        mg="0px"
        bt="none"
        bl="none"
        br="1px solid var(--neutral-400)"
        bg="#2A2A2A"
        border="1px solid #2A2A2A"
      >
        <UICore.Flex>
          <Content.DropDown
            aria-label={"Main menu"}
            data-balloon-pos="right"
            width="170px"
            dark
            hoverColor="rgb(92, 92, 92)"
            items={[
              {
                type: "action",
                text: "Home",
                onClick: () => {
                  history.push("/");
                },
              },
              { type: "line" },
              {
                type: "action",
                text: "Save",
                onClick: async () => {
                  await saveForm(form.getModel(), form.getId());
                },
              },
              {
                type: "action",
                text: "Save and Exit",
                onClick: async () => {
                  await saveForm(form.getModel(), form.getId());
                  history.goBack();
                },
              },
              {
                type: "action",
                text: "Clear fields",
                onClick: () => {
                  form.clearAllFields();
                  trigger();
                },
              },
              { type: "line" },
              { type: "action", text: "Delete" },
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

      <UICore.Box
        mg="0px"
        pd="12px"
        mt="0px"
        height="90vh"
        style={{ overflowY: "auto" }}
      >
        {general.includes(type) ? (
          <GeneralForm form={form} id={fieldId} triggerRender={trigger} />
        ) : multiple.includes(type) ? (
          <OptionForm form={form} id={fieldId} triggerRender={trigger} />
        ) : type === "NUMBER" ? (
          <NumberForm form={form} id={fieldId} triggerRender={trigger} />
        ) : (
          <BaseForm form={form} id={fieldId} triggerRender={trigger} />
        )}
      </UICore.Box>
    </UICore.Box>
  );
}
