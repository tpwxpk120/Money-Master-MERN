import { MongoClient } from "mongodb";

const connectToMongoDB = async () => {
  try {
    
    const client = new MongoClient(process.env.MONGO_URL, {
    });

    await client.connect();
    console.log("Db Connected");
    return(client.db("test"));
  } catch (error) {
    console.log("DB Connection Error");
  }
};

// you could try creating a myDB object - 
// add all the CRUD operations to it and return that

// and also add a different db file for different types of pages / user tasks

export { connectToMongoDB };
