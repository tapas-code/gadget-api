import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is not defined.");
}

const redis = new Redis(process.env.REDIS_URL as string);

export default redis;
