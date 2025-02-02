//old approach
export function main () {
    fetch("https://jsonplaceholder.typicode.com/todos/2").then(async response => {
        const json = await response.json()
        console.log("Main Fetch : ",json)
    })
}


//new better cleaner approach
//fetch returns a promise 
export async function mainCopy () {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const json = await response.json();
    console.log("MainCopy Fetch : ",json);
}

//in fetch we have to exclusively define whether the incoming data through api call is json or not

// we have to separately define the incoming data type to text
export async function postFetch () {
    const response = await fetch("https://www.postb.in/1738496905501-3567191280890",{
        method:"POST"
    });
    const json = await response.text();
    console.log("Post fetch: ",json);
}