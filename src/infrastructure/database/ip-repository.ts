import { IPInfo } from '../../domain/entities/ip-info';
import { IIPRepository } from '../../domain/interfaces/ip-repository';
import { redisClient } from './connection';

export class IPRepository implements IIPRepository {
  // TTL in seconds for cached IP data
  private readonly CACHE_TTL = process.env.REDIS_TTL || 60;

  private checkConnection(): void {
    if (!redisClient) {
      throw new Error('Redis client is not connected');
    }
  }

  // Save IP information to Redis with TTL
  public async saveIp(ip: string, ipInfo: IPInfo): Promise<void> {
    this.checkConnection();

    try {
      // Store the IP info in Redis with TTL (using the ip as the key)
      await redisClient?.setex(ip, this.CACHE_TTL, JSON.stringify(ipInfo));
    } catch (error) {
      throw new Error(`Could not save IP info for ${ip}`);
    }
  }

  // Retrieve cached IP information from Redis
  public async getByIp(ip: string): Promise<IPInfo | null> {
    this.checkConnection();

    try {
      const cachedData = await redisClient?.get(ip);

      if (cachedData) {
        return JSON.parse(cachedData);
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Failed to retrieve IP info for ${ip} from Redis:`, error);
      throw new Error(`Could not retrieve IP info for ${ip}`);
    }
  }

  // Remove cached IP info from Redis
  public async removeByIp(ip: string): Promise<boolean> {
    this.checkConnection();

    try {
      return !!(await redisClient?.del(ip));
    } catch (error) {
      console.error(`Failed to remove IP info for ${ip} from Redis:`, error);
      throw new Error(`Could not remove IP info for ${ip}`);
    }
  }
}
