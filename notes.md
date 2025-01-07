### globalThis
in the beginning node used global as the global object, chrome used window or this as the global object. So to standardise 1 word for all js runtimes "globalThis" came, in both node and browsers globalThis refers to as global object  



require("path") we use this log code written in the file who's path is provided 
ISSUE-> you can log the items present in the file but you cannot access the function and variables in the file.WHY???       (refer to line 64)
SOL-> for that you need to use module.exports({key:value,}) and then import it in the file using const obj = require("path")
     you can access things provided in the export using key



```js
//older approach
module.exports={
    x:x,
    calculateSum:calculateSum
}

//new approach 
module.exports={
    x,
    calculateSum
}
```
NOTE:- whenver you do module.exports wrap it inside an object and then destructure it while importing 


There are 2 types of modules  
1. Common Js module (cjs)
    by default in node js   
    use export and require  
    older way  
    synchronous  
    non strict mode

2. ES module (esm)
    by def in react   
    use import export (just like react)  
    newer way  
    by using {type:"module"} in package.json file   
    {
    "type": "module"
    } once you do this you can't use require   
    asynchronous  
    strict mode   


current folder structure   
-hello node   
    --calculate  
        ---sum.js  
        ---multiply.js  
    --first.js  
    --second.js  
So, now when you have multiple files inside a folder and have multiple exports you can just make the folder a module by creating index.js in the calculate folder  
where you can import both calculateSum and multiply and then import both of them. So now in our first.js you no longer need to import them separately you can just import the folder which will behave like module 

```js
const {calculateSum, multiply, x} = require("./calculate") 
//or
const {calculateSum, multiply, x} = require("./calculate/index.js")
```



Whenever you call a require("/path") what actually  happens is all the code of that module is wrapped inside an IIFE and then passed to V8 engine for execution.  
ex : this is what happends when you require("./sum")  <br>
```js
(function(){
    function calculateSum(a,b){
    sum = a+b
    console.log("sum:",sum);
}
})() 
```
So now all the variables and functions are in "private scope" and you can't access them from outside that's why you can't access them directly. You have to use module.exports to do that  
Now you must have a question from where is this module.exports and require is coming from  
    This is provided to us by NODE JS as a parameter to IIFE  
```js
(function(module,require){
function calculateSum(a,b){
 sum = a+b 
console.log("sum:",sum);
}
})()
```



When you call require("path") there is a 5 STEP process which occurs.A js file is not directly passed into V8 engine this is what happens   
1. Resolving the module       
        whether the path is of a node module, js file, json file etc 
2. Loadint the module   
        all the code inside the module is loaded 
3. Wrapps inside IIFE  
        all the loaded code is wrapped inside IIFE
4. Code execution   
        code inside IIFE is executed and the module.exports is returned in the obj. const obj = require("path")
5. Caching   
        the code of the module is cached which means that if a file is required at multiple location the code of that file will just be executed once and then next time it is called it won't run these 5 steps again it'll just return it bcz of the caching 




Libuv (consider the screenshot)  
The V8 engine "offloads" all the async tasks to libuv for it to execute. libuv makes the asynch I/O simple. It is written in c bcz in order to talk to os you need a low level language   
So js which is HLL in V8 talks to libuv which talks to os and takes response from os and provide it to v8 engine   
The "event loop" which we know is inside the libuv   





```js
fs.readFile("./file.txt","utf8",(err,data)=>{
    console.log("file data:", data);
    
})
```
fs is a core node js module which is abbreviated as File System  
fs.readFile("path","encoding","callback")  
this callback has 2 parameter error and data     
there are different types of encoding. utf8 is to read the data in the human readable form. there are other encoding methods lile ascii, hex etc   
THIS IS AN ASYNCHRONOUS FUNCTION 



fs.readFileSync  
THIS IS A SYNCH FUNCTION AND IT BLOCKS THE MAIN THREAD   
any sync function does not have a call back bcz obv it is a sync functon





How v8 works   
code -> parsing or tokenisation of code (the code is created into tokens) -> tokens form an ast (abstract syntax tree) -> ast passes into ignition interpreter (it reads the code line by line and convert into machine code)-> while the igntion interpretor is reading line by line it identifies some part of code which is used again and again (called as HOT) so it passes it to turbofan compiler which compiles that piece if code into optimised machine code -> execution occurs 


