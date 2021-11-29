import { Image } from "react-bulma-components";
import { useParams } from "react-router-dom";

import FlexColumn from "../components/shared/FlexColumn";
import Page from "../components/shared/Page";

const ItemView = ({ ipfsGateway }: { ipfsGateway: string }) => {
  let { itemId } = useParams();

  return (
    <Page>
      <FlexColumn>
        <Image src={`${ipfsGateway}/${itemId}`} />
      </FlexColumn>
    </Page>
  );
};

export default ItemView;
