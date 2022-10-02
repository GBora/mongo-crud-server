const { MongoClient } = require("mongodb");
const configs = require("../configs");



const getAllUsers = async () => {
    let client = new MongoClient(configs.databaseURL);
    await client.connect();
    collection = client.db("gym_users").collection("users");
    let cursor = collection.find();
    let result = cursor.toArray();
    await client.close();
    return result;
}

module.exports = {
    getAllUsers
}