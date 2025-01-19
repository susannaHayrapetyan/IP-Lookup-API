import { NextFunction, Request, Response } from 'express';
import { IPLookupService } from '../../application/services/ip-lookup-service';

export class IPController {
  constructor(private ipService: IPLookupService) { }

  async getIP(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { ipAddress } = req.params;

    try {
      const data = await this.ipService.getIPInfo(ipAddress);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteIP(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { ipAddress } = req.params;

    try {
      const success = await this.ipService.deleteIPInfo(ipAddress);
      res.status(success ? 200 : 404).json({ success });
    } catch (error) {
      next(error);
    }
  }
}