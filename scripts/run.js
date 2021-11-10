const { hexStripZeros } = require("@ethersproject/bytes")

const main = async() => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.01'),
    });
    await waveContract.deployed();

    console.log("Contract addy: ", waveContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

    console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    //console.log(waveCount.toNumber());


    let waveTxn1 = await waveContract.wave('This is wave #1');
    await waveTxn1.wait();
    console.log("\n");
    // let waveTxn2 = await waveContract.wave('This is wave #2');
    // await waveTxn2.wait();
    let win = await waveContract.getWinStatus();
    console.log("Did you win? ", win);
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

    console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance));
    // const [_, randomPerson] = await hre.ethers.getSigners();
    // waveTxn = await waveContract.connect(randomPerson).wave('Another message!');
    // await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();
    //console.log(waveCount.toNumber());

   let allWaves = await waveContract.getAllWaves();
   console.log("All waves: ",allWaves);


};

const runMain = async() => {
    try{
        await main();
        process.exit(0);
    } catch(error){
        console.log(error);
        process.exit(1);
    }
};

runMain();