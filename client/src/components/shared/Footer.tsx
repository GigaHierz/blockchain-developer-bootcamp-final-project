import { Box, Container } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Container>
      <Box style={{ textAlign: "center" }} h="10vh">
        <br />
        <br />
        <br />
        <p>
          Discover{" "}
          <strong>
            <a
              href="https://github.com/DLT-developers-NFT-project"
              target="_blank"
              rel="noreferrer"
            >
              Original Project Idea
            </a>
          </strong>
        </p>
      </Box>
    </Container>
  );
};

export default Footer;
