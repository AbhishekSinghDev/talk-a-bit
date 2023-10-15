import User from "../models/userModel.js";
import generateToken from "../config/generateToken.js";

import bcrypt, { hash } from "bcrypt";

const signup = async (req, res) => {
  try {
    const { name, email, password, pic, isAdmin } = req.body;

    if (!name || !email || !password || !pic) {
      res
        .status(400)
        .json({ success: false, message: "please provide all the fields" });
    }

    const isAlreadyUser = await User.findOne({ email: email });

    // check is user already exists
    if (isAlreadyUser) {
      res
        .status(400)
        .json({ success: false, message: "you are a existing user" });

      return;
    }

    // if control reach here means the user trying to register is new user
    // hashing the password using bcrypt
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.log("unable to encrypt the password");
        res.status(500).json({ success: false, message: "some server error" });
      } else {
        let newUser = new User({
          name: name,
          email: email,
          password: hash,
          pic: pic,
          isAdmin: isAdmin,
        });

        await newUser.save();

        const token = generateToken(newUser._id);

        res.status(200).json({
          success: true,
          message: "user registered successfully",
          user: {
            name: newUser.name,
            email: newUser.email,
            pic: newUser.pic,
          },
          token: token,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "some server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking already user or not
    const isUser = await User.findOne({ email: email });

    if (isUser) {
      // once the user is found check for password is correct or not
      const reqPassword = isUser.password;
      bcrypt.compare(password, reqPassword, (err, result) => {
        if (result) {
          const token = generateToken(isUser._id);

          res.status(200).json({
            success: true,
            message: "login successfully",
            token: token,
            user: isUser,
          });
        } else {
          res.status(400).json({ success: false, message: "wrong password" });
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: "please register first before login",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Some server error" });
  }
};

export { login, signup };
