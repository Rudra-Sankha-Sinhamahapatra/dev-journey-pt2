import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import * as readline from 'readline';

interface Props {
  keypair: Keypair;
  amount: number;
  recipientAddress?: string;
}


function generateWallet(): Keypair {
  const keypair = Keypair.generate();
  console.log(`Generated a new Wallet:\n
    Public Key : ${keypair.publicKey.toBase58()}\n
    Private Key as Uint8 Array : ${keypair.secretKey}\n
    Private Key (Base64): ${Buffer.from(keypair.secretKey).toString('base64')}`);
  return keypair;
}

async function transaction({ keypair, amount, recipientAddress }: Props) {
  if (!recipientAddress) {
    console.error("Recipient address is required for a transaction.");
    return;
  }

  try {
    const connection = new Connection("https://api.devnet.solana.com");
    const payer = Keypair.fromSecretKey(keypair.secretKey);

    console.log(`Sender: ${payer.publicKey.toBase58()}`);
    console.log(`Recipient: ${recipientAddress}`);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: new PublicKey(recipientAddress),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    transaction.feePayer = payer.publicKey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.partialSign(payer);

    const signature = await connection.sendRawTransaction(transaction.serialize());
    console.log(`Transaction successful! Signature: ${signature}`);
  } catch (err) {
    console.error("Transaction failed:", err);
  }
}

async function airDrop({ keypair, amount }: Props) {
  const connection = new Connection("https://api.devnet.solana.com");

  let balance = await connection.getBalance(keypair.publicKey);
  console.log(`Balance : ${balance / LAMPORTS_PER_SOL} SOL`);

  const fromAirdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
    amount * LAMPORTS_PER_SOL
  );

  await connection.confirmTransaction(fromAirdropSignature);

  const updatedBalance = await connection.getBalance(keypair.publicKey);
  console.log(`Updated Balance: ${updatedBalance / LAMPORTS_PER_SOL} SOL`);
}

function showMenu() {
  console.log(`Choose an option:
    1. Request an airdrop
    2. Send a transaction
    3. Exit`);
}

export default function cliWallet() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("Generating wallet...");
  const keypair = generateWallet();

  const handleUserChoice = () => {
    showMenu();

    rl.question('Enter your choice (1, 2, or 3): ', async (choice) => {
      let amount: number;

      switch (choice) {
        case '1':
          rl.question('Enter airdrop amount in SOL: ', async (amt) => {
            amount = parseFloat(amt);
            await airDrop({ keypair, amount });
            handleUserChoice();  
          });
          break;

        case '2':
          rl.question('Enter recipient address: ', async (recipientAddress) => {
            rl.question('Enter transaction amount in SOL: ', async (amt) => {
              amount = parseFloat(amt);
              await transaction({ keypair, amount, recipientAddress });
              handleUserChoice();  
            });
          });
          break;

        case '3':
          console.log("Exiting...");
          rl.close();
          break;

        default:
          console.log('Invalid choice. Please enter 1, 2, or 3.');
          handleUserChoice();  
      }
    });
  };

  handleUserChoice();  
}

cliWallet();
