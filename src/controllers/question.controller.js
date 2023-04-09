const {
  getQuestion,
  addQuestion,
  updateQuestion,
  getAllQuestion,
  removeQuestion,
  getAllQuestionActive,
} = require('../models/question.model');

const questionController = {
  getQuestion,
  addQuestion,
  updateQuestion,
  removeQuestion,
  getAllQuestion,
  getAllQuestionActive,
};
module.exports = questionController;
