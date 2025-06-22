import { Sequelize } from "sequelize";
import config from "../config/config";

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mariadb",
    port: config.port,
    //logging: false, // Disable logging for cleaner output
  }
);

export default sequelize;
