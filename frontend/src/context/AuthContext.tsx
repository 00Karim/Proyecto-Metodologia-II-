import React, { createContext, useState, useEffect } from "react";

interface AuthContextValue {
  user: any;
  setUser: (u: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({ user: null, setUser: () => {}, logout: () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null); // si importas user desde otro archivo podes acceder al token y a la informacion del usuario

  useEffect(() => {
    try {
      const raw = localStorage.getItem("userId");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      console.warn("No stored user");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
