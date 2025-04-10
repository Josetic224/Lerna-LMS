// wagmiConfig.js
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, } from 'wagmi/chains';
import { http } from 'viem';
import { createConfig } from 'wagmi';

// Use RainbowKit's getDefaultConfig which handles most of the setup for wagmi v2
export const config = getDefaultConfig({
  appName: 'Lerna LMS',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'your_project_id',
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

// Export chains for RainbowKit
export const chains = config.chains;