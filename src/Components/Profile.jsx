const CONTRACT_ADDRESS = "0xa87479557C544648A39ce473666Cf38ae47DBfc0";
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
import { ethers } from "ethers";
import pfp from "../assets/bear.png";
import { useState, useEffect } from "react";
export default function Profile() {
  const [myTweets, setMyTweets] = useState([]);
  const [address, setAddress] = useState(
    "0xc707B5466Af7E156d97B3dF59FdbdC4C8F4744cC"
  );
  
  const [subscriberCount, setSubscriberCount] = useState(0)
  const [subscribedCount, setSubscribedCount] = useState(0)
  const [amountToClaim, setAmountToClaim] = useState(0)
//   const getAllUsers = async () => {
//     try {
//       let { ethereum } = window;
//       if (ethereum) {
//         let provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();
//         const connectedContract = new ethers.Contract(
//           CONTRACT_ADDRESS,
//           ABI,
//           signer
//         );
//         //Return all the users who have did at least 1 tweet
//         let getAllUsers = await connectedContract.getAllUsers();
//         console.log(getAllUsers);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const subscribe = async () => {
//     try {
//       let { ethereum } = window;
//       if (ethereum) {
//         let provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();
//         const connectedContract = new ethers.Contract(
//           CONTRACT_ADDRESS,
//           ABI,
//           signer
//         );
//         //Send the address that needs to be subscribed as parameter
//         let subscribe = await connectedContract.subscribe(accountAddress, {
//           value: ethers.utils.parseEther("0.001"),
//         });

//         await subscribe.wait();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

  const claimAmount = async () => {
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

        let claimAmount = await connectedContract.claimAmount();
        await claimAmount.wait();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTweets = async () => {
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
        setMyTweets(getTweets)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSubscribers = async () => {
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
        let getSubscribers = await connectedContract.getSubscribers(
          address
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSubscribedAccounts = async () => {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getClaimAmount = async () => {
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
        let getClaimAmount = await connectedContract.getClaimAmount(
          address
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTweets()
  }, [])

  return (
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
              {"0xc707B5466Af7E156d97B3dF59FdbdC4C8F4744cC".slice(0, 5)}....
              {"0xc707B5466Af7E156d97B3dF59FdbdC4C8F4744cC".slice(37, 42)}
            </span>
          </div>

          <div className="flex gap-x-4">
            <span className="text-[20px]">
              <span className="text-[#B4B4B8] px-2">{78}</span>subscribers{" "}
            </span>
            <span className="text-[20px]">
              <span className="text-[#B4B4B8] px-2">{78}</span>subscribed{" "}
            </span>
          </div>
        </div>
        <div className="flex flex-col w-2/4 gap-y-4">
          <h1 className="text-[25px] text-center font-light">Account Stats</h1>
          <span className="text-[17px] text-center">Claimable Amount: {amountToClaim}</span>
          <button className="bg-black text-white self-center px-5 py-3 rounded-lg">Claim Amount</button>
        </div>
      </div>

      {/* Render profile tweets */}
      <div className="flex flex-wrap gap-x-8">
      {myTweets.length > 0 ? (
            myTweets.map((elem, index) => {
                
                return(
                    <div className="flex py-10 justify-center gap-x-5" key={index}>
                    <img
                      src={pfp}
                      alt="profile-pic"
                      className="w-16 self-start rounded-full"
                    />
                    <div className="flex flex-col justify-center gap-y-1">
                      <div className="flex justify-between">
                        <span>
                          {"0xc707B5466Af7E156d97B3dF59FdbdC4C8F4744cC".slice(0, 5)}
                          ....
                          {"0xc707B5466Af7E156d97B3dF59FdbdC4C8F4744cC".slice(37, 42)}
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
                )
            })

          ) : (
            <div>You have not tweeted anything !!</div>
          )}
          </div>
    </div>
  );
}
