import { Icons, UICore } from "../../components";
import "styled-components/macro";
import { NavLink, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Templates from "./Templates";
import DashboardNotFound from "./NotFound";
import Inbox from "./Inbox";

export default function Dashboard() {
  return (
    <UICore.Flex>
      <UICore.Box
        mg="0px"
        bg="var(--neutral-100)"
        br="1px solid var(--neutral-400)"
        height="calc(100vh - calc(8px * 2))"
        width="220px"
        css={`
          position: fixed;
        `}
      >
        <UICore.Box mg="0px" mt="60px">
          <SideBarLink
            exact={true}
            icon={Icons.HomeIcon({ width: "20px", height: "20px" })}
            to="/dashboard"
            text="Home"
          />
          <SideBarLink
            icon={Icons.InboxIcon({ width: "20px", height: "20px" })}
            to="/dashboard/inbox"
            text="Response Inbox"
          />
          <SideBarLink
            icon={Icons.FolderIcon({ width: "20px", height: "20px" })}
            to="/dashboard/templates"
            text="Templates"
          />
          <SideBarLink
            icon={Icons.QuestionMarkCircleIcon({
              width: "20px",
              height: "20px",
            })}
            to="/dashboard/help"
            text="Help"
          />
        </UICore.Box>
      </UICore.Box>

      <div
        css={`
          margin-left: 220px;
          flex-grow: 12;
        `}
      >
        <Routes />
      </div>
    </UICore.Flex>
  );
}

function Routes() {
  return (
    <Switch>
      <Route exact path="/dashboard" component={Home} />
      <Route exact path="/dashboard/inbox" component={Inbox} />
      <Route exact path="/dashboard/inbox/:form_id/" component={Inbox} />
      <Route exact path="/dashboard/templates" component={Templates} />
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
