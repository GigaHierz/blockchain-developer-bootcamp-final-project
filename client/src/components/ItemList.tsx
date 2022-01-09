import { Box } from "@chakra-ui/react";
import { BigNumber, Contract } from "ethers";
import { useEffect, useState } from "react";

import { hexToDec } from "../shared/HexEncoder";
import { StyledLink } from "./shared/StyledLink";

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
      tokenIds.map(async (token: BigNumber) => {
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
          tokenList.map((tokenUri, index) => {
            if (tokenUri) {
              return (
                <StyledLink
                  to={tokenUri}
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
