// Layout.tsx
import { Box, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

import Footer from "./Footer";
import Navigation from "./Navigation";
import FlexColumn from "./FlexColumn";

type Props = {
  children?: ReactNode;
};

export default function Page({ children }: Props) {
  return (
    <Box w="100%" h="100vh" bgGradient="linear(to-r, green.200, pink.500)">
      <FlexColumn>
        <Navigation />

        <Heading></Heading>
        <Box h="70vh" margin="20px">
          {children}
        </Box>

        <Footer />
      </FlexColumn>
    </Box>
  );
}
