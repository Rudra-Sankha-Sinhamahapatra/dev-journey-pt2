import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

export const generateMnemonicAndSeed = () => {
    const mnemonic = generateMnemonic();
    const seed = mnemonicToSeedSync(mnemonic);
    return { mnemonic, seed };
};

export const deriveWalletFromSeed = (
    seed: Buffer,
    index: number
) => {
    const path = `m/44'/501'/${index}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    return {
        publicKey: keypair.publicKey.toBase58(),
        secretKey: Buffer.from(secret).toString("hex"),
    };
};
