import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/Users.js';

const router = express.Router()

/* *********** REGISTER A NEW USER *********** */
router.post("/register", verifyEmail, async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({username: username});

    if (user) { // if user already exists
        return res.json({ message: "User already exists." });
    }

    const newUser = new UserModel({
        username,
        password: password
    })
    // create new user and store onto MongoDB
    await newUser.save()
    res.json({ message: "User registered successfully" });

});

/* *********** LOGIN AUTHENTICATION *********** */
router.post("/login", verifyEmail, async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({username: username})

    if (password != user.password) {
        console.log("Login failed")
        return res.json({message: "User does not exist or login details incorrect"})
    } else {
        const token = jwt.sign({id: user._id}, "secret");
        res.json({token, userID: user._id})   
    }
});


export { router as userRouter };

/* MIDDLEWARE TO VERIFY TOKENS */

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      jwt.verify(authHeader, "secret", (err) => {
        if (err) {
          return res.sendStatus(403);
        }
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

function verifyEmail(req, res, next) {
  if (req.body.username.includes("@gmail.com")) {
    next()
  } else {
    res.sendStatus(401)
    console.log("Need to be a valid email")
  }
}