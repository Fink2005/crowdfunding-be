import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

if (process.env.NODE_ENV !== "production" && !fs.existsSync(path.resolve(".env"))) {
  throw new Error(".env file not found!");
}

const env = {
  port: process.env.PORT,
  web3StorageToken: process.env.WEB3_STORAGE_TOKEN ?? "",
  mongoUrl: process.env.MONGO_URL ?? "",
  redisHost: process.env.REDIS_HOST ?? "localhost",
  redisPort: process.env.REDIS_PORT ?? "6379",
  redisPassword: process.env.REDIS_PASSWORD ?? "",
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN ?? "",
  telegramBotName: process.env.TELEGRAM_BOT_NAME ?? "",
  w3upEmail: process.env.W3UP_EMAIL ?? "",
};

for (let key in env) {
  if (env[key as keyof typeof env] === undefined || env[key as keyof typeof env] === "") {
    console.error(`[ERROR] ${key} is not set in the environment variables.`);
    process.exit(1);
  }
}

export default env;
