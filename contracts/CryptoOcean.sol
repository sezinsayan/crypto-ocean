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
    function addChild(address addr,string memory name,uint balance,uint idNumber,uint256 withdrawDate) public{
        Child storage _child = children[addr];

        require(_child.addr == address(0),"Address is already added!");

        _child.balance=balance;
        _child.name=name;
        _child.addr=addr;
        _child.idNumber = idNumber;
        _child.withdrawDate = withdrawDate;
    
    }
    event TransferReceived(address _from, uint _amount);
    event TransferSent(address _from, address _destAddr, uint _amount);
    
    function getChildAddress()public view returns(address){
        address a;
        Child storage Children = children[a];
        return(Children.addr);
    }

    function getChildBalance()public view returns(uint256){
        address a;
        Child storage Children = children[a];
        return(Children.balance);

    } 

    
    uint256 BalanceOfChild=getChildBalance();
    address AddressOfChild = getChildAddress(); 
    
    receive() payable external {
        BalanceOfChild += msg.value;
        emit TransferReceived(msg.sender, msg.value);
    } 

    function withdraw(uint amount, address payable destAddr) public {
        require(msg.sender == AddressOfChild, "Only owner can withdraw funds"); 
        require(amount <= BalanceOfChild, "Insufficient funds");
        
        destAddr.transfer(amount);
        BalanceOfChild -= amount;
        emit TransferSent(msg.sender, destAddr, amount);
    }
    function Admin() public view returns(address){
        address admin;
        admin=msg.sender;
        return(admin);
    }
    address Adminstator=Admin();
}