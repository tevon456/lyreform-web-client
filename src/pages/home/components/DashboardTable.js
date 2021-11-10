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
                <div> {item["name"]}</div>
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

              <td>{item["fields"].length}</td>
              <td>
                <UICore.Flex>
                  <UICore.Box
                    mg="0px"
                    aria-label="Responses"
                    data-balloon-pos="down"
                    as="button"
                    onClick={() => {
                      // history.push("/builder", { formId: item["uuid"] });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      width="24px"
                      height="24px"
                    >
                      <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                      <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                    </svg>
                  </UICore.Box>
                  <UICore.Box
                    mg="0px"
                    aria-label="Edit"
                    data-balloon-pos="down"
                    as="button"
                    onClick={() => {
                      history.push("/builder", { formId: item["uuid"] });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      width="24px"
                      height="24px"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </UICore.Box>
                  <UICore.Box
                    mg="0px"
                    aria-label="Delete"
                    data-balloon-pos="down"
                    as="button"
                    onClick={() => {
                      setFormUUID(item["uuid"]);
                      toggleDelete();
                    }}
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
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
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
    border-bottom: 1px solid #ddd;
    padding: 12px;
  }

  & th {
    border-bottom: 1px solid #ddd;
    padding: 12px;
    font-weight: 300;
    font-size: var(--text-rg);
  }

  & tr:hover {
    background-color: var(--neutral-300);
  }

  & th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #111;
    color: white;
  }
`;
