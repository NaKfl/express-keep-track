import CardModel from '../models/card.model';
import get from 'lodash/fp/get';
import ColumnService from '../services/card.service';
const CardService = {};

CardService.getOne = async conditions => {
  const card = await CardModel.findOne(conditions).lean().exec();
  return card;
};

CardService.getMany = async (conditions = {}) => {
  const cards = await CardModel.find(conditions).lean().exec();
  return cards;
};

CardService.createOne = async (data = {}) => {
  const card = await CardModel.create(data);
  return card;
};

CardService.updateOne = async (conditions, data = {}) => {
  const card = await CardModel.findOneAndUpdate(conditions, data, {
    new: true,
  })
    .lean()
    .exec();
  return card;
};

CardService.removeOne = async (conditions = {}) => {
  const card = await CardModel.findOneAndRemove(conditions).lean().exec();
  return card;
};

CardService.findByIds = async ids => {
  const cards = await CardModel.aggregate([
    { $match: { _id: { $in: ids } } },
    { $addFields: { __order: { $indexOfArray: [ids, '$_id'] } } },
    { $sort: { __order: 1 } },
  ]);
  return cards;
};

CardService.findByColumnId = async id => {
  const column = await ColumnService.getOne({ _id: id });
  const cardIds = get('cards', column);
  const cards = await CardService.findByIds(cardIds);
  return cards;
};

export default CardService;
