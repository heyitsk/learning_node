//module protects their variables and functions. 
// So if you require("./sum.js") you won't be able to access the caluclateSum function there for that you do module.exports=calculateSum
//if you want to export multiple things use an object having key and value prop export={}
function calculateSum(a,b){
    sum = a+b
    console.log("sum:",sum);
    
}
var x = 10

// module.exports={
//     x:x,
//     calculateSum:calculateSum
// }

// console.log(module.exports); this logs an empty object {} so before exporting anything it is an empty object and then values are added in it. So you can also do module.exports.x = x and module.exports.calculateSum = caluclateSum bcz it means the same thing that inside an empty object you're declaring key value pairs 


module.exports={
    x,
    calculateSum
}

// export function calculateSum(a,b){
//     var sum = a+b
//     console.log(sum);
    
// }
// export var x = 10