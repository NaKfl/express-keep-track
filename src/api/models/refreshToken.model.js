import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    index: true,
  },

  userId: {
    // TODO
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  userEmail: {
    type: String,
    ref: 'user',
    required: true,
  },

  expires: { type: Date },
});

const RefreshToken = mongoose.model('refreshToken', refreshTokenSchema);

export default RefreshToken;
