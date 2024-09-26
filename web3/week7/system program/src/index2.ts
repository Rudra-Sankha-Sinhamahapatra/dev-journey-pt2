//Create a new account with data and rent
import { Keypair, Connection, SystemProgram, Transaction } from '@solana/web3.js' ;

const payer = Keypair.fromSecretKey(Uint8Array.from([222,61,190,103,38,70,4,221,24,242,44,86,66,111,102,52,87,41,83,45,166,179,184,79,208,91,20,66,142,36,147,236,30,84,33,77,227,36,159,27,27,53,27,249,230,207,30,83,42,51,3,225,70,41,44,85,54,31,198,80,45,49,208,39]));

const mintAthority = payer;

const connection = new Connection("https://api.devnet.solana.com");
async function main() {
    const newAccount = Keypair.generate();
    const TOTAL_BYTES = 165;
    const lamports = await connection.getMinimumBalanceForRentExemption(TOTAL_BYTES); //solana balance rent
    const transaction = new Transaction();
    transaction.add(
        SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: newAccount.publicKey,
            lamports: lamports,
            space: TOTAL_BYTES,
            programId: SystemProgram.programId,
        }),
    );

    await connection.sendTransaction(transaction, [payer, newAccount]);
    console.log(`New account created at ${newAccount.publicKey.toBase58()}`);
}

main();