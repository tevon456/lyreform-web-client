import { Api } from "../../utils";
import React, { useState } from "react";
import { Content, UICore } from "../../components";
import { useAPI, useDialog } from "../../hooks";
import "styled-components/macro";
import { SubPage } from "./components";
import { DataTable } from "../../components/ui-core";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();
  const [formUUID, setFormUUID] = useState(null);
  const {
    open: deleteOpen,
    toggle: toggleDelete,
    Dialog: Delete,
  } = useDialog();
  let { loading, data } = useAPI(() => Api.getAllForms(), {
    data: { results: [], current_page: 0, limit: 10, total_pages: 1 },
  });

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

  const columns = [
    {
      name: "Title",
      selector: "name",
      component: (row) => (
        <UICore.Text
          mt="2px"
          mb="2px"
          className="truncate"
          style={{ maxWidth: "160px" }}
        >
          {row.name}
        </UICore.Text>
      ),
    },
    {
      name: "Status",
      selector: "status",
      componentWrapped: true,
      breakpoint: 920,
      component: (row) =>
        row.published ? (
          <UICore.Badge color="#10451d" bg="#b7efc5">
            published
          </UICore.Badge>
        ) : (
          <UICore.Badge color="var(--500)" bg="var(--neutral-300)">
            draft
          </UICore.Badge>
        ),
    },
    {
      name: "Responses",
      selector: "Submissions",
      breakpoint: 780,
      component: (row) => <div>{row.Submissions.length}</div>,
    },
    {
      name: "Actions",
      selector: "destination",
      component: (row) => (
        <UICore.Flex>
          <div>
            <UICore.Button
              kind="secondary"
              onClick={() => {
                window.open(
                  process.env.NODE_ENV === "production"
                    ? `${process.env.REACT_APP_PROD_FORM_URL}/${row["uuid"]}`
                    : `${process.env.REACT_APP_DEV_FORM_URL}/${row["uuid"]}`,
                  "_blank"
                );
              }}
            >
              view
            </UICore.Button>
          </div>
          <UICore.Space amount={2} />
          <div>
            <Content.DropDown
              width="150px"
              items={[
                {
                  type: "action",
                  text: "Edit",
                  onClick: () => {
                    history.push("/builder", { formId: row["uuid"] });
                  },
                },
                {
                  type: "action",
                  text: "Delete",
                  color: "red",
                  onClick: () => {
                    setFormUUID(row["uuid"]);
                    toggleDelete();
                  },
                },
              ]}
              x="-46px"
              y="0px"
            >
              <UICore.Box mg="0px" pd="0px">
                <UICore.Button size="sm" variant="outline" kind="secondary">
                  More
                </UICore.Button>
              </UICore.Box>
            </Content.DropDown>
          </div>
        </UICore.Flex>
      ),
    },
  ];

  return (
    <SubPage
      title="Home"
      actions={
        <div>
          <UICore.Button as="a" style={{ color: "#fff" }} href="/builder">
            Create form
          </UICore.Button>
        </div>
      }
    >
      <Content.Card>
        {loading ? (
          <UICore.Loader />
        ) : (
          <DataTable columns={columns} data={data.data.results} />
        )}
        <Delete name="Delete Form" open={deleteOpen} close={toggleDelete}>
          <UICore.Text mb="12px">
            Are you sure you want to delete this form?
          </UICore.Text>
          <UICore.Flex justify="flex-end" align="center">
            <UICore.Button
              kind="secondary"
              style={{ display: "block" }}
              onClick={() => toggleDelete()}
            >
              Cancel
            </UICore.Button>
            <UICore.Space amount={2} />
            <UICore.Button
              kind="danger"
              style={{ display: "block" }}
              onClick={() => deleteForm(formUUID)}
            >
              Delete
            </UICore.Button>
          </UICore.Flex>
        </Delete>
      </Content.Card>
    </SubPage>
  );
}
