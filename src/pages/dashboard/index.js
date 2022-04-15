import "styled-components/macro";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Templates from "./Templates";
import DashboardNotFound from "./NotFound";
import Inbox from "./Inbox";
import Account from "./Account";
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
      <Route exact path={paths.ACCOUNT} component={Account} />
      <Route component={DashboardNotFound} />
    </Switch>
  );
}
