import { useMemo, useState } from 'react'
import { ConnectionProvider,WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl, PublicKey } from '@solana/web3.js';
import "@solana/wallet-adapter-react-ui/styles.css"
import './App.css'
import { ShowSolBalance } from './components/Balance';
import { TokenLaunchpad } from './components/CreateToken';
import { MintToken } from './components/MintToken';
import { CreateCpPool } from './components/CreateCpPool';

function App() {
 
  // const SOL_RPC_URL = import.meta.env.VITE_SOLANA_DEVNET_RPC;

  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(()=> clusterApiUrl(network),[network])

  const [token,setToken] = useState<PublicKey | null>(null);
  const [mintDone,setMintDone] = useState<boolean>(false);


  return (
    <>
   <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={[]} autoConnect>
       <WalletModalProvider>
        <div className='flex justify-between'>
        <WalletMultiButton/>
        <WalletDisconnectButton/>
        </div>
       <ShowSolBalance/>
       <TokenLaunchpad onTokenCreate={(tokenMint:any)=>{
        setToken(tokenMint);
       }}/>
       <p className='text-center my-8'>{token && token.toBase58()}</p> 
       {token && <MintToken onDone={()=> setMintDone(true)} mintAddress={token}/>}
        {mintDone && <CreateCpPool/>}
       </WalletModalProvider>
    </WalletProvider>
   </ConnectionProvider>
    </>
  )
}

export default App
