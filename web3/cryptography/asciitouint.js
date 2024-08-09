function asciiToBytes(asciiString) {
    const arr =[];
    for(let i=0;i<asciiString.length;i++){
        arr.push(asciiString.charCodeAt(i));
    }
    return new Uint8Array(arr);
  }
  
  // Example usage:
  const ascii = "Hello";
  const byteArray = asciiToBytes(ascii);
  console.log(byteArray); // Output: Uint8Array(5) [72, 101, 108, 108, 111]
  