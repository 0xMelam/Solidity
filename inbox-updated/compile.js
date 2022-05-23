const path = require('path');
const fs = require('fs');
const solc = require('solc'); //Solidity Compiler

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

//The recommended way to interface with the Solidity compiler especially for more complex and automated setups is the so-called JSON-input-output interface.

const input = {
    language: 'Solidity',
    sources: {
        'inbox.sol':{
            content: source,
        },
    },
    settings: {
        outputSelection:{
            '*':{
                '*': ['*'],
            },
        },
    },
};
//Updated the export function to provide the expected JSON formatted output
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['inbox.sol'].Inbox;

