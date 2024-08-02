
// Assignment #3
// What if I ask you to find a nonce for the following input - 
// harkirat => Raman | Rs 100
// Ram => Ankit | Rs 10

// Assignment #2
// What if I ask you that the input string should start with 100xdevs ? How would the code change?


const crypto = require('crypto');

function findHashWithInputString(prefix){
    let input = 0;

    while(true){
        const inputStr = `harkirat => Raman | Rs 100
        Ram => Ankit | Rs 10 ` + input.toString();
        const hash = crypto.createHash('sha256').update(inputStr).digest('hex');

        if(hash.startsWith(prefix)){
            return {input:inputStr,hash:hash}
        }
        input ++;
    }
}

const result = findHashWithInputString("00000");
console.log(`Input:${result.input}`);
console.log(`Hash:${result.hash}`);