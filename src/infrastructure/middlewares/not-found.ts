import { Request, Response } from 'express';

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found try to use /api/ip/:ipAddress ',
  });
};