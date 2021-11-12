import { Box, Text } from "@chakra-ui/react";

export default function Nft (color) {

    const nft = color.color

    return (
        <Box key={nft.id}                
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
           style={{ backgroundColor: nft.value}}
        ></Box>
        <Text>{nft.value}</Text>
     </Box>
    )
}