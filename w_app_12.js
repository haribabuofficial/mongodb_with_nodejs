// 12) Join

// MongoDB is not a relational database, but you can perform a left outer join by using the $lookup stage.

const {MongoClient} = require('mongodb');
const url = "mongodb://localhost:27017/";

let products_data = [
    { _id: 101, name: "Laptop", price: 1000 },
    { _id: 102, name: "Mouse", price: 25 },
    { _id: 103, name: "Keyboard", price: 45 }
]

let orders_data = [
    { _id: 1, product_id: 101, quantity: 2 },
    { _id: 2, product_id: 102, quantity: 1 },
    { _id: 3, product_id: 103, quantity: 5 }
]



async function joinCollection() {
    try {

        const client = await MongoClient.connect(url);

        const dbo = client.db('mydb');

        // create collection products

        await dbo.createCollection('products');

        await dbo.collection('products').insertMany(products_data);

        await dbo.createCollection('orders');

        await dbo.collection('orders').insertMany(orders_data);

        let p_d = await dbo.collection('products').find({}).toArray();
        console.log("Product:\n", p_d);

        let o_d = await dbo.collection('orders').find({}).toArray();
        console.log('Orders:\n', o_d);

        const result = await dbo.collection('orders').aggregate([
            {
                $lookup: {
                    from: "products",           // collection to join
                    localField: "product_id",   // field in orders
                    foreignField: "_id",        // field in products
                    as: "product"               // output array field
                }                   
            },
            {   
                $unwind: "$product"          // Flatten the joined array into a single object
            }
        ]).toArray()
        console.log("Join:\n", JSON.stringify(result));

        await dbo.createCollection('join_collection');

        await dbo.collection('join_collection').insertMany(result);
        
        await client.close()
    }catch(err) {
        console.error("Error:", err);
    }

}

joinCollection()


// ----------------------------------------------------------------------------------------------------------



// Drop Collection

async function dropCollection() {
    try {
        const client = await MongoClient.connect(url);

        const dbo = client.db('mydb');

        await dbo.dropCollection('products');
        await dbo.dropCollection('orders')
        await dbo.dropCollection('join_collection')
        console.log('Collection is Deleted');

        client.close();
    } catch (err) {
        console.error("Error:", err);
    }
};

//dropCollection()