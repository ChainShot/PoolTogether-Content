const ethers = require('hre').ethers;

async function mintLootBox(friendAddress, controlledERC721) {
    const tx = await controlledERC721.mint(friendAddress);
    const receipt = await tx.wait();
    const event = receipt.events.find(x => x.name === "Transfer");
    const [,,tokenId] = event;
    return lootBoxController.computeAddress(controlledERC721.address, tokenId);
}

module.exports = createNFT;