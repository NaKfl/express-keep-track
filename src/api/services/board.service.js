import get from 'lodash/fp/get';
import BoardModel from '../models/board.model';
// eslint-disable-next-line import/no-cycle
import ColumnService from './column.service';

const BoardService = {};

BoardService.getOne = async (conditions) => {
  const board = await BoardModel.findOne(conditions).lean().exec();
  return board;
};

BoardService.getMany = async (conditions = {}) => {
  const boards = await BoardModel.find(conditions).lean().exec();
  return boards;
};

BoardService.createOne = async (data = {}) => {
  const fistColumns = [
    { name: 'Went Well', color: '#4352AF', cards: [] },
    { name: 'To Improve', color: '#D63864', cards: [] },
    { name: 'Action Items', color: '#9034AA', cards: [] },
  ];

  let columns = fistColumns.map((column) => ColumnService.createOne(column));
  columns = await Promise.all(columns);
  columns = columns.map((column) => get('_id', column).toString());

  const board = await BoardModel.create({
    ...data,
    columns,
  });
  return board;
};

BoardService.updateOne = async (conditions, data = {}) => {
  const board = await BoardModel.findOneAndUpdate(conditions, data, {
    new: true,
  })
    .lean()
    .exec();
  return board;
};

BoardService.removeOne = async (conditions = {}) => {
  // const board = await BoardModel.findOneAndRemove(conditions).lean().exec();
  const board = await BoardModel.findOne(conditions).lean().exec();
  let columns = get('columns', board);
  columns = columns.map((column) => ColumnService.removeOne({ _id: column }));
  await Promise.all(columns);
  return board;
};

BoardService.findByIds = async (ids) => {
  const boards = await BoardModel.find().where('_id').in(ids).lean().exec();
  return boards;
};

export default BoardService;
