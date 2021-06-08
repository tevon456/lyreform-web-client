import React, { useEffect } from "react";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { Content, UICore } from "../../components";
import { useBackground, useRestResponse } from "../../hooks";
import { Api, Notification } from "../../utils";

export default function VerifyAccount() {
  return (
    <UICore.Page>
      <UICore.Flex justify="center">
        <Content.Card
          mt="var(--space-lg)"
          width="400px"
          height="max-content"
          pd="18px"
        >
          <UICore.Text align="center" weight="500" size="lg" as="h1" mb="24px">
            Verify Account
          </UICore.Text>

          <InnerMessage />
          <UICore.Flex justify="center" className="margin-bottom--xxl">
            <Link to="/resend-confirmation" style={{ color: "var(--primary)" }}>
              Request a verification email
            </Link>
          </UICore.Flex>
        </Content.Card>
      </UICore.Flex>
    </UICore.Page>
  );
}

function InnerMessage() {
  const [apply] = useBackground("transparent");
  const [verify] = useRestResponse("");
  const token = useRouteMatch().params.token;

  useEffect(() => {
    apply(`var(--secondary)`);
    Api.verifyAccount(token)
      .then((res) => {
        verify.setLoading(false);
        verify.setData(res.data.message);
      })
      .catch((error) => {
        if (error.response.status === 429) {
          Notification.warning("Too many request, please try agin later");
        }
        if (error.response) {
          verify.setLoading(false);
          verify.setError(error.response.data.message);
        }
      });
    // eslint-disable-next-line
  }, []);

  if (verify.loading) {
    return (
      <UICore.Text align="center" size="rg" weight="300">
        checking...
      </UICore.Text>
    );
  }
  if (verify.error) {
    return (
      <UICore.Text align="center" size="rg" weight="300">
        {verify.error}
      </UICore.Text>
    );
  }
  return (
    <UICore.Text align="center" size="rg" weight="300">
      {verify.data}
    </UICore.Text>
  );
}
