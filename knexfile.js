// Update with your config settings.
// import 'dotenv/config'; // this gives us access to env

import 'dotenv/config';

module.exports ={

  development: {
    client: 'pg',
    connection: {
      host : process.env.NODE_ENV === 'production' ? 'db' : process.env.HOST || '127.0.0.1',
      user : process.env.DBUSER || 'postgres',
      password : process.env.DBPASS  || 'postgres',
      database : process.env.DBNAME  || 'postgres',
      charset: 'utf8',
      port: 5432 
      
      
    }
    
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'knextest',
      user:     'eli',
      password: ''
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
    client: 'pg',
    connection: process.env.HEROKU_POSTGRESQL_ORANGE_URL  + '?ssl=true',

  
    migrations: {
      tableName: 'knex_migrations'
    },
    
 
 
  }

};


