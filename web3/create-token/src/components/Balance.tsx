import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export  function ShowSolBalance () {
    const {connection} = useConnection();
    const wallet = useWallet();
    const [solBalance,setSolBalance] = useState<number | null>(null);

    useEffect(()=>{
        async function getBalance() {
            if(wallet.publicKey) {
                const balance = await connection.getBalance(wallet.publicKey);
                if(balance){
                setSolBalance(balance / LAMPORTS_PER_SOL);
               }
            }
            else {
                setSolBalance(null);
            }
        }
         getBalance();    
    },[connection,wallet.publicKey])

     return <div>
        <p>SOL Balance: <div>{solBalance !== null ? solBalance : "Loading.."}</div></p>
     </div>
}