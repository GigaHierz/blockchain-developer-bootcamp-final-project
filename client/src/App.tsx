import { ChakraProvider, Text } from "@chakra-ui/react";
import { ChainId, useEthers } from "@usedapp/core";
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
  const { account, chainId } = useEthers();
  const provider = useRef<ethers.providers.InfuraProvider>();
  const [contract, setContract] = useState(useRef<Contract>({} as Contract));
  const [chainState, setChainState] = useState("");
  //   const ipfsGateway = `https://ipfs.io/ipfs`;
  //   const contract = useRef<Contract>({} as Contract);

  useEffect(() => {
    const setup = async () => {
      provider.current = new ethers.providers.InfuraProvider(
        "rinkeby",
        process.env.REACT_APP_INFURA_PROJECT_ID
      );
      const wallet = new ethers.Wallet(
        process.env.REACT_APP_PRIVATE_KEY as any,
        provider.current
      );

      const signer = wallet.connect(provider.current);

      const contractAddress = NftContract.networks[4].address;

      setContract((contract) => ({
        ...contract,
        current: new ethers.Contract(contractAddress, NftContract.abi, signer),
      }));
    };
    setup();
  }, []);

  const checkMMConnection = () => {
    if (chainId !== ChainId.Rinkeby) {
      setChainState(
        "To be able to use this App please connect to the Rinkeby Network"
      );
    } else {
      setChainState("");
    }

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
  };

  checkMMConnection();

  return (
    <ChakraProvider>
      <FlexColumn>
        <ConnectButton />
        <Text color="#c83f3f">{chainState}</Text>
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
            <Route path="*" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </FlexColumn>
    </ChakraProvider>
  );
}
