
import { useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export  function Balance () {
    const wallet = useWallet();
    const [balance,setBalance] = useState<number | null>(null);


    useEffect(()=>{
        if(wallet.publicKey){
        fetch("https://api.devnet.solana.com",{
            method:'POST',
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify({
            "jsonrpc":"2.0",
            "id":1,
            "method":"getBalance",
            params:[
                wallet.publicKey.toString()
            ]
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.result?.value){
                setBalance(data.result.value/LAMPORTS_PER_SOL);
            }
        })
        .catch(error => console.error(error));
    }
    },[wallet.publicKey])
   

    return <>
    <div>
     {balance !==null ? `Balance : ${balance} SOL`:"Fetching..."}
    </div>
    </>
}