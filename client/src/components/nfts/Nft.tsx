import { Box, Text } from "@chakra-ui/react";
import { Color } from "../../models/color.model";

export default function Nft (color: any) {

    const nft = color.color
    console.log(nft);

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