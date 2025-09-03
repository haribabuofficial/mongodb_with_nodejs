// 2) Creating a Database

/* 
1) Create a MongoDBClient Object 
2) Specify the URL with the IP Address and Database which we wanted to create.


let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});


// a database is not created until it gets content!
*/


const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

async function createCollection() {
    try {
        // Connect to MongoDB
        const client = await MongoClient.connect(url); // ,{ useNewUrlParser: true, useUnifiedTopology: true });

        // Get the 'mydb' database
        const dbo = client.db("mydb");
        console.log('Database Created!')
 
        // Close the connection
        client.close();
    } catch (err) {
        console.error("Error:", err);
    }
}

createCollection();