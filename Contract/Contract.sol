//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract Twitter {
    struct User{
        address[] subscribed;
        string name;
        string bio;
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
        payable(msg.sender).transfer(users[msg.sender].claimableAmount);
        users[msg.sender].claimableAmount=0;

    }

    function subscribe(address _user) public payable{
        require(msg.value == 0.001 ether, "Incorrect payment amount");
        users[_user].subscribers.push(msg.sender);
        users[msg.sender].subscribed.push(_user);
        users[_user].claimableAmount = users[_user].claimableAmount + 800000000000000;
    }

    function setName(string memory _name) public{
        users[msg.sender].name = _name;
    }

    function setBio(string memory _bio) public{
        users[msg.sender].bio = _bio;
    }

    function getAllUsers() public view returns(address[] memory){
        return allUsers;
    }

    function getSubscribedAccounts() public view returns(address[] memory){
        return users[msg.sender].subscribed;
    }

    function getSubscribers() public view returns(address[] memory){
        return users[msg.sender].subscribers;
    }

    function getName() public view returns(string memory){
        return users[msg.sender].name;
    }

    function getBio() public view returns(string memory){
        return users[msg.sender].bio;
    }

    function getTweets() public view returns(string[] memory){
        return users[msg.sender].tweets;
    }

    function getClaimAmount() public view returns(uint256){
        return users[msg.sender].claimableAmount;
    }
}