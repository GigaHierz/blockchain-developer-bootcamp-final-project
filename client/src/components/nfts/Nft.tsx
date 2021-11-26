import { Box, Text } from "@chakra-ui/react";
import Color from "../../models/Color";

export default function Nft ({nft}:{nft:Color}) {

  

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