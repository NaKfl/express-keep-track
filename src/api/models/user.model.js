import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import moment from 'moment-timezone';
import { env, jwtExpirationInterval, jwtSecret } from '../../configs/vars';
const jwt = require('jwt-simple');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: { type: String, trim: true },
  phone: { type: String, default: null },
  gender: { type: String, default: null },
  avatar: { type: String, default: 'avatar-default.jpg' },
  email: {
    type: String,
    trim: true,
    require: true,
    unique: true,
    lowercase: true,
  },
  password: { type: String, require: true },
  facebook: {
    uid: String,
    token: String,
  },
  google: {
    uid: String,
    token: String,
  },
  boards: [{ type: Schema.Types.ObjectId, ref: 'board' }],
  createdAt: { type: Number, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

UserSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();

    const rounds = env === 'test' ? 1 : 10;

    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.method({
  token() {
    const payload = {
      exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
      iat: moment().unix(),
      sub: this._id,
    };
    return jwt.encode(payload, jwtSecret);
  },

  transform() {
    const transformed = {};
    const fields = [
      '_id',
      'name',
      'email',
      'phone',
      'gender',
      'avatar',
      'boards',
      'createdAt',
    ];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  },
});

UserSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });

  return !!user;
};

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;
