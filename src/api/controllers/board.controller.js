import BoardService from '../services/board.service';
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
    const boards = await BoardService.getMany(req.query);
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
    const board = await BoardService.createOne({
      ...req.body,
    });
    return res.status(201).json({
      result: board,
      message: 'Create a new Board successfully!',
    });
  } catch (error) {
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
  const { id } = req.params;
  try {
    const board = await BoardService.removeOne({
      _id: id,
    });
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
