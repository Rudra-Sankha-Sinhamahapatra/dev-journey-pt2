
// function setTimeoutfunc(){
//     console.log("another hello");
// }

// function greet(func,greetTime){
//     console.log("hii")
//     setTimeout(func,greetTime);
// }


function setTimeoutPromisified(ms){
    return new Promise(function(resolve,reject){
        console.log("wait")
        setTimeout(resolve,ms);
    });
}

function callback(){
    console.log("3 seconds have passed,go");
}

setTimeoutPromisified(3000).then(callback);