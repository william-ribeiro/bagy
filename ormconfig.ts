import { resolve } from 'path';

const development = {
  type: 'sqlite',
  database: resolve(__dirname, 'src', 'database', 'db', 'bagy.sqlite'),
  migrations: [resolve(__dirname, 'src', 'database', 'migrations', '*.ts')],
  entities: [resolve(__dirname, 'src', 'modules', '**', '*.ts')],
  cli: {
    migrationsDir: resolve(__dirname, 'src', 'database', 'migrations'),
  },
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
export default config;
