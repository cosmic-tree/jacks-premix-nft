// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
import "erc721a/contracts/ERC721A.sol";
import '@openzeppelin/contracts/access/Ownable.sol';

contract JacksPremix is ERC721A("Jack's Premix NFT", "JPNFT"), Ownable {
     uint256 constant public TOTAL_SUPPLY = 10000;
     string private _baseUri = "";


     mapping(uint256 => bool) public utilized;

     constructor() {
          uint256 chunk_size = 400;
          for (uint i = 0; i < TOTAL_SUPPLY/chunk_size; i++)
          _mint(owner(), chunk_size);
     }


     function setBaseURI(string calldata baseURI) external onlyOwner {
          require(bytes(baseURI).length > 0, "baseURI cannot be empty");
          _baseUri = baseURI;
     }

     function _baseURI() internal view override returns(string memory) {
          return _baseUri;
     }

     function tokenURI(uint256 tokenId) public view override returns (string memory) {
          string memory _tokenURI = super.tokenURI(tokenId);
          return bytes(_tokenURI).length > 0
                    ? string(abi.encodePacked(_tokenURI, ".json"))
                    : "";
     }

     function utilize(uint256 id) external {
          require(ownerOf(id) == msg.sender, "Not the NFT owner.");
          require(!utilized[id], "Token already utilized.");
          utilized[id] = true;
   }
}