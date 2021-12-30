import { Api } from "../../utils";
import React, { useEffect } from "react";
import { Content, UICore } from "../../components";
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
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
    // eslint-disable-next-line
  }, [loading, watch]);

  return (
    <SubPage>
      <UICore.Text weight="500" size="lg">
        Home
      </UICore.Text>
      <Content.Card>
        <Table
          loading={loading}
          data={data?.results}
          error={error}
          render={render}
        />
      </Content.Card>
    </SubPage>
  );
}

function Table({ error, loading, data, render }) {
  if (loading)
    return (
      <UICore.Flex align="center" justify="center">
        <UICore.Text>
          <UICore.Loader />
        </UICore.Text>
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
  return (
    <DashboardTable
      columns={["Title", "Status", "Responses", "Actions"]}
      data={data}
    />
  );
}
