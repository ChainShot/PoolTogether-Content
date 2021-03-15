// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

/// @title Allows users to plunder an address associated with an ERC721
/// @notice Counterfactually instantiates a "Loot Box" at an address unique to an ERC721 token.  The address for an ERC721 token can be computed and later
/// plundered by transferring token balances to the ERC721 owner.
interface ILootBoxController {
  /// @notice Emitted when a Loot Box is plundered
  event Plundered(address indexed erc721, uint256 indexed tokenId, address indexed operator);

  /// @notice Emitted when a Loot Box is executed
  event Executed(address indexed erc721, uint256 indexed tokenId, address indexed operator);

  /// @notice Computes the Loot Box address for a given ERC721 token.
  /// @dev The contract will not exist yet, so the Loot Box address will have no code.
  /// @param erc721 The address of the ERC721
  /// @param tokenId The ERC721 token id
  /// @return The address of the Loot Box.
  function computeAddress(address erc721, uint256 tokenId) external view returns (address);
}