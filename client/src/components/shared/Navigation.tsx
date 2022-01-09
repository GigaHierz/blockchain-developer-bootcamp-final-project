import { Box, Container } from "@chakra-ui/layout";

import octopus from "../../assets/octopus.png";
import { StyledLink } from "./StyledLink";

export default function Navigation() {
  return (
    <Container>
      <Box
        display={"flex"}
        align-items="center"
        justify-content="end"
        flexDirection="row"
        alignItems="end"
        h="10vh"
      >
        <StyledLink to="/">
          <img src={octopus} alt="Home" width="50" height="28" />
        </StyledLink>
        <StyledLink to="/mint">Mint a cute octopus</StyledLink>
        <StyledLink to="/all">My Octopusses</StyledLink>
        {/* <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link> */}
      </Box>
    </Container>
  );
}