there's a catch  
lets suppose you declare a sum function sum(a,b) and you call it multiple times so the interpreter passes it to compiler to make it into optimised machine code by making some "assumptions" which are based on the intial type of paramter passed which means if you pass sum(3,2) the 1st time the compiler assumes that a and b are "numbers" so it'll compile it in such a way that whenver you pass number as argument it compiles very fast. BUT if you pass sum("a","b") the compiler assumptions fails so the code deoptimizes and function is send to ignition interpreter again where is takes "a" and "b"convet into byte code and execute 

This is why js is neither an interpreter language or a compiler language it uses both and it performs "JIT OR JUST IN TIME COMPILATION"





the event loop of node js is different from event loop of browsers 


all this event loop only occurs when the callstack is empty none of this loop will work if callstack is busy   
each has a different queue for it . settimer, setimmediate, promise, nettick everyone has different queues with promise and nexttick having the priority queue   
if nexttick is nested inside nexttick then it'll run that before anything else   
when event loop is ideal it waits at pole phase unlike browser's event loop which constantly runs (good ques in ss)  

The event loop in LIBUV operates in four major phases:
1. Timers Phase: In this phase, all callbacks that were set using setTimeout or setinterval
are executed. These timers are checked, and if their time has
expired, their corresponding callbacks are added to the callback queue for
execution.  
*setInterval*   
A timer specifies the threshold after which a provided callback may be executed rather than the exact time a person wants it to be executed. Timers callbacks will run as early as they can be scheduled after the specified amount of time has passed; however, Operating System scheduling or the running of other callbacks may delay them.



2. Poll Phase: After timers, the event loop enters the Poll phase, which is crucial
because it handles I/O callbacks. For instance, when you perform a file read
operation using fs.readFile , the callback associated with this I/O operation will
be executed in this phase. The Poll phase is responsible for handling all I/O-
related tasks, making it one of the most important phases in the event loop.
The poll phase has two main functions:

    Calculating how long it should block and poll for I/O, then
    Processing events in the poll queue.  

   When the event loop enters the poll phase and there are no timers scheduled, one of two things will happen:

    If the poll queue is not empty, the event loop will iterate through its queue of callbacks executing them synchronously "until either the queue has been exhausted"(jab tak queue ke saare callback execute nahi ho jate execute krta rhega), or the system-dependent hard limit is reached.

    If the poll queue is empty, one of two more things will happen:

     If scripts have been scheduled by setImmediate(), the event loop will end the poll phase and continue to the check phase to execute those scheduled scripts.

     If scripts have not been scheduled by setImmediate(), the event loop will wait for callbacks to be added to the queue, then execute them immediately.

    Once the poll queue is empty the event loop will check for timers whose time thresholds have been reached. If one or more timers are ready, the event loop will wrap back to the timers phase to execute those timers' callbacks.







3. Check Phase: Next is the Check phase, where callbacks scheduled by the
setImmediate function are executed. This utility API allows you to execute
callbacks immediately after the Poll phase, giving you more control over the
order of operations.
4. Close Callbacks Phase: Finally, in the Close Callbacks phase, any callbacks
associated with closing operations, such as socket closures, are handled. This
phase is typically used for cleanup tasks, ensuring that resources are properly
released.

Each phase has a FIFO queue of callbacks to execute. While each phase is special in its own way, generally, when the event loop enters a given phase, it will perform any operations specific to that phase, then execute callbacks in that phase's queue until the queue has been exhausted or the maximum number of callbacks has executed. When the queue has been exhausted or the callback limit is reached, the event loop will move to the next phase, and so on.



### setImmediate() vs setTimeout()

setImmediate() and setTimeout() are similar, but behave in different ways depending on when they are called.

 setImmediate() is designed to execute a script once the current poll phase completes.
 setTimeout() schedules a script to be run after a minimum threshold in ms has elapsed.

The order in which the timers are executed will vary depending on the context in which they are called. If both are called from within the main module, then timing will be bound by the performance of the process (which can be impacted by other applications running on the machine).

