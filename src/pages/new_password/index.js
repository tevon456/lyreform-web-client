import React, { useEffect } from "react";
import { Content, UICore } from "../../components";
import { useBackground } from "../../hooks";
import NewPasswordForm from "./components/NewPasswordForm";

export default function NewPassword() {
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
            New Password
          </UICore.Text>
          <UICore.Text align="left" size="rg" weight="300">
            Enter your new password below to reset your account password.
          </UICore.Text>
          <NewPasswordForm />
        </Content.Card>
      </UICore.Flex>
    </UICore.Page>
  );
}
