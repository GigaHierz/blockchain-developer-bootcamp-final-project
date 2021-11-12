import NftContract from '../contracts/Nft.json'
import {  ethers} from 'ethers'
import {  useEffect, useRef, useState } from "react";
import { Container, Button, Box, Text } from "@chakra-ui/react";
import { useEthers } from '@usedapp/core';
import Nft from '../components/nfts/Nft';


export default function Home () {

   let color ;
   let colors  = [
      // {id: "0", value: "#595406"}, 
      // {id: "1", value: "#c82097"}, 
      // {id: "2", value: "#da3576"}, 
      // {id: "3", value: "#de848c"},
      // {id: "4", value: "#679e60"},
      // {id: "5", value: "#bc31e9"},
      // {id: "6", value: "#de848c"},
      // {id: "7", value: "#a73c80"},
      // {id: "8", value: "#19774b"}
   ];
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
         const contractAddress = NftContract.networks[3].address;
   
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
         colors = [...colors, color];

         setColor(prevColors => [...prevColors, color])
         
         console.log(colors);  
      }
   };

   const showList = async() => {
      // console.log(account);
      

      const tx4 = await contract?.current?.tokensOfOwner(account);
      colors = await tx4.wait()
      console.log(tx4);

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
                        console.log(colors);
                        if(color) {

                           return(
                              <Nft color={color} />
                           )
                        }
                  })}
              </Box>
            </Box>
         </Container>
   );
            
}