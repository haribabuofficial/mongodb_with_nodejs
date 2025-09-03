// 10) Update
// ii) Update Only Specific Fields


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

let oldvalues = { address: "Valley 345" };

let newvalues =  {$set: { address: "Canyon 123" }};

let find_field = {name: "Michael"}


async function createCollection() {
    try {
        const client = await MongoClient.connect(url) //, { useNewUrlParser: true, useUnifiedTopology: true });

        const dbo = client.db("mydb");

        const result = await dbo.createCollection("customers");
        console.log("Collection created!");

        await dbo.collection("customers").insertMany(obj);

        let oldvalue = await dbo.collection('customers').findOne(find_field);
        console.log(oldvalue);

        await dbo.collection('customers').updateOne(oldvalues, newvalues);
        
        let newvalue = await dbo.collection('customers').findOne(find_field);
        console.log(newvalue);


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
    

