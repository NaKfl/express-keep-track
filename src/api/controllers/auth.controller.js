import RefreshTokenService from '../services/refreshToken.service';
import UserService from '../services/user.service';
import moment from 'moment-timezone';
import { jwtExpirationInterval } from '../../configs/vars';

const UserController = {};

function generateTokenResponse(user, accessToken) {
  const tokenType = 'Bearer';
  const refreshToken = RefreshTokenService.generate(user).token;
  const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
  return {
    tokenType,
    accessToken,
    refreshToken,
    expiresIn,
  };
}

UserController.register = async (req, res, next) => {
  try {
    const user = await UserService.createOne(req.body);
    const userTransformed = user.transform();
    const token = generateTokenResponse(user, user.token());
    return res
      .status(201)
      .json({
        result: { token, user: userTransformed },
        message: 'Register successfully!',
      });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export default UserController;