For example, if we run the following script which is not within an I/O cycle (i.e. the main module), the order in which the two timers are executed is non-deterministic, as it is bound by the performance of the process:
```js
        // timeout_vs_immediate.js
        setTimeout(() => {
        console.log('timeout');
        }, 0);

        setImmediate(() => {
        console.log('immediate');
        });
```
However, if you move the two calls within an I/O cycle, the immediate callback is always executed first:
```js
        // timeout_vs_immediate.js
        const fs = require('node:fs');

        fs.readFile(__filename, () => {
        setTimeout(() => {
            console.log('timeout');
        }, 0);
        setImmediate(() => {
            console.log('immediate');
        });
        });
```


The main advantage to using setImmediate() over setTimeout() is setImmediate() will always be executed before any timers if scheduled within an I/O cycle, independently of how many timers are present


### process.nextTick() vs setImmediate()

We have two calls that are similar as far as users are concerned, but their names are confusing.

process.nextTick() fires immediately on the same phase
setImmediate() fires on the following iteration or 'tick' of the event loop

In essence, the names should be swapped. process.nextTick() fires more immediately than setImmediate(), but this is an artifact of the past which is unlikely to change.



++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


if interviewer asks "*Is node js single threaded or multi threaded?*"  
ans:- if node js is given some synchronous task it is single threaded and if performs some async task which uses libuv and uv_thread_pool then it is multithreaded 



When a user makes a request to a website, a socket connection is established
between the client and the server. This connection is typically used for a single
request-response cycle: the client sends a request, the server processes it, sends
back the response, and then the socket is closed. This process involves opening a
new connection for each request.



Since most modern kernels are multi-threaded, they can handle multiple operations executing in the background. When one of these operations completes, the kernel tells Node.js so that the appropriate callback may be added to the poll queue to eventually be executed. We'll explain this in further detail later in this topic.  
EPOLL -> this works at the kernel level   
User connects → Socket created → FD registered with epoll.  
Kernel monitors all registered FDs.  
User sends an API request → FD state changes → Kernel marks it as active.  
Application calls epoll_wait → Fetches active FDs → Processes I/O.  
(In event-driven frameworks) → Results queued in callback queue → Event loop processes them.  

HOW EPOLL IS EFFICIENT FROM SELECT OR Poll?  
Imagine you are a teacher managing 100 students in a classroom:

    With select or poll: Every time you check if students need help, you ask each of the 100 students, "Do you need anything?" Most of them will say no, wasting your time.
    With Epoll: Students who need help raise their hand (active FDs). You only look at those students who have raised their hands, ignoring the others who are idle.


my doubt was inactive fds->  
Inactive File Descriptor (FD): A file descriptor is "inactive" when there’s no event associated with it. For instance:

    A client has an open connection but hasn’t sent or requested data.
    A socket is idle, waiting for the client to send a request.


File descriptors are used as a handle to perform operations like reading, writing, or closing the file.


-----------------------------------------------------------------------------------------------
to understand buffer, pipes and streams
Streams, Buffers, and Pipes in Node.js
Streams:

A stream is like a data highway that allows the movement of data in chunks rather than collecting all the data and sending it at once. Data flows through streams continuously, without waiting for the entire data set to be ready.

There are two main types of streams:

    Readable Streams: These streams provide data in chunks from a source, such as a file, network, or API. Data flows from the source into your program.
        Example: Reading the contents of a file in chunks.

    Writable Streams: These streams receive data in chunks and send it to a destination, such as a file, network, or database.
        Example: Writing data to a file in chunks.

Streams allow data to be processed in real-time as it comes in, enabling efficient handling of large datasets or files.
Pipes:

Pipes are like connectors between two streams. They allow data to flow from one stream to another. For example, if we want to read data from one file and write it into another, we can use pipes to connect the readable stream (reading from the source file) and the writable stream (writing to the destination file).

Pipes automatically manage the data flow, transferring it from a readable stream to a writable stream. This process is efficient and eliminates the need to manually handle chunks of data.

Example:

    Readable Stream: Reads chunks of data from file1.txt.
    Writable Stream: Writes those chunks of data to file2.txt.

With pipes, the data from file1.txt flows directly to file2.txt without waiting for the entire file to be read and written.
Buffers:

A buffer is a temporary storage area where data is held while it is being processed or before it is processed. Buffers are especially useful when you are dealing with binary data or streamed data.

When data is read or written in chunks:

    Before Processing: Data may be temporarily stored in a buffer before being processed or written to the final destination (e.g., a file).
    During Processing: Data in a buffer can be transformed or manipulated before being used.

