import RefreshTokenService from '../services/refreshToken.service';
import UserService from '../services/user.service';
import moment from 'moment-timezone';
import { jwtExpirationInterval } from '../../configs/vars';
import RefreshToken from '../models/refreshToken.model';

const UserController = {};

async function generateTokenResponse(user, accessToken) {
  try {
    const tokenType = 'Bearer';
    const refreshToken = await RefreshTokenService.generate(user);
    const { token: rfToken } = refreshToken;
    const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
    return {
      tokenType,
      accessToken,
      refreshToken: rfToken,
      expiresIn,
    };
  } catch (err) {
    console.log('Error: ', err);
  }
}

UserController.register = async (req, res, next) => {
  try {
    const user = await UserService.createOne(req.body);
    const userTransformed = user.transform();
    const token = await generateTokenResponse(user, user.token());
    return res.status(201).json({
      result: { token, user: userTransformed },
      message: 'Register successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

UserController.login = async (req, res, next) => {
  try {
    const { user, accessToken } = await UserService.findAndGenerateToken(
      req.body,
    );
    const token = await generateTokenResponse(user, accessToken);
    const userTransformed = user.transform();
    return res.status(201).json({
      result: { token, user: userTransformed },
      message: 'Login successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

UserController.refresh = async (req, res, next) => {
  try {
    const { email, refreshToken } = req.body;
    const refreshObject = await RefreshToken.findOneAndRemove({
      userEmail: email,
      token: refreshToken,
    });
    const { user, accessToken } = await UserService.findAndGenerateToken({
      email,
      refreshObject,
    });
    const userTransformed = user.transform();
    const token = await generateTokenResponse(user, accessToken);
    return res.status(200).json({
      result: { token, user: userTransformed },
      message: 'Get new token successfully!',
    });
  } catch (error) {
    return next(error);
  }
};

export default UserController;
