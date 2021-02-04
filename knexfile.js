const path = require('path');

module.exports = {
    client: 'pg',
    version: '13.1',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 'postgres',
      database : 'wpp',
      port: Number(5432)
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },

    useNullAsDefault: true
};