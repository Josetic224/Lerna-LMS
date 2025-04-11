import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, baseSepolia } from 'wagmi/chains';
import { http } from 'viem';
import { createConfig } from 'wagmi';
import { defineChain } from 'viem';
import educhainIcon from "../src/assets/images/download.png"

// Define the EDUChain
const educhain = defineChain({
  id: 656476, // Replace with actual chain ID for EDUChain
  name: 'EDU Chain Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'EDUChain Token',
    symbol: 'EDU', // Replace with actual token symbol
  },
  rpcUrls: {
    default: { 
      http: ['https://rpc.open-campus-codex.gelato.digital'], // Replace with actual RPC URL
    },
    public: {
      http: ['https://rpc.open-campus-codex.gelato.digital'], // Replace with actual RPC URL
    },
  },
  blockExplorers: {
    default: { 
      name: 'EDUChain Explorer', 
      url: 'https://edu-chain-testnet.blockscout.com/' // Actual explorer URL from your link
    },
  },
  iconUrl:educhainIcon,
  testnet: false, // Set to false if it's a mainnet
});

// Use RainbowKit's getDefaultConfig which handles most of the setup for wagmi v2
export const config = getDefaultConfig({
  appName: 'Lerna LMS',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'your_project_id',
  chains: [mainnet, sepolia, baseSepolia, educhain],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
    [educhain.id]: http(),
  },
});

// Export chains for RainbowKit
export const chains = config.chains;