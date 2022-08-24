const hre = require("hardhat");
var chai = require('chai');  
var expect = chai.expect;    
const chaiAsPromised = require("chai-as-promised");


chai.use(chaiAsPromised);

describe("CryptoOcean", function () {
  let crypto;
  let admin;
  let wallets;

  before(async () => {
    wallets = await ethers.getSigners();
    admin = wallets[0].address;
    console.log("admin: ",admin)
  })
  

  beforeEach(async () => {
    const CryptoOcean = await hre.ethers.getContractFactory("CryptoOcean");
    crypto = await CryptoOcean.deploy();
  })
  
  describe("CheckingOnce", function () {
    
    it("Right mapping", async function () {
      const addr = "0xB0FcDb49CE99482702C1CbBc0A183E570353a707";
      const name = "Canbora";
      const idNumber = 26052484562;
      const withdrawDate = 1787778000;

      const tx = await crypto.addChild(addr, name,idNumber,withdrawDate);
      const children = await crypto.children(addr);

      expect(children.name).equal(name);
      expect(children.addr).equal(addr);
      expect(children.idNumber).equal(idNumber);
      expect(children.withdrawDate).equal(withdrawDate);
    })
    
    it("Should not add more than once", async function () {
      const addr = "0xB0FcDb49CE99482702C1CbBc0A183E570353a707";
      const name = "Canbora";
      const idNumber = 26052484562;
      const withdrawDate = 1787778000;


      await crypto.addChild(addr, name,idNumber,withdrawDate);
      const promise = crypto.addChild(addr, name,idNumber,withdrawDate);
      
      await expect(promise).eventually.rejectedWith("Address is already added!");
    })
    
    it("Should not be admin address",async function () {
      const addr = "0xB0FcDb49CE99482702C1CbBc0A183E570353a707";
      const name = "Canbora";
      const idNumber = 26052484562;
      const withdrawDate = 1787778000;
        
      const promise = crypto.addChild(admin, name,idNumber,withdrawDate);
      await expect(promise).revertedWith("This is admin address");
    })
    
    it("address has to be in childlistofparents",async function () {
      const addr = "0xB0FcDb49CE99482702C1CbBc0A183E570353a707";
      const name = "Canbora";
      const idNumber = 26052484562;
      const withdrawDate = 1787778000;

      await crypto.addChild(addr, name,idNumber,withdrawDate);
      const tr=await crypto.isChildofParentList(addr); 
      expect(tr).equal(true);
    
    })
  })
})
