require("./second.js")
//wherever you put this in code whatever is in second.js will get logged. If you put it at the top first it will log the items in second.js file and if you put it at line 6 it will log hello then the second.js
// const obj = require("./sum.js")
// import {calculateSum,x} from "./sum.js" esm approach 



// const {x,calculateSum} = require("./calculate/sum.js")
// const {multiply} = require("./calculate/multiply.js")


const {calculateSum, multiply, x} = require("./calculate")
const data = require("./data.json") //to import json data you don't need to write module.exports you just write require 
console.log(data);



// console.log("globalThis");


var a = 30
var b= 20;
calculateSum(a,b)
multiply(a,b)


console.log("x:",x);
