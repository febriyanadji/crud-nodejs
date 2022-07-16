import bcrypt from 'bcrypt';
// import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { JWT_SECRET } from '../config.js';

const tokenList = {};
export const login = async (req, res) => {
  const { username, password } = req.body;
  const existUser = await User.findOne({ username });
  if (!existUser) {
    return res.status(400).json({ message: 'Wrong username' });
  }
  const match = await bcrypt.compare(password, existUser.password);
  if (!match) {
    return res.status(400).json({ message: 'Wrong password' });
  }
  const token = jwt.sign(
    { id: existUser._id, isAdmin: existUser.isAdmin },
    JWT_SECRET,
    { expiresIn: 900 }
  );
  const refreshToken = jwt.sign(
    { id: existUser._id, isAdmin: existUser.isAdmin },
    JWT_SECRET,
    {
      expiresIn: 86400,
    }
  );
  const response = {
    message: 'login successfully',
    token,
    refreshToken,
  };
  tokenList[refreshToken] = response;
  res.status(200).json(response);
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken && refreshToken in tokenList) {
    try {
      const decoded = jwt.verify(refreshToken, JWT_SECRET);
      const userId = decoded.id;
      const token = jwt.sign(
        { id: userId, isAdmin: decoded.isAdmin },
        JWT_SECRET,
        {
          expiresIn: 900,
        }
      );
      tokenList[refreshToken].token = token;
      res.json({ message: 'token successfully refreshed', token });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  } else {
    return res.status(400).json({ message: 'refresh token invalid' });
  }
};

export const getMyProfile = async (req, res) => {
  const user = await User.findById(req.auth.id);
  if (!user) {
    return res.status(400).json({ message: 'unauthorized' });
  }
  return res.json({
    id: user._id,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin,
  });
};
