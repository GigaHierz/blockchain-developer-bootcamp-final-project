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
    <Box
      padding="4px"
      w="100%"
      h="100vh"
      bgGradient="linear(to-r, #eb96c3, #846ebe)"
    >
      <FlexColumn>
        <Navigation />

        <Heading></Heading>
        <Box h="70vh">{children}</Box>

        <Footer />
      </FlexColumn>
    </Box>
  );
}
