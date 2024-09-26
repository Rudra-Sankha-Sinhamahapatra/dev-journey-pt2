/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import { useState } from "react";
import { createMint } from '@solana/spl-token';


export async function TokenLaunchpad() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [image, setImage] = useState("");
  const [initialSupply, setInitialSupply] = useState("");
  
  function createToken() {
    console.log('Token details:', {
        name,
        symbol,
        image,
        initialSupply,
    });
  
}

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Solana Token Launchpad</h1>
      <input value={name}   onChange={(e)=>setName(e.target.value)} className="inputText" type="text" placeholder="Name"></input>{" "}
      <br />
      <input
        className="inputText"
        type="text"
        placeholder="Symbol"
        value={symbol}
        onChange={(e)=>setSymbol(e.target.value)}
      ></input>{" "}
      <br />
      <input
        className="inputText"
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e)=>setImage(e.target.value)}
      ></input>{" "}
      <br />
      <input
        className="inputText"
        type="text"
        value={initialSupply}
        placeholder="Initial Supply"
        onChange={(e)=>setInitialSupply(e.target.value)}
      ></input>{" "}
      <br />
      <button className="btn">Create a token</button>
    </div>
  );
}
