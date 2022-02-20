import { UICore, Icons } from "../../../components";
import { breakpoints } from "../../../utils";

import "styled-components/macro";
import { useHistory } from "react-router-dom";

export default function SubPage({ title, actions, children }) {
  const history = useHistory();
  return (
    <main
      css={`
        padding: 2rem 12rem;
        margin-bottom: 6rem;

        @media screen and (max-width: 1260px) {
          padding: 2rem 8rem;
        }
        @media screen and (max-width: 1060px) {
          padding: 2rem 6rem;
        }
        @media screen and (max-width: 970px) {
          padding: 2rem 4rem;
        }
        @media screen and (max-width: ${breakpoints.phablet}) {
          padding: 2rem;
        }
        @media screen and (max-width: ${breakpoints.mobile}) {
          padding: 1rem;
        }
      `}
    >
      <div>
        <UICore.Flex
          justify="space-between"
          align="center"
          className="margin-bottom--md"
        >
          <div>
            <UICore.Flex align="center">
              <div>
                <UICore.Button
                  kind="secondary"
                  title="Back"
                  onClick={() => history.goBack()}
                >
                  <Icons.ArrowLeft width="16px" height="16px" />
                </UICore.Button>
              </div>
              <UICore.Space amount={2} />
              <UICore.Text as="h1" size="lg" weight="bold" mt="0px" mb="0px">
                {title}
              </UICore.Text>
            </UICore.Flex>
          </div>
          <div>{actions}</div>
        </UICore.Flex>
      </div>
      <section>{children}</section>
    </main>
  );
}
