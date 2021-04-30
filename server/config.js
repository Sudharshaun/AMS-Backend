require("dotenv").config();
const mysqlConfig =  {
    mysql: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        port: 3306
    }
}

module.exports = {
    mysqlConfig
};