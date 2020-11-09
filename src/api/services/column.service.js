import get from 'lodash/fp/get';
import ColumnModel from '../models/column.model';
// eslint-disable-next-line import/no-cycle
import BoardService from './board.service';
// eslint-disable-next-line import/no-cycle
import CardService from './card.service';

const ColumnService = {};

ColumnService.getOne = async (conditions) => {
  const column = await ColumnModel.findOne(conditions).lean().exec();
  return column;
};

ColumnService.getMany = async (conditions = {}) => {
  const columns = await ColumnModel.find(conditions).lean().exec();
  return columns;
};

ColumnService.createOne = async (data = {}) => {
  const column = await ColumnModel.create(data);
  return column;
};

ColumnService.updateOne = async (conditions, data = {}) => {
  const column = await ColumnModel.findOneAndUpdate(conditions, data, {
    new: true,
  })
    .lean()
    .exec();
  return column;
};

ColumnService.removeOne = async (conditions = {}) => {
  const column = await ColumnModel.findOneAndRemove(conditions).lean().exec();
  return column;
};

ColumnService.findByIds = async (ids) => {
  const columns = await ColumnModel.find().where('_id').in(ids).lean().exec();
  return columns;
};

ColumnService.findByBoardId = async (id) => {
  const board = await BoardService.getOne({ _id: id });
  const columnIds = get('columns', board);
  const columns = await ColumnService.findByIds(columnIds);
  let result = columns.map(async (column) => {
    const cards = await CardService.findByIds(get('cards', column));
    return {
      ...column,
      cards,
    };
  });
  result = await Promise.all(result);
  return result;
};

export default ColumnService;
