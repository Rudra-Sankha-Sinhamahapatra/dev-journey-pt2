import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export async function TransactionMain() {
  const keypair = Keypair.generate();
  console.log(
    `Public Key : ${keypair.publicKey.toBase58()},\n Private key: [${
      keypair.secretKey
    }] `
  );

  try {
    const connnection = new Connection("https://api.devnet.solana.com");
    const payer = Keypair.fromSecretKey(
      Uint8Array.from([
        221, 55, 253, 233, 57, 47, 22, 235, 46, 66, 226, 203, 58, 226, 47, 60,
        156, 254, 162, 83, 128, 206, 13, 34, 38, 97, 180, 60, 151, 204, 210,
        184, 43, 93, 111, 32, 16, 39, 196, 21, 136, 74, 162, 246, 0, 76, 84, 72,
        239, 97, 81, 52, 184, 233, 234, 103, 217, 148, 204, 105, 79, 91, 138,
        79,
      ])
    );

    console.log(`Receiver : ${keypair.publicKey.toBase58()}\n`);
    console.log(`Sender: ${payer.publicKey.toBase58()}`);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: keypair.publicKey,
        lamports: 1 * LAMPORTS_PER_SOL,
      })
    );

    transaction.feePayer = payer.publicKey;
    transaction.recentBlockhash = (
      await connnection.getLatestBlockhash()
    ).blockhash;
    transaction.partialSign(payer);

    const signature = await connnection.sendRawTransaction(
      transaction.serialize()
    );
    console.log(`Signature: ${signature}`);
  } catch (err) {
    console.log(err);
  }
}

TransactionMain();