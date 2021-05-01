
const knex = require('../db/sql-connection');

async function addInstitution  (req, res) {
    let insertData = {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        owneruserid: req.body.userid,
    }
    let query = await knex('institution').insert(insertData).then(() => console.log("data inserted"))
        .catch((err) => { console.log(err); throw err })
    res.status(201).json({ status: 'success' });
}

async function getInstitution (req, res) {
    let id = req.params.id;
    let query = await knex.from('institution').select("*").where('id', '=', id).then((row) => {
        return row;
    })
    res.status(201).json(query);
}

module.exports = {
    addInstitution,
    getInstitution
};