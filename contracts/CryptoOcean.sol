// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CryptoInvest{
    struct Child{
        string name;
        address addr;
        uint256 idNumber;
        uint256 balance;
        uint256 withdrawDate;
    }
    struct Investor{

        string fullName;

        address addr;

        uint256 idNumber;

        address[] childrenList;

    }

    mapping(address=>Child) public children;
    mapping(address=> Investor) public investors;
    function addChild(address addr,string memory name,uint balance,uint idNumber,uint256 withdrawDate) public{
        Child storage _child = children[addr];

        require(_child.addr == address(0),"Address is already added!");

        _child.balance=balance;
        _child.name=name;
        _child.addr=addr;
        _child.idNumber = idNumber;
        _child.withdrawDate = withdrawDate;
    
    } 
    
    function send(address childAddress) payable external {
        Child storage child = children [childAddress];
        require(child.addr !=address(0), "The child is not registered");
        child.balance += msg.value;


    } 

    function withdrawchild(uint amount) public {
        Child storage child = children [msg.sender];
        require(msg.sender == child.addr, "Only owner can withdraw funds"); 
        require(amount <= child.balance, "Insufficient funds");

        child.balance -= amount;
        payable (msg.sender).transfer(amount);
    }
    function withdrawinvestor(uint amount,address payable childAddress) public {
        Child storage child = children [childAddress];
        Investor storage parent = investors [msg.sender];
        require(msg.sender==parent.addr,"Only parents can withdraw funds");
        bool ischild;
        for(uint i=0;i<parent.childrenList.length;i++){
            if(parent.childrenList[i]==child.addr){
                ischild=true;
            }
        }
        require(ischild,""); 
        require(amount <= child.balance, "Insufficient funds");

        child.balance -= amount;
        childAddress.transfer(amount);
    }
}