import { Container } from "@chakra-ui/react";
import { Contract } from "ethers";

import CreateItem from "../components/CreateItem";
import Page from "../components/shared/Page";

export default function Home({
  contract,
  account,
}: {
  contract: Contract;
  account: string | null | undefined;
}) {
  return (
    <Page>
      <Container
        display="flex"
        alignItems="center"
        flexDirection="column"
        borderRadius="xl"
        py="0"
      >
        <CreateItem contract={contract} account={account}></CreateItem>
      </Container>
    </Page>
  );
}
