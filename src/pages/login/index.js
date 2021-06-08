import React, { useEffect } from "react";
import { Content, UICore } from "../../components";
import { useBackground } from "../../hooks";
import LoginForm from "./components/LoginForm";

export default function Login() {
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
            Login
          </UICore.Text>
          <LoginForm />
        </Content.Card>
      </UICore.Flex>
    </UICore.Page>
  );
}
