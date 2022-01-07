import { Box, Button, Text } from "@chakra-ui/react";
import { Contract, ethers } from "ethers";
import { useState } from "react";

import Token from "../models/Token";
import { addItemToIPFS } from "../service/IpfsFileUploader";
import TokenMetaData from "../models/TokenMetaData";

export default function MintItem({
  contract,
  provider,
  account,
  address,
  step,
  name,
  value,
  img,
}: {
  contract: Contract;
  provider: ethers.providers.InfuraProvider | undefined;
  account: string | null | undefined;
  address?: string;
  step?: boolean;
  name: string;
  value: string;
  img?: any;
}) {
  const baseURI = "https://ipfs.infura.io/ipfs/";
  const [token, setToken] = useState({} as Token);
  const [status, setStatus] = useState("");

  let mintEvent: any;

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
                imageUrl: tk.imageUrl || token.imageUrl,
                value: tk.value || token.value,
                parent1: account || null,
                parent2: address,
              },
            };

            const jsonObject = JSON.stringify(meta);
            await addItemToIPFS(jsonObject).then(async (url) => {
              const urlTemp = url?.replace(baseURI, "");
              console.log(url);

              if (urlTemp) {
                mintEvent = await mint(urlTemp);
                // mintEvent.watch(function (err: Error, result: any) {
                //   if (err) {
                //     setStatus(`There was an error.`);
                //     return;
                //   }
                //   console.log(result.args._value);
                //   // check that result.args._from is something then
                //   // display result.args._value in the UI and call
                //   // exampleEvent.stopWatching()
                // });
              }
            });
          }
        })
        .catch((err) => {
          console.log("Failed with error: " + err);
        });
    }
  };

  const mint = async (tokenUri: string): Promise<any> => {
    if (tokenUri) {
      setStatus("...isLoading");

      console.log(contract);

      if (step) {
        return await contract
          .handShake(account, address, tokenUri, value, {
            gasPrice: 100,
            gasLimit: 9000000,
          })
          .then((result: any) => {
            console.log(token);
            setStatus(`The NFT  was minted.`);
          })
          .catch((err: any) => {
            if (err.code === "INVALID_ARGUMENT") {
              setStatus(`PLease enter a valid ENS. `);
            } else {
              setStatus(
                `There was an error. Maybe you tried to shake hands againwith the same person? That is unfortunatly only possible once in here. `
              );
            }
            console.log("Failed with error: " + err);
          });
      } else {
        console.log(account, tokenUri, value);
        // let gasPrice = (await provider.getGasPrice()).toNumber() * 2

        await provider?.getGasPrice().then(async (price: any) => {
          let gasPrice = price.toNumber() * 2;

          console.log(gasPrice);
          console.log(typeof account);

          return await contract
            .mint(account, tokenUri.toString, value.toString, {
              gasPrice: 5000000,
              gasLimit: 5000000000,
            })
            .then((result: any) => {
              console.log(token);
              setStatus(`The NFT  was minted.`);
            })
            .catch((err: Error) => {
              setStatus(`There was an error.`);
              console.log("Failed with error: " + err);
            });
        });
      }
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
