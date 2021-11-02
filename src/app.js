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
        {
          type: "buttonPrimary",
          to: "/builder",
          text: (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                width="24px"
                height="24px"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>{" "}
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
