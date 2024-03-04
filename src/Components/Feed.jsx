import React from "react";
import { useState, useEffect, useContext } from "react";
import pfp from "../assets/bear.png";
import { ethers } from "ethers";
import AddTweets from "./AddTweets";
import { NavLink } from "react-router-dom";
import { WalletAddress } from "../App";
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
function Feed() {
	const [tweetsData, setTweetsData] = useState([]);
	const [users, setUsers] = useState([]);

	const [connectedWallet, setConnectedWallet] = useState("");

	const wallet = useContext(WalletAddress)
	// receiving list of users
	const getAllUsers = async () => {
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

				let userList = await connectedContract.getAllUsers();
				console.log("logging", userList);
				setUsers(userList);

				userList.map((elem) => {
					getTweets(elem);
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const subscribe = async (accountAddress) => {
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
				//Send the address that needs to be subscribed as parameter
				let subscribe = await connectedContract.subscribe(accountAddress);

				await subscribe.wait();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getTweets = async (accountAddress) => {
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
				let getTweets = await connectedContract.getTweets(accountAddress);
				console.log("tweets for account", getTweets);
				const tempData = { tweets: getTweets, address: accountAddress };
				setTweetsData((prevData) => [...prevData, tempData]);

				// console.log(data);
				// setMyTweets([getTweets, accountAddress]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllUsers();
	}, []);
	

	return (
		<>  {wallet.myAddress ? (<>
		<AddTweets />
			<div>
				<div className="flex flex-col mt-5">
					<span className="text-[25px] font-light underline underline-offset-4">
						Tweets
					</span>
					<div className="flex gap-x-10 flex-wrap">
						{tweetsData.length > 0 ? (
							tweetsData.map((elem, index) => {
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
												<NavLink to='profile' onClick={() => wallet.setWalletAddress(elem.address)}>
												<span>
													{elem.address.slice(0, 5)}
													....
													{elem.address.slice(37, 42)}
												</span>
												</NavLink>
												<button
													className="bg-gradient-to-br from-[#7f32ef] via-[#581abb] to-[#df3e8b] self-end px-3 py-2 text-white rounded-md"
													onClick={() => {
														subscribe(elem.address);
													}}
												>
													Subscribe
												</button>
											</div>
											<textarea
												className="border relative px-5 py-3 resize-none focus:outline-none outline-none"
												cols={50}
												rows={5}
												placeholder={elem.tweets}
												name="tweets"
												disabled
											>
												
											</textarea>
										</div>
									</div>
								);
							})
						) : (
							<div>You have not tweeted anything !!</div>
						)}
					</div>
				</div>
				<div>
					{/* Adverts */}
				</div>
			</div></>) : (<>
			
			<div className="flex justify-center items-center h-[100vh]">
				<span className="text-[25px]">Connect Wallet to start</span>
			</div>
			</>)}
			
		</>
	);
}

export default Feed;
