import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Content, UICore } from "../../../components";
import { useWindowSize } from "../../../hooks";
import { Api, Notification } from "../../../utils";
import "styled-components/macro";

export default function Toolbar({
  form,
  trigger = () => {
    /**/
  },
  setField = () => {
    /**/
  },
}) {
  const size = useWindowSize();
  const [toolWidth, setToolWidth] = useState("100%");
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const origin = "https://live.lyreform.com/preview";

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
          Notification.black("Save successful.");
          setUnsavedChanges(false);
        })
        .catch((error) => {
          Notification.danger("An error occurred while updating your form.");
          console.log(error);
        });
    } else {
      Api.createForm(data)
        .then((res) => {
          form.setIdFromBackend(res.data.uuid);
          Notification.black("Save successful.");
          setUnsavedChanges(false);
        })
        .catch((error) => {
          Notification.danger("An error occurred while saving your form.");
          console.log(error);
        });
    }

    let timestamp = Date.now();
    localStorage.setItem("last_update", timestamp);
    localStorage.setItem("last_save", timestamp);
  }

  function preview() {
    let previewWindow = window.open(origin, form.getModel().name);
    setTimeout(() => {
      previewWindow.postMessage(JSON.stringify(form.getModel()), origin);
    }, 3000);
  }

  let last_update = localStorage.getItem("last_update");
  let last_save = localStorage.getItem("last_save");

  useEffect(() => {
    let parent = document.getElementById("canvas-list-area");
    if (parent) {
      setToolWidth(`${parent.offsetWidth}px`);
    }

    if (last_update && last_save && last_update !== last_save) {
      setUnsavedChanges(true);
    } else {
      setUnsavedChanges(false);
    }
    // eslint-disable-next-line
  }, [
    size, // eslint-disable-next-line
    localStorage.getItem("last_update"), // eslint-disable-next-line
    localStorage.getItem("last_save"),
    last_save,
    last_save,
  ]);

  return (
    <UICore.Box
      mg="0px"
      bg="#2A2A2A"
      color="#fff"
      pd="6px"
      bb="1px solid rgba(0,0,0,.1)"
      pos="fixed"
      z="4"
      width={toolWidth}
      style={{
        display: "block",
        boxShadow: "rgba(0,0,0,0.16) 0px 6px 8px -8px",
        transform: "translate3d(0, 0, 0)",
      }}
    >
      <UICore.Flex justify="space-between" align="center">
        <div
          aria-label={form.getModel().name}
          data-balloon-pos="down"
          style={{ maxWidth: "170px" }}
        >
          <UICore.Text
            color="var(--text-light)"
            className="truncate"
            mt="0px"
            mb="0px"
            style={{ marginLeft: "12px" }}
          >
            {form.getModel().name}
          </UICore.Text>
        </div>
        <UICore.Box pd="0px" mg="0px">
          <UICore.Flex justify="space-between" align="center">
            <div>
              <Content.DropDown
                width="270px"
                items={[
                  {
                    type: "any",
                    component: (
                      <UICore.Text mb="4px" size="sm" weight="300">
                        Select a field type to insert from the list below
                      </UICore.Text>
                    ),
                  },
                  { type: "line" },
                  {
                    type: "action",
                    text: "Email",
                    onClick: () => {
                      let response = form.createField("EMAIL", {
                        name: `email_${nanoid(8)}`,
                        label: "Email address",
                        placeholder: "",
                        required: true,
                      });
                      setField(response.id);
                      trigger();
                    },
                  },
                  {
                    type: "action",
                    text: "Number",
                    onClick: () => {
                      let response = form.createField("NUMBER", {
                        name: `number_${nanoid(8)}`,
                        label: "Number",
                        min: 0,
                        max: 100,
                        required: false,
                      });
                      setField(response.id);
                      trigger();
                    },
                  },
                  {
                    type: "action",
                    text: "Short Answer",
                    onClick: () => {
                      let response = form.createField("SHORT_ANSWER", {
                        name: `text_${nanoid(8)}`,
                        label: "Short Answer",
                        placeholder: "",
                        required: false,
                      });
                      setField(response.id);
                      trigger();
                    },
                  },
                  {
                    type: "action",
                    text: "Long Answer",
                    onClick: () => {
                      let response = form.createField("LONG_ANSWER", {
                        name: `long-text_${nanoid(8)}`,
                        label: "Long Answer",
                        placeholder: "",
                        required: false,
                      });
                      setField(response.id);
                      trigger();
                    },
                  },
                  {
                    type: "action",
                    text: "Date",
                    onClick: () => {
                      let response = form.createField("DATE", {
                        name: `date_${nanoid(8)}`,
                        label: "Date",
                        // TODO min: "",
                        // TODO max: "",
                        required: true,
                      });
                      setField(response.id);
                      trigger();
                    },
                  },
                  // {
                  //   type: "action",
                  //   text: "Rich Text",
                  //   onClick: () => {
                  //     let response = form.createField("RICH_TEXT", {
                  //       name: `rich-text_${nanoid(8)}`,
                  //       label: "Rich Text",
                  //       required: false,
                  //     });
                  //     setField(response.id);
                  //     trigger();
                  //   },
                  // },
                  { type: "line" },
                  {
                    type: "action",
                    text: "Select",
                    onClick: () => {
                      let response = form.createField("DROPDOWN_SELECT", {
                        name: `select_${nanoid(8)}`,
                        label: "Select",
                        options: [
                          { value: "eg option 1" },
                          { value: "eg option 2" },
                        ],
                        required: false,
                      });
                      setField(response.id);
                      trigger();
                    },
                  },
                  {
                    type: "action",
                    text: "Radio",
                    onClick: () => {
                      let response = form.createField("RADIO_GROUP", {
                        name: `radio_${nanoid(8)}`,
                        label: "Radio",
                        options: [
                          { value: "eg radio A" },
                          { value: "eg radio B" },
                        ],
                        required: false,
                      });
                      setField(response.id);
                      trigger();
                    },
                  },
                  {
                    type: "action",
                    text: "Checkbox",
                    onClick: () => {
                      let response = form.createField("CHECKBOX_GROUP", {
                        name: `checkbox_${nanoid(8)}`,
                        label: "Checkbox",
                        options: [
                          { value: "eg checkbox A" },
                          { value: "eg checkbox B" },
                        ],
                        required: false,
                      });
                      setField(response.id);
                      trigger();
                    },
                  },
                  // { type: "line" },
                  // {
                  //   type: "action",
                  //   text: "File Uploader",
                  //   onClick: () => {
                  //     let response = form.createField("FILE", {
                  //       name: `file_${nanoid(8)}`,
                  //       label: "File Uploader",
                  //       multiple: false,
                  //       required: false,
                  //     });
                  //     setField(response.id);
                  //     trigger();
                  //   },
                  // },
                ]}
                x="4px"
                y="18px"
              >
                <UICore.Button
                  bg="transparent"
                  hover="#FFFFFF"
                  variant="outline"
                  color="#FFF"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  <UICore.Space amount={1} />
                  Add field
                </UICore.Button>
              </Content.DropDown>{" "}
            </div>
            <div>
              <UICore.Button
                bg="transparent"
                hover="#FFFFFF"
                variant="outline"
                color="#FFF"
                onClick={() => {
                  setField(null);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                <UICore.Space amount={1} />
                General
              </UICore.Button>
            </div>
            <div>
              <UICore.Button
                bg="transparent"
                hover="#FFFFFF"
                variant="outline"
                color="#FFF"
                onClick={() => preview()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <UICore.Space amount={1} />
                Preview
              </UICore.Button>
            </div>
          </UICore.Flex>
        </UICore.Box>
        <div
          style={{ marginRight: "20px" }}
          aria-label={unsavedChanges ? "unsaved changes" : "save"}
          data-balloon-pos="left"
        >
          <UICore.Flex align="center" justify="center">
            <UICore.Button
              bg="transparent"
              hover="#FFFFFF"
              variant="outline"
              color="#FFF"
              onClick={async () => {
                await saveForm(form.getModel(), form.getId());
              }}
            >
              {unsavedChanges ? (
                <div
                  css={`
                    position: absolute;
                    border-radius: 24px;
                    background-color: #ffbe0b;
                    width: 10px;
                    height: 10px;
                    transform: translate(16px, 8px);
                  `}
                />
              ) : null}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
            </UICore.Button>
          </UICore.Flex>
        </div>
      </UICore.Flex>
    </UICore.Box>
  );
}
