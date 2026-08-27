import { createContext, useContext, useEffect, useState } from "react";
import { nameFromEmail } from "../utils/name";

const AuthContext = createContext(null);
const STORAGE_KEY = "logitech-clone:auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // localStorage unavailable — session just won't persist across reloads
    }
  }, [user]);

  function login(email) {
    setUser({ email, name: nameFromEmail(email) });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
