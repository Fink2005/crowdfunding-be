import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

if (process.env.NODE_ENV !== "production" && !fs.existsSync(path.resolve(".env"))) {
  throw new Error(".env file not found!");
}

const env = {
  port: process.env.PORT!,
  web3StorageToken: process.env.WEB3_STORAGE_TOKEN!,
  mongoUrl: process.env.DATABASE_URL!,
  rpcWss: process.env.RPC_WSS!,
  rpcHttp: process.env.RPC_HTTP!,
  contractAddress: process.env.CONTRACT_ADDRESS!,
  redisHost: process.env.REDIS_HOST!,
  redisPort: process.env.REDIS_PORT!,
  redisPassword: process.env.REDIS_PASSWORD!,
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN!,
  telegramBotName: process.env.TELEGRAM_BOT_NAME!,
  w3upEmail: process.env.W3UP_EMAIL!,
  r2AccessKey: process.env.R2_ACCESS_KEY!,
  r2SecretKey: process.env.R2_SECRET_KEY!,
  r2Bucket: process.env.R2_BUCKET!,
  r2AccountId: process.env.R2_ACCOUNT_ID!,
  geminiApiKey: process.env.GEMINI_API_KEY!,
};

for (let key in env) {
  if (env[key as keyof typeof env] === undefined) {
    console.error(`[ERROR] ${key} is not set in the environment variables.`);
    process.exit(1);
  }
}

export default env;
