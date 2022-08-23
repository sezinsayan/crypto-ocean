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
  
  describe("CheckingDelete", function () {
    it("Delete process", async function () {
      const addr = "0xB0FcDb49CE99482702C1CbBc0A183E570353a707";
      const name = "Fatih";
      const idNumber = 222220;
      const withdrawDate = 30;
      const balance = 12;

      const tx = await crypto.deleteChild(addr);
      const children = await crypto.children(addr);

      expect(children.name).equal('');
      expect(children.idNumber).equal('');
    })
  })



  
})
