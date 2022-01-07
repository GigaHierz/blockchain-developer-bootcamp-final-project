# Avoiding Common Attacks

- Use Modifiers Only for Validations
- Built-In Variable Names
- Use Specific Compiler Pragma
- MAX_SUPPLY of NFTs is set to 50000

It was a bit hard to focus on the security and attacks as this is just to play around. i feel like i made it pretty unsafe with everybody beeing able to mint. But as it is only possible to mint under certain conditions (eg only one orignal and then only with pals) I consider it okay.

- SWC-128 - arrays that are looped over are always given a size, also MAX_PER_MINT is set
- SWC-101 - use of SafeMath Library
