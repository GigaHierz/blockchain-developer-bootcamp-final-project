import { Container } from "@chakra-ui/react";
import { Contract, ethers } from "ethers";

import CreateItem from "../components/CreateItem";
import Page from "../components/shared/Page";

export default function Handshake({
  contract,
  provider,
  account,
}: {
  contract: Contract;
  provider: ethers.providers.InfuraProvider | undefined;

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
        <CreateItem
          contract={contract}
          account={account}
          provider={provider}
          step={true}
        ></CreateItem>
      </Container>
    </Page>
  );
}
