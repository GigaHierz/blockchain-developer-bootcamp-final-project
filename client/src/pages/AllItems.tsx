import { Link } from "react-router-dom";
import { Contract } from "ethers";
import Page from "../components/shared/Page";
import ItemList from "../components/ItemList";
import FlexColumn from "../components/shared/FlexColumn";
import { Heading } from "@chakra-ui/layout";

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
      <Heading size="5" renderAs="h1">
        All Your Octopussessss
      </Heading>
      <FlexColumn>
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
