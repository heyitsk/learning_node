const fs = require("fs");
const crypto = require("crypto");

process.env.UV_THREADPOOL_SIZE = 5;
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("1 - cryptoPBKDF2 done");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("2 - cryptoPBKDF2  done");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("3 - cryptoPBKDF2  done");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("4 - cryptoPBKDF2  done");
});


//by default size of UV_thread_pool is 4
//here the order of output is not determined as whichever returns the answer first will be stored in the callback queue first 

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
    console.log("5 - cryptoPBKDF2  done");
  });
//this 5th took some time bcz by default therre are 4 threads and inorder for it to run it should wait for a thread to get empty. to change the size of thread pool you do process.env.UV_THREADPOOL_SIZE = x;