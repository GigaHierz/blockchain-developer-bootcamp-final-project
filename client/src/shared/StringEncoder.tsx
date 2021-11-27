export function encodeString(name: string) {
   return bytesToHex(stringToUTF8Bytes(name))
}

function bytesToHex(bytes: Uint8Array) {
    return Array.from(
      bytes,
      byte => byte.toString(16).padStart(2, "0")
    ).join("");
  }

  // You almost certainly want UTF-8, which is
// now natively supported:
function stringToUTF8Bytes(name:string): Uint8Array {
    return new TextEncoder().encode(name);
  }
