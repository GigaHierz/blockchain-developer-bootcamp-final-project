import { Contract, ethers } from "ethers";
import { useState, useRef, useEffect } from "react";
import { Container} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import NftContract from "../contracts/Nft.json";
import CreateItem from "../components/CreateItem";
import ItemList from "../components/ItemList";
require('dotenv').config({ path: __dirname + '/.env' })


export default function Home() {
   // Input variable

   const {account} = useEthers()

   //   const ipfsGateway = `https://ipfs.io/ipfs`;
   const provider = useRef<ethers.providers.InfuraProvider>();
   //   const contract = useRef<Contract>({} as Contract);

   const [contract, setContract] = useState(useRef<Contract>({} as Contract))

   useEffect(() => {
      // this is only run once on component mounting

      console.log(process.env.INFURA_PROJECT_ID)
      console.log(process.env.PRIVATE_KEY)
      const setup = async () => {
         provider.current = new ethers.providers.InfuraProvider("ropsten", process.env.INFURA_PROJECT_ID);
         const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider.current);;
         const signer = wallet.connect(provider.current);
         //   const network = await provider.getNetwork();

         // TODO: Figure out chainID
         const contractAddress = NftContract.networks[3].address;

         // instantiate contract instance and assign to component ref variable
         // contract.current = new ethers.Contract(
         //   contractAddress,
         //   NftContract.abi,
         //   signer
         // );

         setContract((contract) => ({
            ...contract, current: new ethers.Contract(
               contractAddress,
               NftContract.abi,
               signer)
         }))
      };
      setup();
   }, []);


   return (
      <Container
         display="flex"
         alignItems="center"
         flexDirection="column"
         borderRadius="xl"
         py="0"
      >
         <CreateItem contract={contract.current} account={account}></CreateItem>
         <ItemList contract={contract.current} account={account}></ItemList>
      </Container>
   );
}
