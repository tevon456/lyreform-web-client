import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/home";
import NotFound from "../pages/not_found";
import Signup from "../pages/signup";
import VerifyAccount from "../pages/verify_account";
import ResendConfirmation from "../pages/resend_confirmation";
import Login from "../pages/login";
import ForgotPassword from "../pages/forgot_password";
import NewPassword from "../pages/new_password";
import { SessionContext } from "../context/Session";
import { Builder } from "../pages/form_builder";

export default function ApplicationRoutes() {
  const { hasValidSession } = useContext(SessionContext);
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/builder" component={Builder} />
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
  );
}
