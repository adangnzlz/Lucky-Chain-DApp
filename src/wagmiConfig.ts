import { http } from "viem";
import { sepolia } from "viem/chains";
import { createConfig } from "wagmi";
import { walletConnect } from "wagmi/connectors";

// Define tu red local
const hardhat = {
  id: 1337, // ID típica para redes locales (puedes verificar esto en tu configuración de Hardhat)
  name: "Hardhat",
  network: "localhost",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["http://localhost:8545"] },
  },
};

export const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID || "";
export const wagmiConfig = createConfig({
  chains: [hardhat, sepolia],
  connectors: [
    walletConnect({
      projectId,
      qrModalOptions: {
        themeMode: "dark",
        themeVariables: {
          "--wcm-z-index": "9999999",
        },
      },
    }),
  ],
  transports: {
    [hardhat.id]: http("http://localhost:8545"),
    [sepolia.id]: http(),
  },
});
