import { Box, Text } from "@chakra-ui/react";
import { BigNumber, Contract } from "ethers";
import { useEffect, useState } from "react";

import { hexToDec, hexToRgb } from "../shared/HexEncoder";
import svg from "../assets/octopus.svg";

import TokenMetaData from "../models/TokenMetaData";
import base64SvgToBase64Png from "../shared/SvgToPng";
import { getItemFromIPFS } from "../service/IpfsService";

export default function ItemList({
  contract,
  account,
}: {
  contract: Contract;
  account: string | null | undefined;
}) {
  const [tokenListLength, setTokenListLength] = useState<number>();
  const [tokenList, setTokenList] = useState<string[]>([]);
  const [tokenMetaList, setTokenMetaList] = useState<TokenMetaData[]>(
    [] as TokenMetaData[]
  );
  // const [colorList, setColorList] = useState<string[]>([]);
  const baseURI = "https://ipfs.io/ipfs/";

  useEffect(() => {
    if (account && tokenList.length === 0) {
      loadList();
    }
    if (tokenList.length === tokenListLength && tokenMetaList.length === 0) {
      getTokenMeta();
    }
    if (tokenList.length === tokenMetaList.length) {
      showList();
    }
  });

  const loadList = async () => {
    await contract?.tokensOfOwner(account).then((tokenIds: BigNumber[]) => {
      setTokenListLength(tokenIds.length);
      tokenIds.map(async (token: BigNumber) => {
        await contract?.tokenURI(hexToDec(token._hex)).then((token: string) => {
          setTokenList((tokenList) => [...tokenList, token]);
        });
      });
    });
  };

  const getTokenMeta = async () => {
    tokenList?.map(async (token, index) => {
      await getItemFromIPFS(token.replace(baseURI, "")).then((result) => {
        let tokenMetaData: TokenMetaData = JSON.parse(result || "");
        if (tokenMetaData) {
          setTokenMetaList((tokenMetaList) => [
            ...tokenMetaList,
            tokenMetaData,
          ]);
        }
      });
    });
  };
  const showList = async () => {
    tokenMetaList?.map(async (tokenMetaData, index) => {
      let form = document.getElementById(`form-${index}`);
      form?.setAttribute("key", "form" + index.toString());

      let img = document.createElement("img");
      img.setAttribute("id", "nft-" + index.toString());
      img.setAttribute("key", "nft" + index.toString());

      base64SvgToBase64Png(
        svg,
        img,
        200,
        tokenMetaData.properties.name,
        tokenMetaData.properties.value
      )
        .then(() => {
          let rgb = hexToRgb(tokenMetaData.properties.value);

          if (
            img.style.background === tokenMetaData.properties.value ||
            img.style.background === rgb
          ) {
            return;
          }
        })
        .then(() => {
          if (form && form.hasChildNodes()) {
            return;
          } else {
            form?.appendChild(img);
          }
        });
    });
  };

  return (
    <Box width="80vh" display="flex" flexDir="column" align-items="center">
      <Box padding="10px" display="flex" flex-wrap="wrap" flexDir="row">
        {tokenMetaList.length > 0 &&
          tokenMetaList.map((token, index) => {
            if (token) {
              return (
                <a href={tokenList[index]} key={"box" + index.toString()}>
                  <Box
                    id={"form-" + index.toString()}
                    margin="20px"
                    padding="10px"
                    border="1.5px solid #ffff11"
                    key={"form" + index.toString()}
                  ></Box>
                  <Text key={"name-" + index.toString()}>
                    {token.properties.name}
                  </Text>
                </a>
              );
            } else {
              return <p>loading...</p>;
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
