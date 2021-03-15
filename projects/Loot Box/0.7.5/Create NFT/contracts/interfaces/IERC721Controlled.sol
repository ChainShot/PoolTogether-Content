// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "./IERC721.sol";

/// @title An ownable ERC721
interface IERC721Controlled is IERC721 {

  /// @notice Emitted when the token is constructed
  event ERC721ControlledInitialized(
    string name,
    string symbol
  );

  /// @notice Emitted when the base URI is set
  event ERC721ControlledBaseURISet(
    string baseURI
  );

  /// @notice Initializes a newly created contract
  /// @param name The token name
  /// @param symbol The token symbol
  /// @param baseURI The base URI to use for the token URI
  /// @param admin The admin of the token
  function initialize (
    string memory name,
    string memory symbol,
    string memory baseURI,
    address admin
  ) external;

  /// @notice Sets the base URI of the token.  Only callable by the admin
  /// @param _baseURI The new base URI to use
  function setBaseURI(string memory _baseURI) external;

  /// @notice Mints a new token.  Only callable by the admin.
  /// @param to The owner that the token should be minted to.
  /// @return The new token id
  function mint(address to) external returns (uint256);

  /// @notice The total number of tokens that have been minted.
  /// @return The total number of tokens.
  function totalSupply() external view returns (uint256);
}