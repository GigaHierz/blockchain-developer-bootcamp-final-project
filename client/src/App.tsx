import { ChakraProvider, Text } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { Contract, ethers } from "ethers";
import { useState, useRef, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NftContract from "./contracts/Nft.json";
import MintPage from "./pages/MintPage";
import HomePage from "./pages/HomePage";
import ItemsListPage from "./pages/ItemsListPage";
import FlexColumn from "./components/shared/FlexColumn";
import ConnectButton from "./components/metamask/ConnectButton";

export default function App() {
  const { account } = useEthers();
  const provider = useRef<ethers.providers.InfuraProvider>();
  const [contract, setContract] = useState(useRef<Contract>({} as Contract));
  const [chainState, setChainState] = useState("");
  //   const ipfsGateway = `https://ipfs.io/ipfs`;
  //   const contract = useRef<Contract>({} as Contract);

  useEffect(() => {
    // this is only run once on component mounting

    const setup = async () => {
      provider.current = new ethers.providers.InfuraProvider(
        "rinkeby",
        process.env.REACT_APP_INFURA_PROJECT_ID
      );
      const wallet = new ethers.Wallet(
        process.env.REACT_APP_PRIVATE_MM_KEY as any,
        provider.current
      );
      const signer = wallet.connect(provider.current);
      //   const network = await provider.getNetwork();

      // TODO: Figure out chainID
      const contractAddress = NftContract.networks[4].address;

      setContract((contract) => ({
        ...contract,
        current: new ethers.Contract(contractAddress, NftContract.abi, signer),
      }));
    };
    setup();
  }, []);

  // reload page if chain is changed
  (window as any).ethereum.on("networkChanged", (chainId: number) => {
    if (Number(chainId) !== 4) {
      setChainState(
        "To be able to use this App please connect to the Rinkeby Network"
      );
    } else {
      setChainState("");
    }
  });

  // reload page if account is changed
  (window as any).ethereum.on("accountsChanged", () => {
    window.location.reload();
  });

  return (
    <ChakraProvider>
      <FlexColumn>
        <ConnectButton />
        <Text color="#c83f3f" fontSize="small">
          {chainState}
        </Text>
        <BrowserRouter basename="/blockchain-developer-bootcamp-final-project">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/mint"
              element={<MintPage contract={contract.current} />}
            />

            <Route
              path="/all"
              element={
                <ItemsListPage contract={contract.current} account={account} />
              }
            />
          </Routes>
        </BrowserRouter>
      </FlexColumn>
    </ChakraProvider>
  );
}
