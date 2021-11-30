import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Contract } from "ethers";

import MintItem from "./MintItem";
import { encodeString } from "../shared/StringEncoder";
import { ReactComponent as YourSvg } from "../assets/octopus.svg";
import svg from "../assets/octopus.svg";

export default function CreateItem({
  contract,
  account,
  step,
}: {
  contract: Contract;
  account: string | null | undefined;
  step?: boolean;
}) {
  let yourName: HTMLInputElement | null;
  let handshakeAddress: HTMLInputElement | null;

  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [data, setData] = useState("");

  let frame = document.getElementById("frame");
  let img = document.createElement("img");

  const create = async (name: string) => {
    let temp: string | null;

    if (img.id) {
      frame?.firstChild?.remove();
      temp = await base64SvgToBase64Png(svg, 200);
    } else {
      temp = await base64SvgToBase64Png(svg, 200);
    }
    !temp || setData(temp);
  };

  /**
   * converts a base64 encoded data url SVG image to a PNG image
   * @param originalBase64 data url of svg image
   * @param width target width in pixel of PNG image
   * @return {Promise<String>} resolves to png data url of the image
   */
  function base64SvgToBase64Png(
    originalBase64: string,
    width: number
  ): Promise<string | null> {
    if (yourName?.value) {
      return new Promise((resolve) => {
        console.log(img);
        console.log(color);

        img.id = yourName?.value || name;
        img.onload = async () => {
          frame?.appendChild(img);
          let canvas = document.createElement("canvas");
          let ratio = img.clientWidth / img.clientHeight || 1;
          color || frame?.removeChild(img);
          img.style.background =
            color ||
            `#${(
              Number(encodeString(yourName?.value || "")) *
              0xfffff *
              1000000
            )
              .toString(16)
              .slice(0, 6)}`;
          img.style.border = "1.5px solid #ffff11";
          img.style.width = "300px";
          canvas.width = width;
          canvas.height = width / ratio;
          let ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          try {
            let data = canvas.toDataURL("image/png");
            resolve(data);
          } catch (e) {
            resolve(null);
          }
        };
        img.src = originalBase64;
      });
    } else {
      return new Promise(() => {
        enterName();
      });
    }
  }

  const addName = async (event: any) => {
    event.preventDefault();

    if (yourName?.value) {
      setName(yourName?.value || "");
      setColor(
        `#${(Number(encodeString(yourName?.value)) * 0xfffff * 1000000)
          .toString(16)
          .slice(0, 6)}`
      );
      create(yourName?.value || "");
    }
  };

  const enterName = () => {
    alert("Please enter a Name");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
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
        <Text> {step ? "0xAddress" : "Your Name"}</Text>
        <form onSubmit={addName}>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
          >
            <input
              type="text"
              className="form-control mb-1"
              placeholder={step ? "0xAddress" : "Your Name"}
              ref={(input) =>
                step ? (handshakeAddress = input) : (yourName = input)
              }
            />
            <input
              type="submit"
              className="btn btn-block btn-primary"
              value="Create"
            />
          </Box>
        </form>
      </Box>
      <Box id="frame" margin="20px" padding="10px" border="1.5px solid #ffff11">
        {!name && <YourSvg width="300px" height="250px"></YourSvg>}
      </Box>
      <MintItem
        contract={contract}
        account={account}
        name={name}
        value={color}
        img={data}
      ></MintItem>
      <Box
        margin="0"
        padding="10px"
        display="flex"
        alignItems="center"
        flexDirection="column"
        borderRadius="xl"
        py="0"
      ></Box>
    </Box>
  );
}
