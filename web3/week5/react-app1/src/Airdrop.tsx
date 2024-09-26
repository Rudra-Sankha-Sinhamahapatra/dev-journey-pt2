import React, { useState } from 'react';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Buffer } from 'buffer';
import { Balance } from './Balance';

window.Buffer = Buffer;

export function Airdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState(0); 

    async function sendAirdropToUser() {
        if (wallet.publicKey && amount > 0) {
            try {
                await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
                alert(`${amount} SOL Airdropped`);
            } catch (error) {
                alert("Airdrop failed: " + error);
            }
        } else {
            alert("Please enter a valid amount and connect your wallet!");
        }
    }

    return (
        <>
            <div className="flex flex-col">
                <div>
                    Hi mr {wallet.publicKey?.toString()}
                </div>
                
                <Balance/>
                <div className='mt-2'>
                <div className='flex justify-center mb-4'>
                <input 
                    className='w-[50%] py-2 px-3 border border-gray-500'
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(Number(e.target.value))} 
                    placeholder="Enter SOL amount"
                />
                 </div>
                <div className='flex justify-center items-center'>               
                <button className='px-3 py-2 bg-gray-50 hover:bg-gray-200 hover:outline-none  shadow-lg rounded-lgS' onClick={sendAirdropToUser}>Send Airdrop</button>
                </div>
            </div>
            </div>
        </>
    );
}
