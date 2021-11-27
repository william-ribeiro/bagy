const path = require('path');

const development = {
  type: 'sqlite',
  database: process.env.DATABASE,
  migrations: [`${process.env.DATABASE_MIGRATIONS}`],
  entities: [`${process.env.DATABASE_ENTITIES}`],
  cli: {
    migrationsDir: `${process.env.DATABASE_MIGRATIONS_DIR}`,
  },
  synchronize: true,
};

// const production = {
//   type: 'postgres',
//   url: `${process.env.DATABASE_URL}`,
//   migrations: [`${process.env.DATABASE_MIGRATIONS}`],
//   entities: [`${process.env.DATABASE_ENTITIES}`],
//   cli: {
//     migrationsDir: `${process.env.DATABASE_MIGRATIONS_DIR}`,
//   },

//   extra: {
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   },
// };
const production = {
  type: 'sqlite',
  database: process.env.DATABASE,
  migrations: [`${process.env.DATABASE_MIGRATIONS}`],
  entities: [`${process.env.DATABASE_ENTITIES}`],
  cli: {
    migrationsDir: `${process.env.DATABASE_MIGRATIONS_DIR}`,
  },
  synchronize: true,
};

let config = null;

switch (process.env.NODE_ENV) {
  case 'production':
    config = production;
    break;
  case 'development':
    config = development;
    break;
}
module.exports = config;
