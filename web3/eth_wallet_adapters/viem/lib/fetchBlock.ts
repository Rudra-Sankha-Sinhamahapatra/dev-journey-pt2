import { PublicClient } from "viem";

export async function fetchBlock({ client }: { client: PublicClient }) {
  const blockNumber = await client.getBlockNumber();
  return blockNumber;
}
