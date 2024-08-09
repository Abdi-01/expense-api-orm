import * as redis from "redis";

// define confing connection
export const redisClient = redis.createClient({
  url: "redis://localhost:8085",
});
