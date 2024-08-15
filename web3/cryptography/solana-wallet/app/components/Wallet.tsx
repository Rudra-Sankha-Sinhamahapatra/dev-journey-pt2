"use client";
import { useState } from "react";
import { generateMnemonicAndSeed, deriveWalletFromSeed } from "../utils/wallet/wallet";

const Wallet = () => {
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [seed, setSeed] = useState<Buffer | null>(null);
  const [wallets, setWallets] = useState<
    { publicKey: string; secretKey: string }[]
  >([]);
  const [walletIndex, setWalletIndex] = useState<number>(0);

  const handleGenerateMnemonic = () => {
    const { mnemonic, seed } = generateMnemonicAndSeed();
    setMnemonic(mnemonic);
    setSeed(seed);
    setWallets([]);
    setWalletIndex(0); 
  };

  const handleAddWallet = () => {
    if (seed) {
      const newWallet = deriveWalletFromSeed(seed, walletIndex);
      setWallets((prevWallets) => [...prevWallets, newWallet]);
      setWalletIndex(walletIndex + 1); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
        <h1 className="text-4xl font-extrabold text-white mb-6 text-center">Solana Wallet Generator</h1>
        <div className="flex justify-center">
          <button
            onClick={handleGenerateMnemonic}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
          >
            Generate New Mnemonic
          </button>
        </div>
        {mnemonic && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-300">Mnemonic:</h2>
            <p className="mt-2 p-4 bg-gray-700 rounded-lg text-gray-200">
              {mnemonic}
            </p>
          </div>
        )}
        {mnemonic && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleAddWallet}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition"
            >
              Add Wallet
            </button>
          </div>
        )}
        {wallets.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-300">Derived Wallets:</h2>
            {wallets.map((wallet, index) => (
              <div
                key={index}
                className="mt-4 p-4 bg-gray-700 rounded-lg border border-blue-500 shadow-md"
              >
                <h3 className="font-medium text-gray-200">Wallet {index + 1}</h3>
                <p className="mt-2"><strong>Public Key:</strong></p>
                <p className="key mt-1 p-2 bg-gray-800 rounded text-gray-200 break-all">{wallet.publicKey}</p>
                <p className="mt-4"><strong>Secret Key:</strong></p>
                <p className="key mt-1 p-2 bg-gray-800 rounded text-gray-200 break-all">{wallet.secretKey}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
