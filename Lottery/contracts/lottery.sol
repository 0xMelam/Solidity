pragma solidity ^0.4.17;

contract Lottery{

    address public manager;
    address[] public players;

    function Lottery() public{
        manager = msg.sender;
    }
    function enter() public payable {
        require(msg.value >= 0.01 ether);
        players.push(msg.sender);
    }

    function random() private view returns(uint){                                       //uint is the same as uint256
        return uint(keccak256(block.difficulty, now, players));                         //keccak256() and sha3() are the same thing in solidity.
    }

    function pickWinner() public restricted{                                             //Making sure the manager is the only one picking the winner.
        uint winner = random() % players.length;                                            
        players[winner].transfer(this.balance);
        players = new address[](0);                                                     //Creating a new array of type address that is dynamic with initial size 0.
    }

    modifier restricted(){                                                              //Function modifiers used to minimize duplicate code.
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]){
        return players;
    }

}

/*Basic Solidity Types: 

    string          ->  Sequence of characters
    bool            ->  Boolean Value [ True / False ] 
    int             ->  Integer, No decimal, positive or negative. [0, -3000, 59125]
    uint            ->  Unsigned integer, positive number. No decimal. [0, 3000, 99999]
    fixed/ufixed    ->  Fixed point number, Number with decimal after it. [20.001, -42.4242, 3.14]
    address         ->  Has methods tied to it for sending money

*/

/* 'Msg' Global Variable

    msg.data        ->  'Data' Field from the call or transaction that invoked the current function
    msg.gas         ->  Amount of gas the current function invocation has available.
    msg.sender      ->  Address of the account that started the current function invocation
    msg.value       ->  Amount of ether (in wei) that was sent along with the function invocation.

*/

/* Reference Types:

    fixed array     ->  Array that contains a single type of element - unchanging length : int[3] -> [1,2,3]
    Dynamic array   ->  Array that contains a single type of element, but can change in size ove time : int[] -> [1,2,3]
    Mapping         ->  Collections of key value pairs. All keys must be of the same time, and all values must be of the same type: mapping(string => string)
    Struct          ->  Collection of key value pairs that can have different types. struct Car { string make; string model; uint value;}

*/