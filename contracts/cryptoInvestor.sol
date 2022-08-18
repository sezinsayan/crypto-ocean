// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CryptoInvestor{
    enum Role{
            PARENT,
            CHILD
    }
    constructor(){

    }
    struct Parent{
        
        
        string first_name;
        string last_name;
        address addr;
        string phoneNum;
         
    }
//add and update
    mapping(address=>Parent) public parents ;
    function addInvestor(address addr, string memory first_name, string memory last_name,string memory phoneNum) public {
        Parent storage parent = parents[addr];
        require(parent.addr == address(0),"Address is already added!");
        parent.first_name = first_name;
        parent.last_name = last_name;
        parent.addr = addr; 
        parent.phoneNum=phoneNum;
    }
    
    function giveRoles(address _addr) public view returns(Role){
        if(parents[_addr].addr==_addr)
            return Role.PARENT;
        else{
            return Role.CHILD;
        }

    }
    

}