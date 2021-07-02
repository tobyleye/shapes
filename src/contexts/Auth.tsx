import { createContext, useState, useContext, useCallback } from "react";

const AuthContext = createContext<null | { isAuthenticated: boolean, loginSuccess: () => void, logout: () => void }>(null);

export function AuthProvider(props: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginSuccess = useCallback(() => {
    setIsAuthenticated(true)
  }, [setIsAuthenticated])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
  }, [setIsAuthenticated])

  const value = {
    isAuthenticated,
    loginSuccess,
    logout
  };

  return <AuthContext.Provider value={value} {...props} />;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error();
  }
  return value;
}
