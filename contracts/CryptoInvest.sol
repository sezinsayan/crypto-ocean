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

    mapping(address=>Child) public children;
    function addChild(address addr,string memory name,uint idNumber,uint256 withdrawDate) public{
        Child storage _child = children[addr];

        require(_child.addr == address(0),"Address is already added!");

        _child.name=name;
        _child.addr=addr;
        _child.idNumber = idNumber;
        _child.withdrawDate = withdrawDate;
    
    }

    
}