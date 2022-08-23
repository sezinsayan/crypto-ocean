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
    mapping(address=>Investor) public investors;
 
    function deleteChild (address _addr) public {
        delete(children[_addr]);
    }

    function getChildrenList (address _addressOfInvestor) public view returns (Child[] memory){
        uint len = investors[_addressOfInvestor].childrenList.length;
        Child[] memory _childrenOfInvestor = new Child[](len);
        for (uint i=0; i<len; i++){
            _childrenOfInvestor[i] = children[investors[_addressOfInvestor].childrenList[i]];
        }
        return _childrenOfInvestor;
    }

    function addChild(address  addr,string memory name,uint idNumber,uint256 withdrawDate) public {
        Child storage _child = children[addr];
        Investor storage investor = investors[msg.sender];
        require(_child.addr == address(0),"Address is already added!");
        
        _child.name=name;
        _child.addr=addr;
        _child.idNumber = idNumber;
        _child.withdrawDate = withdrawDate;
        investor.childrenList.push(addr);

    }


    
}