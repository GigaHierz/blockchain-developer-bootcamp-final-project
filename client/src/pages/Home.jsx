import NftContract from '../contracts/Nft.json'
import {  ethers} from 'ethers'
import {  useEffect, useRef, useState } from "react";
import { Container, Button, Box, Text } from "@chakra-ui/react";
import { useEthers } from '@usedapp/core';
import Nft from '../components/nfts/Nft';


export default function Home () {

   let color ;
   let colors  = [];
   const provider = useRef();
   const contract = useRef();
   const { account} = useEthers();

   const [colorList, setColor] = useState(colors);

   useEffect(() => {
      // this is only run once on component mounting
      const setup = async () => {
         provider.current = new ethers.providers.JsonRpcProvider();
         //   const network = await provider.getNetwork();

         // TODO: Figure out chainID
         const contractAddress = NftContract.networks[1337].address;
   
         // instantiate contract instance and assign to component ref variable
         contract.current = new ethers.Contract(
            contractAddress,
            NftContract.abi,
            provider.current.getSigner(),
         );
 
      };
      setup();
   }, []);

   const generateColor = () => {
      return `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`;
   };

   const  mint = async(color) => {
      if(color) {
         await contract?.current?.mint(color.value);
      }
   };

   const showList = async() => {
      const tx4 = await contract?.current?.tokensOfOwner(account);
      console.log(tx4);
   
      setColor(prevColors => [...prevColors, ...tx4])
   }
  
   return (
         <Container    
            display="flex"
            alignItems="center"
            flexDirection="column"
            borderRadius="xl"
            py="0"
         >
            <Box 
               display="flex"
               alignItems="center"
               justifyContent="center"
               flexDirection="column"
               borderRadius="xl"
               py="0"
               height="20%"
               margin="20px"
               padding="20px"
               background="#a73c80"
               opacity="0.8"
            >
                  <Text>Issue Token</Text>
                  <form onSubmit={(event) => {
                     event.preventDefault()
               
                     color?.value && color?.value !== '' ? mint(color): mint({value: generateColor(), id: ''})
                  }}>
                     <Box 
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        justifyContent="center"
                     >
                        <input
                           type='text'
                           className='form-control mb-1'
                           placeholder='e.g. #FFFFFF'
                           ref={(input) => { color = {value: input?.value || '', id:''} }}
                        />
                        <input
                           type='submit'
                           className='btn btn-block btn-primary'
                           value='MINT'
                        />
                     </Box>
                  </form>
            </Box>
            <Box 
               margin="0"
               padding="10px"
               display="flex"
               alignItems="center"
               flexDirection="column"
               borderRadius="xl"
               py="0"
            >
               <Button
                  border="1px solid transparent"
                  _hover={{
                     border: "1px",
                     borderStyle: "solid",
                     borderColor: "blue.400",
                  }}
                  borderRadius="xl"
                  width="10vh"
                  onClick={showList}>
                     Show List 
              </Button>
               <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="row"
                  flex-wrap="wrap"
                  width="90%"
               >
                 {colorList.map((color) => {
                        if(color) {

                           return(
                              <Nft color={color} key={color.id}/>
                           )
                        }
                  })}
              </Box>
            </Box>
         </Container>
   );
            
}