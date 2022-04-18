import React from "react";
import { UICore } from "../../../components";

export default function RenderResponse({ type, responseKey, data }) {
  const formatter = new Intl.ListFormat("en-US", {
    style: "long",
    type: "conjunction",
  });
  switch (type) {
    case "CHECKBOX_GROUP":
      return (
        <>
          <UICore.Flex>
            <ResponseLabel>{data[responseKey].label}</ResponseLabel>
          </UICore.Flex>
          <UICore.Text mt="2px">
            {formatter.format(data[responseKey].value)}
          </UICore.Text>
        </>
      );
    case "EMAIL":
      return (
        <>
          <ResponseLabel>{data[responseKey].label}</ResponseLabel>
          <a href={`mailto:${data[responseKey].value}`}>
            <UICore.Text color="blue" mt="2px" weight="300">
              {data[responseKey].value}
            </UICore.Text>
          </a>
        </>
      );
    case "EMPTY":
      return (
        <>
          <UICore.Flex>
            <UICore.Badge
              background="#bcdfff"
              color="var(--accent-color)"
              align="left"
              data-balloon-length="medium"
              aria-label="When you update your form with new fields, existing replies that do not have the new fields are filled in with empty placeholders."
              data-balloon-pos="right"
            >
              {data[responseKey].label}
            </UICore.Badge>
          </UICore.Flex>
          <UICore.Text mt="2px" weight="300">
            {data[responseKey].value}
          </UICore.Text>{" "}
        </>
      );
    default:
      return (
        <>
          <ResponseLabel>{data[responseKey].label}</ResponseLabel>
          <UICore.Text mt="2px" weight="300">
            {data[responseKey].value}
          </UICore.Text>{" "}
        </>
      );
  }
}

const ResponseLabel = ({ children }) => (
  <UICore.Text size="rg" mb="4px" weight="500" align="left">
    {children}
  </UICore.Text>
);
