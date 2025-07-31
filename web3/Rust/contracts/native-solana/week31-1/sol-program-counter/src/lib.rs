use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{account_info::{next_account_info, AccountInfo}, entrypoint, msg, pubkey::Pubkey, entrypoint::ProgramResult
};

#[derive(BorshSerialize,BorshDeserialize)]
enum InstructionType {
   Increament(u32),
   Decreament(u32)
}

#[derive(BorshSerialize,BorshDeserialize)]
struct Counter {
   count: u32
}
entrypoint!(counter_contract);

pub fn counter_contract(
   _program_id: &Pubkey,
   accounts:&[AccountInfo],
   instruction_data: &[u8]
) -> ProgramResult {
   let acc = next_account_info(&mut accounts.iter())?;

   let instruction_type = InstructionType::try_from_slice(instruction_data)?;
   let mut counter_data = Counter::try_from_slice(&acc.data.borrow())?;

   match instruction_type {
         InstructionType::Increament(value) => {
            msg!("Executing increase");
            counter_data.count += value;
         },
         InstructionType::Decreament(value) => {
            msg!("Executing decrease");
            counter_data.count -= value;
         }
   }

   counter_data.serialize(&mut *acc.data.borrow_mut())?;
   msg!("Contract succeeded");
   Ok(())
}