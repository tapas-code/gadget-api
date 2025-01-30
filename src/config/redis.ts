import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const REDIS_URL="rediss://red-cudkom56l47c73af58sg:IXCK0BmSu7VvBJmY19T7tshidXTKclTt@oregon-redis.render.com:6379"

console.log("🚀 Redis URL:", REDIS_URL);

const redis = new Redis(REDIS_URL, {
  tls: {
    rejectUnauthorized: false, 
  },
});

redis.on("connect", () => console.log("✅ Connected to Redis!"));
redis.on("error", (err) => console.error("❌ Redis Error:", err));

export default redis;
