import { Container } from "@chakra-ui/react";
import { Contract } from "ethers";

import CreateItem from "../components/mintItem/CreateItem";
import Page from "../components/shared/Page";

export default function MintPage({ contract }: { contract: Contract }) {
  return (
    <Page>
      <Container
        display="flex"
        alignItems="center"
        flexDirection="column"
        borderRadius="xl"
        py="0"
      >
        <CreateItem contract={contract}></CreateItem>
      </Container>
    </Page>
  );
}
