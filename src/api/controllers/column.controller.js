import ColumnService from '../services/column.service';
import CardService from '../services/card.service';
import get from 'lodash/fp/get';
const ColumnController = {};

ColumnController.getOne = async (req, res) => {
  try {
    const { id, ...rest } = req.params;
    const column = await ColumnService.getOne({ _id: id, ...rest });
    if (!column) {
      return res.status(404).json({
        message: 'Can not found the Column.',
      });
    }
    return res.status(200).json({
      result: column,
      message: 'Get the Column successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Some error occurred while getting the Column.',
    });
  }
};

ColumnController.getMany = async (req, res) => {
  try {
    const columns = await ColumnService.getMany(req.query);
    return res.status(200).json({
      result: columns,
      message: 'Get Columns successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Some error occurred while getting Columns.',
    });
  }
};

ColumnController.createOne = async (req, res) => {
  try {
    const column = await ColumnService.createOne({
      ...req.body,
    });
    return res.status(201).json({
      result: column,
      message: 'Create a new Column successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

ColumnController.updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    const { updatedColumn, content } = req.body;
    const { cards } = updatedColumn;
    if (content) {
      const newCard = await CardService.createOne({ content });
      cards.push(get('_id', newCard));
    }
    const column = await ColumnService.updateOne({ _id: id }, { cards });
    return res.status(200).json({
      result: column,
      message: 'Update a Column successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

ColumnController.removeOne = async (req, res) => {
  const { id } = req.params;
  try {
    const column = await ColumnService.removeOne({
      _id: id,
    });
    return res.status(200).json({
      result: column,
      message: 'Delete a new Column successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Some error occurred while deleting the Column.',
    });
  }
};

ColumnController.getManyByBoardId = async (req, res) => {
  try {
    const { id } = req.params;
    const columns = await ColumnService.findByBoardId(id);
    return res.status(200).json({
      result: columns,
      message: 'Get Columns successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Some error occurred while getting Columns.',
    });
  }
};

export default ColumnController;
