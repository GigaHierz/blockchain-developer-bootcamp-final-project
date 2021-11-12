import { ChakraProvider } from "@chakra-ui/react";
import FlexColumn from "./components/shared/FlexColumn";
import Page from "./components/shared/Page";
import Home  from "./pages/Home";
import ConnectButton from "./components/metamask/ConnectButton";
import {  useEthers } from '@usedapp/core'

export default function App() {

  const { chainId,active  } = useEthers();


  // Todo: alert when chainId is updated
  const  checkChainId = () =>  {
    if( chainId !== 3 && active ) {
      alert('To be able to use this App please connect to the RopstenNetwork')
    }
  }
  checkChainId()

  return (
    // lets us use Chakra UI syntax across our app:

    <ChakraProvider >
      <Page>
        <FlexColumn>
          <ConnectButton />   
          <Home />
        </FlexColumn>
      </Page>
    </ChakraProvider>
  )
}
