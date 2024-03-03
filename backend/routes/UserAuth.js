import express from "express";
import { User } from "../models/Users.js";
import mongoose from "mongoose";
import bcryt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "User already registered" });
  }
  const hashpassword = await bcryt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashpassword,
  });
  await newUser.save();
  return res.json({ status: true, message: "User registered" });
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "user is not registered" });
  }

  const validPassword = await bcryt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "password is incorrect" });
  }

  const token = jwt.sign({ email: email }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({ status: true, message: "login successfully" });
});

export { router as UserRouter };
