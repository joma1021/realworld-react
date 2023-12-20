import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { getToken } from "./storage";
import { getCurrentUser } from "../../services/auth-service";
import { UserContext } from "../../models/user";

export type AuthContextType = {
  userContext: UserContext;
  updateUserContext?: Dispatch<SetStateAction<UserContext>>;
};

export const UserSessionContext = createContext<AuthContextType>({
  userContext: { username: "", image: "", isLoggedIn: false, authToken: "" },
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [userSession, setUserSession] = useState<UserContext>({
    username: "",
    image: "",
    isLoggedIn: false,
    authToken: "",
  });

  useEffect(() => {
    const token = getToken();
    if (token)
      getCurrentUser(token)
        .then((user) =>
          setUserSession({
            username: user.username,
            image: user.image,
            isLoggedIn: true,
            authToken: token,
          })
        )
        .then(() => console.log("Auth successful"));
  }, []);

  return (
    <UserSessionContext.Provider
      value={{ userContext: userSession, updateUserContext: setUserSession }}
    >
      {children}
    </UserSessionContext.Provider>
  );
}
