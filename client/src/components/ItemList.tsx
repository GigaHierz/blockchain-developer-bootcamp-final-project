import { Box, Button, Link } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { BigNumber, Contract } from "ethers";
import { useEffect, useState } from "react";

import { hexToDec } from "../shared/HexEncoder";

const StyledLink = styled(Link)`
  color: #4a4a4a;
  margin: 5px;
  backgroundcolor: #666666;
  border="1px solid transparent"
`;

export default function ItemList({
  contract,
  account,
}: {
  contract: Contract;
  account: string | null | undefined;
}) {
  const [tokenList, setTokenList] = useState<string[]>([]);

  useEffect(() => {
    if (account && tokenList.length === 0) {
      showList();
    }
  });

  const showList = async () => {
    await contract?.tokensOfOwner(account).then((tokenIds: BigNumber[]) => {
      tokenIds.map(async (token: BigNumber, index: number) => {
        await contract?.tokenURI(hexToDec(token._hex)).then((token: string) => {
          setTokenList((tokenList) => [...tokenList, token]);
        });
      });
    });
  };

  return (
    <Box width="40vh" display="flex" flexDir="column" align-items="center">
      <Box
        padding="10px"
        display="grid"
        grid-template-columns="1fr 1fr 1fr 1fr"
        alignItems="center"
        flexDirection="row"
        flex-wrap="wrap"
        width="90%"
      >
        {tokenList.length > 0 &&
          tokenList.map((color, index) => {
            if (color) {
              return (
                <StyledLink
                  href={color}
                  target="_blank"
                  rel="noreferrer"
                  key={index}
                >
                  your Octopus No: {index}
                </StyledLink>
              );
            } else {
              return <p>Yloading...</p>;
            }
          })}

        {tokenList.length === 0 && (
          <p>
            You don't have any Octopus yet. Go{" "}
            <a
              href="/blockchain-developer-bootcamp-final-project/mint"
              color="#f87111"
            >
              mint
            </a>{" "}
            some...{" "}
          </p>
        )}
      </Box>
    </Box>
  );
}
