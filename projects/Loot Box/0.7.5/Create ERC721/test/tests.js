const { assert } = require("chai");
const createNFT = require('../createNFT');
describe('Creating NFT', function () {
    const factoryAddress = "0x4E869b3A0978fA61DAbd7Da8F9B272AADc745Fb3";
    let erc721ControlledFactory;
    beforeEach(async () => {
        erc721ControlledFactory = await ethers.getContractAt("IERC721ControlledFactory", factoryAddress);
    });

    it('should return an ERC721 address', async () => {
        const address = await createNFT(erc721ControlledFactory);
        assert(address, "expected createNFT to return an address");
        erc721 = await ethers.getContractAt("IERC721", address);
        assert(await erc721.supportsInterface("0x80ac58cd"), "expected the address to be an ERC721");
    });
});
