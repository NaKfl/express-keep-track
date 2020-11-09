import passport from 'passport';

export const handleJWT = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    return reject({
      status: 401,
      message: 'Please authenticate',
    });
  }
  req.user = user;
  resolve();
};

export const authorize = () => (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      'jwt',
      { session: false },
      handleJWT(req, resolve, reject),
    )(req, res, next);
  })
    .then(() => next())
    .catch(err => next(err));
};

export const oAuth = service =>
  passport.authenticate(service, { session: false });
