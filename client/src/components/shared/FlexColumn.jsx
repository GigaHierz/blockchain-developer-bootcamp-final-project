
// FlexColumn.tsx
import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
};

export default function FlexColumn({ children }: Props) {
  return (
    <Flex
      flexDirection="column"
      alignItems="end"
      justifyContent="center"
      bg="gray.800"
      bgGradient="linear(to-r, green.200, pink.500)"
      margin = "4px"
    >
      {children}
    </Flex>
  )
}