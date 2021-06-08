import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { UICore, Content } from "../../components";
import { useBackground } from "../../hooks";

export default function NotFound() {
  const [apply] = useBackground();
  useEffect(() => {
    apply(`var(--secondary)`);
  }, [apply]);
  return (
    <UICore.Page>
      <UICore.Flex justify="center">
        <Content.Card width="600px" mt="var(--space-lg)">
          <UICore.Text as="h1" weight="600" align="center" size="xxxl">
            404
          </UICore.Text>
          <UICore.Text as="h4" align="center" size="lg">
            Page Not Found
          </UICore.Text>
          <UICore.Text as="p" align="center" weight="300">
            The Page you are looking for may have been moved or deleted.
          </UICore.Text>
          <UICore.Flex justify="center" className="margin-bottom--xxl">
            <Link to="/" style={{ color: "var(--primary)" }}>
              Go Home
            </Link>
          </UICore.Flex>
        </Content.Card>
      </UICore.Flex>
    </UICore.Page>
  );
}
