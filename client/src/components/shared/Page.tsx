
// Layout.tsx
import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
};

export default function Page({ children }: Props) {
  return (
    <Box padding="4px" w="100%" h="100vh" bgGradient="linear(to-r, green.200, pink.500)" >
      {children}
    </Box>
  )
}