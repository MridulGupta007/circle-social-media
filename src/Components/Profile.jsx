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

export default function Profile() {
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
				//Return all the users who have did at least 1 tweet
				let getAllUsers = await connectedContract.getAllUsers();
				console.log(getAllUsers);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const subscribe = async () => {
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
				let subscribe = await connectedContract.subscribe(accountAddress, {
					value: ethers.utils.parseEther("0.001"),
				});

				await subscribe.wait();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const tweet = async () => {
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
				let tweet = await connectedContract.tweet(jokeText);
				await tweet.wait();
			}
		} catch (error) {
			console.log(error);
		}
	};

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
				let getTweets = await connectedContract.getTweets(accountAddress);
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
					accountAddress
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
					await connectedContract.getSubscribedAccounts(accountAddress);
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
					accountAddress
				);
			}
		} catch (error) {
			console.log(error);
		}
	};
}
