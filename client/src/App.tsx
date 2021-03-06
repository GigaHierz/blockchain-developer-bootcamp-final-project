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
  const { account, chainId } = useEthers();
  const provider = useRef<ethers.providers.InfuraProvider>();
  const [contract, setContract] = useState(useRef<Contract>({} as Contract));
  const [chainState, setChainState] = useState("");

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

    if (chainId && chainId !== 3) {
      setChainState(
        "To be able to use this App please connect to the Rinkeby Network"
      );
    }
  }, []);

  // reload page if chain is changed
  (window as any).ethereum?.on("networkChanged", (_chainId: number) => {
    if (Number(_chainId) !== 4) {
      setChainState(
        "To be able to use this App please connect to the Rinkeby Network"
      );
    } else {
      setChainState("");
    }
  });

  // reload page if account is changed
  (window as any).ethereum?.on("accountsChanged", () => {
    window.location.reload();
  });

  (function (l) {
    if (l.search[1] === "/") {
      var decoded = l.search
        .slice(1)
        .split("&")
        .map(function (s) {
          return s.replace(/~and~/g, "&");
        })
        .join("?");
      window.history.replaceState(
        null,
        "",
        l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  })(window.location);

  return (
    <ChakraProvider>
      <FlexColumn>
        <ConnectButton />
        <Text id="connection" color="#c83f3f" fontSize="small">
          <br />
          <br />
          {!account && !chainState && (
            <span>
              <a
                href="https://metamask.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Please connect to MetaMask to use this App.
              </a>
              If you are connected, please change to the Rinkeby Testnet.
            </span>
          )}
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
