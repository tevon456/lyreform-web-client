import { Api } from "../../utils";
import React, { useEffect } from "react";
import { Content, UICore } from "../../components";
import { useRestResponse } from "../../hooks";
import DashboardTable from "./components/DashboardTable";
import "styled-components/macro";

export default function Home() {
  let { loading, setLoading, data, setData, error, setError } = useRestResponse(
    []
  );
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
  }, [loading]);

  return (
    <UICore.Page>
      <UICore.Text weight="500" size="lg">
        Home
      </UICore.Text>
      <Content.Card>
        <Table loading={loading} data={data?.results} error={error} />
      </Content.Card>
    </UICore.Page>
  );
}

function Table({ error, loading, data }) {
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
      <UICore.Flex align="center" justify="center">
        <UICore.Text>An error occurred</UICore.Text>
      </UICore.Flex>
    );
  return (
    <DashboardTable
      columns={["Title", "Status", "Responses", "Actions"]}
      data={data}
    />
  );
}
