import { PublicKey } from '@solana/web3.js';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';

// Replace these with your actual values
const userAddress: PublicKey = new PublicKey('5gjLjKtBhDxWL4nwGKprThQwyzzNZ7XNAVFcEtw3rD4i');
const tokenMintAddress: PublicKey = new PublicKey('6NeR2StEEb6CP75Gsd7ydbiAkabdriMdixPmC2U9hcJs');

// Derive the associated token address
const getAssociatedTokenAddress = (mintAddress: PublicKey, ownerAddress: PublicKey): [PublicKey, number] => {
    return PublicKey.findProgramAddressSync(
        [
            ownerAddress.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            mintAddress.toBuffer(),
        ],
        ASSOCIATED_TOKEN_PROGRAM_ID
    );
};

const [associatedTokenAddress, bump]: [PublicKey, number] = getAssociatedTokenAddress(tokenMintAddress, userAddress);
console.log(`Associated Token Address: ${associatedTokenAddress.toBase58()}, bump: ${bump}`);
