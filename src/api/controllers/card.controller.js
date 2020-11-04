import CardService from '../services/card.service';
const CardController = {};

CardController.getOne = async (req, res) => {
  try {
    const { id, ...rest } = req.params;
    const card = await CardService.getOne({ _id: id, ...rest });
    if (!card) {
      return res.status(404).json({
        message: 'Can not found the Card.',
      });
    }
    return res.status(200).json({
      result: card,
      message: 'Get the Card successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Some error occurred while getting the Card.',
    });
  }
};

CardController.getMany = async (req, res) => {
  try {
    const cards = await CardService.getMany(req.query);
    return res.status(200).json({
      result: cards,
      message: 'Get Cards successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Some error occurred while getting Cards.',
    });
  }
};

CardController.createOne = async (req, res) => {
  try {
    const card = await CardService.createOne({
      ...req.body,
    });
    return res.status(201).json({
      result: card,
      message: 'Create a new Card successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

CardController.updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await CardService.updateOne({ _id: id }, req.body);
    return res.status(200).json({
      result: card,
      message: 'Update a new Card successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

CardController.removeOne = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await CardService.removeOne({
      _id: id,
    });
    return res.status(200).json({
      result: card,
      message: 'Delete a new Card successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Some error occurred while deleting the Card.',
    });
  }
};

export default CardController;
