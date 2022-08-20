const { time, loadFixture, } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

const hre = require("hardhat");
var chai = require('chai');  
var expect = chai.expect;    
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("CryptoInvest", function () {
  let crypto;


  beforeEach(async () => {
    const CryptoInvest = await hre.ethers.getContractFactory("CryptoInvest");
    crypto = await CryptoInvest.deploy();
  })
  
  describe("CheckingOnce", function () {
    it("Right mapping", async function () {
      const addr = "0xB0FcDb49CE99482702C1CbBc0A183E570353a707";
      const name = "Canbora";
      const balance = 0.000000000;
      const idNumber = 26052484562;
      const withdrawDate = 1787778000;

      const tx = await crypto.addChild(addr, name,balance, idNumber,withdrawDate);
      const children = await crypto.children(addr);

      expect(children.name).equal(name);
      expect(children.addr).equal(addr);
      expect(children.balance).equal(balance);
      expect(children.idNumber).equal(idNumber);
      expect(children.withdrawDate).equal(withdrawDate);
    })
    it("Should not add more than once", async function () {
      const addr = "0xB0FcDb49CE99482702C1CbBc0A183E570353a707";
      const name = "Canbora";
      const balance = 0.000000000;
      const idNumber = 26052484562;
      const withdrawDate = 1787778000;


      await crypto.addChild(addr, name,balance,idNumber,withdrawDate);
      const promise = crypto.addChild(addr, name,balance,idNumber,withdrawDate);
      
      await expect(promise).eventually.rejectedWith("Address is already added!");
 
    })
    it("childaddress",async function () {
      const a = "0xB0FcDb49CE99482702C1CbBc0A183E570353a707"; 
      const addr = "0xB0FcDb49CE99482702C1CbBc0A183E570353a707";
      const name = "Canbora";
      const balance = 0.000000000;
      const idNumber = 26052484562;
      const withdrawDate = 1787778000;

      const tx = await crypto.addChild(addr, name,balance, idNumber,withdrawDate);
      const children = await crypto.children(addr);

      expect(children.name).equal(name);
      expect(children.addr).equal(addr);
      expect(children.balance).equal(balance);
      expect(children.idNumber).equal(idNumber);
      expect(children.withdrawDate).equal(withdrawDate);
      expect(children.addr).equal(a);
    })
    it("childbalance",async function () {
      const a = 0.000000000; 
      const addr = "0xB0FcDb49CE99482702C1CbBc0A183E570353a707";
      const name = "Canbora";
      const balance = 0.000000000;
      const idNumber = 26052484562;
      const withdrawDate = 1787778000;

      const tx = await crypto.addChild(addr, name,balance, idNumber,withdrawDate);
      const children = await crypto.children(addr);

      expect(children.name).equal(name);
      expect(children.addr).equal(addr);
      expect(children.balance).equal(balance);
      expect(children.idNumber).equal(idNumber);
      expect(children.withdrawDate).equal(withdrawDate);
      expect(children.balance).equal(a);
    })

  })
})
// contract EtherSender {

//     EtherReceiver private receiverAdr = new EtherReceiver();

//     function sendEther(uint _amount) public payable {
//         if (!address(receiverAdr).send(_amount)) {
//             //handle failed send
//         }
//     }

//     function callValueEther(uint _amount) public payable {
//         require(address(receiverAdr).call.value(_amount).gas(35000)());
//     }

//     function transferEther(uint _amount) public payable {
//         address(receiverAdr).transfer(_amount);
//     }
// }