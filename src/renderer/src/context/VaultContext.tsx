import React, { createContext, useState, useContext, ReactNode } from "react";
import {VaultEntry} from "@shared/types";

interface VaultContextType {
  data: VaultEntry[] | null;
  setData: (data: VaultEntry[] | null) => void;
  password: string | null;
  setPassword: (password: string | null) => void;
  clearSession: () => void;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const VaultProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<VaultEntry[] | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const clearSession = () => {
    setData(null);
    setPassword(null);
  };

  return (
    <VaultContext.Provider
      value={{ data, setData, password, setPassword, clearSession }}
    >
      {children}
    </VaultContext.Provider>
  );
};

export const useVault = () => {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error("useVault must be used within a VaultProvider");
  }
  return context;
};
