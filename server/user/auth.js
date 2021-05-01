
const knex = require('../db/sql-connection');

const addUser = async (req, res) => {
    let insertData = {
        name: req.body.name,
        address: req.body.email,
        email: req.body.password
    }
    let query = await knex('user').insert(insertData).then(() => console.log("data inserted"))
        .catch((err) => { console.log(err); throw err })
    res.status(201).json({ status: 'success' });
}

const getUser = async (req, res) => {
    let id = req.params.id;
    let query = await knex.from('user').select("*").where('id', '=', id).then((row) => {
        return row;
    })
    res.status(201).json(query);
}

module.exports = {
    addUser,
    getUser
};