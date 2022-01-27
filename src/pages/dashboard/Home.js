import { Api } from "../../utils";
import React, { useEffect } from "react";
import { Content, Icons, UICore } from "../../components";
import { useRender, useRestResponse } from "../../hooks";
import DashboardTable from "./components/DashboardTable";
import "styled-components/macro";
import { SubPage } from "./components";

export default function Home() {
  let { loading, setLoading, data, setData, error, setError } = useRestResponse(
    []
  );
  let [watch, render] = useRender();

  useEffect(() => {
    Api.getAllForms()
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
    // eslint-disable-next-line
  }, [loading, watch]);

  return (
    <SubPage>
      <UICore.Flex align="center" justify="space-between">
        <UICore.Text weight="500" size="lg" mt="var(--space-md)">
          Home
        </UICore.Text>
        <div>
          <UICore.Button as="a" style={{ color: "#fff" }} href="/builder">
            Create form
          </UICore.Button>
        </div>
      </UICore.Flex>

      <Content.Card heigh="max-content">
        <Table
          loading={loading}
          data={data?.results}
          error={error}
          render={render}
          watch={watch}
        />
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
          <UICore.Flex justify="center">
            <Icons.LightBulbIcon color="#212529" width="50px" />
          </UICore.Flex>
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
