import React, { useContext } from "react";
import { Api } from "../utils";
import { useAPI } from "../hooks";
import { SessionContext } from "./session.context";

const UserContext = React.createContext();
function UserProvider({ children }) {
  const {
    user: { uuid = "" },
  } = useContext(SessionContext);

  const {
    data: { data: user },
    loading,
    error,
    refetch,
  } = useAPI(() => Api.getUser(uuid), { name: "", email: "", uuid: "" });

  return (
    <UserContext.Provider value={{ user, loading, error, refetch }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
