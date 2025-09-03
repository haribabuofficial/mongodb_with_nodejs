// 4) Insert Collection

// iii) Result Object


const {MongoClient} = require('mongodb');
const url = "mongodb://localhost:27017/";

let obj = [
    { _id: 154, name: 'Chocolate Heaven'},
    { _id: 155, name: 'Tasty Lemon'},
    { _id: 156, name: 'Vanilla Dream'}
]


async function createCollection() {
    try {
        const client = await MongoClient.connect(url);

        const dbo = client.db('mydb');

        const create = await dbo.createCollection('customers');
        console.log('Collection Created');

        const res_obj = await dbo.collection('customers').insertMany(obj);
        console.log('Object has inserted to Collection');
        console.log(res_obj)

        client.close();
    } catch(err) {
        console.error('Errro:', err);
    }
    
}

createCollection();

// ------------------------------------------------------------------------------------------------


// Drop Collection

async function dropCollection() {
    try {
            const client = await MongoClient.connect(url);

            const dbo =  client.db('mydb');

            const drop = await dbo.dropCollection('customers');
            console.log('Collection has been Droped');
            
            client.close()

    } catch(err) {
        console.error("Error:", err);
    }
};

//dropCollection()
