import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Image({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <Box
      id={id}
      margin="20px"
      padding="10px"
      border="1.5px solid #ffff11"
      outline="10px solid green"
      outline-offset="10px"
    >
      {children}
    </Box>
  );
}
