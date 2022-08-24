const hre = require("hardhat");
var chai = require('chai');  
var expect = chai.expect;    
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe("cryptoInvestor", function () {
    let crypto;
    let admin;
    let wallets;
    before(async () => {
        wallets = await ethers.getSigners();
        admin = wallets[0].address;
        console.log("admin: ",admin)
    })

    beforeEach(async () => {
        const CryptoInvestor = await hre.ethers.getContractFactory("CryptoInvestor");
        crypto = await CryptoInvestor.deploy();
    })
    
    describe("CheckingOnce", function () {
        it("Should not add more than once", async function () {
            const addr = "0xB0FcDb49CE99482702C1CbBc0A183E570353a707";
            const first_name = "Sezin";
            const last_name = "Sayan";
            const phoneNum= "05372834";
            const balance= 45;
      
            await crypto.addInvestor(addr, first_name,last_name,phoneNum,balance);
            const promise = crypto.addInvestor(addr, first_name,last_name,phoneNum,balance);
            
            await expect(promise).eventually.rejectedWith("Address is already added!");
          
        })
        it("Right mapping for Parent", async function () {
            const addr = "0xB0FcDb49CE99482702C1CbBc0A183E570353a707";
            const first_name = "Sezin";
            const last_name = "Sayan";
            const phoneNum= "05372834";
            const balance= 45;

    
            const tx = await crypto.addInvestor(addr, first_name,last_name,phoneNum,balance);
            const parents = await crypto.parents(addr);
            //plist
        
            expect(parents.first_name).equal(first_name);
            expect(parents.last_name).equal(last_name);
            expect(parents.addr).equal(addr);
            expect(parents.phoneNum).equal(phoneNum);
            expect(parents.balance).equal(balance);
        })
        it("Right mapping for Child", async function () {
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
        it("Should not be admin address",async function () {
            const addr = "0xB0FcDb49CE99482702C1CbBc0A183E570353a707";
            const name = "Canbora";
            const idNumber = 26052484562;
            const withdrawDate = 1787778000;
              
            const promise = crypto.addChild(admin, name,idNumber,withdrawDate);
            await expect(promise).revertedWith("This is admin address");
          })
        it("Parent List",async function (){
            const test= await crypto.getParents();
            console.log("Parent list", test);
        })
        it("Role Call",async function (){
            const addr = "0xB0FcDb49CE99482702C1CbBc0A183E570353a707";
            const role = await crypto.giveRoles(addr);
            console.log("Role",role);
        
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
    
});
