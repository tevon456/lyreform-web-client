import { Api } from "../../utils";
import React, { useState } from "react";
import { Content, UICore } from "../../components";
import { useAPI, useDialog } from "../../hooks";
import DashboardTable from "./components/DashboardTable";
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
          <UICore.Badge color="#10451d" bg="#b7efc5">
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
                  `https://live.lyreform.com/${row["uuid"]}`,
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
              width="100px"
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
      </Content.Card>
    </SubPage>
  );
}

function Table({ error, loading, data = [], render, watch }) {
  if (loading)
    return (
      <UICore.Flex align="center" justify="center">
        <UICore.Loader />
      </UICore.Flex>
    );
  if (error)
    return (
      <UICore.Flex align="center" direction="column" justify="center">
        <UICore.Text>An error occurred</UICore.Text>
        <UICore.Button
          onClick={() => {
            render();
          }}
        >
          Retry
        </UICore.Button>
      </UICore.Flex>
    );
  if (data.length === 0) {
    return (
      <UICore.Flex align="center" justify="center">
        <div>
          <UICore.Text weight="300" align="center" color="#495057">
            You have no forms as yet, you can click the button below to create
            your first form.
          </UICore.Text>
          <UICore.Flex justify="center">
            <UICore.Button
              as="a"
              kind="secondary"
              style={{ color: "#fff" }}
              href="/builder"
            >
              Create form
            </UICore.Button>
          </UICore.Flex>
        </div>
      </UICore.Flex>
    );
  }
  return (
    <DashboardTable
      columns={["Title", "Status", "Responses", "Actions"]}
      data={data}
    />
  );
}
