import { Box, Button, Container, Flex } from "@chakra-ui/react";
import { Contract } from "ethers";
import { useState } from "react";

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
    await getTokenUriList();
  };

  const getTokenUriList = async () => {
    let result: string[] = [];
    await contract
      ?.tokensOfOwner(account)
      .then((tokenUris: any[]) => {
        console.log(tokenUris);

        tokenUris.map(async (tokenUri: string, index: number) => {
          result.push(ipfsGateway + tokenUri);
        });
      })
      .then(() => setTokenList(result))
      .then(() => {
        const list = document.getElementById("octopusList");
        tokenList.map((link: string, index: number) => {
          if (link) {
            const a = document.createElement("a");
            a.href = link;
            a.id = "image" + index;
            a.target = "_blank";
            a.textContent = "OCTOUPS" + index;
            a.style.color = "#00000";
            list?.appendChild(a);
          }
        });
      })
      .catch((err: Error) => {
        console.log("Failed with error: " + err);
      });
  };

  return (
    <Container width="40vh" height="50vh">
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        id="octopusList"
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
          onClick={showList}
        >
          Show List
        </Button>
        <Box id="octopusList"></Box>
      </Flex>
    </Container>
  );
}
