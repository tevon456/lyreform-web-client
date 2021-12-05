import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { UICore } from "../../../components";
import { useDialog } from "../../../hooks";
import { Api, Notification } from "../../../utils/";
export default function DashboardTable({ columns = [], data = [] }) {
  const history = useHistory();
  const [formUUID, setFormUUID] = useState(null);
  const {
    open: deleteOpen,
    toggle: toggleDelete,
    Dialog: Delete,
  } = useDialog();

  function deleteForm(id) {
    Api.deleteForm(id)
      .then(() => {
        Notification.success("Form deleted successfully");
        window.location.reload();
      })
      .catch(() => {
        Notification.danger("There was an error deleting this form");
      });
  }

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={{ maxWidth: "140px" }}>
                <UICore.Text mt="2px" mb="4px">
                  {" "}
                  {item["name"]}
                </UICore.Text>
                <UICore.Text
                  className="truncate"
                  size="sm"
                  weight="200"
                  color="var(--neutral-500)"
                  mt="2px"
                  mb="2px"
                >
                  at {new Date(item["createdAt"]).toLocaleString()}
                </UICore.Text>
              </td>
              <td>
                <UICore.Badge
                  bg={
                    item["published"] ? "var(--success)" : "var(--neutral-500)"
                  }
                >
                  {item["published"] ? "published" : "draft"}
                </UICore.Badge>
              </td>

              <td>{item["Submissions"].length}</td>
              <td>
                <UICore.Flex>
                  <UICore.Box mg="0px">
                    <UICore.Button
                      size="sm"
                      onClick={() => {
                        // history.push("/builder", { formId: item["uuid"] });
                      }}
                    >
                      Open
                    </UICore.Button>
                  </UICore.Box>
                  <UICore.Box mg="0px">
                    <UICore.Button
                      onClick={() => {
                        history.push("/builder", { formId: item["uuid"] });
                      }}
                      size="sm"
                      variant="outline"
                      kind="secondary"
                    >
                      Edit
                    </UICore.Button>
                  </UICore.Box>
                  <UICore.Box mg="0px">
                    <UICore.Button
                      onClick={() => {
                        setFormUUID(item["uuid"]);
                        toggleDelete();
                      }}
                      size="sm"
                      kind="secondary"
                      variant="outline"
                    >
                      Delete
                    </UICore.Button>
                  </UICore.Box>
                </UICore.Flex>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Delete open={deleteOpen} close={toggleDelete} name="Delete">
        <UICore.Text>
          Are you certain you want to delete this form? This action is
          irreversible.
        </UICore.Text>
        <UICore.Flex justify="flex-end">
          <UICore.Button
            kind="danger"
            onClick={() => {
              deleteForm(formUUID);
            }}
          >
            Delete
          </UICore.Button>
          <UICore.Space amount="2" />
          <UICore.Button kind="secondary" onClick={() => toggleDelete()}>
            Cancel
          </UICore.Button>
        </UICore.Flex>
      </Delete>
    </>
  );
}

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
  background: var(--neutral-100);
  & td {
    //border-bottom: 1px solid #ddd;
    padding: 12px;
  }

  & th {
    border-bottom: 1px solid #ddd;
    padding: 12px;
    font-weight: 500;
    font-size: var(--text-rg);
  }

  & tr:hover {
    background-color: var(--neutral-200);
  }

  & th {
    padding-top: 24px;
    padding-bottom: 24px;
    text-align: left;
    background-color: #242423;
    color: white;
  }
`;
