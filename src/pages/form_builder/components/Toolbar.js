import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Content, UICore } from "../../../components";
import { useWindowSize } from "../../../hooks";

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

  useEffect(() => {
    let parent = document.getElementById("canvas-list-area");
    if (parent) {
      setToolWidth(`${parent.offsetWidth}px`);
    }
  }, [size]);

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
        <UICore.Text
          color="var(--text-light)"
          mt="0px"
          mb="0px"
          style={{ marginLeft: "12px" }}
        >
          {form.getModel().name}
        </UICore.Text>
        <UICore.Box pd="0px" mg="0px">
          <UICore.Flex justify="space-between" align="center">
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
                      min: "",
                      max: "",
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
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  width="24px"
                  height="24px"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                <UICore.Space amount={1} />
                Add field
              </UICore.Button>
            </Content.DropDown>{" "}
            <UICore.Button
              bg="transparent"
              hover="#FFFFFF"
              variant="outline"
              color="#FFF"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                width="24px"
                height="24px"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                  clipRule="evenodd"
                />
              </svg>
              <UICore.Space amount={1} />
              Color
            </UICore.Button>
            <UICore.Button
              bg="transparent"
              hover="#FFFFFF"
              variant="outline"
              color="#FFF"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                width="24px"
                height="24px"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              <UICore.Space amount={1} />
              Preview
            </UICore.Button>
          </UICore.Flex>
        </UICore.Box>

        <Save />
      </UICore.Flex>
    </UICore.Box>
  );
}

function Save() {
  return (
    <UICore.Box pd="0px" mg="0px" mr="20px">
      <Content.DropDown
        width="150px"
        items={[
          { type: "action", text: "Save only" },
          { type: "action", text: "Save and publish" },
        ]}
        x="-108px"
        y="18px"
      >
        <UICore.Button bg="#D3D3D3" hover="#fff" variant="outline" color="#fff">
          Save
        </UICore.Button>
      </Content.DropDown>
    </UICore.Box>
  );
}
