import { connectToMongoDB } from "../db/mydb.js";


const createTransactionSchema = async (req, res) => {
  const db = await connectToMongoDB("test");
  return db.collection("");
};

export { createTransactionSchema };
