// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { config, chains } from "./wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { AppProvider } from "./AppContext";

// Import RainbowKit for wagmi v2
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme
} from '@rainbow-me/rainbowkit';

// Import RainbowKit styles
import '@rainbow-me/rainbowkit/styles.css';

// Material UI fonts import
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Create QueryClient
const queryClient = new QueryClient();

// Root element setup
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={{
            lightMode: lightTheme({
              accentColor: '#1a237e', // Match your primary color
              accentColorForeground: 'white',
              borderRadius: 'medium',
              fontStack: 'system'
            }),
            darkMode: darkTheme({
              accentColor: '#534bae', // Light primary
              accentColorForeground: 'white',
              borderRadius: 'medium',
              fontStack: 'system'
            })
          }}
        >
          <AppProvider>
            <App />
          </AppProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);