import RefreshTokenModel from '../models/refreshToken.model';
import crypto from 'crypto';
import moment from 'moment-timezone';

const RefreshTokenService = {};

RefreshTokenService.generate = async user => {
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
};

export default RefreshTokenService;
