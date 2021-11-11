import Nft from '../contracts/Nft.json'
import { ethers} from 'ethers'
import {  useEffect, useRef } from "react";
import {  Contract } from '@usedapp/core/node_modules/ethers/lib/ethers';

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
   let colors : Color[] = [];
   // const {chainId, account} = useEthers()
   const contract = useRef<Contract>();
   // const baseTokenURI = "ipfs://QmZbWNKJPAjxXuNFSEaksCJVd1M6DaKQViJBYPK2BdpDEP/";

   useEffect(() => {
      // this is only run once on component mounting
      const setup = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
      //   const network = await provider.getNetwork();
        

      // TODO: Figure out chainID
        const contractAddress = Nft.networks[3].address;
  
        // instantiate contract instance and assign to component ref variable
        contract.current = new ethers.Contract(
          contractAddress,
          Nft.abi,
          provider.getSigner(),
        );

 
      };
      setup();
   }, []);

  



   const generateColor = () => {
      return `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`;
   };

   const  mint = async(color: Color) => {
      if(color) {


         const tx2 = await contract.current.mint(color.value);
         const result2 = await tx2.wait()
         console.log(result2);
         
          colors = [...colors, color]

          const tx3 = await contract.current.totalSupply();
          const result3 = await tx3.wait()
          console.log(result3);
      }
   };
  
   return (
      <div>
         <div className="container-fluid mt-5">
         <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
               <div className="content mr-auto ml-auto">
               <h1>Issue Token</h1>
               <form onSubmit={(event) => {
                  event.preventDefault()
            
                  color?.value ? mint(color): mint({value: generateColor(), id: ''})
               }}>
                  <input
                     type='text'
                     className='form-control mb-1'
                     placeholder='e.g. #FFFFFF'
                     ref={(input) => { color = input }}
                  />
                  <input
                     type='submit'
                     className='btn btn-block btn-primary'
                     value='MINT'
                  />
               </form>
               </div>
            </main>
         </div>
         <hr/>
         <div className="row text-center">
            { colors.map((color, key) => {
               return(
               <div key={key} className="col-md-3 mb-3">
                  <div className="token" style={{ backgroundColor: color.value }}></div>
                  <div>{color}</div>
               </div>
               )
            })}
         </div>
         </div>
      </div>
   );
            
}