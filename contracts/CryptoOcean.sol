// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CryptoOcean{
    address admin;
    constructor(){
        admin=msg.sender;
    }

    struct Parent{
        
        
        string first_name;
        string last_name;
        address addr;
        string phoneNum;
        address[] childList;
         
    }
//add and update
    mapping(address=>Parent) public parents ;
    address[] parentList;
    function addInvestor(address addr, string memory first_name, string memory last_name,string memory phoneNum) public {
        Parent storage parent = parents[addr];
        require(parent.addr == address(0),"Address is already added!");
        parent.first_name = first_name;
        parent.last_name = last_name;
        parent.addr = addr; 
        parent.phoneNum=phoneNum;
        parentList.push(addr);

    }
    
    
    struct Child{
        string name;
        address addr;
        uint256 idNumber;
        uint256 balance;
        uint256 withdrawDate;
    }

    mapping(address=>Child) public  children;
    
    function addChild(address  addr,string memory name,uint idNumber,uint256 withdrawDate) public {
        Child storage _child = children[addr];
        Parent storage parent = parents[msg.sender];

        require(_child.addr == address(0),"Address is already added!");
        require(addr != admin,"This is admin address");
        
        _child.name=name;
        _child.addr=addr;
        _child.idNumber = idNumber;
        _child.withdrawDate = withdrawDate;
        parent.childList.push(addr);
    }
    /*function getChildrenList (address _addressOfInvestor) public view returns (Child[] memory){
        uint len = parents[_addressOfInvestor].childList.length;
        Child[] memory _childrenOfInvestor = new Child[](len);
        for (uint i=0; i<len; i++){
            _childrenOfInvestor[i] = children[investors[_addressOfInvestor].childrenList[i]];
        }
        return _childrenOfInvestor;
    }*/

    
    function isChildofParentList (address addr) public view returns(bool){
        Child storage child = children[addr];
        Parent storage parent = parents[msg.sender];
        
        for(uint i=0;i<parent.childList.length;i++){
            if(parent.childList[i]==child.addr){
                return true;
            }
        }
        return false;
    }
    /*function trueorfalse() public view returns(bool){
        bool boo;
        boo = true;
        return true;
    }*/

    
    
    /*function withdrawinvestor(uint amount,address payable childAddress) public {
        Child storage child = children [childAddress];
        Investor storage parent = investors [msg.sender];
        require(msg.sender==parent.addr,"");
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
    }*/
    


    
    
        

    
    
    

}