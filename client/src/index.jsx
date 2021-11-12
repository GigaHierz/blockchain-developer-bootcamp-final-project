import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChainId, Config, DAppProvider } from '@usedapp/core'


// const config: Config = {
//   readOnlyChainId: ChainId.Ropsten,
//   readOnlyUrls: {
//     [ChainId.Ropsten]: `https://ropsten.infura.io/v3/0d49b90057c740b0835bdc554e327181`,
//   },
//   supportedChains: [ChainId.Ropsten]
// }
const config: Config = {
  readOnlyChainId: ChainId.Mainnet,
  // readOnlyUrls: {
  //   [ChainId.Mainnet]: `https://ropsten.infura.io/v3/0d49b90057c740b0835bdc554e327181`,
  // },
  supportedChains: [ChainId.Mainnet, 5777, ChainId.Ropsten, 1337]
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

