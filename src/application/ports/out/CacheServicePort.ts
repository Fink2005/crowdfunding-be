export interface CacheServicePort {
  get(key: string): Promise<string | null>;

  set(key: string, value: string, ttl?: number): Promise<void>;

  delete(key: string): Promise<void>;

  exists(key: string): Promise<boolean>;

  setEx(key: string, value: string, seconds: number): Promise<void>;

  getAndDelete(key: string): Promise<string | null>;

  setNX(key: string, value: string, ttl?: number): Promise<boolean>;

  increment(key: string): Promise<number>;

  decrement(key: string): Promise<number>;

  ttl(key: string): Promise<number>;
}
