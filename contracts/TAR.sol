// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright (C) 2024 Compellio S.A.

pragma solidity ^0.8.24;

import "./ITAR.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TAR is ITAR, Ownable {
    
    using Strings for uint256;

    uint256 private _nextVersionId;

    string private _uriPrefix;
    string private _uriPostfix;
    
    mapping(uint256 => string) private _checksums;

    constructor(address initialOwner, string memory uriPrefix, string memory uriPostfix) Ownable(initialOwner) {
        _uriPrefix = uriPrefix;
        _uriPostfix = uriPostfix;
    }

    function push(string memory checksum_) public override virtual onlyOwner {
        uint256 tokenId = _nextVersionId++;
        _checksums[tokenId] = checksum_;

        emit Updated(tokenId, checksum_);
    }

    function total() public override virtual view returns (uint256) {
        return _nextVersionId;
    }

    function exists(uint256 version) public override virtual view returns (bool) {
        return version < _nextVersionId;
    }

    function checksum(uint256 version) public override virtual view returns (string memory) {
        require(exists(version), "TAR: version does not exist");
        return _checksums[version];
    }

    function dataUri(uint256 version) public override virtual view returns (string memory) {
        require(exists(version), "TAR: version does not exist");
        return string.concat(_uriPrefix, "/", Strings.toHexString(address(this)), "/", version.toString(), _uriPostfix);
    }

}
