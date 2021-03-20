const assert = require('assert'); //std lib to assert in tests
const ganache = require('ganache-cli');
const Web3 = require('web3'); //Note capital 'W' as we are invoking constructor function
const provider = ganache.provider(); //provider for connecting to the ganache local network
const web3 = new Web3(provider);
const {abi, evm} = require('../compile'); // compile is one dir up in the proj structure so we add ../

//Before each test, fetch an account from ganache and deploy the contract using that account
let accountList;
let inbox;
beforeEach(async () => { 
//Get a list of all accounts from Ganache - function returns a promise and has to be resolved
    accountList = await web3.eth.getAccounts();
//Deploy the contract
    inbox = await new web3.eth.Contract(abi) //tells what methods the inbox contract has
    .deploy({data: '0x'+ evm.bytecode.object, arguments: ['First Deployment!']}) //tells we want to deploy an instance  
    .send({from: accountList[0], gas: '1000000'}); //sends a transactions to create the contract
//Inbox will now be the actual contract deployed on the blockchain and we can call functions on it    
});

describe('Test Inbox Contract', () => {
    it('Contract assigned an Address', () => {
        assert.ok(inbox.options.address); //if the address property has truthy value this assert test will pass
    });

    it('Correct Initial message', async() => {
        const message = await inbox.methods.message().call(); //Inbox is the contract, method is the property and message is the method
        assert.strictEqual(message, 'First Deployment!');
    })

    it('Set new message', async() => {
        await inbox.methods.setMessage('Testing message Update').send({from: accountList[0], gas: '1000000'}); //we are not using call now as update needs t transaction to be sent
        const newMessage = await inbox.methods.message().call();
        assert.strictEqual(newMessage, 'Testing message Update');
    })
});
