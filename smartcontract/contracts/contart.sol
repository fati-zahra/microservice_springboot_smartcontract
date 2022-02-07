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
        bool completed;
    }

    mapping(uint => Task) public tasks;

    event TaskCreated(
        uint id,
        string seller,
        string buyer,
        string type_immoblier,
         string price,
         uint date,
        bool completed
    );
    event taskCompleted(
        uint id,
        bool completed
    );

    constructor() public {
        //createTask("My first smart contract", "nom","pppp", "ppppp");
    }

    function createTask(string memory _seller,string memory _buyer, string memory _type_immoblier, string memory  _price) public{
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _seller, _buyer, _type_immoblier, _price, now, false);
        emit TaskCreated(taskCount, _seller, _buyer, _type_immoblier, _price, now, false);
    }

    function toggleCompleted(uint _id) public {
        // "_" = local variable 
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit taskCompleted(_id, _task.completed);
    }
}
