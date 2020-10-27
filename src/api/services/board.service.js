import BoardModel from '../models/board.model';
const BoardService = {};

BoardService.getOne = async conditions => {
  const board = await BoardModel.findOne(conditions).lean().exec();
  return board;
};

BoardService.getMany = async (conditions = {}) => {
  const boards = await BoardModel.find(conditions).lean().exec();
  return boards;
};

BoardService.createOne = async (data = {}) => {
  const { error } = BoardModel.joiValidate(data);
  if (error) throw error.message;
  const board = await BoardModel.create(data);
  return board;
};

BoardService.updateOne = async (conditions, data = {}) => {
  const { error } = BoardModel.joiValidate(data);
  if (error) throw error.message;
  const board = await BoardModel.findOneAndUpdate(conditions, data, {
    new: true,
  })
    .lean()
    .exec();
  return board;
};

BoardService.removeOne = async (conditions = {}) => {
  const board = await BoardModel.findOneAndRemove(conditions).lean().exec();
  return board;
};

export default BoardService;
// const a = {
//   [ValidationError: "name" is required]
//   _original: { _id: 5f97239def441a600b7d6e84, createdAt: 1603740573208 },
//   details:
//     [{
//       message: '"name" is required',
//       path: [Array],
//       type: 'any.required',
//       context: [Object]
//     }]
// }
