const { MongoClient } = require('mongodb');
const url = "mongodb+srv://kushagradpr:ipzHZS8FROU1ca7R@learningnode.jvcpg.mongodb.net/";
const client = new MongoClient(url);

const dbName = 'HelloWorld';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('user');
  
    // the following code examples can be pasted here...

    

    //insert 
    // const insertResult = await collection.insertOne({"firstname":"yashvi", "lastname":"agarwal","age":120});
    // console.log('Inserted documents =>', insertResult);

    //read the document 
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
  
    //delete 
    const deleteResult = await collection.deleteMany({ "firstname":"yashvi" });
    console.log('Deleted documents =>', deleteResult);
    return 'done.';
  }


main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());