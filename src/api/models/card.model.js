import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const CardSchema = new Schema({
  content: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

const CardModel = mongoose.model('card', CardSchema);

export default CardModel;
