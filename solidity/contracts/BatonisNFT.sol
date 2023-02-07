// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract BatonisNFT is ERC721Enumerable, Ownable {
    using ECDSA for bytes32;

    string private _baseTokenURI;

    string private _signSalt;
    address private _signAddress;

    address private _withdrawAddress;

    bool public saleState = false;
    uint256 public gasPriceLimit = 200 gwei;
    uint256 public price = 0.01 ether;

    IERC20 public paymentToken;

    uint256 public maxElements = 120;

    // Signature check
    modifier onlySigned(bytes memory signature) {
        bytes32 hash = keccak256(abi.encode(msg.sender, _signSalt)).toEthSignedMessageHash();
        require(hash.recover(signature) == _signAddress, "Invalid signature");
        _;
    }

    constructor(
        string memory name,
        string memory symbol,
        string memory baseTokenURI
    ) ERC721(name, symbol) {
        setSigner(owner());
        setWithdraw(owner());
        setBaseURI(baseTokenURI);
    }

    // Override so the openzeppelin tokenURI() method will use this method to create the full tokenURI instead
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    // Mint
    function mint(bytes memory signature) public onlySigned(signature){
        uint256 count = 1;
        uint256 amountToPay = price * count;
        uint256 supply = totalSupply();

        require(tx.origin == msg.sender,        "Not allowed");
        require(saleState == true,              "Sale not live");
        require(supply + count <= maxElements, "Exceeds maximum mint supply");
        require(tx.gasprice <= gasPriceLimit,   "Gas price error");

        require(paymentToken.allowance(msg.sender, address(this)) >= amountToPay, "Approve contract for spending your funds");
        require(paymentToken.transferFrom(msg.sender, address(this), amountToPay), "Insufficient funds");

        _mintOne(msg.sender);
    }

    // Mint next item to passed address
    function _mintOne(address _to) private {
        _safeMint(_to, totalSupply() + 1);
    }

    // Withdraw balance
    function withdrawBalance() public onlyOwner {
        uint256 _balance = paymentToken.balanceOf(address(this));

        require(_balance > 0, "Balance zero");
        require(paymentToken.transfer(_withdrawAddress, _balance), "Transfer failed");
    }

    // Set signer
    function setSigner(address signer) public onlyOwner {
        _signAddress = signer;
    }

    // Set salt
    function setSignSalt(string memory salt) public onlyOwner {
        _signSalt = salt;
    }

    // Change sale price
    function changePrice(uint256 _price) public onlyOwner {
        price = _price;
    }

    // Set withdraw address
    function setWithdraw(address withdrawAddress) public onlyOwner {
        _withdrawAddress = withdrawAddress;
    }

    // Update base meta uri
    function setBaseURI(string memory baseTokenURI) public onlyOwner {
        _baseTokenURI = baseTokenURI;
    }

    // Update sale state
    function setSaleState(bool _saleState) public onlyOwner {
        saleState = _saleState;
    }

    // Update maximum allowed gas
    function setGasLimit(uint256 amount) public onlyOwner {
        gasPriceLimit = amount;
    }

    // Update payment token address
    function setPaymentToken(address token) public onlyOwner {
        paymentToken = IERC20(token);
    }

    // Update count max elements
    function setMaxElement(uint256 amount) public onlyOwner {
        maxElements = amount;
    }
}