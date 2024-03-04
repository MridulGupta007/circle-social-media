import React, { useState } from "react";
import Header from "./Components/Header";
import { createContext } from "react";
import { Outlet } from "react-router-dom";

import { alchemyProvider } from "wagmi/providers/alchemy";

import {
	getDefaultWallets,
	RainbowKitProvider,
	darkTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai, sepolia, modeTestnet, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
	[polygonMumbai],
	[
		alchemyProvider({ apiKey: "nGNX2rQ-BAd_erhkV5BCRFI_0FHnl1a3" }),
		publicProvider(),
	]
);

const { connectors } = getDefaultWallets({
	appName: "Connect",
	projectId: "b20ec248fdbe746a0f8306abfacf7468",
	chains,
});

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
});

const WalletAddress = createContext();
function App() {
	const [walletAddress, setWalletAddress] = useState(null);
	const [myAddress, setMyAddress] = useState(null)
	return (
		<WalletAddress.Provider value={{ walletAddress, setWalletAddress, myAddress, setMyAddress }}>
			<WagmiConfig config={wagmiConfig}>
				<RainbowKitProvider
					chains={chains}
					theme={darkTheme({
						accentColor: "#353535",
						accentColorForeground: "#FFF",
						borderRadius: "medium",
						fontStack: "system",
						overlayBlur: "small",
					})}
				>
					<div className="flex bg-[#F6F5F5]">
						<Header />
						<div className="overflow-y-auto overflow-x-hidden overscroll-y-contain w-[85%] h-[100vh] px-10">
							<Outlet />
						</div>
					</div>
				</RainbowKitProvider>
			</WagmiConfig>
		</WalletAddress.Provider>
	);
}

export default App;

export { WalletAddress };
