import { Box, Button, Text } from "@chakra-ui/react";
import { Contract } from "ethers";
import { useState } from "react";

import Token from "../models/Token";
import { addItemToIPFS } from "../service/IpfsFileUploader";
import TokenMetaData from "../models/TokenMetaData";

export default function MintItem({
  contract,
  account,
  name,
  value,
  img,
}: {
  contract: Contract;
  account: string | null | undefined;
  name: string;
  value: string;
  img?: any;
}) {
  const baseURI = "https://ipfs.infura.io/ipfs/";
  const [token, setToken] = useState({} as Token);
  const [status, setStatus] = useState("");

  const createMetadataForOctopus = async () => {
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

            let meta: TokenMetaData = {
              title: "Octopus " + name,
              type: "Octopus",
              properties: {
                name: tk.name || token.name,
                image: tk.value || token.value,
                value: tk.imageUrl || token.imageUrl,
              },
            };

            const jsonObject = JSON.stringify(meta);
            await addItemToIPFS(jsonObject).then(async (url) => {
              const urlTemp = url?.replace(baseURI, "");
              console.log(url);

              if (urlTemp) {
                await mint(urlTemp);
              }
            });
          }
        })
        .catch((err) => {
          console.log("Failed with error: " + err);
        });
    }
  };

  const mint = async (tokenUri: string): Promise<Token | undefined> => {
    if (tokenUri) {
      setStatus("...isLoading");

      console.log(contract);

      return await contract
        .mint(account, tokenUri)
        .then((result: any) => {
          console.log(token);
          setStatus(`The NFT  was minted.`);
        })
        .catch((err: Error) => {
          console.log("Failed with error: " + err);
        });
      // await tx3.wait()
      // console.log(tx3);
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
        backgroundColor="#0d6efd"
        className="btn btn-block btn-primary"
        onClick={createMetadataForOctopus}
      >
        Mint Item
      </Button>
      <Text>{status}</Text>
    </Box>
  );
}
