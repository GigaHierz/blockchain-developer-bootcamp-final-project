import { Box, Text } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { useEffect, useState } from "react";
import { BigNumber, Contract } from "ethers";

import MintItem from "./MintItem";
import { encodeString } from "../../shared/StringEncoder";
import { ReactComponent as YourSvg } from "../../assets/octopus.svg";
import svg from "../../assets/octopus.svg";
import generateBabyName from "../../shared/NameGenerator";
import { hexToDecColor } from "../../shared/HexEncoder";
import base64SvgToBase64Png from "../../shared/SvgToPng";

export default function CreateItem({ contract }: { contract: Contract }) {
  const { account } = useEthers();

  let inputValue: HTMLInputElement | null;
  let userKnown: boolean | undefined;

  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [data, setData] = useState("");
  const [userState, setUserState] = useState(false);
  const [accountState, setAccountState] = useState("");

  let frame = document.getElementById("frame");
  let img = document.createElement("img");

  useEffect(() => {
    if (userKnown === undefined) {
      userExits();
    }
  });

  const userExits = async () => {
    if (account && !userKnown) {
      await contract?.tokensOfOwner(account).then((tokens: BigNumber[]) => {
        userKnown = tokens.length > 0;
        setUserState(tokens.length > 0);
      });
    }
  };

  const create = async (nameInput: string, colorInput: string) => {
    await base64SvgToBase64Png(
      svg,
      img,
      200,
      nameInput || name,
      colorInput || color
    )
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

        checkConnection();
      })
      .catch((err) => {
        console.log("Failed with error: " + err);
      });
  };

  const checkConnection = () => {
    if (!account) {
      setAccountState(
        "You need to be connected to a MetaMask Wallet and use the Rinkeby network to mint an Octopus NFT."
      );
    } else {
      setAccountState("");
    }
    (window as any).ethereum.on("networkChanged", (chainId: number) => {
      if (Number(chainId) === 4) {
        setAccountState("");
      }
    });
  };

  const addName = async (event: any) => {
    event.preventDefault();

    if (userKnown && inputValue?.value && account) {
      if (!name) {
        setAddress(inputValue?.value);

        generateBabyName()
          .then((name) => {
            const color = `#${(
              hexToDecColor(
                inputValue?.value.slice(6, 12) + account.slice(16, 22)
              ) *
              0x12345 *
              1000000
            )
              .toString(16)
              .slice(0, 6)}`;

            setName(name);
            setColor(color);
            return [name, color];
          })
          .then(([name, color]) => create(name, color));
      }
    } else if (inputValue?.value) {
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

  const inputError = (value: boolean) => {
    if (value) {
      setColor("");
      setName("");
      setAddress("");
    }
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
        <Text> {userState ? "0xAddress" : "Your Name"}</Text>{" "}
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
              placeholder={userState ? "0xAddress" : "Your Name"}
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
      <Text color="#c83f3f" fontSize="small">
        {accountState}
      </Text>
      <Box id="frame" margin="20px" padding="10px" border="1.5px solid #ffff11">
        {!name && <YourSvg width="250px" height="200px"></YourSvg>}
      </Box>
      <MintItem
        contract={contract}
        name={name}
        value={color}
        address={address}
        userKnown={userState}
        img={data}
        inputError={inputError}
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
