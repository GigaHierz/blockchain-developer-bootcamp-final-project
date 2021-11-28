import { Contract, ethers } from "ethers";
import { useState, useRef, useEffect } from "react";
import { Container } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import NftContract from "../contracts/Nft.json";
import ItemList from "../components/ItemList";
import CreateItem from "../components/CreateItem";

export default function Home() {
  // Input variable

  const { account } = useEthers();

  //   const ipfsGateway = `https://ipfs.io/ipfs`;
  const provider = useRef<ethers.providers.InfuraProvider>();
  //   const contract = useRef<Contract>({} as Contract);

  const [contract, setContract] = useState(useRef<Contract>({} as Contract));

  useEffect(() => {
    // this is only run once on component mounting

    const setup = async () => {
      provider.current = new ethers.providers.InfuraProvider(
        "ropsten",
        process.env.REACT_APP_INFURA_PROJECT_ID
      );
      const wallet = new ethers.Wallet(
        process.env.REACT_APP_PRIVATE_KEY as any,
        provider.current
      );
      const signer = wallet.connect(provider.current);
      //   const network = await provider.getNetwork();

      // TODO: Figure out chainID
      const contractAddress = NftContract.networks[3].address;

      // instantiate contract instance and assign to component ref variable
      // contract.current = new ethers.Contract(
      //   contractAddress,
      //   NftContract.abi,
      //   signer
      // );

      setContract((contract) => ({
        ...contract,
        current: new ethers.Contract(contractAddress, NftContract.abi, signer),
      }));
    };
    setup();
  }, []);

  return (
    <Container
      display="flex"
      alignItems="center"
      flexDirection="column"
      borderRadius="xl"
      py="0"
    >
      <CreateItem contract={contract.current}></CreateItem>
      <ItemList contract={contract.current} account={account}></ItemList>
    </Container>
  );
}
