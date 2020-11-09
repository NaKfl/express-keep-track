import mongoose from 'mongoose';

const { Schema } = mongoose;
const BoardSchema = new Schema({
  name: { type: String, required: true },
  columns: [{ type: Schema.Types.ObjectId, ref: 'column' }],
  createdAt: { type: Number, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

const BoardModel = mongoose.model('board', BoardSchema);

export default BoardModel;
