import { Container, Text } from "@chakra-ui/react";

import Page from "../components/shared/Page";
import { StyledLink } from "../components/shared/StyledLink";

export default function HomePage() {
  return (
    <Page>
      <Container
        display="flex"
        alignItems="center"
        flexDirection="column"
        borderRadius="xl"
        py="0"
      >
        <br />
        <br />
        <Text>
          This is the Ocotpus Game. It is supposed to be fun and cute. That is
          the most important thing. Here you don't have to worry about making
          mistakes or losing money. This Dapp is supposed to make you feel more
          comfortable with MetaMask and minting and Nfts and maybe exploring the
          Etherscan.
        </Text>
        <Text>
          First you should <StyledLink to="mint">mint</StyledLink> your first
          NFT. This is a little Octopus baby. And that is going to be your OG
          Octopus. First you will only have this one that is yours and yours
          only.
        </Text>
        <br />
        <Text>
          But this game is also designed to motivate you to interact with other
          eople and other Ethereum Addresses. So here the "Flosse" comes into
          the game.
        </Text>
        <Text>
          We use "Flosse" as Octopusses don'T have hands and thats the german
          word for .... In German you can also say "Gib Flosse", when you want
          to give a high five to someone. So there is that..
        </Text>
        <br />
        <Text>
          Also: if you want to add the Ocoptusses to your metamask wallet follow
          this{" "}
          <a
            href="https://consensys.net/blog/metamask/how-to-add-your-custom-tokens-in-metamask/"
            target="_blank"
            rel="noreferrer"
            color="#ffff"
          >
            guide
          </a>
          .
        </Text>
        <br />
        <Text>
          You can also check out the contract on{" "}
          <a
            href="https://rinkeby.etherscan.io/address/0x52818719FC9E7d35fD2882344AfFa1f4fcA81874"
            target="_blank"
            rel="noopener noreferrer"
            color="#0000"
          >
            EtherScan
          </a>
          . In case you want to check out who else has some tokens.
        </Text>
      </Container>
    </Page>
  );
}
