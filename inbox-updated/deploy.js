const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {abi, evm} = require('./compile');

//Infura API is just a connection Point to the network
//HDWalletProvide module is used to both connect to some target network and unlock an account
const provider = new HDWalletProvider('field night two valley believe raccoon sting tennis rule useless person stumble',
'https://rinkeby.infura.io/v3/4ae85caa799c43dca30663a24bb9a6d0'); //Testing Wallet Mnemonics + Network URL

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(abi).deploy({data: evm.bytecode.object, arguments: ['Melam!']}).send({gas: '1000000', from: accounts[0]});
    console.log('Contract Successfully deployed to: ', result.options.address); //Find which address is our contract deployed to
    provider.engine.stop() //To prevent a hanging deployment
};

deploy();