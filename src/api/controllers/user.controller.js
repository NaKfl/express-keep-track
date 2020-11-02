import UserService from '../services/user.service';
const UserController = {};

UserController.getOne = async (req, res) => {
  try {
    const { id, ...rest } = req.params;
    const user = await UserService.getOne({ _id: id, ...rest });
    if (!user) {
      return res.status(404).json({
        message: 'Can not found the User.',
      });
    }
    return res.status(200).json({
      result: user,
      message: 'Get the User successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Some error occurred while getting the User.',
    });
  }
};

UserController.getMany = async (req, res) => {
  try {
    const users = await UserService.getMany(req.query);
    return res.status(200).json({
      result: users,
      message: 'Get Users successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Some error occurred while getting Users.',
    });
  }
};

UserController.createOne = async (req, res) => {
  try {
    const user = await UserService.createOne({
      ...req.body,
    });
    return res.status(201).json({
      result: user,
      message: 'Create a new User successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

UserController.updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserService.updateOne({ _id: id }, req.body);
    return res.status(200).json({
      result: user,
      message: 'Update a new User successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

UserController.removeOne = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserService.removeOne({
      _id: id,
    });
    return res.status(200).json({
      result: user,
      message: 'Delete a new User successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Some error occurred while deleting the User.',
    });
  }
};

export default UserController;
