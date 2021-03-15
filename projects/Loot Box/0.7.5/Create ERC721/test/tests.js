const { assert } = require("chai");
const createNFT = require('../createNFT');
const mintNFT = require('../mintNFT');
const fill = require('../fill');
const getToken = require('./getToken');
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

        describe("filling", () => {
            const wethAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
            const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
            const controllerAddress = "0x2c2a966b7F5448A36EC9f896088DfB99B21d8A24";
            let tokens;
            const amount = ethers.utils.parseEther("10");
            let lootBoxController;
            beforeEach(async () => {
                lootBoxController = await ethers.getContractAt("ILootBoxController", controllerAddress);
                const address1 = await ethers.provider.getSigner(0).getAddress();
                await getToken("weth", amount, [address1]); 
                await getToken("dai", amount, [address1]); 
                tokens = [
                    await ethers.getContractAt("IERC20", wethAddress),
                    await ethers.getContractAt("IERC20", daiAddress),
                ];
                await fill(lootBoxController, erc721, "1", tokens);
            });

            it("should fill the lootbox with erc20s",  async () => {
                const lootBoxAddress = lootBoxController.computeAddress(erc721.address, "1");
                
                for(let i = 0; i < tokens.length; i++) {
                    assert.equal((await tokens[i].balanceOf(lootBoxAddress)).toString(), amount.toString());
                }
            });
        });
    });
});
