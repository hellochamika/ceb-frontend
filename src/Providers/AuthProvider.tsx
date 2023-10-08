import React, { ReactNode, createContext, useState } from "react";

interface user {
  id: number;
  firstName: string;
  lastName: string;
}

interface AuthContextProps {
  token: string;
  setToken: (data: string) => void;
  email: string;
  setEmail: (data: string) => void;
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

  const [email, setEmail] = useState<string>("");

  return (
    <AuthContext.Provider value={{ token, setToken, email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);

export default AuthProvider;
