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
        uint256 balance;
        address[] childrenList;
         
    }

    mapping(address=>Parent) public parents ;
    address[] parentList;
//add and update
    function addInvestor(address addr, string memory first_name, string memory last_name,string memory phoneNum,uint256 balance) public {
        Parent storage parent = parents[addr];
        require(parent.addr == address(0),"Address is already added!");
        parent.first_name = first_name;
        parent.last_name = last_name;
        parent.addr = addr; 
        parent.phoneNum=phoneNum;
        parent.balance=balance;
        parentList.push(addr);
    }
    struct Child{
        string name;
        address addr;
        uint256 idNumber;
        uint256 balance;
        uint256 withdrawDate;
    }

    mapping(address=>Child) public children;
    function addChild(address  addr,string memory name,uint idNumber,uint256 withdrawDate) public {
        Child storage _child = children[addr];
        Parent storage parent = parents[msg.sender];

        require(_child.addr == address(0),"Address is already added!");
        require(addr != admin,"This is admin address");
        
        _child.name=name;
        _child.addr=addr;
        _child.idNumber = idNumber;
        _child.withdrawDate = withdrawDate;
        parent.childrenList.push(addr);
    }
    function isChildofParentList (address addr) public view returns(bool){
        Child storage child = children[addr];
        Parent storage parent = parents[msg.sender];
        
        for(uint i=0;i<parent.childrenList.length;i++){
            if(parent.childrenList[i]==child.addr){
                return true;
            }
        }
        return false;
    }
    function getParents() public view returns(Parent[] memory res){
        res= new Parent[](parentList.length);
        for(uint i=0;i< parentList.length;i++){
            res[i]=parents[parentList[i]];
        }

    }
    function removeParent(address addr) public {
        //if parent dies
        delete parents[addr];
    }
    function send(address childAddress) payable external {
        Child storage child = children [childAddress];
        require(child.addr !=address(0), "The child is not registered");
        child.balance += msg.value;


    } 
    function deleteChild (address _addr) public {
        delete(children[_addr]);
    }

    function getChildrenList (address _addressOfInvestor) public view returns (Child[] memory){
        uint len = parents[_addressOfInvestor].childrenList.length;
        Child[] memory _childrenOfInvestor = new Child[](len);
        for (uint i=0; i<len; i++){
            _childrenOfInvestor[i] = children[parents[_addressOfInvestor].childrenList[i]];
        }
        return _childrenOfInvestor;
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
        Parent storage parent = parents [msg.sender];
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

    function giveRoles(address _addr) public view returns(Role){
        if(parents[_addr].addr==_addr)
            return Role.PARENT;
        else if(children[_addr].addr==_addr){
            return Role.CHILD;
        }
        else if(admin==msg.sender)
        return Role.ADMIN;
        
        else {
        return Role.NOROLE; 
        }    
    }
    

}