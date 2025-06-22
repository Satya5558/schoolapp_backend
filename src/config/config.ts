import dotenv from "dotenv";
import { Dialect } from "sequelize";

// Load environment-specific .env
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `config_${env}.env` });

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  port: number;
}

type DBConfigMap = {
  [key: string]: DBConfig;
};

const config: DBConfigMap = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mariadb", // or 'postgres' | 'sqlite'
    port: parseInt(process.env.DB_PORT || "3306", 10), // Default MySQL port
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mariadb",
    port: parseInt(process.env.DB_PORT || "3306", 10), // Default MySQL port
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mariadb",
    port: parseInt(process.env.DB_PORT || "3306", 10), // Default MySQL port
  },
};

export default config[env];
