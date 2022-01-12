export function hexToDec(hexString: string) {
  return parseInt(hexString, 16);
}
export function hexToDecColor(hexString: string) {
  return parseInt(hexString.slice(9, 12), 16);
}
export function hexToRgb(color: string): string {
  let aRgb = "";
  if (color.length !== 7) {
    throw "Only six-digit hex colors are allowed.";
  }
  let aRgbHex = color.replace("#", "").match(/.{1,2}/g);
  if (aRgbHex) {
    aRgb =
      "rgb(" +
      parseInt(aRgbHex[0], 16) +
      ", " +
      parseInt(aRgbHex[1], 16) +
      ", " +
      parseInt(aRgbHex[2], 16) +
      ")";
  }

  return aRgb;
}
