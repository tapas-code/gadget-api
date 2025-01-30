// import Redis from "ioredis";
// import dotenv from "dotenv";

// dotenv.config();

// console.log("🚀 Redis URL:", process.env.REDIS_URL);

// const redis = new Redis(process.env.REDIS_URL as string, {
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// redis.on("connect", () => console.log("✅ Connected to Redis!"));
// redis.on("error", (err) => console.error("❌ Redis Error:", err));

// export default redis;

import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();


const redisClient = createClient({
  url: process.env.REDIS_URL as string,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    // console.log("🚀 Redis URL:", process.env.REDIS_URL);
    console.log("✅ Connected to Redis!");
  } catch (error) {
    console.error("❌ Redis Error:", error);
  }
};

export default redisClient;
