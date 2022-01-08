import { useParams } from "react-router-dom";

import FlexColumn from "../components/shared/FlexColumn";
import Page from "../components/shared/Page";

const ItemView = ({ ipfsGateway }: { ipfsGateway: string }) => {
  let { itemId } = useParams();

  return (
    <Page>
      <FlexColumn>
        <img src={`${ipfsGateway}/${itemId}`} alt="octopus" />
      </FlexColumn>
    </Page>
  );
};

export default ItemView;
