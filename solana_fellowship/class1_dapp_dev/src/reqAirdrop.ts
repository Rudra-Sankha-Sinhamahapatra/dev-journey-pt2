import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export async function RequestAirdrop() {
    const connnection = new Connection("https://api.devnet.solana.com");

    const myPublicKey = new PublicKey(`Er5Wm5aEBhqaA1ypkVz7oizasdC7dUmVyAMSMy1Kmmjy`);
    let balance = await connnection.getBalance(myPublicKey);

    console.log(`Balance : ${balance/LAMPORTS_PER_SOL} SOL`);

    var fromAirdropSignature = await connnection.requestAirdrop(
        myPublicKey,
        5 * LAMPORTS_PER_SOL
    )

    await connnection.confirmTransaction(fromAirdropSignature);

    const updatedBalance =  await connnection.getBalance(myPublicKey);
    console.log(`Updated Balance: ${updatedBalance/LAMPORTS_PER_SOL} SOL`)
}

RequestAirdrop();