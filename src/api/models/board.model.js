import mongoose from 'mongoose';
import Joi from 'joi';

const Schema = mongoose.Schema;
const BoardSchema = new Schema({
  name: { type: String, required: true, maxlength: 128 },
  createdAt: { type: Number, default: Date.now },
});

BoardSchema.statics.joiValidate = function (board) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(128).required(),
    createdAt: Joi.number().positive(),
  });
  return schema.validate(board);
};

const BoardModel = mongoose.model('board', BoardSchema);

export default BoardModel;
