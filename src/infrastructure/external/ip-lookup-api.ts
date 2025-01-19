import axios from 'axios';
import { IPInfo } from '../../domain/entities/ip-info';

export class IPLookupAPI {
  static async fetchIPInfo(ip: string): Promise<IPInfo> {
    const response = await axios.get(`https://ipwhois.app/json/${ip}`);
    return response.data;
  }
}