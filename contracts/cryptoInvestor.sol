pragma solidity ^0.8.9;

contract CryptoInvestor{
    //address public owner;

    constructor(){
    }
    struct Parent{
        string first_name;
        string last_name;
        address addr;
        address walletAddr;
         
    }

    mapping(address=>Parent) parents;
    function addInvestor(address addr, string memory first_name, string memory last_name, address walletAddr) public {
        Parent storage parent = parents[addr];
        require(parent.addr == address(0),"Address is already added!");
        parent.first_name = first_name;
        parent.last_name = last_name;
        parent.addr = addr; 
        parent.walletAddr=walletAddr;
    }
    
    function updateInvestor() public{

    }

}