import { Box, Text } from "@chakra-ui/react";
import Token from "../../models/Token";

export default function Nft({ nft }: { nft: Token }) {
  return (
    <Box
      key={nft.imageUrl}
      display="flex"
      alignItems="center"
      flexDirection="column"
      margin="6px"
    >
      <Box
        height="150px"
        width="150px"
        border-radius="xl"
        display="inline-block"
        className="token"
        style={{ backgroundColor: nft.value }}
      ></Box>
      <Text>{nft.value}</Text>
    </Box>
  );
}
