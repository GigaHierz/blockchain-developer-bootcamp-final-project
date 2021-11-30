import { useParams } from "react-router-dom";

import FlexColumn from "../components/shared/FlexColumn";
import Page from "../components/shared/Page";
import Image from "../components/shared/Image";

const ItemView = ({ ipfsGateway }: { ipfsGateway: string }) => {
  let { itemId } = useParams();

  return (
    <Page>
      <FlexColumn>
        <Image id={ipfsGateway + itemId}>
          <img src={`${ipfsGateway}/${itemId}`}></img>
        </Image>
      </FlexColumn>
    </Page>
  );
};

export default ItemView;
