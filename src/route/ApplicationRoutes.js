import React from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/dashboard";
import NotFound from "../pages/not_found";
import Signup from "../pages/signup";
import VerifyAccount from "../pages/verify_account";
import ResendConfirmation from "../pages/resend_confirmation";
import Login from "../pages/login";
import ForgotPassword from "../pages/forgot_password";
import NewPassword from "../pages/new_password";
import Form from "../pages/form";
import { Builder } from "../pages/form_builder/Builder";
import { SessionRoute } from ".";

export default function ApplicationRoutes() {
  return (
    <Switch>
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute exact path="/builder" component={Builder} />
      <ProtectedRoute path="/form/:id" component={Form} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route path="/new-password/:token" component={NewPassword} />
      <Route path="/verify-account/:token" component={VerifyAccount} />
      <SessionRoute exact path="/" redirectTo="/dashboard" component={Login} />
      <SessionRoute exact path="/login" redirectTo="/" component={Login} />
      <SessionRoute exact path="/signup" redirectTo="/" component={Signup} />
      <SessionRoute
        exact
        path="/resend-confirmation"
        redirectTo="/"
        component={ResendConfirmation}
      />
      <Route component={NotFound} />
    </Switch>
  );
}
