const {MongoClient, ObjectId} = require("mongodb");

// Replace db_user, db_pass, db_name, db_collection
const db_user = "greenberlin_user";
const db_pass = "2dyLjudJa";
const db_name = "greenberlin";
const db_collection_users = "users";
const db_collection_locations = "locations";
const dbHostname = "mongodb1.f4.htw-berlin.de";
const dbPort = 27017;
const uri = `mongodb://${db_user}:${db_pass}@${dbHostname}:${dbPort}/${db_name}`;

function MongoCRUDs(db_name, uri) {
    this.db_name = db_name;
    this.uri = uri;
}

// CRUD Operations for Users

MongoCRUDs.prototype.findOneUser = async function (uNameIn, passwdIn) {
    const client = new MongoClient(uri);
    try {
        const database = client.db(db_name);
        const users = database.collection(db_collection_users);
        const query = {username: uNameIn, password: passwdIn};
        const doc = await users.findOne(query);
        if (doc) {
            delete doc.password;
        }
        return doc;
    } finally {
        await client.close();
    }
};

MongoCRUDs.prototype.findAllUsers = async function () {
    const client = new MongoClient(uri);
    try {
        const database = client.db(db_name);
        const users = database.collection(db_collection_users);
        const query = {};
        const cursor = users.find(query);
        if ((await users.countDocuments(query)) === 0) {
            console.log("No documents found!");
            return null;
        }
        let docs = [];
        for await (const doc of cursor) {
            delete doc.password;
            docs.push(doc);
        }
        return docs;
    } finally {
        await client.close();
    }
};

MongoCRUDs.prototype.createUser = async function (user) {
    const client = new MongoClient(uri);
    try {
        const database = client.db(db_name);
        const users = database.collection(db_collection_users);
        const result = await users.insertOne(user);
        return result.insertedId;
    } finally {
        await client.close();
    }
};

// Methode zum Löschen eines Benutzers
MongoCRUDs.prototype.deleteUser = async function (userId) {
    const client = new MongoClient(uri);
    try {
        const database = client.db(db_name);
        const users = database.collection(db_collection_users);
        const result = await users.deleteOne({_id: new ObjectId(userId)});
        return result.deletedCount;
    } finally {
        await client.close();
    }
};

// CRUD Operations for Locations
MongoCRUDs.prototype.createLocation = async function (location) {
    const client = new MongoClient(uri);
    try {
        const database = client.db(db_name);
        const locations = database.collection(db_collection_locations);
        const result = await locations.insertOne(location);
        return result.insertedId;
    } finally {
        await client.close();
    }
};

MongoCRUDs.prototype.getAllLocations = async function () {
    const client = new MongoClient(uri);
    try {
        const database = client.db(db_name);
        const locations = database.collection(db_collection_locations);
        const cursor = locations.find({});
        const locationsList = [];
        await cursor.forEach(doc => locationsList.push(doc));
        return locationsList;
    } finally {
        await client.close();
    }
};

MongoCRUDs.prototype.getLocationById = async function (id) {
    const client = new MongoClient(uri);
    try {
        const database = client.db(db_name);
        const locations = database.collection(db_collection_locations);
        const location = await locations.findOne({_id: new ObjectId(id)});
        return location;
    } finally {
        await client.close();
    }
};

MongoCRUDs.prototype.updateLocation = async function (id, location) {
    const client = new MongoClient(uri);
    try {
        const database = client.db(db_name);
        const locations = database.collection(db_collection_locations);
        const result = await locations.updateOne({_id: new ObjectId(id)}, {$set: location});
        return result.modifiedCount;
    } finally {
        await client.close();
    }
};

MongoCRUDs.prototype.deleteLocation = async function (id) {
    const client = new MongoClient(uri);
    try {
        const database = client.db(db_name);
        const locations = database.collection(db_collection_locations);
        const result = await locations.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount;
    } finally {
        await client.close();
    }
};

const mongoCRUDs = new MongoCRUDs(db_name, uri);

module.exports = mongoCRUDs;
