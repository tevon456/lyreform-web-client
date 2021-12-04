import "./styles/app.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Content, UICore } from "./components";
import { ToastContainer } from "react-toastify";
import { SessionContext } from "./context/Session";
import ApplicationRoutes from "./route/ApplicationRoutes";
import { Lyreform } from "./utils";

export default function App() {
  const { hasValidSession, user, endSession } = useContext(SessionContext);
  const links = hasValidSession()
    ? [
        { type: "link", to: "/", text: "Home" },
        { type: "link", to: "/templates", text: "Templates" },
        { type: "link", to: "/inbox", text: "Inbox" },
        {
          type: "buttonSecondary",
          to: "/builder",
          text: (
            <>
              <span>New Form</span>
            </>
          ),
        },
        {
          type: "any",
          component: <UserAvatarMenu user={user} logout={endSession} />,
        },
      ]
    : [
        { type: "link", to: "/login", text: "Login" },
        { type: "buttonPrimary", to: "/signup", text: "Signup" },
      ];

  return (
    <Router>
      <Content.Navbar links={links} />
      <ApplicationRoutes />
      <ToastContainer hideProgressBar={true} />
    </Router>
  );
}

const UserAvatarMenu = ({ user, logout = () => {} }) => {
  window.lyre = new Lyreform();
  return (
    <UICore.Box mg="0px" pd="0px" style={{ display: "contents" }} width="100px">
      <Content.DropDown
        width="180px"
        items={[
          { type: "action", text: "Settings" },
          { type: "action", text: "Help" },
          { type: "line" },
          { type: "action", text: "Upgrade" },
          { type: "action", text: "Billing" },
          { type: "line" },
          {
            type: "action",
            text: "Logout",
            onClick: () => {
              logout();
            },
          },
        ]}
        x="-36px"
        y="12px"
      >
        <UICore.Flex align="center" justify="space-between">
          <Content.Avatar
            style={{ marginLeft: "12px" }}
            size="medium"
            name={user.name}
          />
          <UICore.Box pd="4px" />
          <UICore.Text mt="0px" mb="0px" weight="300">
            {user.name}
          </UICore.Text>
        </UICore.Flex>
      </Content.DropDown>
    </UICore.Box>
  );
};
