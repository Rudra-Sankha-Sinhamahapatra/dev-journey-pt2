import {createAssociatedTokenAccountInstruction, createMintToInstruction, getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, Transaction } from "@solana/web3.js";
import { FC, useState } from "react";

interface MintProps {
    mintAddress: PublicKey;
    onDone: ()=>void;
}

export const MintToken:FC<MintProps> =({mintAddress,onDone}) =>{
    const wallet = useWallet();
    const {connection} = useConnection();
    const [amount,setAmount] = useState<number>(1);

    async function mint() {
        if(wallet.publicKey){
        const associatedToken = getAssociatedTokenAddressSync(
            mintAddress,
            wallet.publicKey,
            false,
            TOKEN_PROGRAM_ID,
        );

        console.log(associatedToken.toBase58());

        const transaction = new Transaction().add(
            createAssociatedTokenAccountInstruction(
                wallet.publicKey,
                associatedToken,
                wallet.publicKey,
                mintAddress,
                TOKEN_PROGRAM_ID
            ),
        );

        await wallet.sendTransaction(transaction,connection);

        const mintTransaction = new Transaction().add(
            createMintToInstruction(mintAddress,associatedToken,wallet.publicKey,amount * LAMPORTS_PER_SOL,[],TOKEN_PROGRAM_ID)
        )
        await wallet.sendTransaction(mintTransaction,connection);
        console.log("Minting done for token "+ mintAddress.toBase58());
        onDone()
    }
}

return <div className="mx-auto flex flex-col gap-5 justify-center items-center">
    <input className="bg-white border border-black text-black p-6" type="number" placeholder="enter the number of tokens you want to mint" value={amount} onChange={(e)=>{
        setAmount(Number(e.target.value))
    }}/>
    <button className="p-3 bg-blue-500 border border-black focus:ring-2 cursor-pointer" onClick={mint}>Mint Tokens</button>
</div>
}