import UserModel from '../models/user.model';
const UserService = {};

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

export default UserService;
