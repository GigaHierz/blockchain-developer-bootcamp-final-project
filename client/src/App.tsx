import { ChakraProvider } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { Contract, ethers } from "ethers";
import { useState, useRef, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AllItems from "./pages/AllItems";
import FlexColumn from "./components/shared/FlexColumn";
import ConnectButton from "./components/metamask/ConnectButton";
import NftContract from "./contracts/Nft.json";
import Mint from "./pages/Mint";
import Home from "./pages/Home";

export default function App() {
  const { chainId, active } = useEthers();
  const { account } = useEthers();
  const provider = useRef<ethers.providers.InfuraProvider>();
  const [contract, setContract] = useState(useRef<Contract>({} as Contract));
  //   const ipfsGateway = `https://ipfs.io/ipfs`;
  //   const contract = useRef<Contract>({} as Contract);

  // Todo: alert when chainId is updated
  const checkChainId = () => {
    if (chainId !== 3 && active) {
      // alert('To be able to use this App please connect to the RopstenNetwork')
    }
  };
  checkChainId();

  useEffect(() => {
    // this is only run once on component mounting

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

  return (
    <ChakraProvider>
      <FlexColumn>
        <ConnectButton />
        <BrowserRouter basename="/blockchain-developer-bootcamp-final-project">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/mint"
              element={<Mint contract={contract.current} />}
            />

            <Route
              path="/all"
              element={
                <AllItems contract={contract.current} account={account} />
              }
            />
          </Routes>
        </BrowserRouter>
      </FlexColumn>
    </ChakraProvider>
  );
}
