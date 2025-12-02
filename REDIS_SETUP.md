# Redis Setup Guide

## 🚀 Quick Start

### 1. Start Redis with Docker Compose

```bash
# Start Redis + RedisInsight (Official GUI - Modern & Beautiful)
docker-compose up -d redis redisinsight

# Check if running
docker ps

# View logs
docker logs crowdfunding-redis
```

### 2. Access Redis

- **Redis Server**: `localhost:6379`
- **RedisInsight (Official GUI)**: http://localhost:5540
- **Password**: `redis123`

### 3. Setup RedisInsight (First Time)

1. Open http://localhost:5540
2. Click "Add Redis Database"
3. Fill in:
   - **Host**: `redis` (or `localhost` if outside Docker)
   - **Port**: `6379`
   - **Database Alias**: `Crowdfunding Redis`
   - **Username**: (leave empty)
   - **Password**: `redis123`
4. Click "Add Redis Database"

✅ Now you have a beautiful, modern Redis GUI!

### 3. Test Connection

```bash
# Using redis-cli in Docker
docker exec -it crowdfunding-redis redis-cli -a redis123

# Test commands
> PING
PONG

> SET test "Hello Redis"
OK

> GET test
"Hello Redis"

> DEL test
(integer) 1

> exit
```

## 📁 Project Structure

```
src/
├── application/
│   └── ports/
│       └── out/
│           └── CacheServicePort.ts       # ← Cache interface
├── infrastructure/
│   ├── cache/
│   │   └── redis.ts                      # ← Redis connection
│   └── services/
│       └── RedisCacheService.ts          # ← Redis implementation
```

## 🎯 Usage in Code

### Basic Usage

```typescript
import { RedisCacheService } from "@/infrastructure/services/RedisCacheService";

const cache = new RedisCacheService();

// Set value
await cache.set("user:123", JSON.stringify({ name: "John" }));

// Set with TTL (expire after 60 seconds)
await cache.set("session:abc", "token-value", 60);

// Get value
const value = await cache.get("user:123");

// Delete
await cache.delete("user:123");
```

### In Use Case (Clean Architecture)

```typescript
export class LoginUseCase {
  constructor(
    private readonly cache: CacheServicePort  // ← Depend on interface
  ) {}

  async execute(input: LoginUserDto) {
    // Cache session token
    await this.cache.setEx(
      `session:${userId}`,
      token,
      3600  // 1 hour
    );
  }
}
```

## 🔧 Available Methods

| Method | Description | Example |
|--------|-------------|---------|
| `get(key)` | Get value | `await cache.get("key")` |
| `set(key, value, ttl?)` | Set value with optional TTL | `await cache.set("key", "value", 60)` |
| `setEx(key, value, seconds)` | Set with expiration | `await cache.setEx("key", "value", 60)` |
| `delete(key)` | Delete key | `await cache.delete("key")` |
| `exists(key)` | Check if exists | `await cache.exists("key")` |
| `setNX(key, value, ttl?)` | Set if not exists | `await cache.setNX("key", "value")` |
| `increment(key)` | Increment counter | `await cache.increment("counter")` |
| `decrement(key)` | Decrement counter | `await cache.decrement("counter")` |
| `ttl(key)` | Get time to live | `await cache.ttl("key")` |
| `getAndDelete(key)` | Get and remove | `await cache.getAndDelete("key")` |

## 📊 Common Use Cases

### 1. Session Management
```typescript
// Store session
await cache.setEx(`session:${userId}`, JSON.stringify(sessionData), 3600);

// Get session
const session = await cache.get(`session:${userId}`);

// Logout (delete session)
await cache.delete(`session:${userId}`);
```

### 2. Rate Limiting
```typescript
const key = `rate-limit:${userId}`;
const count = await cache.increment(key);

if (count === 1) {
  // First request, set expiration to 60 seconds
  await cache.setEx(key, "1", 60);
}

if (count > 100) {
  throw new Error("Rate limit exceeded");
}
```

### 3. Caching Database Queries
```typescript
const cacheKey = `user:${userId}`;

// Try to get from cache
let user = await cache.get(cacheKey);

if (!user) {
  // Cache miss - get from database
  user = await userRepository.findById(userId);

  // Store in cache for 5 minutes
  await cache.set(cacheKey, JSON.stringify(user), 300);
}
```

### 4. Distributed Locks
```typescript
const lockKey = `lock:${resourceId}`;
const acquired = await cache.setNX(lockKey, "locked", 10);

if (!acquired) {
  throw new Error("Resource is locked");
}

try {
  // Do critical work
} finally {
  // Release lock
  await cache.delete(lockKey);
}
```

### 5. Temporary Data Storage
```typescript
// Store verification code for 5 minutes
await cache.setEx(`verify:${email}`, "123456", 300);

// Verify and delete
const code = await cache.getAndDelete(`verify:${email}`);
```

## 🔒 Security

- **Password**: Set in `docker-compose.yml` and `.env`
- **Network**: Redis runs in isolated Docker network
- **Encryption**: Consider Redis TLS in production

## 🐛 Troubleshooting

### Redis not connecting?
```bash
# Check if Redis is running
docker ps | grep redis

# Restart Redis
docker-compose restart redis

# Check logs
docker logs crowdfunding-redis
```

### Cannot authenticate?
```bash
# Make sure password matches in .env and docker-compose.yml
REDIS_PASSWORD=redis123  # in .env
```

### Clear all Redis data
```bash
# Connect to Redis CLI
docker exec -it crowdfunding-redis redis-cli -a redis123

# Clear all data
> FLUSHALL
OK
```

## 📚 Resources

- [Redis Documentation](https://redis.io/docs/)
- [Redis Commands](https://redis.io/commands/)
- [node-redis Client](https://github.com/redis/node-redis)
