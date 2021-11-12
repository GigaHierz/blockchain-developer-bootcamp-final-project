import Nft from '../contracts/Nft.json'
import { Contract, ethers} from 'ethers'
import {  useEffect } from "react";
import { Container, Button, Box, Text } from "@chakra-ui/react";


export interface State  {
   account: string| null | undefined;
   contract: any;
   totalSupply: number;
   colors: Color[];
}

export interface Color {
   id: string;
   value: string
}

export default function Home () {

   let color : Color| null;
   let colors : Color[] = [
      {id: "0", value: "#595406"}, 
      {id: "1", value: "#c82097"}, 
      {id: "2", value: "#da3576"}, 
      {id: "3", value: "#de848c"},
      {id: "4", value: "#679e60"},
      {id: "5", value: "#bc31e9"},
      {id: "6", value: "#de848c"},
      {id: "7", value: "#a73c80"},
      {id: "8", value: "#19774b"}
   ];
   let provider : any;
   let signer : any;
   let contract: Contract;
   // const { account} = useEthers()
   // const baseTokenURI = "ipfs://QmZbWNKJPAjxXuNFSEaksCJVd1M6DaKQViJBYPK2BdpDEP/";

   useEffect(() => {
      // this is only run once on component mounting
      const setup = async () => {
      provider = new ethers.providers.JsonRpcProvider();
      signer = provider.getSigner();
      //   const network = await provider.getNetwork();
        
      // TODO: Figure out chainID
      const contractAddress = Nft.networks[1].address;
  
      // instantiate contract instance and assign to component ref variable
      contract = new ethers.Contract(
         contractAddress,
         Nft.abi,
         signer,
      );

      showList();
      };
      setup();
   }, []);

   const generateColor = () => {
      return `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`;
   };

   const  mint = async(color: Color) => {
      if(color) {
         await contract?.current?.mint(color.value);
         colors = [...colors, color]   

         console.log(colors);  
      }
   };

   const showList = async() => {

      // const tx4 = await contract?.current?.tokensOfOwner(account);
      // colors = await tx4.wait()
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
                 {colors.map((color) => {
                        console.log(colors);
                        
                        return(
                        <Box key={color.id}                
                           display="flex"
                           alignItems="center"
                           flexDirection="column"
                           margin="6px"
                        >
                           <Box 
                              height="150px"
                              width="150px"
                              border-radius="50%"
                              display="inline-block"
                              className="token" 
                              style={{ backgroundColor: color.value}}
                           ></Box>
                           <Text>{color.value}</Text>
                        </Box>
                        )
                  })}
              </Box>
            </Box>
         </Container>
   );
            
}