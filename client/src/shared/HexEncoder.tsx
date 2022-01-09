export function hexToDec(hexString: string) {
  return parseInt(hexString.slice(4, 10), 16);
}
