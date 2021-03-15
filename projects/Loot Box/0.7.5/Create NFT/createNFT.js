const ethers = require('hardhat').ethers;

async function createNFT(erc721ControlledFactory) {
    const tx = await erc721ControlledFactory.createERC721Controlled("Gift", "GFT", "www.example.com");
    const receipt = await tx.wait();
    const event = receipt.events.find(x => x.event === "ERC721ControlledCreated");
    return event.args[0];
}

module.exports = createNFT;