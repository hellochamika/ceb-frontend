import React, { ReactNode, createContext, useState } from "react";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  isApproved: boolean;
  isAdmin: boolean;
  email: string;
}

interface AuthContextProps {
  token: string;
  setToken: (data: string) => void;
  user: User;
  setUser: (data: User) => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

function AuthProvider({ children }: { children: ReactNode }) {
  const [token, _setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const setToken = (data: string) => {
    localStorage.setItem("token", data);
    _setToken(data);
  };

  const [user, setUser] = useState<User>({} as User);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);

export default AuthProvider;
