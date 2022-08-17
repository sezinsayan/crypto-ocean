// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CryptoInvest{
    struct Child{
        string name;
        address addr;
    }

    mapping(address=>Child) public children;
    function addChild(address addr,string memory name) public{
        Child storage _child = children[addr];
        require(_child.addr == address(0),"Address is already added!");
        _child.name=name;
        _child.addr=addr;
    }

    
}