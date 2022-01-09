import { Container } from "@chakra-ui/react";

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
        <p>
          This is the Ocotpus Game. It is supposed to be fun and cute. That is
          the most important thing. Here you don't have to worry about making
          mistakes or losing money. This Dapp is supposed to make you feel more
          comfortable with MetaMask and minting and Nfts and maybe exploring the
          Etherscan.
        </p>
        <p>
          First you should{" "}
          <StyledLink to="/blockchain-developer-bootcamp-final-project/mint">
            mint
          </StyledLink>{" "}
          your first NFT. This is a little Octopus baby. And that is going to be
          your OG Octopus. First you will only have this one that is yours and
          yours only.
        </p>
        <br />
        <p>
          But this game is also designed to motivate you to interact with other
          eople and other Ethereum Addresses. So here the "Flosse" comes into
          the game.
        </p>
        <p>
          We use "Flosse" as Octopusses don'T have hands and thats the german
          word for .... In German you can also say "Gib Flosse", when you want
          to give a high five to someone. So there is that..
        </p>
        <br />
        <p>
          Also: if you want to add the Ocoptusses to your metamask wallet follow
          this{" "}
          <StyledLink
            to="https://consensys.net/blog/metamask/how-to-add-your-custom-tokens-in-metamask/"
            target="_blank"
            rel="noreferrer"
          >
            guide
          </StyledLink>
          .
        </p>
        <br />
        <p>
          You can also check out the contract on{" "}
          <StyledLink
            to="https://rinkeby.etherscan.io/address/0x52818719FC9E7d35fD2882344AfFa1f4fcA81874"
            target="_blank"
            rel="noopener noreferrer"
          >
            EtherScan
          </StyledLink>
          . In case you want to check out who else has some tokens.
        </p>
      </Container>
    </Page>
  );
}
