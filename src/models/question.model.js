import connection from './db.js';
import uniqid from 'uniqid';

const questionModel = {
  getQuestion: async (id) => {
    const sql = `SELECT * FROM question WHERE id = ?`;
    const result = await connection.query(sql, [id]);
    return {
      msg: 'Get question in successfully!',
      question: result,
    };
  },

  getAllQuestion: async () => {
    const sql = 'SELECT * FROM question';
    const result = await connection.query(sql, []);
    return {
      msg: 'Get question in successfully!',
      question: result,
    };
  },

  getAllQuestionActive: async () => {
    const sql = 'SELECT * FROM question WHERE active = 1';
    const result = await connection.query(sql, []);
    return {
      msg: 'Get question in successfully!',
      question: result,
    };
  },

  addQuestion: async ({ question, active }) => {
    const IdQuestion = uniqid('IdQuestion_');
    const sql = `INSERT INTO question (id, content, active) VALUES (?, ?, ?)`;
    await connection.query(sql, [IdQuestion, question, active]);
    return {
      msg: 'Add question in successfully!',
    };
  },

  updateQuestion: async ({ question, active, id }) => {
    const sql = `UPDATE question SET content = ?, active = ? WHERE id = ?`;
    const result = await connection.query(sql, [question, active, id]);
    return { msg: 'Cập nhập thành công' };
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

export default questionModel;
