import React, { useEffect } from "react";
import { Content, UICore } from "../../components";
import { useBackground } from "../../hooks";
import ResendConfirmationForm from "./components/ResendConfirmationForm";

export default function ResendConfirmation() {
  const [apply] = useBackground();
  useEffect(() => {
    apply(`var(--secondary)`);
  }, [apply]);
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
            Resend Confirmation
          </UICore.Text>
          <UICore.Text align="left" size="rg" weight="300">
            If you did not receive an account confirmation, you can request a
            new email below.
          </UICore.Text>
          <ResendConfirmationForm />
        </Content.Card>
      </UICore.Flex>
    </UICore.Page>
  );
}
