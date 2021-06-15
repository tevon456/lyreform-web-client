import React from "react";
import { Content, UICore } from "../../../components";
import chroma from "chroma-js";
import Logo from "../../../resources/icons/logo";

export default function Toolbar() {
  const colorLogo = "#ffffff";
  return (
    <UICore.Box
      mg="0px"
      bg="#2A2A2A"
      color="#fff"
      pd="6px"
      bb="1px solid rgba(0,0,0,.1)"
      pos="fixed"
      z="4"
      width="100vw"
      style={{
        boxShadow: "rgba(0,0,0,0.16) 0px 6px 8px -8px",
        transform: "translate3d(0, 0, 0)",
      }}
    >
      <UICore.Flex justify="space-between" align="center">
        <Content.DropDown
          width="150px"
          items={[
            { type: "action", text: "Back to home" },
            { type: "line" },
            { type: "action", text: "Rename" },
            { type: "action", text: "Clear fields" },
            { type: "line" },
            { type: "action", text: "Export file" },
            { type: "action", text: "Import file" },
          ]}
          x="4px"
          y="18px"
        >
          <Logo
            width="34px"
            height="34px"
            colorA={colorLogo}
            colorB={chroma(colorLogo || "#00204d")
              .darken()
              .hex()}
          />
        </Content.DropDown>
        <UICore.Box pd="0px" mg="0px">
          <UICore.Flex justify="space-between" align="center">
            <UICore.Button
              aria-label="Add field"
              data-balloon-pos="down"
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
            </UICore.Button>{" "}
            <UICore.Button
              aria-label="Form colors"
              data-balloon-pos="down"
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
            </UICore.Button>
            <UICore.Button
              aria-label="Preview form"
              data-balloon-pos="down"
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
