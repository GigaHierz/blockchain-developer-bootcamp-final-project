import { Box, Button, Text } from "@chakra-ui/react";
import { Contract } from "ethers";
import { useState } from "react";
import Token from "../models/Token";
import { addItemToIPFS } from "../shared/IpfsFileUploader";
// import uploadImage from "../service/FileUploadService";
import png from "../assets/octopus.png";
import FileUploadService from "../service/FileUploadService";
import uploadImage from "../service/FileUploadService";

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
  const baseURI = "https://ipfs.infura.io/ipfs/";
  const [token, setToken] = useState({} as Token);
  const [status, setStatus] = useState("");

  const createMetadataForOctopus = async () => {
    if (name) {
      console.log("name entred");

      uploadImage({ path: png, name: "octopussy" });

      await addItemToIPFS(img)
        .then(async (imageUrl) => {
          console.log("ipfs");

          if (imageUrl) {
            console.log("imageUrl");

            setToken(() => ({
              value,
              name,
              imageUrl,
            }));
          }
        })
        .then(async () => {
          if (token && token.value) {
            console.log("token");

            const jsonObject = JSON.stringify(token);
            await addItemToIPFS(jsonObject).then(async (url) => {
              const urlTemp = url?.replace(baseURI, "");
              console.log(urlTemp);

              if (urlTemp) {
                const tx1 = await mint(urlTemp);
              }
            });
          }
        });

      // TODO: Create Image and save to IPFS
      // const ImageUrl = await addItemToIPFS(Image);
    }
  };

  const mint = async (tokenUri: string): Promise<Token | undefined> => {
    if (tokenUri) {
      setStatus("...isLoading");
      return await contract.mint(tokenUri).then((result: any) => {
        console.log(token);
        setStatus(
          `The NFT  was minted.`
          // `The NFT ${result.name} was minted. Find the <a href="${
          //   baseURI + tokenUri
          // }">metadata</a> and <a href="${
          //   result.imageUrl
          // }">the image</a> on IPFS.`
        );
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
        onClick={createMetadataForOctopus}
      >
        Mint Item
      </Button>
      <Text>{status}</Text>
    </Box>
  );
}
