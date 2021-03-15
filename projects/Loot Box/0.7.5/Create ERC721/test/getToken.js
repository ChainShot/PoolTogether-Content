const tokens = {
    weth: {
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        impersonate: "0x0f4ee9631f4be0a63756515141281a3e2b293bbe",
    },
    dai: {
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        impersonate: "0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503"
    }
}

async function getToken(tokenId, amount, accts) {
    const tokenConfig = tokens[tokenId];
    const token = await ethers.getContractAt("IERC20", tokenConfig.address);
    const signer = await ethers.provider.getSigner(accts[0]);
    await signer.sendTransaction({
        to: tokenConfig.impersonate,
        value: ethers.utils.parseEther("1")
    });
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [tokenConfig.impersonate]
    });
    impersonateSigner = await ethers.provider.getSigner(tokenConfig.impersonate);

    for (let i = 0; i < accts.length; i++) {
        await token.connect(impersonateSigner).transfer(accts[i], amount);
    }
    return token;
}

module.exports = getToken;