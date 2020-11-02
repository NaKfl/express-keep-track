import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import BearerStrategy from 'passport-http-bearer';
import { jwtSecret } from './vars';
// import authProviders from '../api/services/authProviders';
import userService from '../api/services/user.service';

const jwtOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = async (payload, done) => {
  try {
    const user = await userService.getOne({ _id: payload.sub });
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

// TODO
// const oAuth = service => async (token, done) => {
//   try {
//     const userData = await authProviders[service](token);
//     const user = await User.oAuthLogin(userData);
//     return done(null, user);
//   } catch (err) {
//     return done(err);
//   }
// };

export default {
  jwt: new JwtStrategy(jwtOptions, jwt),
};
// export const facebook = new BearerStrategy(oAuth('facebook'));
// export const google = new BearerStrategy(oAuth('google'));
