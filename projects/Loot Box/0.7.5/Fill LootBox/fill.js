const ethers = require('hardhat').ethers;

async function fill(lootBoxController, controlledERC721, tokenId, erc20s) {
    const lootBoxAddress = await lootBoxController.computeAddress(controlledERC721.address, tokenId);
    const amount = ethers.utils.parseEther("10");
    for(let i = 0; i < erc20s.length; i++) {
        await erc20s[i].transfer(lootBoxAddress, amount);
    }
}

module.exports = fill;