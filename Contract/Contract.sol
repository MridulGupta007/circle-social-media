//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract Connect {
    struct User{
        address[] subscribed;
        string[] tweets;
        uint claimableAmount;
        bool oldUser;
        address[] subscribers;
    }

    mapping(address => User) users;

    address[] allUsers;

    function tweet(string memory _tweet) public{
        users[msg.sender].tweets.push(_tweet);
        if(users[msg.sender].oldUser == false)
        {
            users[msg.sender].oldUser = true;
            allUsers.push(msg.sender);
        }
    }

    function claimAmount() public payable{
        users[msg.sender].claimableAmount=0;

    }

    function subscribe(address _user) public payable{
        users[_user].subscribers.push(msg.sender);
        users[msg.sender].subscribed.push(_user);
        users[_user].claimableAmount = users[_user].claimableAmount + 800000000000000000;
    }

    function getAllUsers() public view returns(address[] memory){
        return allUsers;
    }

    function getSubscribedAccounts(address accountAddress) public view returns(address[] memory){
        return users[accountAddress].subscribed;
    }

    function getSubscribers(address accountAddress) public view returns(address[] memory){
        return users[accountAddress].subscribers;
    }


    function getTweets(address accountAddress) public view returns(string[] memory){
        return users[accountAddress].tweets;
    }

    function getClaimAmount(address accountAddress) public view returns(uint256){
        return users[accountAddress].claimableAmount;
    }
}