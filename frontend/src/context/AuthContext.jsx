import { useState, useCallback } from "react";
import { AuthContext } from "./AuthContextStore";

function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return JSON.parse(sessionStorage.getItem("user")) || null;
  });

  const [loading] = useState(false);

  const login = useCallback((data) => {
     if (!data?.token || !data?.user) {
        console.error("Invalid login response", data);
        return;
      }
    sessionStorage.setItem("token", data.token);
    const userData = {
      id: data.user.id,
      name: data.user.name ,
      email: data.user.email 
    };
    sessionStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
  }, []);

  const logout = useCallback(() => {

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
