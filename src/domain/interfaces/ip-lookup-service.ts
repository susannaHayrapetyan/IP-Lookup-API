import { IPInfoSource } from '../entities/ip-info';

export interface IIPLookupService {
  getIPInfo(ip: string): Promise<IPInfoSource>;
  deleteIPInfo(ip: string): Promise<boolean>;
}