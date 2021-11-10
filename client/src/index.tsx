import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChainId, Config, DAppProvider, useEtherBalance, useEthers } from '@usedapp/core'
const dotenv = require("dotenv")
dotenv.config()

const config: Config = {
  readOnlyChainId: ChainId.Ropsten,
  readOnlyUrls: {
    [ChainId.Ropsten]: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
  },
}


ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

