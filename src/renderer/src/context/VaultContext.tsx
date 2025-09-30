import React, { createContext, useState, useContext, ReactNode } from "react";

export interface VaultEntry {
  user: string;
  password: string;
}

interface VaultContextType {
  data: VaultEntry[] | null;
  setData: (data: VaultEntry[] | null) => void;
  password: string | null;
  setPassword: (password: string | null) => void;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const VaultProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<VaultEntry[] | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  return (
    <VaultContext.Provider value={{ data, setData, password, setPassword }}>
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
