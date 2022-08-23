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



    
}