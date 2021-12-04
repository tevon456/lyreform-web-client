import { Api } from "../../utils";
import React, { useEffect } from "react";
import { Content, UICore } from "../../components";
import DashboardTable from "./components/DashboardTable";
import { useRestResponse } from "../../hooks";

export default function Home() {
  return (
    <UICore.Page>
      <UICore.Text weight="500" size="lg">
        Home
      </UICore.Text>
      <UICore.Box pd="12px" />
      <Content.Card>
        <UICore.Text mt="6px" mb="6px" weight="400" size="md">
          Forms
        </UICore.Text>
        <Table />
      </Content.Card>
    </UICore.Page>
  );
}

function Table() {
  let { loading, setLoading, data, setData, error, setError } = useRestResponse(
    []
  );

  useEffect(() => {
    Api.getAllForms()
      .then((res) => {
        setData(res.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
    // eslint-disable-next-line
  }, [loading]);
  if (loading)
    return (
      <UICore.Flex align="center" justify="center">
        <UICore.Text>...loading</UICore.Text>
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
      columns={["Title", "Status", "Fields", "Actions"]}
      data={data}
    />
  );
}
