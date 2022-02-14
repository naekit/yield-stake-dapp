// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YietToken is ERC20 {
    constructor() public ERC20("Yiet Token", "YIET") {
        _mint(msg.sender, 1_000_000_000000000000000000);
    }
}
