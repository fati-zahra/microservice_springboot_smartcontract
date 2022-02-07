pragma solidity ^0.5.0;

contract  contrat {
    // State variable = represent the state of the smart contract in the blockchain
    uint public taskCount = 0;

    struct Task{
        uint id;
        string seller;
        string buyer;
        string type_immoblier;
        string price;
        uint date;
    }

    mapping(uint => Task) public tasks;

    event TaskCreated(
        uint id,
        string seller,
        string buyer,
        string type_immoblier,
         string price,
         uint date
    );
   

    constructor() public {
        //createTask("", "","", "");
    }

    function createTask(string memory _seller,string memory _buyer, string memory _type_immoblier, string memory  _price) public{
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _seller, _buyer, _type_immoblier, _price, now);
        emit TaskCreated(taskCount, _seller, _buyer, _type_immoblier, _price, now);
    }

   
}
