/* import the ipfs-http-client library */
import  { create,  } from 'ipfs-http-client';/* Create an instance of the client */
import { useState } from 'react';


const client = create({url:'https://ipfs.infura.io:5001/api/v0/20mff5OGplOZeEo7CoLA1lD6Jcy'})/* upload the file */
const [fileUrl, updateFileUrl] = useState(``)
export async function addItemToIPFS(item: any) {
    try {
        const added = await client.add(item)
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        updateFileUrl(url)
        return fileUrl;
      } catch (error) {
        console.log('Error uploading file: ', error)
      }
}