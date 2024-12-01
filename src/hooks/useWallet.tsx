import { useState, useEffect } from "react";
import { ethers } from "ethers";


const useWallet = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        setIsConnected(accounts.length > 0);

        if (accounts.length > 0) {
          const signer = await provider.getSigner();
          const address = await signer.getAddress();

          setWalletAddress(address);
        } else {
          setWalletAddress(null);
        }
      }
    };

    const handleAccountsChanged = (accounts: string[]) => {
      setIsConnected(accounts.length > 0);
      setWalletAddress(accounts.length > 0 ? accounts[0] : null);
    };

    checkConnection();

    if (window.ethereum && typeof window.ethereum.on === "function") {
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        if (typeof window.ethereum!.removeListener === "function") {
          window.ethereum!.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
  }, []);

  return { isConnected, walletAddress };
};

export default useWallet;
