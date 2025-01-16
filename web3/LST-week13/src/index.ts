import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { burnTokens, mintTokens, sendNativeTokens } from './mintTokens';

const app = express();

const HELIUS_RESPONSE = { 
    "nativeTransfers": [ { "amount": 1000000000, "fromUserAccount": "Er5Wm5aEBhqaA1ypkVz7oizasdC7dUmVyAMSMy1Kmmjy", "toUserAccount": "8VL97C7WdJuVMQuXaqjjaVCy3z93GCTQCwywGfSvwNPC" } ] }

    const VAULT = "8VL97C7WdJuVMQuXaqjjaVCy3z93GCTQCwywGfSvwNPC"
app.post("/helius",async(req,res)=>{
    const incomingTx = HELIUS_RESPONSE.nativeTransfers.find(x=>x.toUserAccount === VAULT);

    if(!incomingTx) {
        res.json({message:"Processes"})
        return;
    }

    const fromAddress = incomingTx.fromUserAccount;
    const toAddress = VAULT;
    const amount = incomingTx.amount;
    
    const type = "received_native_sol";

    if (type === "received_native_sol") {
        await mintTokens(fromAddress, toAddress, amount);
    } else {
        // What could go wrong here?
        await burnTokens(fromAddress, toAddress, amount);
        await sendNativeTokens(fromAddress, toAddress, amount);
    }

    res.send('Transaction successful');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });