import { ChainId, Config, DAppProvider } from "@usedapp/core";
import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.scss";
import App from "./App";

// const config: Config = {
//   readOnlyChainId: ChainId.Ropsten,
//   readOnlyUrls: {
//     [ChainId.Ropsten]: `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
//   },
//   supportedChains: [ChainId.Ropsten],
// };

const config: Config = {
  readOnlyChainId: ChainId.Rinkeby,
  readOnlyUrls: {
    [ChainId.Rinkeby]: `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
  },
  supportedChains: [
    ChainId.Rinkeby,
    ChainId.Ropsten,
    ChainId.Mainnet,
    ChainId.Kovan,
    ChainId.Goerli,
  ],
};

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
