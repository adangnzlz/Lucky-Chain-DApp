import { useState, useEffect } from "react";
import { Eip1193Provider, ethers } from "ethers";

interface ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}

interface ProviderDetail {
  info: ProviderInfo;
  provider: ExtendedEip1193Provider;
  browserProvider: ethers.BrowserProvider;
}


const UseWallet = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [providers, setProviders] = useState<{ [x: string]: ProviderDetail }>({});

  useEffect(() => {
    const detectedProviders: { [x: string]: ProviderDetail } = {};

    const checkConnection = async () => {
      if (window.ethereum) {
        const ethereum = (window.ethereum as unknown) as Eip1193Provider;
        const provider = new ethers.BrowserProvider(ethereum);
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
    checkConnection();

    const handleAccountsChanged = (accounts: string[]) => {
      setIsConnected(accounts.length > 0);
      setWalletAddress(accounts.length > 0 ? accounts[0] : null);
    };

    const handleProviderAnnouncement = (event: CustomEvent) => {
      const info = event.detail.info as ProviderInfo;
      const provider: ExtendedEip1193Provider = event.detail.provider;
      const browserProvider = new ethers.BrowserProvider(event.detail.provider);
      provider.on("accountsChanged", handleAccountsChanged);
      detectedProviders[info.name] = { info, provider, browserProvider }
      setProviders(detectedProviders);
      console.log(`Provider announced: ${info.name}`);
    };

    const requestProviders = () => window.dispatchEvent(new Event("eip6963:requestProvider"));



    const init = async () => {
      // Detect providers using EIP-6963
      window.addEventListener("eip6963:announceProvider", handleProviderAnnouncement as EventListener);

      // Request providers to announce themselves
      requestProviders();

    };

    init();

    return () => {
      // Cleanup listeners
      window.removeEventListener("eip6963:announceProvider", handleProviderAnnouncement as EventListener);
      Object.values(detectedProviders).forEach(element => {
        element.provider.removeListener("accountsChanged", handleAccountsChanged);
      });
    };
  }, []);

  const connectWallet = async (providerName: string) => {
    const selectedProvider = providers[providerName];
    if (!selectedProvider) {
      console.error(`Provider ${providerName} not found`);
      return;
    }

    const accounts = await selectedProvider.browserProvider.send("eth_requestAccounts", []);
    setIsConnected(accounts.length > 0);

    if (accounts.length > 0) {
      const signer = await selectedProvider.browserProvider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
    }
  };

  return { isConnected, walletAddress, providers, connectWallet };
};

export default UseWallet;
