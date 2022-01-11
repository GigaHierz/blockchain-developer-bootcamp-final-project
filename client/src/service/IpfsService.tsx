/* import the ipfs-http-client library */
import { create } from "ipfs-http-client"; /* Create an instance of the client */

const client = create({
  url: "https://ipfs.infura.io:5001/api/v0",
}); /* upload the file */
export async function addItemToIPFS(file: any) {
  try {
    const added = await client.add(file);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    return url;
  } catch (error) {
    console.log("Error uploading file: ", error);
  }
}
