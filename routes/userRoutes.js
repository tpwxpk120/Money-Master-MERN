import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/userController.js";
import "../passport/passport.js";

// Router object
const userRouter = express.Router();

// Login route (unprotected)
userRouter.post("/login", loginController);

// Register route (unprotected)
userRouter.post("/register", registerController);

export { userRouter };
