import { IPInfo } from '../entities/ip-info';

export interface IIPLookupService {
  fetchIPInfo(ip: string): Promise<IPInfo>;
}