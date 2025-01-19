import { Request, Response, NextFunction } from 'express';
import { ipValidationSchema } from '../../application/validation/ip-validation-schema';

export const validateIP = (req: Request, res: Response, next: NextFunction) => {
  const { error } = ipValidationSchema.validate(req.params);

  if (error) {
    next(error);
  } else {
    next();
  }
};