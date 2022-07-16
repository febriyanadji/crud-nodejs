import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(
      users.map((user) => ({
        id: user._id,
        name: user.name,
        username: user.username,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUser = async (req, res) => {
  const idIsValid = await mongoose.Types.ObjectId.isValid(req.params.id);
  if (!idIsValid) {
    return res.status(400).json({ message: 'user id not valid' });
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'user id not found' });
  }
  res.json({
    id: user._id,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin,
  });
};
export const createUser = async (req, res) => {
  const { name, username, password, isAdmin } = req.body;
  const existUser = await User.findOne({ username });
  if (existUser) {
    return res.status(400).json({ message: 'username already exist' });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      name,
      username,
      password: hashPassword,
      isAdmin,
    });
    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const idIsValid = await mongoose.Types.ObjectId.isValid(req.params.id);
  if (!idIsValid) {
    return res.status(400).json({ message: 'user id not valid' });
  }
  const existUser = await User.findById(req.params.id);
  if (!existUser) {
    return res.status(404).json({ message: 'user id not found' });
  }
  try {
    await existUser.remove();
    res.status(200).json({ message: 'user successfully deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const idIsValid = await mongoose.Types.ObjectId.isValid(req.params.id);
  if (!idIsValid) {
    return res.status(400).json({ message: 'user id not valid' });
  }
  const existUser = await User.findById(req.params.id);
  if (!existUser) {
    return res.status(404).json({ message: 'user id not found' });
  }
  if ('username' in req.body) {
    const sameUsername = await User.find({
      username: req.body.username,
      _id: { $ne: req.params.id },
    });
    if (sameUsername.length > 0) {
      return res.status(400).json({ message: 'username already exist' });
    }
  }
  if ('password' in req.body) {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;
  }
  try {
    await User.updateOne({ _id: req.params.id }, { $set: req.body });
    const newUser = await User.findById(req.params.id);
    res.json({
      id: newUser._id,
      name: newUser.name,
      username: newUser.username,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
