// 5) Find

// findSome (projectin)

const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

let obj = [
    {name: 'John', address: 'Highway 71'},
    {name: 'Peter', address: 'Lowstreet 4'},
    {name: 'Amy', address: 'Apple st 652'},
    {name: 'Hannah', address: 'Mountain 21'},
    {name: 'Michael', address: 'Valley 345'},
    {name: 'Sandy', address: 'Ocean blvd 2'},
    {name: 'Betty', address: 'Green Grass 1'},
    {name: 'Richard', address: 'Sky st 331'},
    {name: 'Susan', address: 'One way 98'},
    {name: 'Vicky', address: 'Yellow Garden 2'},
    {name: 'Ben', address: 'Park Lane 38'},
    {name: 'William', address: 'Central st 954'},
    {name: 'Chuck', address: 'Main Road 989'},
    {name: 'Viola', address: 'Sideway 1633'}
  ]

async function createCollection() {
    try {
        // Connect to MongoDB
        const client = await MongoClient.connect(url) //, { useNewUrlParser: true, useUnifiedTopology: true });

        // Get the 'mydb' database
        const dbo = client.db("mydb");

        // Create a collection
        const result = await dbo.createCollection("customers");
        console.log("Collection created!");

        // Insert a sample document to confirm creation
        await dbo.collection("customers").insertMany(obj);

        // Print the inserted document (optional)
        const inserted = await dbo.collection("customers").find({}, { projection: { _id: 0, name: 1, address: 1 }}).toArray();
        console.log(inserted[2].address);       // he result can be converted into an array containing each document as an object.
        console.log('--------------------------------')
        console.log("Inserted document:", inserted);

        // Close the connection
        client.close();
    } catch (err) {
        console.error("Error:", err);
    }
}

createCollection();


/*
You are not allowed to specify both 0 and 1 values in the same object (except if one of the fields is the _id field). If you specify a field with the value 0, all other fields get the value 1, and vice versa:
{projcection: {address: 0}}             ---->   True
{ projection: { _id: 0, name: 1 }       ---->   True
{ projection: { _id: 0 }                ---->   True
{ projection: { name: 1, address: 0 }   ---->   Error
*/

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
    

