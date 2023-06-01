import questionModel from '../models/question.model.js';
import { catchAsync } from '../utils/catchAsync.js';

const questionController = {
  getQuestion: catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await questionModel.getQuestion(id);
    return res.status(200).send(result);
  }),
  getAllQuestion: catchAsync(async (req, res) => {
    const result = await questionModel.getAllQuestion();
    return res.status(200).send(result);
  }),
  getAllQuestionActive: catchAsync(async (req, res) => {
    const result = await questionModel.getAllQuestionActive();
    return res.status(200).send(result);
  }),
  addQuestion: catchAsync(async (req, res) => {
    const { question, active } = req.body;
    const result = await questionModel.addQuestion({ question, active });
    return res.status(200).send(result);
  }),
  updateQuestion: catchAsync(async (req, res) => {
    console.log(1234);
    const { question, active } = req.body;
    const { IdQuestion } = req.params;
    const result = await questionModel.updateQuestion({ question, active, IdQuestion });
    return res.status(200).send(result);
  }),
  deleteQuestion: catchAsync(async (req, res) => {
    const { IdQuestion } = req.params;
    const result = await questionModel.deleteQuestion(IdQuestion);
    return res.status(200).send(result);
  }),
};

export default questionController;
