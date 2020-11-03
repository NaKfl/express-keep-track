import get from 'lodash/fp/get';
import BoardService from '../services/board.service';
import UserService from '../services/user.service';
const BoardController = {};

BoardController.getOne = async (req, res) => {
  try {
    const { id, ...rest } = req.params;
    const board = await BoardService.getOne({ _id: id, ...rest });
    if (!board) {
      return res.status(404).json({
        message: 'Can not found the Board.',
      });
    }
    return res.status(200).json({
      result: board,
      message: 'Get the Board successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Some error occurred while getting the Board.',
    });
  }
};

BoardController.getMany = async (req, res) => {
  try {
    const user = req.user;
    const boardIds = get('boards', user);
    const boards = await BoardService.findByIds(boardIds);
    return res.status(200).json({
      result: boards,
      message: 'Get Boards successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Some error occurred while getting Boards.',
    });
  }
};

BoardController.createOne = async (req, res) => {
  try {
    const user = req.user;
    let boardIds = get('boards', user);
    const board = await BoardService.createOne({
      ...req.body,
    });
    boardIds = [...boardIds, get('_id', board)];
    UserService.updateOne({ _id: get('_id', user) }, { boards: boardIds });
    return res.status(201).json({
      result: board,
      message: 'Create a new Board successfully!',
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({
      message: error,
    });
  }
};

BoardController.updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    const board = await BoardService.updateOne({ _id: id }, req.body);
    return res.status(200).json({
      result: board,
      message: 'Update a new Board successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

BoardController.removeOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const boardIds = get('boards', user);
    const pos = boardIds.findIndex(boardId => boardId.equals(id));
    boardIds.splice(pos, 1);
    const board = await BoardService.removeOne({
      _id: id,
    });
    boardIds = [...boardIds.slice(0, pos), ...boardIds.slice(pos + 1)];
    UserService.updateOne({ _id: get('_id', user) }, { boards: boardIds });
    return res.status(200).json({
      result: board,
      message: 'Delete a new Board successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Some error occurred while deleting the Board.',
    });
  }
};

export default BoardController;
