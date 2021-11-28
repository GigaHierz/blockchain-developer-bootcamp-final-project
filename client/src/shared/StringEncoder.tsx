export function encodeString(name: string) {
  return bytesToHex(stringToUTF8Bytes(name));
}

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) =>
    (byte * 0xfffff).toString().padStart(2, "0")
  ).join("");
}

function stringToUTF8Bytes(name: string): Uint8Array {
  return new TextEncoder().encode(name);
}
