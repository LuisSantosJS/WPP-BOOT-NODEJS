const path = require('path');

const knex = require('knex')({
    client: 'pg',
    version: '13.1',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'postgres',
        database: 'wpp',
        port: Number(5432)
    },
    migrations: {
        directory: path.resolve(__dirname, 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'seeds')
    },
    useNullAsDefault: true
});
module.exports = knex;