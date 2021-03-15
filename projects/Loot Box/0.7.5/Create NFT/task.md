## Create NFT

The first step to creating a LootBox is to build a new NFT. Specifically, we are going to use the `ERC721Controlled` contract that PoolTogether uses for its lootboxes. 

Create a new ERC721 using the `erc721ControlledFactory` contract instance and return the address of the NFT. 