import { Icons, UICore } from "../../components";
import "styled-components/macro";
import { NavLink, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Templates from "./Templates";
import DashboardNotFound from "./NotFound";
import Inbox from "./Inbox";
import { AppShell } from "./components";
import { paths } from "../../utils";

export default function Dashboard() {
  return (
    <AppShell>
      <Routes />
    </AppShell>
  );
}

function Routes() {
  return (
    <Switch>
      <Route exact path={paths.DASHBOARD} component={Home} />
      <Route exact path={paths.INBOX} component={Inbox} />
      <Route exact path={`${paths.INBOX}/:form_id/`} component={Inbox} />
      <Route exact path={paths.TEMPLATES} component={Templates} />
      <Route component={DashboardNotFound} />
    </Switch>
  );
}

function SideBarLink({ exact, icon, to, text, ...rest }) {
  return (
    <div
      css={`
        margin-bottom: 4px;
        & > a:focus {
          box-shadow: none;
          background: var(--neutral-200);
        }
        & > a:focus > div {
          background: #eaeffb;
          color: var(--primary);
        }
        & > a > div {
          border-radius: 4px;
          padding: 8px;
          color: var(--neutral-500);
          &:hover {
            background: var(--neutral-200);
          }
        }
      `}
    >
      <NavLink activeClassName="sideBarActive" exact={exact} to={to}>
        <div>
          <UICore.Flex align="center">
            {icon || null}
            <UICore.Space amount={2} />
            <UICore.Text color="inherit" mt="0px" mb="0px">
              {text}
            </UICore.Text>
          </UICore.Flex>
        </div>
      </NavLink>
    </div>
  );
}
