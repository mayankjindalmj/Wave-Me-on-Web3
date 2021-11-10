pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal 
{
    uint256 totalWaves;
    bool won;
    uint256 private seed;
    //Event is an inheritable member of a contract. An event is emitted, it stores the arguments passed in transaction logs.
    //These logs are stored on blockchain and are accessible using address of the contract till the contract is present on the blockchain.
    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }
    /*
     * I declare a variable waves that lets me store an array of structs.
     * This is what lets me hold all the waves anyone ever sends to me!
     */
    Wave[] waves;
    constructor() payable
    {
        console.log("Construction Successful!");

        seed = (block.difficulty + block.timestamp) % 100;
    }

    mapping(address => uint256) public lastWavedAt;
    function wave(string memory _message) public
    {
        require(
            lastWavedAt[msg.sender] + 60 seconds < block.timestamp, "Wait 1 minute"
        );
        lastWavedAt[msg.sender] = block.timestamp;
        totalWaves++;
        console.log("%s waved.", msg.sender);
        console.log("Message: %s", _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: ", seed);
        if(seed >= 50){
            won=true;
            console.log("%s won. Yayyy!", msg.sender);
            uint256 prizeMoney = 0.0001 ether;
            require(prizeMoney <= address(this).balance, "Trying to withdraw more money than the contract has.");

            (bool success, ) = (msg.sender).call{value: prizeMoney}("");
            require(success, "Failed to withraw money from contract.");
        }
        else{
            won=false;
            console.log("Try next time.");
        }

        //https://medium.com/coinmonks/the-curious-case-of-emit-in-solidity-2d88913e3d9a
        emit NewWave(msg.sender, block.timestamp, _message);


    }
    function getAllWaves() public view returns (Wave[] memory)
    {
        return waves;
    }
    function getTotalWaves() public view returns (uint256)
    {
        console.log("We have %d total waves.", totalWaves);
        return totalWaves;
    }
    function getWinStatus() public view returns (bool)
    {
        return won;
    }



}

// SPDX-License-Identifier: UNLICENSED