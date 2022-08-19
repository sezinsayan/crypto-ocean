const hre = require("hardhat");
var chai = require('chai');  
var expect = chai.expect;    
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe("cryptoInvestor", function () {
    let crypto;


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
      
            await crypto.addInvestor(addr, first_name,last_name,phoneNum);
            const promise = crypto.addInvestor(addr, first_name,last_name,phoneNum);
            
            await expect(promise).eventually.rejectedWith("Address is already added!");
          
        })
        it("Right mapping", async function () {
            const addr = "0xB0FcDb49CE99482702C1CbBc0A183E570353a707";
            const first_name = "Sezin";
            const last_name = "Sayan";
            const phoneNum= "05372834";

    
            const tx = await crypto.addInvestor(addr, first_name,last_name,phoneNum);
            const parents = await crypto.parents(addr);
        
            expect(parents.first_name).equal(first_name);
            expect(parents.last_name).equal(last_name);
            expect(parents.addr).equal(addr);
            expect(parents.phoneNum).equal(phoneNum);
        })
        it("Role Call",async function (){
            const role = await crypto.giveRoles(addr);
            console.log("Role",role);
        
        })
    })
    
});
