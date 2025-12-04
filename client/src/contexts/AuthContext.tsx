import React, { createContext, useContext, useState } from "react";

interface Usuario {
  id: number;
  email: string;
  nome: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const stored = localStorage.getItem("usuario");
    return stored ? JSON.parse(stored) : null;
  });

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  const value = {
    usuario,
    setUsuario: (user: Usuario | null) => {
      setUsuario(user);
      if (user) {
        localStorage.setItem("usuario", JSON.stringify(user));
      } else {
        localStorage.removeItem("usuario");
      }
    },
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
