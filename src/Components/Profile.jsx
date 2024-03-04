const CONTRACT_ADDRESS = "0x6d964471cf04446FF3C90E2994187139F49101ac";
const ABI = [
  {
    inputs: [],
    name: "claimAmount",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_tweet",
        type: "string",
      },
    ],
    name: "tweet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllUsers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "getClaimAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "getSubscribedAccounts",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "getSubscribers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "getTweets",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const tokenAddress = "0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97";
const contractABI = [
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
];
import { ethers } from "ethers";
import pfp from "../assets/bear.png";
import { useState, useEffect, useContext } from "react";
import { WalletAddress } from "../App";

export default function Profile() {
  const [myTweets, setMyTweets] = useState([]);
  const [subscribers, setSubscribers] = useState(0);
  const [subscribed, setSubscribed] = useState(0);

  const [amountToClaim, setAmountToClaim] = useState(0);
  const [connectedWallet, setConnectedWallet] = useState("");

  const [loading, setLoading] = useState(false);

  const wallet = useContext(WalletAddress);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setConnectedWallet(accounts[0]);
        console.log(wallet.walletAddress);

        getTweets(wallet.walletAddress);
        getSubscribers(wallet.walletAddress);
        getSubscribedAccounts(wallet.walletAddress);
        getClaimAmount(wallet.walletAddress);
      } else {
        console.error("MetaMask not detected. Please install MetaMask.");
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error.message);
    }
  };

  const claimAmount = async () => {
    try {
      // Loading Starts
      setLoading(true);
      let { ethereum } = window;
      if (ethereum) {
        let provider = new ethers.providers.Web3Provider(ethereum);
        const privateKey = "42e60701de70d38719553dbf89a6c22f03dbf94da656abd42bcec85c9d7f5764"; // Store your wallet address's private key in env file and use it here
        const signer = new ethers.Wallet(privateKey).connect(provider);
        console.log("Transaction Begin");
        const contract = new ethers.Contract(tokenAddress, contractABI, signer);

        const amount = ethers.utils.parseUnits(amountToClaim, 6);
        console.log(amount);

        const data = contract.interface.encodeFunctionData("transfer", [
          connectedWallet,
          amount,
        ]);

        const limit = await provider.estimateGas({
          from: "0xc707B5466Af7E156d97B3dF59FdbdC4C8F4744cC",
          to: contract.address,
          value: ethers.utils.parseUnits("0.000", "ether"),
          data: data,
        });

        console.log("The gas limit is " + limit);

        const tx = await signer.sendTransaction({
          to: contract.address,
          value: ethers.utils.parseUnits("0.000", "ether"),
          data: data,
        });

        console.log("Mining transaction...");

        const receipt = await tx.wait();

        console.log(receipt);
        const signer1 = provider.getSigner();

        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ABI,
          signer1
        );

        let claimAmount = await connectedContract.claimAmount();
        await claimAmount.wait();

        //Loader ends
        setLoading(false);

        setAmountToClaim(0);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  async function postAd() {
    try {
      let { ethereum } = window;
      if (ethereum) {
        let provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        console.log("Transaction Begin");
        const contract = new ethers.Contract(tokenAddress, contractABI, signer);

        const amount = ethers.utils.parseUnits("2", 6);
        console.log(amount);

        const data = contract.interface.encodeFunctionData("transfer", [
          "0xc707B5466Af7E156d97B3dF59FdbdC4C8F4744cC",
          amount,
        ]);

        const limit = await provider.estimateGas({
          from: connectedWallet,
          to: contract.address,
          value: ethers.utils.parseUnits("0.000", "ether"),
          data: data,
        });

        console.log("The gas limit is " + limit);

        const tx = await signer.sendTransaction({
          to: contract.address,
          value: ethers.utils.parseUnits("0.000", "ether"),
          data: data,
        });

        console.log("Mining transaction...");

        const receipt = await tx.wait();

        console.log(receipt);

		wallet.setAd(true)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getTweets = async (address) => {
    try {
      let { ethereum } = window;
      if (ethereum) {
        let provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ABI,
          signer
        );
        //Send the account address of the person for whom you need the tweets

        let getTweets = await connectedContract.getTweets(address);
        setMyTweets(getTweets);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSubscribers = async (address) => {
    try {
      let { ethereum } = window;
      if (ethereum) {
        let provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ABI,
          signer
        );
        //Send the account address of the person for whom you need the subscribers. It will return the wallet addresses of all the subscribers of that person
        let getSubscribers = await connectedContract.getSubscribers(address);
        setSubscribers(getSubscribers.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSubscribedAccounts = async (address) => {
    try {
      let { ethereum } = window;
      if (ethereum) {
        let provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ABI,
          signer
        );
        //Send the account address of the person for whom you want to see the addresses of the people to whom he/she has subscribed
        let getSubscribedAccounts =
          await connectedContract.getSubscribedAccounts(address);
        setSubscribed(getSubscribedAccounts.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getClaimAmount = async (address) => {
    try {
      let { ethereum } = window;
      if (ethereum) {
        let provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ABI,
          signer
        );

        //Get the amount he/she can claim
        let getClaimAmount = await connectedContract.getClaimAmount(address);
        const ethValue = ethers.utils.formatEther(getClaimAmount);
        setAmountToClaim(ethValue);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <>
      {wallet.walletAddress ? (
        <div className="pt-3">
          <div className=" w-full shadow-lg px-5 py-3 flex justify-between gap-y-4 rounded-xl">
            <div className="border-r flex flex-col w-2/4">
              <div className="flex items-center gap-x-5">
                <img
                  src={pfp}
                  alt="profile-pic"
                  className="aspect-square rounded-full w-24"
                />
                <span className="text-[25px]">
                  {wallet.walletAddress.slice(0, 5)}....
                  {wallet.walletAddress.slice(37, 42)}
                </span>
              </div>

              <div className="flex gap-x-4">
                <span className="text-[20px]">
                  <span className="text-[#B4B4B8] px-2">{subscribers}</span>
                  subscribers{" "}
                </span>
                <span className="text-[20px]">
                  <span className="text-[#B4B4B8] px-2">{subscribed}</span>
                  subscribed{" "}
                </span>
              </div>
            </div>
            {wallet.myAddress === wallet.walletAddress && (
              <div className="flex flex-col w-2/4 gap-y-4">
                <h1 className="text-[25px] text-center font-light">
                  Account Stats
                </h1>
                <span className="text-[17px] text-center">
                  Claimable Amount: {amountToClaim}
                </span>
                <button
                  className="bg-black text-white self-center px-5 py-3 rounded-lg"
                  onClick={claimAmount}
                >
                  Claim Amount
                </button>
				<div className="flex justify-center">
					<input type="file" name="advertisement" accept="image/png, image/jpeg, image/jpg, image/gif" />
				<button
                  className="bg-black text-white self-center px-5 py-3 rounded-lg"
                  onClick={postAd}
                >
                  Post Ad
                </button>
				</div>
                
              </div>
            )}
          </div>

          {/* Render profile tweets */}
          <div className="flex flex-wrap gap-x-8">
            {myTweets.length > 0 ? (
              myTweets.map((elem, index) => {
                return (
                  <div
                    className="flex py-10 justify-center gap-x-5"
                    key={index}
                  >
                    <img
                      src={pfp}
                      alt="profile-pic"
                      className="w-16 self-start rounded-full"
                    />
                    <div className="flex flex-col justify-center gap-y-1">
                      <div className="flex justify-between">
                        <span>
                          {wallet.walletAddress.slice(0, 5)}
                          ....
                          {wallet.walletAddress.slice(37, 42)}
                        </span>
                      </div>
                      <textarea
                        className="border relative px-5 py-3 resize-none focus:outline-none outline-none"
                        cols={50}
                        rows={5}
                        placeholder={elem}
                        name="tweets"
                        maxLength={0}
                        disabled
                      ></textarea>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>You have not tweeted anything !!</div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[100vh] text-[30px]">
          Connect Wallet to start
        </div>
      )}
    </>
  );
}
