import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const bodyValidated = schema.parse(req.body);
    req.body = bodyValidated;
    next();
  };
};

export const validateQuery = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const validated = schema.parse(req.query);
    req.query = validated as any;
    next();
  };
};

export const validateParams = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const validated = schema.parse(req.params);
    req.params = validated as any;
    next();
  };
};
