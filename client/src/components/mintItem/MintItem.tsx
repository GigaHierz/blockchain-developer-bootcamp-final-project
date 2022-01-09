import { Box, Button, Text } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { Contract } from "ethers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Token from "../../models/Token";
import TokenMetaData from "../../models/TokenMetaData";
import { addItemToIPFS } from "../../shared/IpfsFileUploader";

export default function MintItem({
  contract,
  name,
  value,
  address,
  img,
  userKnown,
  inputError,
}: {
  contract: Contract;
  name: string;
  value: string;
  address?: string;
  img?: any;
  userKnown?: boolean;
  inputError: any;
}) {
  const { account } = useEthers();
  const navigate = useNavigate();

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
            let meta: TokenMetaData = {
              title: "Octopus " + name,
              type: "Octopus",
              properties: {
                name: tk.name || token.name,
                imageUrl: tk.imageUrl || token.imageUrl,
                value: tk.value || token.value,
                parent1: account || null,
                parent2: address,
              },
            };

            const jsonObject = JSON.stringify(meta);
            await addItemToIPFS(jsonObject).then(async (url) => {
              const urlTemp = url?.replace(baseURI, "");

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
    console.log(contract.address);

    if (tokenUri) {
      setStatus("...isLoading");

      if (userKnown) {
        return await contract
          .handShake(account, address, tokenUri, value)
          .then(() => {
            setStatus(`The NFT  was minted.`);
            setTimeout(() => navigate("/all"), 1000);
          })
          .catch((err: any) => {
            if (err.code === "INVALID_ARGUMENT") {
              setStatus(`PLease enter a valid ENS. `);
            } else {
              setStatus(
                `There was an error: ${err.error.error.body
                  .split("reverted:")[1]
                  .replace(
                    `"}}`,
                    ""
                  )}. Remeber, you can only shake hands once with a person. And the address you entered needs to have already created their own NFT. `
              );
            }
          });
      } else {
        return await contract
          .mint(account, tokenUri, value)
          .then(() => {
            setStatus(
              `The NFT  was minted.`
              // `The NFT ${result.name} was minted. Find the <a href="${
              //   baseURI + tokenUri
              // }">metadata</a> and <a href="${
              //   result.imageUrl
              // }">the image</a> on IPFS.`
            );
            setTimeout(() => navigate("/all"), 1000);
          })
          .catch((err: any) => {
            setStatus(
              `There was an error. ${err.error.error.body
                .split("reverted:")[1]
                .replace(`"}}`, "")}`
            );
            inputError(true);
            console.log("Failed with error: " + err);
          });
      }
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
