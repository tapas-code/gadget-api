import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

console.log("🚀 Redis URL:", process.env.REDIS_URL);

const redis = new Redis(process.env.REDIS_URL as string, {
  tls: {
    rejectUnauthorized: false, 
  },
});

redis.on("connect", () => console.log("✅ Connected to Redis!"));
redis.on("error", (err) => console.error("❌ Redis Error:", err));

export default redis;
