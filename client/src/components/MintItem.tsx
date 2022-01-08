import { Box, Button, Text } from "@chakra-ui/react";
import { Contract } from "ethers";
import { useState } from "react";

import Token from "../models/Token";
import { addItemToIPFS } from "../shared/IpfsFileUploader";
import { useEthers } from "@usedapp/core";

export default function MintItem({
  contract,
  name,
  value,
  img,
}: {
  contract: Contract;
  name: string;
  value: string;
  img?: any;
}) {
  const { account } = useEthers();

  const baseURI = "https://ipfs.infura.io/ipfs/";
  const [token, setToken] = useState({} as Token);
  const [status, setStatus] = useState("");

  const createOctopus = async () => {
    if (name) {
      await addItemToIPFS(img)
        .then((imageUrl) => {
          if (imageUrl) {
            setToken(() => ({
              value,
              name,
              imageUrl,
            }));
          }
          return { value, name, imageUrl };
        })
        .then(async (tk) => {
          if (token && token.value) {
            console.log("token");

            const jsonObject = JSON.stringify(tk || token);
            await addItemToIPFS(jsonObject).then(async (url) => {
              const urlTemp = url?.replace(baseURI, "");
              console.log(url);

              if (urlTemp) {
                await mint(urlTemp);
              }
            });
          }
        });
    }
  };

  const mint = async (tokenUri: string): Promise<Token | undefined> => {
    console.log(contract.address);

    if (tokenUri) {
      setStatus("...isLoading");
      return await contract
        .mint(account, tokenUri)
        .then((result: any) => {
          console.log(result);
          setStatus(
            `The NFT  was minted.`
            // `The NFT ${result.name} was minted. Find the <a href="${
            //   baseURI + tokenUri
            // }">metadata</a> and <a href="${
            //   result.imageUrl
            // }">the image</a> on IPFS.`
          );
        })
        .catch((err: Error) => {
          setStatus(`There was an error.`);
          console.log("Failed with error: " + err);
        });
      // let temp = await tx3.wait();
      // console.log(temp);
      // return temp;
      //   setColorList((prevColors) => [...prevColors, token]);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Button
        border="1px solid transparent"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "blue.400",
        }}
        borderRadius="xl"
        width="10vh"
        onClick={createOctopus}
      >
        Mint Item
      </Button>
      <Text>{status}</Text>
    </Box>
  );
}
