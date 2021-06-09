import { Redirect, Route } from "react-router-dom";
import React, { useContext } from "react";
import { SessionContext } from "../context/Session";

/**
 * Redirects to login if user is unauthenticated
 * @prop Same as React Router Route.
 */
const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
  const { hasValidSession } = useContext(SessionContext);
  return (
    <Route
      exact
      path={path}
      {...rest}
      render={(props) => {
        return hasValidSession() ? (
          <Comp {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default ProtectedRoute;
