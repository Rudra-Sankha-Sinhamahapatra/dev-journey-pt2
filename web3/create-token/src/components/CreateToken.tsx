import {
    Keypair,
    PublicKey,
    Signer,
    SystemProgram,
    Transaction,
  } from "@solana/web3.js";
  import { useConnection, useWallet } from "@solana/wallet-adapter-react";
  import {
    MINT_SIZE,
    TOKEN_PROGRAM_ID,
    createInitializeMint2Instruction,
    getMinimumBalanceForRentExemptMint,
  } from "@solana/spl-token";
  import { FC, useState } from "react";
  import { Metaplex, irysStorage } from "@metaplex-foundation/js";
  
  interface TokenProps {
    onTokenCreate: (mintAddress: PublicKey) => void;
  }
  
  export const TokenLaunchpad: FC<TokenProps> = ({ onTokenCreate }) => {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [initialSupply, setInitialSupply] = useState<number>(1000);
  
    async function createToken() {
      const mintKeypair = Keypair.generate();
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
  
      if (wallet.publicKey) {
        const transaction = new Transaction().add(
          SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: MINT_SIZE,
            lamports,
            programId: TOKEN_PROGRAM_ID,
          }),
          createInitializeMint2Instruction(
            mintKeypair.publicKey,
            9,
            wallet.publicKey,
            wallet.publicKey,
            TOKEN_PROGRAM_ID
          )
        );
  
        transaction.feePayer = wallet.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.partialSign(mintKeypair);
  
        await wallet.sendTransaction(transaction, connection);
        console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
        onTokenCreate(mintKeypair.publicKey);
  
        await createTokenMetaData(mintKeypair.publicKey);
      }
    }
  
    async function createTokenMetaData(_mint: PublicKey) {
      if (wallet.publicKey!==undefined && wallet.publicKey!==null) {
        const metaplex = Metaplex.make(connection).use(irysStorage());
  
        try {
          await metaplex.nfts().create({
            uri: imageUrl, // Ensure this is the correct metadata URI
            name,
            symbol,
            sellerFeeBasisPoints: 0,
            creators: [
              {
                address: new PublicKey(wallet.publicKey.toBase58()), // Use PublicKey directly
                share: 100,
              },
            ],
            updateAuthority: new PublicKey(wallet.publicKey) as unknown as Signer, // Directly use the wallet's public key
          });
        } catch (error) {
          console.error("Error creating token metadata:", error);
        }
      }
    }
  
    return (
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center flex-col bg-gray-600 p-6">
          <h1 className="my-2 text-gray-50">Solana Token Launchpad</h1>
          <input
            type="text"
            className="inputText"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            type="text"
            className="inputText"
            placeholder="Symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
          <br />
          <input
            type="text"
            className="inputText"
            placeholder="Image Url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <br />
          <input
            type="number"
            className="inputText"
            placeholder="Initial Supply"
            value={initialSupply}
            onChange={(e) => setInitialSupply(Number(e.target.value))}
          />
          <br />
          <button
            onClick={createToken}
            className="bg-blue-500 p-3 border-black border"
          >
            Create a Token
          </button>
        </div>
      </div>
    );
  };
  