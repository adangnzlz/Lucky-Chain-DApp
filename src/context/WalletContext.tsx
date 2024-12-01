import React, { createContext, useContext, ReactNode } from "react";
import useWallet from "../hooks/useWallet";

// Define el tipo para el contexto
interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Define el proveedor
interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const wallet = useWallet();

  return (
    <WalletContext.Provider value={wallet}>
      {children}
    </WalletContext.Provider>
  );
};

// Hook para consumir el contexto
export const useWalletContext = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext debe usarse dentro de un WalletProvider");
  }
  return context;
};
