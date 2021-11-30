// FlexColumn.tsx
import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function FlexColumn({ children }: Props) {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="gray.800"
      bgGradient="linear(to-r, green.200, pink.500)"
    >
      {children}
    </Flex>
  );
}
