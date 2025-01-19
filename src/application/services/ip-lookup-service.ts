import { IPInfo } from '../../domain/entities/ip-info';
import { IIPRepository } from '../../domain/interfaces/ip-repository';
import { IPLookupAPI } from '../../infrastructure/external/ip-lookup-api';

export class IPLookupService {
  constructor(private ipRepository: IIPRepository) { }

  async getIPInfo(ip: string): Promise<{
    source: string,
    data: IPInfo,
  }> {
    const cacheKey = `ip:${ip}`;
    const cachedData = await this.ipRepository.getByIp(ip);

    if (cachedData) {
      return { source: 'cache', data: cachedData };
    }

    const ipData = await IPLookupAPI.fetchIPInfo(ip);
    await this.ipRepository.saveIp(ip, ipData);

    return { source: 'api', data: ipData };
  }

  async deleteIPInfo(ip: string): Promise<boolean> {
    return this.ipRepository.removeByIp(ip);
  }
}