const { time, loadFixture, } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

const hre = require("hardhat");
var chai = require('chai');  
var expect = chai.expect;    
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);



describe("CryptoInvest", function () {
  let crypto;
  let wallets;
  before(async () => {
    wallets=await (hre.ethers.getSigners());
  })
  beforeEach(async () => {
    const CryptoInvest = await hre.ethers.getContractFactory("CryptoInvest");
    crypto = await CryptoInvest.deploy();
  })
 
  describe("CheckingDelete", function () {
    it("Delete process", async function () {
      const addr = "0xB0FcDb49CE99482702C1CbBc0A183E570353a707";
      const name = "fatih";
      const idNumber = 2222220;
      const withdrawDate = 30;
      const balance = 21;

      await crypto.deleteChild(addr);
      const children = await crypto.children(addr);

      expect(children.name).equal('');
      expect(children.idNumber).equal('');
    })
  })

  describe("Checking Fetch Investor's children list", function () {
    it("Children list fetched correctly.", async function () {
      const investorAddress=wallets[0].address;


      await crypto.addChild("0xB0FcDb49CE99482702C1CbBc0A183E570353a707","a",0,1);
      await crypto.addChild("0x99CF4c4CAE3bA61754Abd22A8de7e8c7ba3C196d","b",0,1);
      await crypto.addChild("0x1439818DD11823c45fFF01aF0Cd6c50934e27Ac0","c",0,1);
      const childList = await crypto.getChildrenList(investorAddress);
      console.log("-----------",childList);
      expect(childList[0].addr)=="0xB0FcDb49CE99482702C1CbBc0A183E570353a707";
      expect(childList[1].addr)=="0x99CF4c4CAE3bA61754Abd22A8de7e8c7ba3C196d";
      expect(childList[2].addr)=="0x1439818DD11823c45fFF01aF0Cd6c50934e27Ac0";

    })
  })

  

  
})
