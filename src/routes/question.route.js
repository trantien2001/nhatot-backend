import questionController from '../controllers/question.controller.js';

export const questionRoute = (router) => {
  router.get('/question/:id', questionController.getQuestion);
  router.get('/questions', questionController.getAllQuestion);
  router.post('/question', questionController.addQuestion);
  router.patch('/question/:id', questionController.updateQuestion);
  // router.post('/questions', questionController.up);
};
