const fs = require("fs")
// const fs = require("node:fs") 


const https = require("https")
console.log("hello world");
var a = 1234
var b = 4567

https.get("https://dummyjson.com",(res)=>{
    console.log("data fetched successfully");
    
})


setTimeout(()=>{
    console.log("settimeout called after 5 seconds");
    
},5000)

// const data = fs.readFileSync("./file.txt","utf8")
// console.log(data);
//this will block the main thread and the multiplication function will not run until this data is fetched 


fs.readFile("./file.txt","utf8",(err,data)=>{
    console.log("file data:", data);
    
})

function multiplyFunction(x,y){
    const result = x*y
    return result
}

var c = multiplyFunction(a,b)
console.log(c);
