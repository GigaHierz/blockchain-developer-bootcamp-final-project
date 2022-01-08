import { Box, Container } from "@chakra-ui/layout";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import octopus from "../../assets/octopus.png";

const StyledLink = styled(Link)`
  color: #4a4a4a;
  margin: 5px;
  backgroundcolor: #666666;
  border="1px solid transparent"
`;

const Navigation = () => {
  return (
    <Container>
      <Box
        display={"flex"}
        align-items="center"
        justify-content="end"
        flexDirection="row"
        alignItems="end"
        justifyContent="center"
        h="10vh"
      >
        <StyledLink to="/">
          <img src={octopus} alt="Home" width="50" height="28" />
        </StyledLink>
        <StyledLink to="/all">All Items</StyledLink>
        {/* <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link> */}
      </Box>
    </Container>
  );
};

export default Navigation;
