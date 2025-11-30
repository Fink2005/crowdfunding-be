import redisClient from "@/infrastructure/cache/redis";
import env from "@/infrastructure/config/env";
import { createServer } from "@/infrastructure/http/server";
import { connectDB } from "@/infrastructure/persistence/odm/mongoose";

async function bootstrap() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Connect to Redis
    await redisClient.connect();

    // Create and start server
    const app = createServer();

    app.listen(env.port, () => {
      console.log(`🚀 Server running on http://localhost:${env.port}`);
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      console.log("\n⏳ Shutting down gracefully...");
      await redisClient.disconnect();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      console.log("\n⏳ Shutting down gracefully...");
      await redisClient.disconnect();
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Failed to bootstrap app:", error);
    process.exit(1);
  }
}

bootstrap();
