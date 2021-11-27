import { Box, Button, Text } from "@chakra-ui/react";
import { Contract } from "ethers";
import { useState } from "react";
import Color from "../models/Color";
import { encodeString } from "../shared/StringEncoder";

export default function CreateItem({
  contract,
  account,
}: {
  contract: Contract;
  account: string | null | undefined;
}) {
  const [token, setToken] = useState({} as Color);

  const generateColor = () => {
    return `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`;
  };

  const createOctopus = (name: string) => {
    let hex = encodeString(name);

    token.name = name;
    token.value = `#${hex.toString().slice(0, 6)}`;

    console.log(token);
  };

  const enterName = () => {
    console.log("Enter  Name");
  };

  const mint = async () => {
    console.log(contract);

    if (token) {
      console.log(token);
      await contract.mint(token.name).then((token: any) => console.log(token));
      // await tx3.wait()
      // console.log(tx3);
      //   setColorList((prevColors) => [...prevColors, token]);
    }
  };

  return (
    <Box>
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
        <Text>Your Name</Text>
        <form
          onSubmit={(event) => {
            event.preventDefault();

            token?.value && token?.value !== ""
              ? createOctopus(token.value)
              : createOctopus(generateColor());
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
          >
            <input
              type="text"
              className="form-control mb-1"
              placeholder="Your Name"
              ref={(input) => ({ name: "", value: input?.value || "", id: "" })}
            />
            <input
              type="submit"
              className="btn btn-block btn-primary"
              value="Create NFT"
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
          onClick={mint}
        >
          Mint
        </Button>
      </Box>
    </Box>
  );
}
