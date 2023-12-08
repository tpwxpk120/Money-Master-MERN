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

export { connectToMongoDB };
