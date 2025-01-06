import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      res.status(400).json({
        status: 400,
        message: error.details[0].message, // Berikan pesan error yang jelas
        data: [],
      });
      return;
    }
    
    req.body = value;  // Pastikan nilai yang tervalidasi diganti di req.body
    next();
  };
};
