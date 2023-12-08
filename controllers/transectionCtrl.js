// transactionController.js
import { connectToMongoDB } from "../db/mydb.js";
import { ObjectId } from "mongodb";
import passport from "passport";

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    success: false,
    error: "Unauthorized: User not logged in",
  });
};

const getAllTransection = async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const query = {
      userId: req.query["userId"],
    };
    const transections = await db
      .collection("transections")
      .find(query)
      .toArray();
    res.status(200).json(transections);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const deleteTransection = async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const objectIdToDelete = new ObjectId(req.body.transectionId);

    if (!ObjectId.isValid(req.body.transectionId)) {
      return res.status(400).send("Invalid transectionId");
    }

    const transection = await db
      .collection("transections")
      .findOne({ _id: objectIdToDelete });

    // Check if the user is authorized to delete this transaction
    if (transection.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error:
          "Unauthorized: User does not have permission to delete this transaction",
      });
    }

    await db
      .collection("transections")
      .findOneAndDelete({ _id: objectIdToDelete });
    res.status(201).send("Transection Deleted!");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const editTransection = async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const trans = {
      userId: req.body.userId,
      type: req.body.type,
      amount: req.body.amount,
      date: req.body.date,
      category: req.body.category,
      description: req.body.description,
    };

    for (const key in trans) {
      if (trans[key] === undefined || trans[key] === null) {
        delete trans[key];
      }
    }

    const transectionId = req.body.transectionId;
    await db
      .collection("transections")
      .findOneAndUpdate({ _id: new ObjectId(transectionId) }, { $set: trans });
    res.status(201).send("Edit Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const addTransection = async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const newTransection = {
      userId: req.body.userId,
      type: req.body.type,
      amount: req.body.amount,
      date: req.body.date,
      category: req.body.category,
      description: req.body.description,
    };

    await db.collection("transections").insertOne(newTransection);
    res.status(201).send("Transection Created");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export {
  isAuthenticated,
  getAllTransection,
  addTransection,
  editTransection,
  deleteTransection,
};
