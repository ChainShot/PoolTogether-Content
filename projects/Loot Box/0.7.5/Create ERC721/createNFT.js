const ethers = require('hre').ethers;

async function createNFT(erc721ControlledFactory) {
    const tx = erc721ControlledFactory.createERC721Controlled("Gift", "GFT", "www.example.com");
    const receipt = await tx.wait();
    const event = receipt.events.find(x => x === "ERC721ControlledCreated");
    return event.address;
}

module.exports = createNFT;