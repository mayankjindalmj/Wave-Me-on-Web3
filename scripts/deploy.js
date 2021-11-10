const { hexStripZeros } = require("@ethersproject/bytes")

const main = async() => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("Deploy Contracts to account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());

    const Token = await hre.ethers.getContractFactory("WavePortal");
    const portal = await Token.deploy({
        value: hre.ethers.utils.parseEther('0.01'),
    });
    await portal.deployed();

    console.log("WavPortal Address: ", portal.address);
};

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch(error){
        console.error(error);
        process.exit(1);
    }
};

runMain();