const ethers = require('hre').ethers;

async function fill(lootBoxAddress, erc20s) {
    const amount = ethers.utils.parseEther("10");
    for(let i = 0; i < erc20s.length; i++) {
        await erc20s[i].transfer(lootBoxAddress, amount);
    }
}

module.exports = createNFT;