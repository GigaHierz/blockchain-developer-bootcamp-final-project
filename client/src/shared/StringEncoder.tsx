export function encodeString(name: string): string {
  return bytesToHex(stringToUTF8Bytes(name));
}

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) =>
    (byte * 0xfffff).toString().padStart(2, "0")
  ).join("");
}

export function stringToUTF8Bytes(name: string): Uint8Array {
  return new TextEncoder().encode(name);
}

export function hexToDec(hexString: string): number {
  return parseInt(hexString.slice(4, 10), 16);
}