Buffers are like a waiting room for data, where the data sits before it's used, processed, or written to a file. This helps efficiently manage memory and handle large chunks of data that can't all be processed at once.











+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
HOW EPOLL WORKS WITH EVENTLOOP, CALLBACK QUEUE, LIBUV 
Workflow: Epoll, Event Loop, and Callback Queue

Here’s a step-by-step explanation of how epoll integrates into the event loop in Node.js:
1. File Descriptor Registration

    When an asynchronous operation (e.g., reading a file, waiting for a socket connection) is initiated, Node.js uses libuv to:  
        Register the file descriptor (FD) with epoll.
        Specify the events to monitor (e.g., readiness to read/write).

2. Kernel Monitors FDs (Epoll at Work)

    The kernel monitors the registered FDs.  
    When an FD becomes active (e.g., data is ready to read), the kernel notifies epoll.

3. Epoll Waits for Events

    In the background, libuv runs a blocking epoll_wait system call.  
    This call waits for events on the registered FDs. If no FDs are active, it blocks to conserve resources.

4. Epoll Returns Ready FDs

    When an FD becomes active, epoll_wait returns the list of ready FDs to libuv.

5. Libuv Queues the Callbacks

    For each ready FD, libuv:  
        Executes the necessary I/O operation (e.g., reading data from a socket).  
        Queues the corresponding callback in the callback queue.

6. Event Loop Executes Callbacks

    The libuv event loop processes the callback queue.  
    It executes the callbacks sequentially, ensuring that the application can respond to completed I/O operations.

Integration of Epoll with Node.js Event Loop Phases

The Node.js event loop has several phases. Here’s how epoll fits into it:

    Poll Phase:
        This is where epoll comes into play.
        The poll phase of the event loop uses libuv to call epoll_wait, waiting for I/O events.
        If there are no pending timers or immediate callbacks, the event loop can block here.

    Callback Handling:
        After epoll_wait returns, the event loop processes the FDs that became active.
        Callbacks for these FDs are added to the callback queue for execution in subsequent iterations of the event loop.
++++++++++++++++++++++++++++++++++++++++++++++++++++++++












Database is an organised collection of data 
DBMS is a software which is preset btw database and application which interacts with both of them to manupulate the data in database 



Horizontal Scaling involves adding more machines or servers to handle increased load. It is beneficial because:

    It can scale indefinitely by adding more nodes.
    It offers better fault tolerance since the failure of one node doesn’t bring down the entire system.
    It’s suitable for distributed systems, such as modern web applications and cloud environments.

Vertical Scaling involves upgrading the hardware of an existing machine (e.g., increasing RAM, CPU, or storage). However:

    It has physical limitations, as a machine can only be upgraded to a certain extent.
    Fault tolerance is lower since if the machine fails, the entire system can go down.
    It’s simpler to implement for systems that don’t require massive scalability, such as smaller databases.



mongo db is a document based database where we have documents, collection and fields unlike sql based databases which have tables, rows and columsn
two ways to use use mongo db 
1. install it locally
2. let the mongo db host it on a server and provide you the access of it 

install mongo db compass 








different types of rest apis 
    these are known as "HTTP Methods"
        get   
        post   
        put->to upgrade the data   
        patch ->to update the data   
        delete-> to delete the data   
            the difference btw put and patch is that the put method replaces the entire old data with the new data while the patch method only update the selected field 
            put is used when you want to update a whole collection with a new data 
            patch is used when you want to just update a certain field in a collection like age etc 

planning  is very important while starting a project and very cruical for backend dev as well 
(refer to ss about api design and db design ) these are very crucial for working seamlessly and efficiently as you have an entire structure before you start working 




+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
>why are versions only is x.y.z "mongodb": "^6.12.0"  
what does x, y and z represent   
    x-> major change which is a big breaking change  
    y-> minor update like some new feature added   
    z-> minor patch like a bug fix   
    so the change in y and z main downward compatibility which is basically that the older versions are compatible and working as well.   
        ex:- if the version changes to 6.11.1 then your software will run 
    this is not possible when x changes bcz it is a major change and your software might crash     
    what does this "^" do?   
        it automatically updates the version with newer minor and path updates. It doesnot install any major update 