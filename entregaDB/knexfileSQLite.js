const knexConfigSQLite3 = {
  client: 'sqlite3',
  connection: {
    filename: 'db.sqlite3'
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations'
  },
  seeds: {
    tableName: 'knex_seeds',
    directory: './seeds',
  }
}

module.exports = knexConfigSQLite3;

// Crear una nueva migración:
// knex migrate:make <nombre_migracion>

// Creare una nueva seed (Data inicial):
// knex seed:make <nombre_seed>