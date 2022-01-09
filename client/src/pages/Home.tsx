import { Container } from "@chakra-ui/react";

import Page from "../components/shared/Page";

export default function Home() {
  // Input variable

  return (
    <Page>
      <Container
        display="flex"
        alignItems="center"
        flexDirection="column"
        borderRadius="xl"
        py="0"
      >
        <p>
          This is the Ocotpus Game. It is supposed to be fun and cute. That is
          the most important thing. Here you don't have to worry about making
          mistakes or losing money. This Dapp is supposed to make you feel more
          comfortable with MetaMask and minting and Nfts and maybe exploring the
          Etherscan.
        </p>
        <p>
          First you should{" "}
          <a
            href="/blockchain-developer-bootcamp-final-project/mint"
            color="#f87111"
          >
            mint
          </a>{" "}
          your first NFT. This is a little Octopus baby. And that is going to be
          your OG Octopus. First you will only have this one that is yours and
          yours only.
        </p>
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
      </Container>
    </Page>
  );
}
