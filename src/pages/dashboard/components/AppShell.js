import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { breakpoints, paths } from "../../../utils";
import "styled-components/macro";
import { useContext } from "react";
import { SessionContext } from "../../../context";
import { UICore, Icons, Content } from "../../../components";
import { useNavbar } from "../../../hooks";
import Logo from "../../../resources/icons/logo";

export default function AppShell({ children }) {
  useNavbar(false);
  return (
    <main
      css={`
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <NavigationPanel />
      <section
        css={`
          flex-grow: 1;
          height: 100vh;
          max-height: 100vh;
          overflow-y: hidden;
          overflow-x: hidden;
        `}
      >
        {children}
      </section>
      <BottomBar />
    </main>
  );
}

function NavigationPanel() {
  const history = useHistory();
  const { user } = useContext(SessionContext);
  return (
    <nav
      css={`
        height: 100vh;
        display: flex;
        flex-direction: column;
        width: 240px;
        color: var(--neutral-100);
        background: #212121;

        @media screen and (max-width: ${breakpoints.phablet}) {
          width: 100px;
        }
        @media screen and (max-width: ${breakpoints.mobile}) {
          display: none;
        }
      `}
    >
      <div
        css={`
          padding: 24px;
        `}
      >
        <UICore.Flex justify="center" align="center">
          <Logo colorA="#fff" width="40px" height="40px" colorB="#eee" />
        </UICore.Flex>
      </div>
      <div
        css={`
          flex-grow: 1;
          padding: 8px;
        `}
      >
        <NavList />
      </div>
      <div
        css={`
          height: 40px;
          padding: 20px 8px;
        `}
      >
        <UICore.Button
          fullWidth
          color="var(text-dark)"
          bg="var(--neutral-100)"
          onClick={() => history.push(paths.ACCOUNT)}
        >
          <Content.Avatar
            name={user.name}
            size="small"
            className="margin-top--none margin-bottom--none"
          />
          <UICore.Space amount={2} />
          <span
            css={`
              text-align: left;
              width: 150px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
          >
            {user.name}
          </span>
        </UICore.Button>
      </div>
    </nav>
  );
}

function NavigationItem({ href, name, icon, ...rest }) {
  return (
    <NavLink
      to={href}
      activeClassName="nav-active"
      css={`
        color: var(--neutral-100);
        display: block;
        padding: 6px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 4px;
        text-decoration: none;
        margin-bottom: 12px;

        &:hover {
          color: var(--neutral-500);
          background: var(--neutral-100);
        }

        @media screen and (max-width: ${breakpoints.phablet}) {
          .nav-list-text {
            display: none;
          }
        }

        @media screen and (max-width: ${breakpoints.mobile}) {
          display: flex;
          flex-direction: row;
          margin-bottom: 6px;
          border-radius: 0px;
          padding: 12px 16px;
          color: var(--neutral-500);
        }
      `}
      {...rest}
    >
      <div
        css={`
          display: flex;
          align-items: center;
          @media screen and (max-width: ${breakpoints.phablet}) {
            justify-content: center;
          }
        `}
      >
        <div
          css={`
            margin-right: 10px;
            @media screen and (max-width: ${breakpoints.phablet}) {
              margin-right: 0px;
            }
          `}
        >
          {icon}
        </div>
        <div className="nav-list-text margin-top--none margin-bottom--none">
          {name}
        </div>
      </div>
    </NavLink>
  );
}

function NavList() {
  return (
    <>
      <NavigationItem
        exact
        href={paths.DASHBOARD}
        name="Home"
        icon={<Icons.Home width="24px" height="24px" />}
      />
      <NavigationItem
        href={paths.INBOX}
        name="Inbox"
        icon={<Icons.Inbox width="24px" height="24px" />}
      />
      <NavigationItem
        href={paths.TEMPLATES}
        name="Templates"
        icon={<Icons.Folder width="24px" height="24px" />}
      />
    </>
  );
}

function BottomBar() {
  return (
    <nav
      css={`
        position: fixed;
        bottom: 0;
        z-index: 4;
        width: 100vw;
        height: max-content;
        padding-bottom: 12px;
        display: none;
        justify-content: space-evenly;
        background: var(--neutral-100);
        border-top: 1px solid var(--neutral-400);
        @media screen and (max-width: ${breakpoints.mobile}) {
          display: flex;
        }
      `}
    >
      <NavList />
      <NavigationItem
        href={paths.ACCOUNT}
        name="Users"
        icon={<Icons.User width="24px" height="height" />}
      />
    </nav>
  );
}
