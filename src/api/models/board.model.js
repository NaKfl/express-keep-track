import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const BoardSchema = new Schema({
  name: { type: String, required: true },
  columns: [{ columnId: String }],
  createdAt: { type: Number, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

const BoardModel = mongoose.model('board', BoardSchema);

export default BoardModel;
