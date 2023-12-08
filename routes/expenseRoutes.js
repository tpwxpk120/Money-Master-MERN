import express from "express";
import {
  getAllTransection,
  addTransection,
  editTransection,
  deleteTransection,
} from "../controllers/transectionCtrl.js";

const router = express.Router();

// Add routes to the router
router.post("/add-transection", addTransection);
router.post("/edit-transection", editTransection);
router.post("/delete-transection", deleteTransection);
router.get("/get-transection", getAllTransection);

export { router };
