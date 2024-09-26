import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { TypographyH2 } from "./components/TypographyH2";

export function TransactionComponent() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [recipientAddress, setRecipientAddress] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [status, setStatus] = useState<string>('');

    const handleTransaction = async () => {
        if (!wallet.publicKey) {
            setStatus("Please connect your wallet.");
            return;
        }

        if (!recipientAddress) {
            setStatus("Please enter a recipient address.");
            return;
        }

        if (amount <= 0) {
            setStatus("Please enter a valid amount of SOL.");
            return;
        }

        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: new PublicKey(recipientAddress),
                    lamports: amount * LAMPORTS_PER_SOL,
                })
            );

            const signature = await wallet.sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'finalized');

            setStatus(`Transaction successful! Signature: ${signature}`);
        } catch (error) {
            setStatus(`Transaction failed: ${error}`);
        }
    };

    return (
        <div className="flex flex-col items-center mt-2">
            <TypographyH2 text="Send Solana"/>

            <input
                type="text"
                className="border border-gray-500 px-3 py-2 mb-2 w-[50%]"
                placeholder="Recipient Address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
            />

            <input
                type="number"
                className="border border-gray-500 px-3 py-2 mb-2 w-[50%]"
                placeholder="Amount (SOL)"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            />

            <button
                className="px-3 py-2 bg-gray-50 hover:bg-gray-200 shadow-lg rounded-lg"
                onClick={handleTransaction}
            >
                Send Transaction
            </button>

            {status && <p className="mt-4 text-center">{status}</p>}
        </div>
    );
}
