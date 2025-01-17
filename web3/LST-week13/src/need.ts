import bs58 from 'bs58';
import {private_key} from './mykeypair'

function convertToBase58(uintArray: Uint8Array): string {
  const uint8Array = Uint8Array.from(uintArray);
  return bs58.encode(uint8Array);
}


const privateKeyArray = Uint8Array.from(private_key);
  
const base58Key = convertToBase58(privateKeyArray);

console.log("Base58 Encoded Key:", base58Key);
  