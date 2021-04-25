const mysqlConfig =  {
    mysql: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        database: 'ams',
        password: ''
    }
}

const mysqlKnexConfig =  {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ams'
    }
}

module.exports = {
    mysqlConfig,
    mysqlKnexConfig
};