const { assert } = require("chai");
const createNFT = require('../createNFT');
describe('Creating NFT', function () {
    const factoryAddress = "0x4E869b3A0978fA61DAbd7Da8F9B272AADc745Fb3";
    let erc721ControlledFactory, erc721;
    let address;
    beforeEach(async () => {
        erc721ControlledFactory = await ethers.getContractAt("IERC721ControlledFactory", factoryAddress);
        address = await createNFT(erc721ControlledFactory);
        erc721 = await ethers.getContractAt("IERC721Controlled", address);
    });

    it('should return an ERC721 address', async () => {
        assert(ethers.utils.isAddress(address), "expected createNFT to return an address");
        assert(await erc721.supportsInterface("0x80ac58cd"), "expected the address to be an ERC721");
    });
});
