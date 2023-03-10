import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { data } from "../data.js";
import User from "../models/UserModel.js";
import { generateToken } from "../utils.js";

export const getTopSellers = expressAsyncHandler(async (req, res) => {
  const topSellers = await User.find({ isSeller: true }).sort({ "seller.rating": -1 }).limit(3);
  res.status(200).json({ topSellers });
});

export const seedUsers = expressAsyncHandler(async (req, res) => {
  await User.deleteMany();
  const createdUsers = await User.insertMany(data.users);
  res.status(200).json({ createdUsers });
});

export const register = expressAsyncHandler(async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  const createdUser = await user.save();
  res.status(200).json({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
    isSeller: user.isSeller,
    token: generateToken(createdUser),
  });
});

export const signin = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).json({ message: "Invalid email or password" });
});

export const getUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

export const updateProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (user.isSeller) {
      user.seller.name = req.body.sellerName || user.seller.name;
      user.seller.logo = req.body.sellerLogo || user.seller.logo;
      user.seller.description = req.body.sellerDescription || user.seller.description;
    }
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8);
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isSeller: user.isSeller,
      token: generateToken(updatedUser),
    });
  }
});

export const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.email === "admin@example.com") {
      res.status(400).send({ message: "Can Not Delete Admin User" });
      return;
    }
    const deleteUser = await user.remove();
    res.send({ message: "User Deleted", user: deleteUser });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

export const updateUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isSeller = Boolean(req.body.isSeller);
    user.isAdmin = Boolean(req.body.isAdmin);
    // user.isAdmin = req.body.isAdmin || user.isAdmin;
    const updatedUser = await user.save();
    res.send({ message: "User Updated", user: updatedUser });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});
