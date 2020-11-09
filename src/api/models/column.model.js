import mongoose from 'mongoose';

const { Schema } = mongoose;
const ColumnSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: 'card' }],
  createdAt: { type: Number, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

const ColumnModel = mongoose.model('Column', ColumnSchema);

export default ColumnModel;
