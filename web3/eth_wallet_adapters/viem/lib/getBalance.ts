import { Address, PublicClient } from "viem";

export const getBalance = async({client,address}:{client:PublicClient,address:Address}) =>{
const balance = await client.getBalance({address});
return balance
}