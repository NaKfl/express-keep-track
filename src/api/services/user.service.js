import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import moment from 'moment-timezone';
import { env } from '../../configs/vars';
import UserModel from '../models/user.model';

const UserService = {};

UserService.getOne = async (conditions) => {
  const user = await UserModel.findOne(conditions).lean().exec();
  return user;
};

UserService.getMany = async (conditions = {}) => {
  const users = await UserModel.find(conditions).lean().exec();
  return users;
};

UserService.createOne = async (data = {}) => {
  if (await UserModel.isEmailTaken(data.email)) {
    // eslint-disable-next-line no-throw-literal
    throw 'Email already taken!';
  }
  const user = await UserModel.create(data);
  return user;
};

UserService.updateOne = async (conditions, data = {}) => {
  if (data.password) {
    const rounds = env === 'test' ? 1 : 10;
    const hash = await bcrypt.hash(data.password, rounds);
    // eslint-disable-next-line no-param-reassign
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

UserService.findAndGenerateToken = async (options) => {
  const { email, password, refreshObject } = options;
  // eslint-disable-next-line no-throw-literal
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

UserService.oAuthLogin = async ({ service, id, email, name, picture }) => {
  const user = await UserModel.findOne({
    $or: [{ 'services {service}': id }, { email }],
  });
  if (user) {
    user.services[service] = id;
    if (!user.name) user.name = name;
    if (!user.picture) user.picture = picture;
    return user.save();
  }
  const password = uuidv4();
  return UserModel.create({
    services: { [service]: id },
    email,
    password,
    name,
    picture,
  });
};

export default UserService;
