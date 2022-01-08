import { Heading } from "@chakra-ui/layout";
import { Contract } from "ethers";

import Page from "../components/shared/Page";
import ItemList from "../components/ItemList";
import FlexColumn from "../components/shared/FlexColumn";

const AllItems = ({
  contract,
  account,
  ipfsGateway,
}: {
  contract: Contract;
  account: string | null | undefined;
  ipfsGateway: string;
}) => {
  return (
    <Page>
      <FlexColumn>
        <Heading size="5" renderas="h1">
          All Your Octopussessss
        </Heading>
        <ItemList
          contract={contract}
          account={account}
          ipfsGateway={ipfsGateway}
        />
      </FlexColumn>
    </Page>
  );
};

export default AllItems;
