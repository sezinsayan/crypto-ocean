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

      const tx = await crypto.addChild(addr, name);
      const children = await crypto.children(addr);

      expect(children.name).equal(name);
      expect(children.addr).equal(addr);
    })
    it("Should not add more than once", async function () {
      const addr = "0xB0FcDb49CE99482702C1CbBc0A183E570353a707";
      const name = "Canbora";

      await crypto.addChild(addr, name);
      const promise = crypto.addChild(addr, name);
      
      await expect(promise).eventually.rejectedWith("Address is already added!");
    
    })
  })
})
