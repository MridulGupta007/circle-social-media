import React, { useState, useContext } from "react";
import Logo from "../assets/circle-logo.png";
import { NavLink } from "react-router-dom";
import { WalletAddress } from "../App";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Header() {
  // const [connected, setConnected] = useState(false);
  const wallet = useContext(WalletAddress);
  // const [connectedWallet, setConnectedWallet] = useState(null);
  const [myAddress, setMyAddress] = useState(null)
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        wallet.setWalletAddress(accounts[0]);
        setMyAddress(accounts[0])
      } else {
        console.error("MetaMask not detected. Please install MetaMask.");
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error.message);
    }
  };

  const disconnectWallet = () => {
    wallet.setWalletAddress(null);
    setMyAddress(null)
    console.log("Disconnected from wallet");
  };
  return (
    <div className="h-[100vh] bg-black text-white w-[15%] flex flex-col py-4 gap-y-5">
      <h1 className="uppercase tracking-widest text-[30px] font-light px-2 flex items-center">
        <img src={Logo} className="w-16 mix-blend-normal" />
        onnect
      </h1>

      <ul className="flex flex-col">
        <li className="py-3 px-2 hover:bg-[#0F0F0F] cursor-pointer duration-300 ease-in-out">
          Write a Joke ?
        </li>
        <NavLink to="/">
          <li className="py-3 px-2 hover:bg-[#0F0F0F] cursor-pointer duration-300 ease-in-out">
            Feed
          </li>
        </NavLink>
        {wallet.walletAddress && (
          <NavLink to="profile" onClick={() => wallet.setWalletAddress(myAddress)}>
            <li className="py-3 px-2 hover:bg-[#0F0F0F] cursor-pointer duration-300 ease-in-out">
              Your Profile
            </li>
          </NavLink>
        )}
        {wallet.walletAddress && (
          <NavLink to="advertise">
            <li className="py-3 px-2 hover:bg-[#0F0F0F] cursor-pointer duration-300 ease-in-out">
              Post Advertisement
            </li>
          </NavLink>
        )}
      </ul>
      {myAddress ? (
        <button
          className="hover:bg-white hover:text-black duration-500 ease-in-out py-3 px-5 fixed bottom-5 left-10 rounded-md"
          onClick={() => disconnectWallet()}
        >
          {myAddress.slice(0, 5)} ....{" "}
          {myAddress.slice(
            myAddress.length - 5,
            myAddress.length
          )}
        </button>
      ) : (
        <button
          className="hover:bg-white hover:text-black duration-500 ease-in-out py-3 px-5 fixed bottom-5 left-10 rounded-md"
          onClick={() => connectWallet()}
        >
          Connect Wallet
        </button>
      )}
      {/* <ConnectButton /> */}
    </div>
  );
}

export default Header;
