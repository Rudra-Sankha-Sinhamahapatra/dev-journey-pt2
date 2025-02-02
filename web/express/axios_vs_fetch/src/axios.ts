import axios from "axios";

//axios is smart enough to understand the type of incoming data through api calls, we dont need to tell it whether its json or not
//axios makes it much more cleaner
export async function axiosMain () {
const response = await axios.get("https://jsonplaceholder.typicode.com/todos/3");
console.log("axios get: ",response.data)
}

//POST

export async function axiosPOST () {
    const response = await axios.post("https://www.postb.in/1738496905501-3567191280890",{
        username:"Rudra",
        password:"HelloWorld"
    },{
        headers:{
            Authorization:"Bearer 123",
            // "Content-Type":"application/json"
        }
    });
    console.log("Axios post : ",response.data)
    }
    