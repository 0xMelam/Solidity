const assert = require('assert');
const ganache = require('ganache-cli');             //serves as a local Ethereum test network
const Web3 = require('web3');                       //Constructor function
const web3 = new Web3(ganache.provider());          //Actual instance of Web3
const {abi, evm } = require('../compile');          //Update the import to destructure the abi (formerly the interface) and the evm (bytecode)
const INITIAL_STRING = 'Melam';
/*
Mocha Functions
    it: runs a test and makes an assumption
    describe: groups together "it" functions
    beforeEach: execute some general setup code.
*/

/*  Mocha Structure:
 1. Mocha Starts
 2. Loop:
    2.1: Deploy a new contract                  -> beforeEach
    2.2: Manipulate the contract                -> it
    2.3: Make an assertion about the contract   -> it
3. Done.
*/


let accounts;
let inbox;
beforeEach(async () => {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    //Use one of the accounts to deploy

    //Passing the abi to the contract object and assigning the bytecode to the data property of the deploy method:
    inbox = await new web3.eth.Contract(abi).deploy({data:evm.bytecode.object, arguments: [INITIAL_STRING]}).send({from: accounts[0], gas:'1000000'})
})

//The Contract

/*
    Web3 with contracts: What information is needed
    Interact with Deployed Contracts : ABI + Address of Deployed Contract (⛔ No Bytecode)
    Creating Contracts : ABI + Bytecode (⛔ No Address of deployed contract)    
*/

describe('Inbox', () => {  //Inbox Contract
    
    it('deploys a contract', () => {
        assert.ok(inbox.options.address); //This test is to make sure that there's an address assigned to the contract and used to deploy it.
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call(); //call method/function message
        assert.equal(message, INITIAL_STRING);
    });

    it('can change a new message', async () =>{
        await inbox.methods.setMessage('bye').send({from: accounts[0], gas:1000000}); //Calling method/function setMessage + Send Transaction
        const message = await inbox.methods.message().call(); //call method/function message
        assert.equal(message, 'bye');
    });
});
