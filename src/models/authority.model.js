const sql = require('./db');

const getAllAuthority = (req, res) => {
    sql.query("SELECT * FROM authority", (err, result)=>{
        return res.status(200).send({
                msg: "Get authority in successfully!",
                authority: result,
        });
    })
}

const getAllAuthorityActive = (req, res) => {
    sql.query("SELECT * FROM authority WHERE active = 1", (err, result)=>{
        return res.status(200).send({
                msg: "Get authority in successfully!",
                authority: result,
        });
    })
}

module.exports = {
    getAllAuthority,
    getAllAuthorityActive,
}