import { mainnet } from 'viem/chains'
import './App.css'
import { Address, createPublicClient, formatEther, http, PublicClient } from 'viem'
import { fetchBlock } from '../lib/fetchBlock'
import { useCallback, useEffect, useState } from 'react'
import {getBalance} from '../lib/getBalance'


function App() {
const [block,setBlock] = useState<string|undefined>();
const [address, setAddress] = useState<Address | undefined>(); 
const [balance, setBalance] = useState<string | undefined>();

  const client:PublicClient = createPublicClient({ 
    chain: mainnet, 
    transport: http(), 
  }) 

 const fetchBl = useCallback(async()=>{
     const blockNumber = await fetchBlock({client});
     if(blockNumber)
     setBlock(blockNumber.toString());
  },[client])

  useEffect(()=>{
  fetchBl()
  },[fetchBl])

  const fetchBalance = useCallback(async()=>{
    if(address){
      try {
     const balance = await getBalance({client,address})
     const ethBalance = formatEther(balance);
     setBalance(parseFloat(ethBalance).toFixed(6).toString());

    // setBalance(balance.toString())
      } catch(error){
        console.error(error);
        console.error("Error happened")
      }
    }
    },[address, client])

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      if(input.startsWith('0x') && input.length === 42) {
        setAddress(input as Address)
      } else {
        setAddress(undefined)
      }
    }

  return (
    <>
    <div>
    <div>BlockNumber :{block}</div>
    <div>
      <input type="text" placeholder='Enter Etherium Address' value={address || ""} 
      onChange={handleAddressChange}
      style={{ marginRight: '10px' }}
      />
             <button onClick={fetchBalance} disabled={!address}>Get Balance</button>
    </div>
    {balance && <div>Balance in ETH: {balance}</div>}

    </div>
    </>
  )
}

export default App
