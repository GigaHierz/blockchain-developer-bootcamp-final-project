import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Contract } from "ethers";

import MintItem from "./MintItem";
import { encodeString } from "../shared/StringEncoder";
import { ReactComponent as YourSvg } from "../assets/octopus.svg";
import svg from "../assets/octopus.svg";

export default function CreateItem({ contract }: { contract: Contract }) {
  let inputValue: HTMLInputElement | null;

  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState("");

  let frame = document.getElementById("frame");
  let img = document.createElement("img");

  const create = async (nameInput: string, colorInput: string) => {
    console.log(nameInput);
    console.log(colorInput);

    await base64SvgToBase64Png(svg, 200, nameInput, colorInput)
      .then((data) => !data || setData(data))
      .then(() => {
        if (img.style.background === colorInput) {
          return;
        }
      })
      .then(() => {
        frame?.appendChild(img);
      })
      .then(() => {
        if (frame?.childElementCount && frame?.childElementCount > 1) {
          frame?.firstChild?.remove();
        }
      })
      .catch((err) => {
        console.log("Failed with error: " + err);
      });
  };

  /**
   * converts a base64 encoded data url SVG image to a PNG image
   * @param originalBase64 data url of svg image
   * @param width target width in pixel of PNG image
   * @return {Promise<String>} resolves to png data url of the image
   */
  function base64SvgToBase64Png(
    originalBase64: string,
    width: number,
    inputName: string,
    inputColor: string
  ): Promise<string | null> {
    if (inputName || name) {
      return new Promise((resolve) => {
        img.id = inputName || name;
        img.onload = async () => {
          let canvas = document.createElement("canvas");
          let ratio = img.clientWidth / img.clientHeight || 1;
          img.style.background = color || inputColor;
          img.style.border = "1.5px solid #ffff11";
          img.style.width = "250px";
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
        enterValue();
      });
    }
  }

  const addName = async (event: any) => {
    event.preventDefault();

    if (inputValue?.value) {
      const color = `#${(
        Number(encodeString(inputValue?.value)) *
        0xfffff *
        1000000
      )
        .toString(16)
        .slice(0, 6)}`;
      setName(inputValue?.value || "");
      setColor(color);
      create(inputValue?.value || "", color);
    }
  };

  const enterValue = () => {
    alert("Please enter a Value");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Text>Mint a cute octopus</Text>

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
              placeholder="Your Name"
              ref={(input) => (inputValue = input)}
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
        {!name && <YourSvg width="250px" height="200px"></YourSvg>}
      </Box>
      <MintItem
        contract={contract}
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
