import React, { useState } from "react";
import Header from "./Components/Header";
import { createContext } from "react";
import { Outlet } from "react-router-dom";

const WalletAddress = createContext()
function App() {
  const [walletAddress, setWalletAddress] = useState(null)
  return (
    <WalletAddress.Provider value={{walletAddress, setWalletAddress}}>
    <div className="flex bg-[#F6F5F5]">
      <Header />
      <div className="overflow-y-auto overflow-x-hidden overscroll-y-contain w-[85%] h-[100vh] px-10">
        <Outlet />
      </div>
    </div>
    </WalletAddress.Provider>
  );
}

export default App;

export {WalletAddress}
