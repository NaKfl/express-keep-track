import crypto from 'crypto';
import moment from 'moment-timezone';
import RefreshTokenModel from '../models/refreshToken.model';

const RefreshTokenService = {};

RefreshTokenService.generate = async (user) => {
  try {
    const userId = user._id;
    const userEmail = user.email;
    const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
    const expires = moment().add(30, 'days').toDate();
    const tokenObject = await RefreshTokenModel.create({
      token,
      userId,
      userEmail,
      expires,
    });
    return tokenObject;
  } catch (err) {
    console.log('Error: ', err);
    return null;
  }
};

export default RefreshTokenService;
