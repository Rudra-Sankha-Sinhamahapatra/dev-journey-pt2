# Solana Counter Program

A simple Solana program that maintains a counter which can be incremented or decremented.

## Deployed Program ID
```
FfjWHHPnTGF4Fin1cDTc7bYkhyJfW3E4UCdfzTF6FEXt
```

## Program Functionality

The program maintains a counter (u32) that can be:
- Incremented by any value (0 to 4,294,967,295)
- Decremented by any value (0 to 4,294,967,295)

## How to Use

1. **Set Program ID Environment Variable**
```bash
export PROGRAM_ID=FfjWHHPnTGF4Fin1cDTc7bYkhyJfW3E4UCdfzTF6FEXt
```

2. **Create Counter Account**
```bash
# Generate a new keypair for counter account
solana-keygen new --no-bip39-passphrase -o counter-account.json

# Get the public key of counter account
solana-keygen pubkey counter-account.json

# Fund the account
solana transfer --allow-unfunded-recipient COUNTER_ACCOUNT_PUBKEY 0.1
```

3. **Build and Deploy (if needed)**
```bash
cargo build-bpf
solana program deploy target/deploy/sol_program_counter.so
```

## Important Notes

- The program is deployed on Solana devnet
- Counter values are stored as unsigned 32-bit integers (u32)
- Maximum counter value: 4,294,967,295
- Minimum counter value: 0

## Security Notes

- Keep your `counter-account.json` secure and do not commit it to git
- The program deployment keypair should also be kept secure