import "./styles/app.css";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Content, ProtectedRoute, UICore } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionContext } from "./context/Session";
import Home from "./pages/home";
import NotFound from "./pages/not_found";
import Signup from "./pages/signup";
import VerifyAccount from "./pages/verify_account";
import ResendConfirmation from "./pages/resend_confirmation";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgot_password";
import NewPassword from "./pages/new_password";

export default function App() {
  const { hasValidSession, user, endSession } = useContext(SessionContext);
  const links = hasValidSession()
    ? [
        {
          type: "buttonPrimary",
          to: "/new-project",
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
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route path="/new-password/:token" component={NewPassword} />
        <Route path="/verify-account/:token" component={VerifyAccount} />

        {hasValidSession() ? (
          <Route exact path="/login" render={() => <Redirect to="/" />} />
        ) : (
          <Route exact path="/login" component={Login} />
        )}
        {hasValidSession() ? (
          <Route exact path="/signup" render={() => <Redirect to="/" />} />
        ) : (
          <Route exact path="/signup" component={Signup} />
        )}
        {hasValidSession() ? (
          <Route
            exact
            path="/resend-confirmation"
            render={() => <Redirect to="/" />}
          />
        ) : (
          <Route path="/resend-confirmation" component={ResendConfirmation} />
        )}
        <Route component={NotFound} />
      </Switch>
      <ToastContainer hideProgressBar={true} />
    </Router>
  );
}

const UserAvatarMenu = ({ user, logout = () => {} }) => {
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
            src="https://source.unsplash.com/qP9Cr4LifQ8/90x90"
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
