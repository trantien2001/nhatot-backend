import connection from './db.js';
import uniqid from 'uniqid';

const questionModel = {
  getQuestion: async (IdQuestion) => {
    const sql = `SELECT * FROM question WHERE IdQuestion = ?`;
    const result = await connection.query(sql, [IdQuestion]);
    return {
      msg: 'Lấy danh sách question thành công',
      question: result,
    };
  },

  getAllQuestion: async () => {
    const sql = 'SELECT * FROM question';
    const result = await connection.query(sql, []);
    return {
      msg: 'Lấy danh sách question thành công',
      question: result,
    };
  },

  getAllQuestionActive: async () => {
    const sql = 'SELECT * FROM question WHERE Active = 1';
    const question = await connection.query(sql, []);
    return {
      msg: 'Lấy danh sách question thành công',
      question,
    };
  },

  addQuestion: async ({ question, active }) => {
    const IdQuestion = uniqid('IdQuestion_');
    const sql = `INSERT INTO question (IdQuestion, Content, Active) VALUES (?, ?, ?)`;
    await connection.query(sql, [IdQuestion, question, active]);
    return {
      msg: 'Thêm question thành công',
    };
  },

  updateQuestion: async ({ question, active, IdQuestion }) => {
    const sqlUpdate = `UPDATE question SET content = ?, Active = ? WHERE IdQuestion = ?`;
    await connection.query(sqlUpdate, [question, active, IdQuestion]);
    return { msg: 'Cập nhập question thành công' };
  },
  deleteQuestion: async (IdQuestion) => {
    const sqlDelete = `DELETE FROM question WHERE IdQuestion = ?`;
    await connection.query(sqlDelete, [IdQuestion]);
    const sqlSelect = 'SELECT * FROM question';
    const question = await connection.query(sqlSelect, []);
    return {
      question,
      msg: 'Xóa question thành công',
    };
  },
};

export default questionModel;
