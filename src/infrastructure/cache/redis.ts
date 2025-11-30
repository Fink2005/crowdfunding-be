import env from "@/infrastructure/config/env";
import { createClient, RedisClientType } from "redis";

class RedisClient {
  private static instance: RedisClient;
  private client: RedisClientType;
  private isConnected: boolean = false;

  private constructor() {
    // Tạo Redis client
    this.client = createClient({
      socket: {
        host: env.redisHost,
        port: parseInt(env.redisPort),
      },
      password: env.redisPassword || undefined,
    });

    // Event listeners
    this.client.on("connect", () => {
      console.log("🔴 [Redis] Connecting...");
    });

    this.client.on("ready", () => {
      this.isConnected = true;
      console.log("✅ [Redis] Connected successfully!");
    });

    this.client.on("error", (err) => {
      console.error("❌ [Redis] Error:", err);
      this.isConnected = false;
    });

    this.client.on("end", () => {
      console.log("🔴 [Redis] Connection closed");
      this.isConnected = false;
    });
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  /**
   * Connect to Redis
   */
  public async connect(): Promise<void> {
    if (!this.isConnected) {
      await this.client.connect();
    }
  }

  /**
   * Disconnect from Redis
   */
  public async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.client.quit();
    }
  }

  /**
   * Get Redis client
   */
  public getClient(): RedisClientType {
    return this.client;
  }

  /**
   * Check if connected
   */
  public isReady(): boolean {
    return this.isConnected;
  }
}

// Export singleton instance
export const redisClient = RedisClient.getInstance();
export default redisClient;
