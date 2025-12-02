import { CacheServicePort } from "@/application/ports/out/CacheServicePort";
import redisClient from "@/infrastructure/cache/redis";

export class RedisCacheService implements CacheServicePort {
  async get(key: string): Promise<string | null> {
    try {
      const client = redisClient.getClient();
      return await client.get(key);
    } catch (error) {
      console.error(`[Redis] Error getting key ${key}:`, error);
      return null;
    }
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    try {
      const client = redisClient.getClient();
      if (ttl) {
        await client.setEx(key, ttl, value);
      } else {
        await client.set(key, value);
      }
    } catch (error) {
      console.error(`[Redis] Error setting key ${key}:`, error);
      throw error;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      const client = redisClient.getClient();
      await client.del(key);
    } catch (error) {
      console.error(`[Redis] Error deleting key ${key}:`, error);
      throw error;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const client = redisClient.getClient();
      const result = await client.exists(key);
      return result === 1;
    } catch (error) {
      console.error(`[Redis] Error checking existence of key ${key}:`, error);
      return false;
    }
  }

  async setEx(key: string, value: string, seconds: number): Promise<void> {
    try {
      const client = redisClient.getClient();
      await client.setEx(key, seconds, value);
    } catch (error) {
      console.error(`[Redis] Error setting key ${key} with expiration:`, error);
      throw error;
    }
  }

  async getAndDelete(key: string): Promise<string | null> {
    try {
      const client = redisClient.getClient();
      const value = await client.get(key);
      if (value) {
        await client.del(key);
      }
      return value;
    } catch (error) {
      console.error(`[Redis] Error getting and deleting key ${key}:`, error);
      return null;
    }
  }

  async setNX(key: string, value: string, ttl?: number): Promise<boolean> {
    try {
      const client = redisClient.getClient();
      const result = await client.set(key, value, {
        NX: true,
        ...(ttl && { EX: ttl }),
      });
      return result === "OK";
    } catch (error) {
      console.error(`[Redis] Error setting key ${key} with NX:`, error);
      return false;
    }
  }

  async increment(key: string): Promise<number> {
    try {
      const client = redisClient.getClient();
      return await client.incr(key);
    } catch (error) {
      console.error(`[Redis] Error incrementing key ${key}:`, error);
      throw error;
    }
  }

  async decrement(key: string): Promise<number> {
    try {
      const client = redisClient.getClient();
      return await client.decr(key);
    } catch (error) {
      console.error(`[Redis] Error decrementing key ${key}:`, error);
      throw error;
    }
  }

  async ttl(key: string): Promise<number> {
    try {
      const client = redisClient.getClient();
      return await client.ttl(key);
    } catch (error) {
      console.error(`[Redis] Error getting TTL for key ${key}:`, error);
      return -1;
    }
  }
}
