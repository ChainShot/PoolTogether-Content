const ethers = require('hardhat').ethers;

async function mintNFT(friendAddress, controlledERC721) {
    const tx = await controlledERC721.mint(friendAddress);
    const receipt = await tx.wait();
    const event = receipt.events.find(x => x.event === "Transfer");
    const [, , tokenId] = event.args; // or .tokenId
    return tokenId;
}

module.exports = mintNFT;