// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

/// @title Factory to create ERC721Controlled tokens
/// @notice Creates new ERC721Controlled tokens using the minimal proxy pattern.
interface IERC721ControlledFactory {

  /// @notice Emitted when a ERC721Controlled is created
  event ERC721ControlledCreated(address indexed token);

  /// @notice Creates an ERC721Controlled contract
  /// @return The address of the newly created ERC721Controlled
  function createERC721Controlled(
    string memory name,
    string memory symbol,
    string memory baseURI
  ) external returns (address);
}