
const knex = require('../db/sql-connection');

const addUser = async (data) => {
    let insertData = {
        name: data.name,
        address: data.email,
        email: data.password
    }
    let query = await knex('user').insert(insertData).then(() => console.log("data inserted"))
        .catch((err) => { console.log(err); throw err })
    return { status: 'success' }
}

const getUser = async (userid) => {
    let query = await knex.from('user').select("*").where('id', '=', id).then((row) => {
        return row;
    })
    return query;
}

module.exports = {
    addUser,
    getUser
};