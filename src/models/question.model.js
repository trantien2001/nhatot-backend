const sql = require('./db');
const questionModel = {
  getAllQuestion: (req, res) => {
    sql.query('SELECT * FROM question', (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Get question in successfully!',
        question: result,
      });
    });
  },

  getAllQuestionActive: (req, res) => {
    sql.query('SELECT * FROM question WHERE active = 1', (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Get question in successfully!',
        question: result,
      });
    });
  },

  addQuestion: (req, res) => {
    const { question, active } = req.body;
    sql.query(
      `INSERT INTO question (content, active) VALUES ("${question}", ${active})`,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Add question in successfully!',
        });
      },
    );
  },

  updateQuestion: (req, res) => {
    const { question, active } = req.body;
    sql.query(
      `
      UPDATE question SET content = "${question}", active = ${active} WHERE id = ${req.params.Id}
      `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'Update question in successfully!',
        });
      },
    );
  },

  removeQuestion: (req, res) => {
    sql.query(
      `
        DELETE FROM question WHERE id = ${req.params.Id}
      `,
      (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        return res.status(200).send({
          msg: 'remove question in successfully!',
        });
      },
    );
  },

  getQuestion: (req, res) => {
    sql.query(`SELECT * FROM question WHERE id = ${req.params.id}`, (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      return res.status(200).send({
        msg: 'Update question in successfully!',
        question: result,
      });
    });
  },
};

module.exports = questionModel;
