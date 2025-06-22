import dotenv from "dotenv";

import fs from "fs";
import path from "path";

const env = process.env.NODE_ENV || "development";

//resolve env path
let envPath = path.resolve(__dirname, `../../config_${env}.env`);

if (!fs.existsSync(envPath)) {
  console.warn(`Environment file not found: ${envPath}`);
  envPath = path.resolve(__dirname, "../../config.env");

  console.warn(`Loading default environment file: config.env`);
}

const envResult = dotenv.config({ path: envPath });

if (envResult.error) {
  console.error(`Error loading environment file: ${envResult.error}`);
  throw envResult.error;
} else {
  console.log(`Loaded environment: ${env}`);
}
