import { Box, Button, Link } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { BigNumber, Contract } from "ethers";
import { useState } from "react";

import { hexToDec } from "../shared/HexEncoder";
import Nft from "./nfts/Nft";

const StyledLink = styled(Link)`
  color: #4a4a4a;
  margin: 5px;
  backgroundcolor: #666666;
  border="1px solid transparent"
`;

export default function ItemList({
  contract,
  account,
  ipfsGateway,
}: {
  contract: Contract;
  account: string | null | undefined;
  ipfsGateway: string;
}) {
  const [metadataUrl, setMetadataUrl] = useState(`Loading...`);
  const [tokenList, setTokenList] = useState<string[]>([]);

  const showList = async () => {
    const tokenIds: BigNumber[] = await contract?.tokensOfOwner(account);
    let result: string[] = [];

    tokenIds.map(async (token: BigNumber, index: number) => {
      await contract?.tokenURI(hexToDec(token._hex)).then((token: string) => {
        result.push(token);
      });
    });

    setTokenList(result);
    console.log(tokenList);
  };

  return (
    <Box width="40vh" display="flex" flexDir="column" align-items="center">
      <Button
        margin="10px"
        border="1px solid transparent"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "blue.400",
        }}
        borderRadius="xl"
        width="10vh"
        onClick={showList}
      >
        Show List
      </Button>
      <Box
        padding="10px"
        display="grid"
        grid-template-columns="1fr 1fr 1fr 1fr"
        alignItems="center"
        flexDirection="row"
        flex-wrap="wrap"
        width="90%"
      >
        {tokenList.map((color, index) => {
          if (color) {
            return (
              <StyledLink
                href={color}
                target="_blank"
                rel="noreferrer"
                key={index}
              >
                your Octopus No: {index}{" "}
              </StyledLink>
            );
            // return <Nft nft={color} key={index} />;
          }

          <p>{color}</p>;
        })}
      </Box>
    </Box>
  );
}
