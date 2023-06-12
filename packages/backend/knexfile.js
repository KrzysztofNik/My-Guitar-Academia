/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host : '46.41.137.139',
      port : 3306,
      user : 'user',
      password : 'pass',
      database : 'database'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: `database/migrations`
    },
    seeds: {
      tableName: 'seeds',
      directory: `database/seeds`
    }
  }
};
