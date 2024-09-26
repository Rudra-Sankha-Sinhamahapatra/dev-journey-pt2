//transferring the solana to another newly created wallet
import { Keypair, Connection, SystemProgram, Transaction } from '@solana/web3.js';

const payer = Keypair.fromSecretKey(Uint8Array.from([91,167,144,208,78,0,147,177,147,80,251,144,114,118,102,99,101,118,97,86,222,23,217,100,24,106,62,34,117,206,194,115,176,212,6,23,5,0,68,114,174,188,93,135,126,82,186,189,179,223,244,242,41,187,18,227,174,151,7,50,235,171,172,167]));


const connection = new Connection("https://api.devnet.solana.com");
async function main() {
    const newAccount = Keypair.generate();
    const transaction = new Transaction();
    transaction.add(
        SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: newAccount.publicKey,
            lamports: 0.001 * 1000000000,
        }),
    );

    await connection.sendTransaction(transaction, [payer]);
    console.log(`Transferred to ${newAccount.publicKey.toBase58()}`);
}

main();