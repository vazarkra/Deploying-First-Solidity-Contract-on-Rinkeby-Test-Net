pragma solidity ^0.8.2;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Inbox {
    string public message; //state variable to be stored on the blockchain
    
    constructor (string memory initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
