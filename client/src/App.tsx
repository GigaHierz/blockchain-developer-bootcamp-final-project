import { ChakraProvider } from "@chakra-ui/react";
import FlexColumn from "./components/shared/FlexColumn";
import Page from "./components/shared/Page";
import ConnectButton from "./components/metamask/ConnectButton";



export default function App() {
  return (
    // lets us use Chakra UI syntax across our app:

    <ChakraProvider >
      <Page>
        <FlexColumn>
          <ConnectButton />   
        </FlexColumn>
      </Page>
    </ChakraProvider>
  )
}
