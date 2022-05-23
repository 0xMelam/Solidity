// SPDX-License-Identifier: MIT
// Every source file should start with a comment indicating its license
pragma solidity ^0.8.9;

contract Inbox {
    string public message;

    constructor(string memory initialMessage) { //by using memory we specify the data location of the variable.
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
