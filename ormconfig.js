const path = require('path');

const development = {
  type: 'sqlite',
  database: path.resolve(__dirname, 'src', 'database', 'db', 'bagy.sqlite'),
  migrations: [path.resolve(__dirname, 'src', 'database', 'migrations', '*.ts')],
  entities: [path.resolve(__dirname, 'src', 'modules', '**', '*.ts')],
  cli: {
    migrationsDir: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  synchronize: true,
};

const production = {
  type: 'postgres',
  url: `${process.env.DATABASE_URL}`,
  migrations: [`${process.env.DATABASE_MIGRATIONS}`],
  entities: [`${process.env.DATABASE_ENTITIES}`],
  cli: {
    migrationsDir: `${process.env.DATABASE_MIGRATIONS_DIR}`,
  },

  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
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
