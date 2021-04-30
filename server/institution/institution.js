
const knex = require('../db/sql-connection');

const addInstitution = async (data) => {
    let query = await knex('institution').insert(data).then(() => console.log("data inserted"))
        .catch((err) => { console.log(err); throw err })
    return { status: 'success' }
}

const getInstitution = async (id) => {
    let query = await knex.from('institution').select("*").where('id', '=', id).then((row) => {
        return row;
    })
    return query;
}

module.exports = {
    addInstitution,
    getInstitution
};