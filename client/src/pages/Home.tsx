import { Container } from "@chakra-ui/react";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";

import CreateItem from "../components/CreateItem";
import Page from "../components/shared/Page";

export default function Home({
  contract,
  provider,
  account,
}: {
  contract: Contract;
  provider: ethers.providers.InfuraProvider | undefined;
  account: string | null | undefined;
}) {
  const [state, setState] = useState(true);

  // useEffect(() => {
  //   checkIfCallerIsNew();
  // });
  // const checkIfCallerIsNew = async () => {
  //   await contract
  //     .tokensOfOwner(account)
  //     .then((data: number[]) => {
  //       if (data.length > 0) {
  //         setState(false);
  //       }
  //       setState(true);
  //     })
  //     .catch((err: Error) => {
  //       console.log("Failed with error: " + err);
  //     });
  // };

  return (
    <Page>
      <Container
        display="flex"
        alignItems="center"
        flexDirection="column"
        borderRadius="xl"
        py="0"
      >
        {state && (
          <CreateItem
            contract={contract}
            account={account}
            provider={provider}
          ></CreateItem>
        )}
      </Container>
    </Page>
  );
}
