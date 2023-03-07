const sql = require('./db');

const getAllQuestion = (req, res) => {
    sql.query("SELECT * FROM question", (err, result)=>{
        return res.status(200).send({
                msg: "Get question in successfully!",
                question: result,
        });
    })
}

const getAllQuestionActive = (req, res) => {
    sql.query("SELECT * FROM question WHERE active = 1", (err, result)=>{
        return res.status(200).send({
                msg: "Get question in successfully!",
                question: result,
        });
    })
}

module.exports = {
    getAllQuestion,
    getAllQuestionActive,
}