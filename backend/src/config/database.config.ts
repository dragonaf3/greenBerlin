export const databaseConfig = {
    uri: process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.rwxccv8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    dbName: process.env.DB_NAME || 'greenberlin',
    userCollection: process.env.USER_COLLECTION || 'users',
    locationCollection: process.env.LOCATION_COLLECTION || 'locations',
};

