/* import the ipfs-http-client library */
import { create } from "ipfs-http-client"; /* Create an instance of the client */
import toBuffer from "it-to-buffer";
import { decodeuint8arr } from "../shared/StringEncoder";

/*
TODO: Add projectID
const auth =
  "Basic " +
  Buffer.from(
    process.env.REACT_APP_IPFS + ":" + process.env.REACT_APP_IPFS_SECRET
  ).toString("base64");
*/
const client = create({
  url: "https://ipfs.infura.io:5001/api/v0",
  // headers: {
  //   authorization: auth,
  // },
});

/* upload the file */
export async function addItemToIPFS(file: any) {
  try {
    const added = await client.add(file);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    return url;
  } catch (error) {
    console.log("Error uploading file: ", error);
  }
}

export async function getItemFromIPFS(cid: string) {
  try {
    console.log(cid);

    const added = await toBuffer(client.cat(cid));

    return decodeuint8arr(added);
  } catch (error) {
    console.log("Error uploading file: ", error);
  }
}
