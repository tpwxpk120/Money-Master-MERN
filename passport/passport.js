// passport-config.js - very good idea to extract all the code related to passport into its own directory, good code 
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { connectToMongoDB } from "../db/mydb.js";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const db = await connectToMongoDB();
        const user = await db.collection("user").findOne({ email });
        console.log(user);
        if (user) {
          const isPasswordValid = await password == user.password;
        if (isPasswordValid) {
        return done(null, user);
        }
        }
      } catch (error) {
        console.error("Error2 wrong password:", error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const db = await connectToMongoDB();
    const user = await db.collection("user").findOne({ _id: id });

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

export default passport;
