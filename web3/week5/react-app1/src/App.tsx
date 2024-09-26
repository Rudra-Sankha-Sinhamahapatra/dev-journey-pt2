
import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { clusterApiUrl} from '@solana/web3.js';
import { TransactionComponent } from './Transaction';
import { Airdrop } from './Airdrop'; 
import '@solana/wallet-adapter-react-ui/styles.css';

function App () {
  const apiKey = import.meta.env.VITE_API_KEY;

  const endpoint = useMemo(() => `https://solana-devnet.g.alchemy.com/v2/${apiKey}`, [apiKey]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className='flex justify-between'>
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>

          <h1>Hi there, hello</h1>
          
          <Airdrop />
          <TransactionComponent/>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
