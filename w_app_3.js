// 3) Creating a Collection
/*
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db("mydb");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
*/

const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

async function createCollection() {
    try {
        // Connect to MongoDB
        const client = await MongoClient.connect(url,); // { useNewUrlParser: true, useUnifiedTopology: true });

        // Get the 'mydb' database
        const dbo = client.db("mydb");

        // Create a collection
        const result = await dbo.createCollection("customers");
        console.log("Collection created!");

        // Close the connection
        client.close();
    } catch (err) {
        console.error("Error:", err);
    }
}

createCollection();
