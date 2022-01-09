import { Heading } from "@chakra-ui/layout";
import { Contract } from "ethers";

import Page from "../components/shared/Page";
import ItemList from "../components/ItemList";
import FlexColumn from "../components/shared/FlexColumn";

const AllItems = ({
  contract,
  account,
}: {
  contract: Contract;
  account: string | null | undefined;
}) => {
  return (
    <Page>
      <FlexColumn>
        <Heading size="5" renderas="h1">
          All Your Octopussessss
        </Heading>
        <ItemList contract={contract} account={account} />
      </FlexColumn>
    </Page>
  );
};

export default AllItems;
