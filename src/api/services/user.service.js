import UserModel from '../models/user.model';
const UserService = {};
import { env } from '../../configs/vars';
import bcrypt from 'bcryptjs';
import moment from 'moment';

UserService.getOne = async conditions => {
  const user = await UserModel.findOne(conditions).lean().exec();
  return user;
};

UserService.getMany = async (conditions = {}) => {
  const users = await UserModel.find(conditions).lean().exec();
  return users;
};

UserService.createOne = async (data = {}) => {
  if (await UserModel.isEmailTaken(data.email)) {
    throw 'Email already taken!';
  }
  const user = await UserModel.create(data);
  return user;
};

UserService.updateOne = async (conditions, data = {}) => {
  if (data.password) {
    const rounds = env === 'test' ? 1 : 10;
    const hash = await bcrypt.hash(data.password, rounds);
    data.password = hash;
  }
  const user = await UserModel.findOneAndUpdate(conditions, data, {
    new: true,
  })
    .lean()
    .exec();
  return user;
};

UserService.removeOne = async (conditions = {}) => {
  const user = await UserModel.findOneAndRemove(conditions).lean().exec();
  return user;
};

UserService.findAndGenerateToken = async options => {
  const { email, password, refreshObject } = options;
  if (!email) throw 'An email is required to generate a token';

  const user = await UserModel.findOne({ email }).exec();
  let err = '';

  if (password) {
    const match = await user.passwordMatches(password);
    if (user && match) {
      return { user, accessToken: user.token() };
    }
    err = 'Incorrect email or password';
  } else if (refreshObject && refreshObject.userEmail === email) {
    if (moment(refreshObject.expires).isBefore()) {
      err = 'Invalid refresh token';
    } else {
      return { user, accessToken: user.token() };
    }
  } else {
    err = 'Incorrect email or refreshToken';
  }
  throw err;
};

export default UserService;
