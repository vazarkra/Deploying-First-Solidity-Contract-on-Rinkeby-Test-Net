const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'Contracts', 'inbox.sol'); //dirname is current working dir i.e. Inbox and we are navigating to contracts and inbox.sol file
const source = fs.readFileSync(inboxPath, 'utf8'); //read the source code of the inbox.sol file

const input = {
    language: "Solidity",
    sources: {
      "inbox.sol": {
        content: source
      }
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"]
        }
      }
    }
  };
  
  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  
  //module.export will make this compiled file available to other files by using require statement and immediately get access to the compiled source code. We take only the Inbox 
  module.exports = output.contracts["inbox.sol"].Inbox; 