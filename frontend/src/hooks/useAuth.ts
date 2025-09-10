import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
};
export const useAuthSafe = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthSafe must be used inside AuthProvider");
  return ctx;
};