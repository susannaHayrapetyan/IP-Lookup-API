import { IPInfo } from '../entities/ip-info';

export interface IIPRepository {
  getByIp(ip: string): Promise<IPInfo | null>;
  saveIp(ip: string, data: IPInfo): Promise<void>;
  removeByIp(ip: string): Promise<boolean>;
}