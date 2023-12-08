// userController.js
import passport from "passport";
import { connectToMongoDB } from "../db/mydb.js";

var db = await connectToMongoDB();

const loginController = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log(user, info)
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message,
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err.message,
        });
      }

      return res.status(201).json({
        success: true,
        body: user,
      });
    });
  })(req, res, next);
};

//Register Callback
const registerController = async (req, res) => {
  try {
    const data = req.body
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    console.log("Registration Error:1", data);
    console.log("Registration Error:2", newUser);
    const db = await connectToMongoDB();
    await db.collection("user").insertOne(newUser);
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    console.error("Registration Error:3", error);
    res.status(401).json({
      success: false,
      error,
    });
  }
};

export { registerController, loginController };
