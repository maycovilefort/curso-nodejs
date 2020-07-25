//db.js
const ObjectId = require("mongodb").ObjectId;
const mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb://localhost:27017", 
                    { useUnifiedTopology: true })
            .then(connection => {
                global.connection = connection.db("aula02");
                console.log("Connected to MongoDB!");
            })
            .catch(error => console.log(error));

function findCustomers(){
    return global.connection
                 .collection("clientes")
                 .find({})
                 .toArray();
}

function findCustomer(id){
    const objectId = new ObjectId(id);
    return global.connection
                 .collection("clientes")
                 .findOne({_id: objectId});
}

function insertCustomer(customer){
    return global.connection
                 .collection("clientes")
                 .insertOne(customer);
}

function updateCustomer(id, customer){
    const objectId = new ObjectId(id);
    return global.connection
                 .collection("clientes")
                 .updateOne({_id: objectId}, {$set: customer});
}

function deleteCustomer(id){
    const objectId = new ObjectId(id);
    return global.connection
                 .collection("clientes")
                 .deleteOne({_id: objectId});
}

module.exports = { 
    findCustomers, 
    insertCustomer, 
    updateCustomer,
    deleteCustomer,
    findCustomer
}