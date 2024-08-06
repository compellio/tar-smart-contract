// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright (C) 2024 Compellio S.A.

pragma solidity ^0.8.24;

/**
 * @title Token Asset Record Standard
 */
interface ITAR {

    /**
     * This event emits when a new version is created.
     * 
     * @param version The new version number
     * @param checksum The new version checksum
     */
    event Updated(uint256 indexed version, string checksum);

    /**
     * @notice Creates a new TAR version
     *
     * @param checksum The checksum of a the new version
     */
    function push(string memory checksum) external;

    /**
     * @notice Returns the total amount of versions stored by the contract
     * 
     * @return A count of all versions tracked by this contract
     */
    function total() external view returns (uint256);

    /**
     * @notice Returns whether `version` exists.
     * 
     * @param version A potential version number
     * @return True if _version exists, False otherwise
     */
    function exists(uint256 version) external view returns (bool);

    /**
     * @notice Returns the checksum of specific version.
     *
     * @param version A version number less than `totalVersions()`
     * @return The checksum of version
     */
    function checksum(uint256 version) external view returns (string memory);

    /**
     * @notice Returns the URI for `version`.
     * 
     * @param version A version number less than `totalVersions()`
     * @return An RFC 3986 URI pointing toa JSON file containing the TAR's payload
     */
    function dataUri(uint256 version) external view returns (string memory);

}