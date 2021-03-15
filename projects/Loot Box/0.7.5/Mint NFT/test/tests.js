const { assert } = require("chai");
const createNFT = require('../createNFT');
const mintNFT = require('../mintNFT');
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

    describe("minting", () => {
        let friend;
        let id1, id2, id3;
        beforeEach(async () => {
            friend = await ethers.provider.getSigner(1).getAddress();
            id1 = await mintNFT(friend, erc721);
            id2 = await mintNFT(friend, erc721);
            id3 = await mintNFT(friend, erc721);
        });

        it("should token IDs", async () => {
            assert.equal(id1, "1");
            assert.equal(id2, "2");
            assert.equal(id3, "3");
            assert.equal(await erc721.balanceOf(friend), "3")
        });
    });
});
