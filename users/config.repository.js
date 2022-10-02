const { MongoClient } = require("mongodb");
const configs = require("../configs");

const client = new MongoClient(configs.databaseURL);

const getAllUsers = async () => {
    await client.connect();
    let gymUsersDatabase = client.db("gym_users");
    let usersCollection = gymUsersDatabase.collection("users");
    let cursor = await usersCollection.find();
    let result = await cursor.toArray();
    await client.close();
    return result;
}

module.exports = {
    getAllUsers
}