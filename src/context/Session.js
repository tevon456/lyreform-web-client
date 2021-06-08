import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Auth, Api, Notification } from "../utils/";

const SessionContext = React.createContext();
function SessionProvider({ children }) {
  let access, user;

  if (Auth.isUserAuthenticated()) {
    access = jwt_decode(Auth.getToken().access);
    user = { name: access.name, email: access.email };
  } else {
    user = {
      name: "",
      email: "",
    };
  }
  const createSession = (tokens) => {
    Auth.authenticateUser(tokens);
    window.location.reload();
  };

  const calculateTimeToExpiration = () => {
    // Get token from local storage
    const tokens = Auth.getToken();

    // decode the token
    const decodedTokenExpiration = jwt_decode(tokens.access).exp;

    // The current time
    const currentTime = new Date(Date.now());

    // Convert token expiration time to milliseconds
    const tokenExpiration = new Date(decodedTokenExpiration * 1000);

    // Convert milliseconds to seconds
    const timeToExpiration = Math.floor(
      (tokenExpiration - currentTime) / 60000
    );
    console.log("session expires ", timeToExpiration, " minutes");

    return { time: timeToExpiration, tokens };
  };

  const endSession = () => {
    Api.logout(Auth.getToken().refresh)
      .then(() => {
        Auth.deauthenticateUser();
      })
      .catch((error) => {
        Notification.danger("Ending session");
        Auth.deauthenticateUser();
      });
  };

  const refreshSession = () => {
    const result = calculateTimeToExpiration();
    if (result.time <= 30) {
      Api.refreshToken(Auth.getToken().refresh)
        .then((res) => {
          Auth.storeToken(res.data.tokens);
        })
        .catch(() => {
          Auth.deauthenticateUser();
        });
    }
  };

  const hasValidSession = () => {
    return Auth.isUserAuthenticated();
  };

  useEffect(() => {
    setInterval(() => {
      if (hasValidSession()) {
        refreshSession();
      }
    }, 15 * 1000);
    // eslint-disable-next-line
  }, []);

  const state = {
    createSession,
    endSession,
    hasValidSession,
    user,
  };
  return (
    <SessionContext.Provider value={state}>{children}</SessionContext.Provider>
  );
}

export { SessionContext, SessionProvider };
