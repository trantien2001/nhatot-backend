const connection = require('./db');

const questionModel = {
  getQuestion: async (id) => {
    try {
      const sql = `SELECT * FROM question WHERE id = ${id}`;
      const result = await connection.query(sql, []);
      return {
        msg: 'Get question in successfully!',
        question: result,
      };
    } catch (error) {
      return error;
    }
  },

  getAllQuestion: async () => {
    try {
      const sql = 'SELECT * FROM question';
      const result = await connection.query(sql, []);
      return {
        msg: 'Get question in successfully!',
        question: result,
      };
    } catch (error) {
      return error;
    }
  },

  getAllQuestionActive: async () => {
    try {
      const sql = 'SELECT * FROM question WHERE active = 1';
      const result = await connection.query(sql, []);
      return {
        msg: 'Get question in successfully!',
        question: result,
      };
    } catch (error) {
      return error;
    }
  },

  addQuestion: async ({ question, active }) => {
    const sql = `INSERT INTO question (content, active) VALUES ("${question}", ${active})`;
    await connection.query(sql, []);
    return {
      msg: 'Add question in successfully!',
    };
  },

  updateQuestion: async ({ question, active, id }) => {
    try {
      const sql = `UPDATE question 
      SET content = "${question}", active = ${active} 
      WHERE id = ${id}`;
      const result = await connection.query(sql, []);
      return { msg: 'Cập nhập thành công' };
    } catch (error) {
      return error;
    }
  },

  // removeQuestion: async() => {
  //   sql.query(
  //     `
  //       DELETE FROM question WHERE id = ${req.params.Id}
  //     `,
  //     (err, result) => {
  //       if (err) {
  //         return res.status(400).send({ msg: err });
  //       }
  //       return res.status(200).send({
  //         msg: 'remove question in successfully!',
  //       });
  //     },
  //   );
  // },
};

module.exports = questionModel;
