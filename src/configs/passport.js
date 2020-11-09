import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import BearerStrategy from 'passport-http-bearer';
import { jwtSecret } from './vars';
import UserService from '../api/services/user.service';
import authProviders from '../api/services/authProviders';

const jwtOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = async (payload, done) => {
  try {
    const user = await UserService.getOne({ _id: payload.sub });
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

const oAuth = service => async (token, done) => {
  try {
    const userData = await authProviders[service](token);
    const user = await UserService.oAuthLogin(userData);
    return done(null, user);
  } catch (err) {
    console.log('err', err);
    return done(err);
  }
};

export default {
  jwt: new JwtStrategy(jwtOptions, jwt),
  facebook: new BearerStrategy(oAuth('facebook')),
  google: new BearerStrategy(oAuth('google')),
};
