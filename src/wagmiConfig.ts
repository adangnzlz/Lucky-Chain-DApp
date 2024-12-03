import { http } from "viem";
import { sepolia } from "viem/chains";
import { createConfig } from "wagmi";
import { walletConnect } from "wagmi/connectors";

export const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID || "";
export const wagmiConfig = createConfig({
  chains: [sepolia],
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
    [sepolia.id]: http(),
  },
});
