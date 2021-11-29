import { Container } from "@chakra-ui/react";
import ItemList from "../components/ItemList";
import CreateItem from "../components/CreateItem";
import { Contract } from "ethers";
import Page from "../components/shared/Page";

export default function Home({
  contract,
  account,
}: {
  contract: Contract;
  account: string | null | undefined;
}) {
  // Input variable

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
