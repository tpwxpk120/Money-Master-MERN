import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectToMongoDB } from "./db/mydb.js";
import { fileURLToPath } from "url";
import { userRouter } from "./routes/userRoutes.js";
import { router } from "./routes/expenseRoutes.js";
import path, { dirname } from "path";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import "./passport/passport.js";
import bodyParser from "body-parser";
// Configuring the environment variables
dotenv.config();
connectToMongoDB();


// Rest object
const app = express();
const PORT = 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "No secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(morgan("dev"));

// Transactions routes
app.use("/api/v1/transactions", router);
app.use("/api/v1/user", userRouter);
// Static files
app.use(express.static(path.join(__dirname, "front", "dist")));

// Listen to the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
