import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const preStart = async () => {
  try {
    const hashPassword = await bcrypt.hash('123', 10);
    const adminExist = await User.findOne({ username: 'admin' });
    if (!adminExist) {
      await User.create({
        name: 'admin',
        username: 'admin',
        password: hashPassword,
        isAdmin: true,
      });
      console.log('sucessfully created admin user');
    }
    const userExist = await User.findOne({ username: 'user1' });
    if (!userExist) {
      await User.create({
        name: 'user1',
        username: 'user1',
        password: hashPassword,

        isAdmin: false,
      });
      console.log('sucessfully created normal user');
    }
  } catch (err) {
    console.log(err.message);
  }
};
