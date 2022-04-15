import { SessionProvider, SessionContext } from "./session.context";
import { UserProvider, UserContext } from "./user.context";

const AppProvider = ({ children }) => {
  return (
    <SessionProvider>
      <UserProvider>{children}</UserProvider>
    </SessionProvider>
  );
};

export { SessionContext, UserContext, AppProvider };
