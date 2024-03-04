import React from "react";
import Logo from "../assets/circle-logo.png";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

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
function AddTweets() {
  const [length, setLength] = useState(0);
  const [joke, setJoke] = useState("");
  //   const [jokes, setJokes] = useState([]);
  const [address, setAddress] = useState(
    "0xc707B5466Af7E156d97B3dF59FdbdC4C8F4744cC"
  );

  const [fetchedJoke, setFetchedJoke] = useState({});

  useEffect(() => {
    fetchSuggestion();
  }, []);

  const { setup, delivery } = fetchedJoke;

  function fetchSuggestion() {
    fetch("https://v2.jokeapi.dev/joke/Programming")
      .then((response) => response.json())
      .then((joke) => setFetchedJoke(joke))
      .catch((err) => console.log(err));
  }

  const tweet = async (str) => {
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
        //Send the joke as parameter
        let tweet = await connectedContract.tweet(str);
        await tweet.wait();
      }
    } catch (error) {
      console.log(error);
    }

    setJoke("");
  };

  //   const addJoke = () => {
  //     // add user address here
  //     setJokes((prev) => [...prev, { user: address, joke: joke }]);
  //   };
  return (
    <div className="border-b flex flex-wrap gap-3 py-10 justify-around">
      <div className="flex">
        <img src={Logo} alt="default-profile" className="w-16 self-start" />
        <div className="flex flex-col gap-y-1">
          <textarea
            className="shadow-lg rounded-lg relative px-5 py-3 resize-none focus:outline-none outline-none"
            cols={50}
            rows={5}
            maxLength={100}
            value={joke}
            placeholder="Let's have a laugh together?!"
            onChange={(event) => {
              setJoke(event.target.value);
              setLength(event.target.value.length);
            }}
          ></textarea>
          <div className="flex gap-x-3 self-end">
            <span className="relative self-end text-[10px] text-slate-500">
              {length}/100
            </span>
            <button
              className="bg-black self-end px-5 py-2 text-white rounded-md relative"
              onClick={() => {
                tweet(joke);
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div className=" px-3 shadow-lg rounded-lg bg-white">
        <h1 className="text-[25px] font-light">
          Having trouble thinking
          <br /> of something ?
        </h1>
        {setup == undefined || delivery == undefined ? (
          <textarea
            className="rounded-lg relative px-5 py-3 resize-none focus:outline-none outline-none"
            cols={50}
            rows={5}
            maxLength={0}
            placeholder={`Joke: \n${fetchedJoke.joke}`}
          ></textarea>
        ) : (
          <textarea
            className="rounded-lg relative px-5 py-3 resize-none focus:outline-none outline-none"
            cols={50}
            rows={5}
            maxLength={0}
            placeholder={`Question: \n${setup} \n Answer: \n${delivery}`}
          ></textarea>
        )}
        <button
          className="bg-[#C7C8CC] self-end px-3 py-2 text-white rounded-md relative right-0 bottom-2"
          onClick={() => {
            fetchSuggestion();
          }}
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

export default AddTweets;
