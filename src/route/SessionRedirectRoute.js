import { Redirect, Route } from "react-router-dom";
import React, { useContext } from "react";
import { SessionContext } from "../context/Session";

/**
 * Redirects to login if user is unauthenticated
 * @prop Same as React Router Route.
 */
export default function SessionRoute({
  component: Page,
  path,
  redirectTo,
  ...rest
}) {
  const { hasValidSession } = useContext(SessionContext);
  return (
    <Route
      exact
      path={path}
      {...rest}
      render={(props) => {
        return hasValidSession() ? (
          <Redirect to={redirectTo} />
        ) : (
          <Page {...props} />
        );
      }}
    />
  );
}
