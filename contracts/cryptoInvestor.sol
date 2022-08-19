// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CryptoInvestor{
    enum Role{
            PARENT,
            CHILD,
            ADMIN,
            NOROLE
    }
    address public admin;
    constructor(){
        admin=msg.sender;
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
    function getParents() public returns(string memory, string memory){
        return ("","");
    }
    
    function giveRoles(address _addr) public view returns(Role){
        if(parents[_addr].addr==_addr)
            return Role.PARENT;
        else if(children[_addr].addr==_addr){
            return Role.CHILD;
        }
        //else if return Role.ADMIN;
        else {
        return Role.NOROLE; 
        }    
    }
    

}