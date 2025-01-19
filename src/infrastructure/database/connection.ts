import Redis from 'ioredis';

// Initialize Redis client
let redisClient: Redis | null = null;

// Connect to Redis
export const connectToDatabase = async (): Promise<void> => {
  // Already connected
  if (redisClient) {
    return;
  }

  try {
    redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
    });

    // Test Redis connection
    await redisClient.ping();
    console.log('Connected to Redis');
  } catch (error) {
    console.log('Failed to connect to Redis:', error);
    throw new Error('Could not connect to Redis');
  }
};

// Close the Redis connection
export const closeDatabaseConnection = async (): Promise<void> => {
  // Already disconnected
  if (!redisClient) {
    return;
  }

  try {
    await redisClient.quit();
    console.log('Redis connection closed');
  } catch (error) {
    console.log('Error closing Redis connection:', error);
  }
};

// Export redisClient
export { redisClient };
