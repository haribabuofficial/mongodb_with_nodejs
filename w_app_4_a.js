// 4) Insert into Collection

// i) InsertOne


const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

let obj = { name: "Company Inc", address: "Highway 37" }

async function createCollection() {
    try {
        // Connect to MongoDB
        const client = await MongoClient.connect(url); // { useNewUrlParser: true, useUnifiedTopology: true });

        // Get the 'mydb' database
        const dbo = client.db("mydb");

        // Insert a sample document to confirm creation
        await dbo.collection("customers").insertOne(obj);

        // Close the connection
        client.close();
    } catch (err) {
        console.error("Error:", err);
    }
}

createCollection();


// ----------------------------------------------------------------------------------------------------------


// DropDatabase

async function dropCollection() {
    try {
        // Connect to MongoDB
        const client = await MongoClient.connect(url); // { useNewUrlParser: true, useUnifiedTopology: true });

        // Get the 'mydb' database
        const dbo = client.db("mydb");

        // Drop a collection
        const drop = await dbo.dropCollection("customers");
        console.log('Collection is Deleted')

        // Close the connection
        client.close();
    } catch (err) {
        console.error("Error:", err);
    }
}

//dropCollection();