// 5) Find

// i) findOne

const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

let obj = { name: "Company Inc", address: "Highway 37" }

async function createCollection() {
    try {
        // Connect to MongoDB
        const client = await MongoClient.connect(url); // { useNewUrlParser: true, useUnifiedTopology: true });

        // Get the 'mydb' database
        const dbo = client.db("mydb");

        // Create a collection
        const result = await dbo.createCollection("customers");
        console.log("Collection created!");

        // Insert a sample document to confirm creation
        await dbo.collection("customers").insertOne(obj);

        // Print the inserted document (optional)
        const inserted = await dbo.collection("customers").findOne(obj);
        console.log("Inserted document:", inserted);

        // Close the connection
        client.close();
    } catch (err) {
        console.error("Error:", err);
    }
}

createCollection();


// ----------------------------------------------------------------------------------------------------------



// Drop Collection

async function dropCollection() {
    try {
        const client = await MongoClient.connect(url);

        const dbo = client.db('mydb');

        const drop = await dbo.dropCollection('customers');
        console.log('Collection is Deleted');

        client.close();
    } catch (err) {
        console.error("Error:", err);
    }
};

//dropCollection()
    
