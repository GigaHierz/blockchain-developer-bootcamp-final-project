import { Box, Button } from "@chakra-ui/react";
import { Contract } from "ethers";
import { useState } from "react";
import Color from "../models/Color";
import Nft from "./nfts/Nft";

export default function ItemList({contract, account}: {contract: Contract, account: string| null | undefined}){

    let colors: Color[] = [];
    const [colorList, setColorList] = useState(colors);


    const showList = async () => {

      // get ids of owner and then get the tokenofowner with id
        const tx4 = await contract?.tokensOfOwner(account); 
        console.log(tx4);
    
        // tokensOfOwner.map((token) => {
        //   const result =  await
        // })
        setColorList((prevColors) => [...prevColors, ...tx4]);
    };

    return (<Box>
                <Button
          border="1px solid transparent"
          _hover={{
            border: "1px",
            borderStyle: "solid",
            borderColor: "blue.400",
          }}
          borderRadius="xl"
          width="10vh"
          onClick={showList}
        >
          Show List
        </Button>
        <Box
          display="grid"
          grid-template-columns="1fr 1fr 1fr 1fr"
          alignItems="center"
          flexDirection="row"
          flex-wrap="wrap"
          width="90%"
        >
          {colorList.map((color, index) => {
            if (color) {
              return <Nft nft={color} key={index} />;
            }
          })}
        </Box>
    </Box>)
}