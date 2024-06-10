// uppercase.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UppercaseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Assuming req.body contains the payload with the `name` field
    if (req.body && req.body.name) {
      req.body.name = req.body.name.toUpperCase();
    }
    next();
  }
}
