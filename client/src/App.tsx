import { ChakraProvider, Container, Switch } from "@chakra-ui/react";
import FlexColumn from "./components/shared/FlexColumn";
import Home from "./pages/Home";
import ConnectButton from "./components/metamask/ConnectButton";
import { useEthers } from "@usedapp/core";
import { Contract, ethers } from "ethers";
import { useState, useRef, useEffect } from "react";
import NftContract from "./contracts/Nft.json";
import Navigation from "./components/shared/Navigation";
import Footer from "./components/shared/Footer";
import ItemView from "./pages/ItemView";
import AllItems from "./pages/AllItems";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  const { chainId, active } = useEthers();
  const ipfsGateway = `https://ipfs.io/ipfs`;
  const { account } = useEthers();
  //   const ipfsGateway = `https://ipfs.io/ipfs`;
  const provider = useRef<ethers.providers.InfuraProvider>();
  //   const contract = useRef<Contract>({} as Contract);
  const [contract, setContract] = useState(useRef<Contract>({} as Contract));

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
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home contract={contract.current} account={account} />}
            />

            <Route
              path="/item/:itemId"
              element={<ItemView ipfsGateway={ipfsGateway} />}
            />

            {/* <Route path="/contact">
              <Navigation />
              <Contact />
              <Footer />
            </Route>
            <Route path="/about">
              <Navigation />
              <About />
              <Footer />
            </Route> */}
            <Route
              path="/all"
              element={
                <AllItems
                  contract={contract.current}
                  account={account}
                  ipfsGateway={ipfsGateway}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </FlexColumn>
    </ChakraProvider>
  );
}
