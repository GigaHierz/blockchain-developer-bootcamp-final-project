import { Box, Container } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Container>
      <Box style={{ textAlign: "center", margin: "20px 0 0 0" }} h="10vh">
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
