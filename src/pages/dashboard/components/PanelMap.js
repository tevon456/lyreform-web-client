import React from "react";
import { RenderResponse } from "./index";
import { Content, Icons, UICore } from "../../../components";
import "styled-components/macro";
import { useDialog } from "../../../hooks";

export default function PanelMap({
  responseKeys = [],
  data = {},
  details,
  refreshResponse,
}) {
  let {
    open: deleteOpen,
    toggle: toggleDelete,
    Dialog: DeleteDialog,
  } = useDialog();

  if (!data || !details) {
    return (
      <UICore.Flex
        align="center"
        justify="center"
        css={`
          height: 60vh;
        `}
      >
        <Content.Card height="50px">
          <UICore.Text weight="300">No response selected</UICore.Text>
        </Content.Card>
      </UICore.Flex>
    );
  }
  return (
    <UICore.Box>
      <UICore.Flex align="center" justify="space-between">
        <div>
          <UICore.Flex align="center">
            <UICore.Box ml="0px" pl="0px">
              <Icons.CalendarIcon width="20px" height="20px" />
            </UICore.Box>

            <UICore.Text align="left" variantNumeric="tabular-nums">
              {new Date(details.createdAt).toDateString()} at{" "}
              {new Date(details.createdAt).toLocaleTimeString()}
            </UICore.Text>
          </UICore.Flex>
        </div>
        <UICore.Button kind="danger" onClick={() => toggleDelete()}>
          <Icons.TrashIcon width="20px" />
        </UICore.Button>
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
      <DeleteDialog
        open={deleteOpen}
        close={toggleDelete}
        name="Delete Response"
      >
        <UICore.Text>
          Are you sure you want to delete this response?{" "}
        </UICore.Text>
        <UICore.Flex justify="flex-end">
          <UICore.Button kind="danger" onClick={() => refreshResponse()}>
            Delete
          </UICore.Button>
          <UICore.Space amount={2} />
          <UICore.Button kind="secondary" onClick={() => toggleDelete()}>
            Cancel
          </UICore.Button>
        </UICore.Flex>
      </DeleteDialog>
    </UICore.Box>
  );
}
