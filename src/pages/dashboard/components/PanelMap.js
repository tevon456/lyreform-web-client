import React from "react";
import { RenderResponse } from "./index";
import { Content, Icons, UICore } from "../../../components";
import "styled-components/macro";

export default function PanelMap({ responseKeys = [], data = {}, details }) {
  if (!data || !details) {
    return (
      <UICore.Flex align="center" justify="center">
        <div
          css={`
            height: 60vh;
          `}
        >
          <Content.Card height="50px">
            <UICore.Text weight="300">
              Select a response from the response list
            </UICore.Text>
          </Content.Card>
        </div>
      </UICore.Flex>
    );
  }
  return (
    <UICore.Box>
      <UICore.Flex align="center">
        <UICore.Box ml="0px" pl="0px">
          <Icons.CalendarIcon width="20px" height="20px" />
        </UICore.Box>

        <UICore.Text align="left" variantNumeric="tabular-nums">
          {new Date(details.createdAt).toDateString()} at{" "}
          {new Date(details.createdAt).toLocaleTimeString()}
        </UICore.Text>
      </UICore.Flex>

      <div>
        <Content.Card>
          {responseKeys.map((responseKey) => (
            <UICore.Box key={responseKey}>
              <RenderResponse
                data={data}
                responseKey={responseKey}
                type={data[responseKey].fieldType}
              />
            </UICore.Box>
          ))}
        </Content.Card>
      </div>
    </UICore.Box>
  );
}
