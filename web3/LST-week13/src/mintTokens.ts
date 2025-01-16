import { Commitment, Connection, Keypair, PublicKey, SystemProgram, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { PRIVATE_KEY, TOKEN_MINT_ADDRESS } from "./address";
import {createBurnCheckedInstruction, getOrCreateAssociatedTokenAccount, mintTo} from '@solana/spl-token'
import bs58 from 'bs58'

const private_key = PRIVATE_KEY;
if(!TOKEN_MINT_ADDRESS){
 throw new Error("no token mint address");
}

const mint = new PublicKey(TOKEN_MINT_ADDRESS);
const wallet = bs58.decode(private_key as string);
const commmitment:Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com",commmitment);
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const token_decimals = BigInt(1_000_000);

export const mintTokens = async (fromAddress:string, toAddress:string, amount:number) => {
    if(!TOKEN_MINT_ADDRESS) {
        console.log("error")
        return
    }
    const mintto = new PublicKey(TOKEN_MINT_ADDRESS);
    console.log("Minting Tokens");
    try {
        const ata = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            mintto
        );

        const mintTx = await mintTo(
          connection,
          keypair,
          mint,
          ata.address,
          keypair.publicKey,
          token_decimals * BigInt(amount)
        );

        console.log(`Success! Minted transaction at ${mintTx}`);
        console.log(`Success! Minted ${amount} tokens to ${ata.address.toBase58()}`);
    } catch (error) {
        console.error("Minting Error:", error);
    }
}

export const burnTokens = async (fromAddress:string,toAddress:string,amount:number) => {
   const burnAccount = new PublicKey(fromAddress);
    console.log("Burning Tokens");

    try {
        const ata = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            burnAccount
        );

        const burnTx = createBurnCheckedInstruction(
            ata.address,
            mint,
            keypair.publicKey,
            token_decimals * BigInt(amount),
            Number(token_decimals)
        );

        const {blockhash,lastValidBlockHeight} = await connection.getLatestBlockhash();
        const messageV0 = new TransactionMessage({
            payerKey:keypair.publicKey,
            recentBlockhash:blockhash,
            instructions: [burnTx],
        }).compileToV0Message();

        const transaction = new VersionedTransaction(messageV0);
        transaction.sign([keypair]);

        const txnId = await connection.sendTransaction(transaction,{skipPreflight:false,maxRetries:5});
        console.log(`Success! Burn transaction ID: ${txnId}`);
    } catch (error) {
        console.error("Burning Error:", error);
    }
}

export const sendNativeTokens = async (fromAddress:string,toAddress:string,amount:number) => {
    const recipientAddress = new PublicKey(toAddress);
    console.log("sending native tokens");

    try {
        const transaction = new VersionedTransaction(new TransactionMessage({
            payerKey:keypair.publicKey,
            recentBlockhash:(await connection.getLatestBlockhash()).blockhash,
            instructions: [
                SystemProgram.transfer({
                    fromPubkey:keypair.publicKey,
                    toPubkey:recipientAddress,
                    lamports:BigInt(amount) * BigInt(1_000_000_000)
        })
            ]
        }).compileToV0Message())
    } catch (error) {
        console.error("Transfer Error:", error);
    }
}