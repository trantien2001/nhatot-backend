const questionModel = require('../models/question.model');

const questionController = {
  getQuestion: async (req, res) => {
    const { id } = req.params;
    const result = await questionModel.getQuestion(id);
    return res.status(200).send(result);
  },
  getAllQuestion: async (req, res) => {
    const result = await questionModel.getAllQuestion();
    return res.status(200).send(result);
  },
  getAllQuestionActive: async (req, res) => {
    const result = await questionModel.getAllQuestionActive();
    return res.status(200).send(result);
  },
  addQuestion: async (req, res) => {
    const { question, active } = req.body;
    const result = await questionModel.addQuestion({ question, active });
    return res.status(200).send(result);
  },
  updateQuestion: async (req, res) => {
    console.log(1234);
    const { question, active } = req.body;
    const { id } = req.params;
    const result = await questionModel.updateQuestion({ question, active, id });
    return res.status(200).send(result);
  },
};
module.exports = questionController;
