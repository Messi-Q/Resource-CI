// Update with your config settings.

module.exports = {

  development: {
      client: 'mysql',
      connection: {
          database: 'educationC',
          user:     'root',
          password: '1234',
          charset: 'utf8'
      },
      pool: {
          min: 2,
          max: 10
      },
      migrations: {
          tableName: 'migrations'
      }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
