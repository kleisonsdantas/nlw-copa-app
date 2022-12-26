import { ReactNode } from "react";
import { AuthContextProvider } from "../contexts/AuthContext";

interface AppProvider {
  children: ReactNode;
}
export function AppProvider({ children }) {
  return (
    <AuthContextProvider>
      { children }
    </AuthContextProvider>
  )
}