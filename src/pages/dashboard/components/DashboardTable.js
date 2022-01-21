import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { UICore, Content } from "../../../components";
import { useDialog } from "../../../hooks";
import { Api, Notification } from "../../../utils";
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
                        window.open(
                          `https://live.lyreform.com/${item["uuid"]}`,
                          "_blank"
                        );
                      }}
                    >
                      View{" "}
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </UICore.Button>
                  </UICore.Box>
                  <Content.DropDown
                    width="100px"
                    items={[
                      {
                        type: "action",
                        text: "Edit",
                        onClick: () => {
                          history.push("/builder", { formId: item["uuid"] });
                        },
                      },
                      {
                        type: "action",
                        text: "Delete",
                        color: "red",
                        onClick: () => {
                          setFormUUID(item["uuid"]);
                          toggleDelete();
                        },
                      },
                    ]}
                    x="-46px"
                    y="0px"
                  >
                    <UICore.Box mg="0px">
                      <UICore.Button
                        size="sm"
                        variant="outline"
                        kind="secondary"
                      >
                        More
                      </UICore.Button>
                    </UICore.Box>
                  </Content.DropDown>
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
