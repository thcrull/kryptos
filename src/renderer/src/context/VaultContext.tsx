import React, { createContext, useState, useContext, ReactNode } from "react";

interface VaultContextType {
  data: string[] | null;
  setData: (data: string[] | null) => void;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const VaultProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<string[] | null>(null);

  return (
    <VaultContext.Provider value={{ data, setData }}>
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
