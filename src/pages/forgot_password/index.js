import React, { useEffect } from "react";
import { Content, UICore } from "../../components";
import { useBackground } from "../../hooks";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

export default function ForgotPassword() {
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
          height="300px"
          pd="18px"
        >
          <UICore.Text align="center" weight="500" size="lg" as="h1" mb="24px">
            Password Reset
          </UICore.Text>
          <UICore.Text align="left" size="rg" weight="300">
            Please enter the email address that you used to sign up so we can
            send you a password reset link.
            <br /> <b>You will only get an email if an account exists.</b>
          </UICore.Text>
          <ForgotPasswordForm />
        </Content.Card>
      </UICore.Flex>
    </UICore.Page>
  );
}
