import dotenv from "dotenv";
import path from "path";
dotenv.config();

const config = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "database", "db", "bagy.sqlite"),
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    useNullAsDefault: true,
  },

  production: {
    client: process.env.CLIENT,
    connection: {
      connectionString: process.env.DATABASE_LOCAL_URL,
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    useNullAsDefault: true,
  },
};

export default config;
